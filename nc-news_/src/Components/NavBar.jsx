import { Link } from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
  return (
    <div id="navBox">
      <h1 id="title">NC News</h1>
      <div id="buttonBar">
        <Link className="navButton" to="/">All Articles</Link>
        <Link className="navButton">Topics</Link>
        <Link className="navButton" to="/users" >User Profile</Link>
      </div>
    </div>
  );
};

export default NavBar;
