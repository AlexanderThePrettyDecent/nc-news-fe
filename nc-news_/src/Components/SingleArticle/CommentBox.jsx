import { useEffect, useState } from "react";
import apiClient from "../../api";
import CommentCard from "./CommentCard";
import "./article.css";

const CommentBox = ({ id }) => {
  const [commentList, setCommentList] = useState([]);
  const [currNewComment, setCurrNewComment] = useState("");

  const commentChangeHandler = (e) => {
    setCurrNewComment(e.target.value);
  };

  const postComment = () => {};

  useEffect(() => {
    apiClient
      .get(`/articles/${id}/comments`)
      .then((response) => {
        setCommentList(response.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="commentBox">
      <ul id="commentList">
        {commentList.map((comment) => {
          return <CommentCard comment={comment} />;
        })}
      </ul>
      <div id="commentInputBox">
        <textarea type="text" id="commentTextBox" onChange={commentChangeHandler}></textarea>
        <button id="postCommentButton" onClick={postComment}>Post Comment</button>
      </div>
    </div>
  );
};

export default CommentBox;
