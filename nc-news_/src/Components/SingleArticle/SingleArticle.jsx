import { useParams } from "react-router";
import ArticleBody from "./ArticleBody";
import CommentBox from "./CommentBox";

const SingleArticle = () => {
  const { id } = useParams();

  return (
    <>
      <ArticleBody id={id} />
      <CommentBox id={id} />
    </>
  );
};

export default SingleArticle;
