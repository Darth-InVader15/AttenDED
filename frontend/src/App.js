import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import NumberList from './components/login.component';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  const handleLogin = (user) => {
    setLoggedIn(true);
    setUsername(user.username);
    console.log("CALLLLED");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername(null);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/">
              AttenDED
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  {loggedIn ? (
                    <button className="nav-link btn btn-link" onClick={handleLogout}>
                      Logout
                    </button>
                  ) : (
                    <Link className="nav-link" to="/sign-in">
                      Login
                    </Link>
                  )}
                </li>
                {!loggedIn && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/sign-up">
                      Sign up
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
