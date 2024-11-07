import { useEffect, useState } from "react";
import apiClient from "../../api";
import UserCard from "./UserCard";
import "./login.css";

const LoginPage = ({ userInfo }) => {
  const [userList, setUserList] = useState([]);
  const { user, setUser } = userInfo;

  useEffect(() => {
    apiClient
      .get(`/users`)
      .then((response) => {
        setUserList(response.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  const signOut = () => {
    setUser("none");
  };

  return (
    <div>
      <h1 id="SignInTitle">Choose a User:</h1>
      {user === "none" ? (
        <h3 className="CurrentUser">No Current User</h3>
      ) : (
        <h3 className="CurrentUser">
          Current User: {user} <button onClick={signOut}>Sign Out</button>
        </h3>
      )}
      <ul id="UserList">
        {userList.map((userData) => {
          return <UserCard userData={userData} setUser={setUser} selected={user === userData.username} />;
        })}
      </ul>
    </div>
  );
};

export default LoginPage;
