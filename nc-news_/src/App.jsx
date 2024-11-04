import { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import NavBar from "./Components/NavBar";
import ListProvider from "./Components/ArticleList/ListProvider";
import SingleArticle from "./Components/SingleArticle/SingleArticle";

function App() {
  const [user, setUser] = useState("");

  return (
    <>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<ListProvider />}></Route>
          <Route path="/articles/:id" element={<SingleArticle />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
