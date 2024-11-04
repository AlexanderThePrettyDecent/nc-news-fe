import apiClient from "../../api";
import { useEffect, useState } from "react";

const ArticleBody = ({ id }) => {
  const [article, setArticle] = useState({});
  useEffect(() => {
    apiClient
      .get(`articles/${id}`)
      .then((response) => {
        setArticle(response.data.article);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>{article.title}</h1>
      <h3>
        By {article.author} {new Date(article.created_at).getDate()}/
        {new Date(article.created_at).getMonth()}/
        {new Date(article.created_at).getFullYear()}
      </h3>
      <img src={article.article_img_url}></img>
      <p>{article.body}</p>
    </div>
  );
};

export default ArticleBody;
