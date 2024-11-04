import apiClient from "../../api";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

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
    <div>
      <ul>
        {articleList.map((article) => {
          return <ArticleCard article={article} />;
        })}
      </ul>
      {page > 1 ? (
        <button onClick={previousPageHandler}>Previous Page</button>
      ) : null}
      <p1>Page: {page}</p1>
      {totalPages >= page + 1 ? (
        <button onClick={nextPageHandler}>Next Page</button>
      ) : null}
    </div>
  );
};

export default ListProvider;
