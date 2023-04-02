import {  useState } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedin, setLoggedIn] = useState(false);

  const handleSubmit = () => {
    axios
      .post("https://rich-pear-walkingstick-robe.cyclic.app/login", { email: email, password: password })
      .then((response) => {
        if (response.data.loggedin) {
          setLoggedIn(true);
          localStorage.setItem("token", response.data.token);
        } else {
          setLoggedIn(false);
          alert("wrong credentials");
          setEmail("");
          setPassword("");
        }
      });
  };

  const logout=()=>{
    setLoggedIn(false)
    setEmail('')
    setPassword('')
  }

  return (
    <div>
      {!loggedin ? (
        <div className="form">
          email - test <br />
          password - password 
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>Login</button>
        </div>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Home logout={logout} />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;

