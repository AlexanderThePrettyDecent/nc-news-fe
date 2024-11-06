import { Link, useNavigate, useParams } from "react-router-dom";
import "./navbar.css";
import apiClient from "../api";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [topicList, setTopicList] = useState([]);
  const [topicClick, setTopicClick] = useState(false);
  const navigate = useNavigate();
  const { topic } = useParams();

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
    <div id="navBox">
      <h1 id="title">NC News</h1>
      <div id="buttonBar">
        <Link className="navButton" to="/">
          All Articles
        </Link>
        <select
          onChange={topicLink}
          className="topicSelect"
          value={topic}
        >
          <option
            id="topicTitle"
            className="topicOption"
            disabled={topicClick}
            value="all"
          >
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
    </div>
  );
};

export default NavBar;
