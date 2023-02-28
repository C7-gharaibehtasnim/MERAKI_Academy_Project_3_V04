import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../../App";
const Dashboard = () => {
  const { token } = useContext(UserContext);
  const [userId, setuserid] = useState("");
  const [articles, setarticle] = useState([]);
  const [deleteResult, setDEleteResult] = useState("");
  const []

  useEffect(() => {
    axios
      .get("http://localhost:5000/articles", {
        headers: { Authorization: token },
      })
      .then((Response) => {
        console.log(Response);
        setuserid(Response.data.userId);
        setarticle(Response.data.articles);
      })
      .catch((err) => {
        setarticle(err.response.data.message);
      });
  }, []);

  const DeleteByID = (id) => {
    axios
      .delete(`http://localhost:5000/articles/${id}`)
      .then((Response) => {
        setDEleteResult((current) => {
          current = Response.data.message;
        });

        const result = articles.filter((article) => article._id != id);
        console.log(result);
        setarticle(result);
        console.log(articles);
      })
      .catch((err) => {
        setDEleteResult((current) => {
          current = err.response.data.message;
        });
      });
  };
  const UpdateByID = (id) => {
    axios.put(`http://localhost:5000/articles/${id}`).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      {console.log(articles)}
      {articles && articles !=undefined &&
        articles.map((article, i) => {
          return (
            <>
              <p>{article.title}</p>
              <p>{article.description}</p>
              <textarea placeholder="comment..." />
              <button>Adding comment</button>
              {userId === articles[i].author && (
                <>
                  <input type="text" value={article.title} />
                  <textarea value={article.description} />
                  <button
                    onClick={(e) => {
                      DeleteByID(article._id);
                    }}
                  >
                    Delete
                  </button>
                  <button>Update</button>
                </>
              )}
            </>
          );
        })}
    </div>
  );
};

export default Dashboard;
