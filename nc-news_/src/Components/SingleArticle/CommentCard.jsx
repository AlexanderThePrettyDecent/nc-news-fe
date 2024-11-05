const CommentCard = ({ comment }) => {
  return (
    <li key={comment.id}>
      <p>
        <b>{comment.author}</b>| Votes: {comment.votes} |{" "}
        {new Date(comment.created_at).getDate()}/
        {new Date(comment.created_at).getMonth()}/
        {new Date(comment.created_at).getFullYear()}
      </p>
      <p>{comment.body}</p>
    </li>
  );
};

export default CommentCard;
