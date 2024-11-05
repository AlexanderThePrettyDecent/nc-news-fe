import { useParams } from "react-router";
import ArticleBody from "./ArticleBody";
import CommentBox from "./CommentBox";
import "./article.css";

const SingleArticle = () => {
  const { id } = useParams();

  return (
    <div  id="articleWhole">
      <ArticleBody id={id} />
      <CommentBox id={id} />
    </div>
  );
};

export default SingleArticle;
