import { StrictMode } from "react";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App id="wholePage"/>
    </BrowserRouter>
  </StrictMode>
);
