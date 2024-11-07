import { useEffect, useState } from "react";
import apiClient from "../../api";
import CommentCard from "./CommentCard";
import "./article.css";
import { Link } from "react-router-dom";

const CommentBox = ({ id, userInfo }) => {
  const [commentList, setCommentList] = useState([]);
  const [currNewComment, setCurrNewComment] = useState("");
  const { user } = userInfo;
  const [failedComment, setFailedComment] = useState(false);

  const commentChangeHandler = (e) => {
    setCurrNewComment(e.target.value);
  };

  const postComment = () => {
    if (currNewComment == "") {
      setFailedComment(true);
      return;
    } else {
      setFailedComment(false);
    }
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
        setFailedComment(true);
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
      {user === "none" ? (
        <Link id="signInLink" to={"/users"}>
          To make a comment sign in!
        </Link>
      ) : (
        <div id="commentInputBox">
          <h3>New Comment:</h3>
          {failedComment ? <h4>Comment could not be posted!</h4> : null}
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
