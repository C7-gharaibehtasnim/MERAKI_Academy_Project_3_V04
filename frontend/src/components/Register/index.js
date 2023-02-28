import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";

const Register = () => {
    const [response,setResponse]=useState("")
  const { addUSER, setADDUSER } = useContext(UserContext);

  const NewUser = () => {
    axios
      .post("http://localhost:5000/users/register", { ...addUSER,role })
      .then((Response) => {
   
    setResponse(Response.data.message)
      })
      .catch((err) => {
    setResponse(err.response.data.message)
  
       
      });
  };
 const role="63fe4c22fbde5ba3025ca728"

 
  return (
    <div>
      <input
        onChange={(e) => {
          setADDUSER((firstName) => {
            return { ...firstName, firstName: e.target.value };
          });
        }}
        type="text"
        placeholder="First Name"
      ></input>
      <input
        onChange={(e) => {
          setADDUSER((lastName) => {
            return { ...lastName, lastName: e.target.value };
          });
        }}
        type="text"
        placeholder="Last Name"
      ></input>
      <input
        onChange={(e) => {
          setADDUSER((age) => {
            return { ...age, age: e.target.value };
          });
        }}
        type="number"
        placeholder="Your Age"
      ></input>
      <input
        onChange={(e) => {
          setADDUSER((country) => {
            return { ...country, country: e.target.value };
          });
        }}
        type="text"
        placeholder="Your Country"
      ></input>
      <input
        onChange={(e) => {
          setADDUSER((email) => {
            return { ...email, email: e.target.value };
          });
        }}
        type="email"
        placeholder="Email"
      ></input>
      <input
        onChange={(e) => {
          setADDUSER((password) => {
            return { ...password, password: e.target.value };
          });
        }}
        type="password"
        placeholder="Password"
      ></input>
      <button
        onClick={() => {
            NewUser()
        }}
      >
        Register
      </button>
   
   {response &&  <p>{response}</p>}
    </div>
  );
};

export default Register;
