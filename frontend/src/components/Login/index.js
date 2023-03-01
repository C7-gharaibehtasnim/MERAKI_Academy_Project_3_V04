import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const { login, setLogin, isLoggedIn, setIsLoggedIn, token, setToken } =
    useContext(UserContext);
  const LoginFunc = () => {
    axios
      .post("http://localhost:5000/users/login", { ...login })
      .then((Response) => {
        setIsLoggedIn((current) => {
          return !current;
        });
        setToken((current) => {
          
          return (current = Response.data.token);
         
        });
        localStorage.setItem("token",Response.data.token)
        Navigate("/dashboard")
        console.log(Response.data);
      })
      .catch((err) => {
        setLoginError(err.response.data.message);
      });
  };
  return (
    <div className="register">
      <input
        onChange={(e) =>
          setLogin((email) => {
            return { ...email, email: e.target.value };
          })
        }
        type="email"
        placeholder="Email"
      />
      <input
        onChange={(e) =>
          setLogin((password) => {
            return { ...password, password: e.target.value };
          })
        }
        type="password"
        placeholder="Password"
      />
      <button
        onClick={() => {
          console.log(login);
          LoginFunc();
        }}
      >
        Login
      </button>
      {loginError && <p>{loginError}</p>}
    </div>
  );
};

export default Login;
