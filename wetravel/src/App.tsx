import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import { timeStamp } from "console";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Mainpage from "./components/Mainpage";
document.title = "Travelers";
const mainpage: boolean = false;
function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">{!mainpage && <Login />}</Link>
        <Link to="/mainpage">{mainpage && <Mainpage />}</Link>
      </Router>
    </div>
  );
}

export default App;
