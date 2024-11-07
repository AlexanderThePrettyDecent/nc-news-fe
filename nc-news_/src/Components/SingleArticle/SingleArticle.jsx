import apiClient from "../../api";
import { useEffect, useState } from "react";
import RingLoader from "react-spinners/RingLoader";
import "./article.css";
import CommentBox from "./CommentBox";
import { useParams } from "react-router";
import ErrorPage from "../ErrorPage";

const SingleArticle = ({ userInfo }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [voteCount, setVoteCount] = useState(0);
  const [voted, setVoted] = useState("none");
  const [failed, setFailed] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    apiClient
      .get(`articles/${id}`)
      .then((response) => {
        setVoteCount(response.data.article.votes);

        setLoading(false);
        setArticle(response.data.article);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
        setFailed(true);
        setError({ status: err.response.status, msg: err.response.data.msg });
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
      setVoteCount(voteCount - 1);
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
      {!loading && !failed ? (
        <div id="articleWhole">
          <div id="bodyBack">
            <h1 id="articleTitle">{article.title}</h1>
            <h3 id="details">
              By {article.author} {new Date(article.created_at).getDate()}/
              {new Date(article.created_at).getMonth()}/
              {new Date(article.created_at).getFullYear()}
            </h3>
            <div id="imageBox">
              <img src={article.article_img_url} id="image"></img>
            </div>
            <p id="articleBody">{article.body}</p>
            <div id="voteBox">
              <button
                className="button"
                id="upVote"
                disabled={voted === "down"}
                onClick={upVoteHandler}
              >
                +1
              </button>
              <p id="voteCount">Votes: {voteCount}</p>
              <button
                className="button"
                id="downVote"
                disabled={voted === "up"}
                onClick={downVoteHandler}
              >
                -1
              </button>
            </div>
          </div>
          <CommentBox id={id} userInfo={userInfo} />
        </div>
      ) : loading ? (
        <RingLoader id="loader" />
      ) : (
        <ErrorPage error={error} type={"article"} />
      )}
    </>
  );
};

export default SingleArticle;
