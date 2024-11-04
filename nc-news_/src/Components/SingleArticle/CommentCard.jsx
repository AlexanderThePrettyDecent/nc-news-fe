const CommentCard = ({ comment }) => {
  return (
    <div>
      <p>
        <b>{comment.author}</b>| Votes: {comment.votes} |{" "}
        {new Date(comment.created_at).getDate()}/
        {new Date(comment.created_at).getMonth()}/
        {new Date(comment.created_at).getFullYear()}
      </p>
      <p>{comment.body}</p>
    </div>
  );
};

export default CommentCard;
