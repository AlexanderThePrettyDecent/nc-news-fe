import { useParams } from "react-router";
import ArticleBody from "./ArticleBody";

const SingleArticle = () => {
  const { id } = useParams();
  
  return <ArticleBody id={id} />;
};

export default SingleArticle;
