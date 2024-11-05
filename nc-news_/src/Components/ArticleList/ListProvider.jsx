import apiClient from "../../api";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import "./articleList.css";

const ListProvider = () => {
  const [articleList, setArticleList] = useState([]);
  const [page, setPage] = useState(1);
  const [articleCount, setArticleCount] = useState(0);
  const totalPages = Math.ceil(articleCount / 10);

  const nextPageHandler = () => {
    setPage(page + 1);
  };
  const previousPageHandler = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    apiClient
      .get(`/articles?p=${page}`)
      .then((response) => {
        setArticleList(response.data.articles);
        setArticleCount(response.data.total_count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  return (
    <div id="listBack">
      <ul id="list">
        {articleList.map((article) => {
          return <ArticleCard article={article} />;
        })}
      </ul>
      <div id="buttonZone">
        <button
          disabled={!(page > 1)}
          className="pageButton"
          onClick={previousPageHandler}
        >
          Previous
        </button>
        <p>Page: {page}</p>

        <button
          disabled={!(totalPages >= page + 1)}
          className="pageButton"
          onClick={nextPageHandler}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListProvider;
