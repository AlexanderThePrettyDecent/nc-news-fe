import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <div>
      <Link to={`articles/${article.article_id}`}>
        <h2 key={article.id + "comment"}>{article.title}</h2>
      </Link>
      <p>
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
