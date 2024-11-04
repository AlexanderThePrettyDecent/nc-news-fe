import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <h1>NC News</h1>
      <div>
        <Link>All Articles</Link>
        <Link>Topics</Link>
        <Link>User Profile</Link>
      </div>
    </>
  );
};

export default NavBar;
