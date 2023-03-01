import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../App";
const Navbar = () => {
  const { setToken,setIsLoggedIn,isLoggedIn } = useContext(UserContext);
  return (
    <div className="NavBar">
      {isLoggedIn ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to ="/addarticle">AddNewArticle</Link>
          <button onClick={()=>{
            localStorage.clear()
            setToken(null)
            setIsLoggedIn(false)
            Navigate("/login")

          }} >LogOut</button>
        </>
      ) : (
        <>
        
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
