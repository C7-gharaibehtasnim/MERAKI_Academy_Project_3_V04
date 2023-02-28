import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
const Navbar = () => {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <div>
      {isLoggedIn ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to ="/addarticle">AddNewArticle</Link>
          <Link to="/Login">LogOut</Link>
        </>
      ) : (
        <>
          {" "}
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
