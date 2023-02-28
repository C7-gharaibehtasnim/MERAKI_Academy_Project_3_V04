import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../../App";
const Dashboard = () => {
  const { token } = useContext(UserContext);
  const [result, setResult] = useState({articles:[],author:"1223"});
  useEffect(() => {
    axios
      .get("http://localhost:5000/articles", {
        headers: { Authorization: token },
      })
      .then((Response) => {
        console.log(Response.data)
        setResult((current) => {
          return (current.articles = Response.data);
          
        });
      })
      .catch((err) => {
        setResult((current) => {
          return (current = err.response.data.message);
        });

       
      });
  },[]);
console.log(result.userId)
console.log(result.articles.author)

  return (
    <div>
       {result.articles.map((article, i) => {
        return (
          <>
         
            <p>{article.title}</p>
            <p>{article.description}</p>
            <textarea placeholder="comment..."/>
            <button>Adding comment</button>
          {result.userId===result.articles[i].author &&
            <>
            <button>Delete</button>
            <button>Update</button>
           
            </>} 
          </>
        );
      })} 
    </div>
  );
};

export default Dashboard;
