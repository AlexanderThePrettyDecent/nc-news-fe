import apiClient from "../../api";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import "./articleList.css";
import RingLoader from "react-spinners/RingLoader";
import { useParams } from "react-router";

const ListProvider = () => {
  const [articleList, setArticleList] = useState([]);
  const [page, setPage] = useState(1);
  const [articleCount, setArticleCount] = useState(0);
  const totalPages = Math.ceil(articleCount / 10);
  const [loading, setLoading] = useState(true);
  const { topic } = useParams();
  const [showSort, setShowSort] = useState(false);
  const [sortParams, setSortParams] = useState({
    column: "created_at",
    order: "DESC",
  });
  let topicQuery = "";

  if (!topic || topic === "all") {
    topicQuery = "";
  } else {
    topicQuery = "&topic=" + topic;
  }

  const nextPageHandler = () => {
    setPage(page + 1);
  };
  const previousPageHandler = () => {
    setPage(page - 1);
  };

  const sortByHandler = (e) => {
    const newSortParms = { ...sortParams };
    newSortParms.column = e.target.value;
    setSortParams(newSortParms);
  };

  const orderHandler = (e) => {
    const newSortParms = { ...sortParams };
    newSortParms.order = e.target.value;
    setSortParams(newSortParms);
  };

  const showSortHandler = () => {
    if (showSort) {
      setShowSort(false);
    } else {
      setShowSort(true);
    }
  };

  useEffect(() => {
    console.log(
      `/articles?p=${page}&sort_by=${sortParams.column}&sort_order=${sortParams.order}${topicQuery}`
    );
    apiClient
      .get(
        `/articles?p=${page}&sort_by=${sortParams.column}&sort_order=${sortParams.order}${topicQuery}`
      )
      .then((response) => {
        setArticleList(response.data.articles);
        setArticleCount(response.data.total_count);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, topic, sortParams]);

  return (
    <div id="listBack">
      <div>
        {topic ? (
          <h1 id="topicTitle" >{topic.charAt(0).toUpperCase() + topic.slice(1)}</h1>
        ) : null}
        <button id="sortButton" onClick={showSortHandler}>
          {showSort ? "Hide" : "Sort Results"}
        </button>
        {!showSort ? null : (
          <div id="sortBox">
            <label>
              {"Sort By "}
              <select className="sortingDrop" onChange={sortByHandler}>
                <option value="created_at">Date</option>
                <option value="votes">Votes</option>
                <option value="comment_count">Comments</option>
              </select>
            </label>
            {" |"}
            <label>
              {" Order "}
              <select className="sortingDrop" onChange={orderHandler}>
                <option value="DESC">
                  {sortParams.column === "created_at" ? "Newest" : "Most"}
                </option>
                <option value="ASC">
                  {sortParams.column === "created_at" ? "Oldest" : "Least"}
                </option>
              </select>
            </label>
          </div>
        )}
      </div>
      {loading ? (
        <RingLoader id="loader" />
      ) : (
        <ul id="list">
          {articleList.map((article) => {
            return <ArticleCard article={article} />;
          })}
          <div id="buttonZone">
            <button
              disabled={!(page > 1)}
              className="pageButton"
              onClick={previousPageHandler}
            >
              Previous
            </button>
            <p id="pageLabel">Page: {page}</p>

            <button
              disabled={!(totalPages >= page + 1)}
              className="pageButton"
              onClick={nextPageHandler}
            >
              Next
            </button>
          </div>
        </ul>
      )}
    </div>
  );
};

export default ListProvider;
