import { useState } from "react";
import apiClient from "../../api";
import "./commentCard.css";
import BeatLoader from "react-spinners/BeatLoader";

const CommentCard = ({ comment, user, deleteComment }) => {
  const [deleting, setDeleting] = useState(false);

  const deleteClick = () => {
    setDeleting(true);
    apiClient
      .delete(`/comments/${comment.comment_id}`)
      .then((response) => {
        setDeleting(false)
        deleteComment(comment);
      })
      .catch((err) => {
        console.log(err);
        setDeleting(false);
      });
  };

  return (
    <li id="commentCardBack" key={comment.comment_id}>
          <p id="commentDetails">
            <b>{comment.author}</b>| Votes: {comment.votes} |{" "}
            {new Date(comment.created_at).getDate()}/
            {new Date(comment.created_at).getMonth()}/
            {new Date(comment.created_at).getFullYear()}|
            {user === comment.author ? (
              <button
                id="DeleteButton"
                onClick={deleteClick}
              >
                Delete Comment
              </button>
            ) : null}
          </p>
         {deleting ? <BeatLoader/> : <p id="commentBody">{comment.body}</p>} 

    </li>
  );
};

export default CommentCard;
