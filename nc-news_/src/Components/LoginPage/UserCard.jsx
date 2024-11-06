import "./login.css";

const UserCard = ({ user, setUser }) => {
  const changeUser = () => {
    setUser(user.username);
  };

  return (
    <li className="UserCard" key={user.name}>
      <button className="UserButton" value={user.username} onClick={changeUser}>
        <img className="PFP" src={user.avatar_url} />
        <h2 className="UserName " >{user.username}</h2>
      </button>
    </li>
  );
};

export default UserCard;
