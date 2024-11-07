import { Link, useNavigate, useParams } from "react-router-dom";
import "./navbar.css";
import apiClient from "../api";
import { useState, useEffect } from "react";

const NavBar = ({ user }) => {
  const [topicList, setTopicList] = useState([]);
  const navigate = useNavigate();
  const { topic } = useParams();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    if (user != "none") {
      apiClient
        .get(`/users/${user}`)
        .then((response) => {
          const newUserDetails = { ...response.data.user };
          setUserDetails(newUserDetails);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setUserDetails({});
    }
  }, [user]);

  useEffect(() => {
    apiClient
      .get("/topics")
      .then((response) => {
        setTopicList(response.data.topics);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const topicLink = (e) => {
    navigate(`/topics/${e.target.value}`);
  };

  return (
    <nav id="navBox">
      <div id="headingBar">
        <h1 id="title">NC News</h1>
        {user !== "none" ? (
          <div id="miniProfile">
            <img id="miniPFP" src={userDetails.avatar_url}></img>
            <h2 id="username">{userDetails.username}</h2>
          </div>
        ) : null}
      </div>
      <div id="buttonBar">
        <Link className="navButton" to="/">
          All Articles
        </Link>

        <select
          id="topicSelect"
          onChange={topicLink}
          className="topicSelect"
          value={topic}
        >
          <option id="topicTitle" className="topicOption" value="all">
            All Topics
          </option>
          {topicList.map((topic) => {
            return (
              <option className="topicOption" value={topic.slug}>
                {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
              </option>
            );
          })}
        </select>
        <Link className="navButton" to="/users">
          User Profile
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
