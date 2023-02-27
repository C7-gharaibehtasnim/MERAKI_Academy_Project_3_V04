import "./App.css";
import AddArticle from "./components/AddArticle";
import Register from "./components/Register"
import React ,{useState,createContext} from "react";
import { Routes, Route, Link } from "react-router-dom";
export const UserContext=createContext()
function App() {
 
  const[addUSER,setADDUSER]=useState({firstName:"ALi",lastName:"Tawaha",age:5,country:"Jordan",email:"ee@gmail.com",password:"HI"})
  return (
    
  <UserContext.Provider value={{addUSER,setADDUSER}}>
    <div className="App">
      <header className="App-header">
        <h1>App</h1>
      </header>
      <Routes>
      <Route path="/register" element={ <Register/>} /> 
     
      </Routes>
    </div>
  
    </UserContext.Provider>
  
     
  );
}

export default App;
