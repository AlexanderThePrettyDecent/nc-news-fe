import "./commentCard.css";

const CommentCard = ({ comment }) => {
  return (
    <li id="commentCardBack" key={comment.id}>
      <p id="commentDetails">
        <b>{comment.author}</b>| Votes: {comment.votes} |{" "}
        {new Date(comment.created_at).getDate()}/
        {new Date(comment.created_at).getMonth()}/
        {new Date(comment.created_at).getFullYear()}
      </p>
      <p id="commentBody">{comment.body}</p>
    </li>
  );
};

export default CommentCard;
