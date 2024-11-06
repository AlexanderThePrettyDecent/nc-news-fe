import React, { useState } from "react";
import { Route, Routes } from "react-router";

import NavBar from "./Components/NavBar";
import ListProvider from "./Components/ArticleList/ListProvider";
import SingleArticle from "./Components/SingleArticle/SingleArticle";
import LoginPage from "./Components/LoginPage/LoginPage";

function App() {
  const [user, setUser] = useState("none");

  return (
    <>
      <NavBar />
      <div id="wholePage">
        <Routes>
          <Route
            path="/"
            element={<ListProvider userInfo={{ user, setUser }} />}
          />
          <Route
            path="/articles/:id"
            element={<SingleArticle userInfo={{ user, setUser }} />}
          />
          <Route
            path="/users"
            element={<LoginPage userInfo={{ user, setUser }} />}
          />
          <Route
            path="/topics/:topic"
            element={<ListProvider userInfo={{ user, setUser }} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
