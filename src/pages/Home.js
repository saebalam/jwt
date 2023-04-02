import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = ({logout}) => {

    const [authenticated,setAuthenticated] = useState(false)

  const getData = () => {
    axios
      .get("https://rich-pear-walkingstick-robe.cyclic.app/getUserInfo", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
        setAuthenticated(res.data.authenticated)
      });
  };

  const handleLogout=()=>{
    logout()
  }

  return (
    <div className="main" style={{textAlign:'center'}}>
      <div className="home" style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'2px 5rem'}}>
      <h1>Welcome  </h1>
      <div><button onClick={handleLogout}>Logout</button></div>
      </div>
      <h3>Authenticated ? {authenticated.toString().toUpperCase()}</h3>
      <button onClick={getData}>Click to authenticate request using JWT and get data</button>
      {authenticated && <div style={{textAlign:'left',marginLeft:'70px',marginTop:'60px'}}>
        <h2>Learn JWT authentication:</h2>
        <ol>
            <li>Send login credentials (id/password) from browser to backend server.</li>
            <li>Accept these credentials in backend and verify in database or local variable(for testing).</li>
            <li>If credential does not match, send response of wrong credetials.</li>
            <li>If credentials match, <ol type="a">
                <li>Use <span style={{backgroundColor: "yellow"}}>jwt.sign(payload,secretKey)</span> to create a token based on any payload that is unique to user such as userId and secret key.  </li>
                <li>Send this token to browser in response and store it in local/session storage.</li>
                </ol> </li>
            <li>Pass this stored token through headers while hitting an api endpoint e.g. /userInfo.</li>
            <li>Verifying jwt - <ol>
                <li>Create a function verifyToken(can be any name) that will verify that the request is from the user that is logged in. </li>
                <li>Get tokens from request header that is passed from browser.</li>
                <li>Inside this function verify the token using <span style={{backgroundColor: "yellow"}}>jwt.verify()</span> </li>
                </ol>
                </li>
            <li>Use this verifyToken function as middleware in routes e.g. axios.get('/userInfo',verifyToken,(req,res)=>{})</li>
        </ol>
      </div> }
    </div>
  );
};

export default Home;
