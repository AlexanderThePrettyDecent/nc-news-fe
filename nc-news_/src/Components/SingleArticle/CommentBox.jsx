import { useEffect, useState } from "react";
import apiClient from "../../api";
import CommentCard from "./CommentCard";

const CommentBox = ({ id }) => {
  const [commentList, setCommentList] = useState([]);
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
    <div>
      <ul>
        {commentList.map((comment) => {
          return <CommentCard comment={comment} />;
        })}
      </ul>
    </div>
  );
};

export default CommentBox;
