import { useEffect, useState } from "react";
import apiClient from "../../api";
import CommentCard from "./CommentCard";
import "./article.css";

const CommentBox = ({ id }) => {
  const [commentList, setCommentList] = useState([]);
  const [currNewComment, setCurrNewComment] = useState("");
  const user = "weegembump";

  const commentChangeHandler = (e) => {
    setCurrNewComment(e.target.value);
  };

  const postComment = () => {
    const newCommentList = [...commentList];
    newCommentList.push({
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
      .catch((err) => {
        const updateCommentList = [...commentList];
        updateCommentList.pop();
        setCommentList(updateCommentList);
      });
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
          return <CommentCard comment={comment} />;
        })}
      </ul>
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
    </div>
  );
};

export default CommentBox;
