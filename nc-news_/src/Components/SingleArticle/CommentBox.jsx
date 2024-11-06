import { useEffect, useState } from "react";
import apiClient from "../../api";
import CommentCard from "./CommentCard";
import "./article.css";

const CommentBox = ({ id, userInfo }) => {
  const [commentList, setCommentList] = useState([]);
  const [currNewComment, setCurrNewComment] = useState("");
  const { user } = userInfo;

  const commentChangeHandler = (e) => {
    setCurrNewComment(e.target.value);
  };

  const postComment = () => {
    const newCommentList = [...commentList];
    newCommentList.unshift({
      body: currNewComment,
      author: user,
      article_id: "newComment",
      votes: 0,
      created_at: Date.now(),
    });
    setCommentList(newCommentList);
    setCurrNewComment("");
    apiClient
      .post(`/articles/${id}/comments`, {
        body: currNewComment,
        username: user,
        articleID: id,
      })
      .then((response) => {
        const commentPostedList = [...commentList];
        commentPostedList.unshift(response.data.comment);
        setCommentList(commentPostedList);
      })
      .catch((err) => {
        const updateCommentList = [...commentList];
        updateCommentList.shift();
        setCommentList(updateCommentList);
      });
  };

  const deleteComment = (comment) => {
    const deleteNewArr = [...commentList];
    deleteNewArr.splice(deleteNewArr.indexOf(comment), 1);
    setCommentList(deleteNewArr);
  };

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
          return (
            <CommentCard
              comment={comment}
              user={user}
              deleteComment={deleteComment}
            />
          );
        })}
      </ul>
      {user === "none" ? null : (
        <div id="commentInputBox">
          <textarea
            value={currNewComment}
            type="text"
            id="commentTextBox"
            onChange={commentChangeHandler}
          ></textarea>
          <button id="postCommentButton" onClick={postComment}>
            Post Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentBox;
