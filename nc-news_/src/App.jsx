import { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import NavBar from "./Components/NavBar";
import ListProvider from "./Components/ArticleList/ListProvider";

function App() {
  const [user, setUser] = useState("");

  return (
    <>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<ListProvider />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
