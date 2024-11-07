import { useEffect, useState } from "react";
import apiClient from "../../api";
import "./commentCard.css";
import BeatLoader from "react-spinners/BeatLoader";

const CommentCard = ({ comment, user, deleteComment }) => {
  const [deleting, setDeleting] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
  const [voted, setVoted] = useState("none");

  const deleteClick = () => {
    setDeleting(true);
    apiClient
      .delete(`/comments/${comment.comment_id}`)
      .then((response) => {
        setDeleting(false);
        deleteComment(comment);
      })
      .catch((err) => {
        console.log(err);
        setDeleting(false);
      });
  };

  useEffect(() => {
    setVoteCount(comment.votes);
  }, []);

  const commentUpVoteHandler = () => {
    if (voted === "none") {
      setVoted("up");
      setVoteCount(voteCount + 1);
      apiClient
        .patch(`/comments/${comment.comment_id}`, { inc_votes: 1 })
        .catch((err) => {
          setVoted("none");
          setVoteCount(voteCount);
        });
    } else {
      setVoted("none");
      setVoteCount(voteCount - 1);
      apiClient
        .patch(`/comments/${comment.comment_id}`, { inc_votes: -1 })
        .catch((err) => {
          setVoted("up");
          setVoteCount(voteCount);
        });
    }
  };
  const commentDownVoteHandler = () => {
    if (voted === "none") {
      setVoted("down");
      setVoteCount(voteCount - 1);
      apiClient
        .patch(`/comments/${comment.comment_id}`, { inc_votes: -1 })
        .catch((err) => {
          setVoted("none");
          setVoteCount(voteCount);
        });
    } else {
      setVoted("none");
      setVoteCount(voteCount + 1);
      apiClient
        .patch(`/comments/${comment.comment_id}`, { inc_votes: +1 })
        .catch((err) => {
          setVoted("down");
          setVoteCount(voteCount);
        });
    }
  };

  return (
    <li id="commentCardBack" key={comment.comment_id}>
      <div id="commentDetails">
        <b>{comment.author}</b>|{new Date(comment.created_at).getDate()}/
        {new Date(comment.created_at).getMonth()}/
        {new Date(comment.created_at).getFullYear()}| Votes: {voteCount} |{" "}
        <div id="commentVotes">
          <button
            className="commentButton"
            id="commentUpVote"
            disabled={voted === "down"}
            onClick={commentUpVoteHandler}
          >
            +1
          </button>
          <button
            className="commentButton"
            id="commentDownVote"
            disabled={voted === "up"}
            onClick={commentDownVoteHandler}
          >
            -1
          </button>
        </div>
        {user === comment.author ? (
          <button id="DeleteButton" onClick={deleteClick}>
            Delete Comment
          </button>
        ) : null}
      </div>
      {deleting ? <BeatLoader /> : <p id="commentBody">{comment.body}</p>}
    </li>
  );
};

export default CommentCard;
