import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedin, setLoggedIn] = useState(false);

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/login", { email: email, password: password })
      .then((response) => {
        if (response.data.loggedin) {
          setLoggedIn(true);
          localStorage.setItem('token',response.data.token)
        } else {
          setLoggedIn(false);
        }
      });
  };

  const getData = () => {
    axios.get("http://localhost:5000/getUserInfo",{headers:{token:localStorage.getItem('token')}}).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="App">
      <div className="form">
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
        {loggedin && (
          <div>
            <button onClick={getData}>get data</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
