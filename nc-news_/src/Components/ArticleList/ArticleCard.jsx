import { Link } from "react-router-dom";
import "./articleCard.css"

const ArticleCard = ({ article }) => {
  return (
    <div id="cardBack">
      <Link id="cardTitle" to={`articles/${article.article_id}`}>
        <h2 id="titleText" key={article.id + "comment"}>{article.title}</h2>
      </Link>
      <p id="articleInfo">
        Author: {article.author} |Topic: {article.topic} |Posted on:{" "}
        {new Date(article.created_at).getDate()}/
        {new Date(article.created_at).getMonth()}/
        {new Date(article.created_at).getFullYear()}| Comments:{" "}
        {article.comment_count}
      </p>
    </div>
  );
};

export default ArticleCard;
