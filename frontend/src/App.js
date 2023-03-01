import "./App.css";
import AddArticle from "./components/AddArticle";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import React, { useState, createContext, useEffect } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
export const UserContext = createContext();
function App() {
  const [addUSER, setADDUSER] = useState({
    firstName: "ALi",
    lastName: "Tawaha",
    age: 5,
    country: "Jordan",
    email: "ee@gmail.com",
    password: "HI",
  });
  const Navigate=useNavigate()
  const [login, setLogin] = useState({ email: "hi", password: "hello" });
  const [token, setToken] = useState(localStorage.getItem("token"));
 console.log(token)
 useEffect(()=>{
  if(token)
  {
    setIsLoggedIn(true)
    Navigate("/dashboard")
  }
 },[token])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserContext.Provider
      value={{ addUSER, setADDUSER, login, setLogin,isLoggedIn,setIsLoggedIn, token, setToken }}
    >
      <div className="App">
        <header className="App-header">
          <h1>App</h1>
        </header>
        <Navbar />
        <Routes>
        {isLoggedIn &&<> <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/addarticle" element={<AddArticle/>}/>
        <Route path="/logout" element={<Login/>}/>
        </>}
       
          <Route path="/register" element={<Register />} state={{ isLoggedIn: false }}  />
          <Route path="/login" element={<Login />} state={{ isLoggedIn: false }} />
          
  
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
