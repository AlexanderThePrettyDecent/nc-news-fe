import apiClient from "../../api";
import { useEffect, useState } from "react";

const ArticleBody = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [voteCount, setVoteCount] = useState(0);
  const [voted, setVoted] = useState("none");
  useEffect(() => {
    apiClient
      .get(`articles/${id}`)
      .then((response) => {
        setVoteCount(response.data.article.votes);

        setLoading(false);
        setArticle(response.data.article);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const upVoteHandler = () => {
    if (voted === "none") {
      setVoted("up");
      setVoteCount(voteCount + 1);
      apiClient.patch(`/articles/${id}`, { inc_votes: 1 }).catch((err) => {
        setVoted("none");
        setVoteCount(voteCount);
      });
    } else {
      setVoted("none");
      setVoteCount(voteCount - 1);
      apiClient.patch(`/articles/${id}`, { inc_votes: -1 }).catch((err) => {
        setVoted("up");
        setVoteCount(voteCount);
      });
    }
  };
  const downVoteHandler = () => {
    if (voted === "none") {
      setVoted("down");
      setVoteCount(voteCount);
      apiClient.patch(`/articles/${id}`, { inc_votes: -1 }).catch((err) => {
        setVoted("none");
        setVoteCount(voteCount);
      });
    } else {
      setVoted("none");
      setVoteCount(voteCount + 1);
      apiClient.patch(`/articles/${id}`, { inc_votes: +1 }).catch((err) => {
        setVoted("down");
        setVoteCount(voteCount);
      });
    }
  };

  return (
    <>
      {loading === false ? (
        <div>
          <h1>{article.title}</h1>
          <h3>
            By {article.author} {new Date(article.created_at).getDate()}/
            {new Date(article.created_at).getMonth()}/
            {new Date(article.created_at).getFullYear()}
          </h3>
          <img src={article.article_img_url}></img>
          <p>{article.body}</p>
          <div>
            <button disabled={voted === "down"} onClick={upVoteHandler}>
              +1
            </button>
            <p>{voteCount}</p>
            <button disabled={voted === "up"} onClick={downVoteHandler}>
              -1
            </button>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default ArticleBody;
