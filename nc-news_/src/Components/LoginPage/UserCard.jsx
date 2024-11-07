import { useEffect, useState } from "react";
import "./login.css";

const UserCard = ({ userData, setUser, selected }) => {
  const [styleClass, setStyleClass] = useState("UserCard");

  useEffect(() => {
    if (selected) {
      setStyleClass("selectedUser");
    } else {
      setStyleClass("UserButton");
    }
  }, [selected]);
  const changeUser = () => {
    setUser(userData.username);
  };

  return (
    <li className="UserCard" key={userData.name}>
      <button
        className={styleClass}
        value={userData.username}
        onClick={changeUser}
      >
        <img className="PFP" src={userData.avatar_url} />
        <h2 className="UserName ">{userData.username}</h2>
      </button>
    </li>
  );
};

export default UserCard;
