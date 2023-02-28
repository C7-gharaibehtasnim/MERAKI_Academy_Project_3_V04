import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../../App";
const Dashboard = () => {
  const { token } = useContext(UserContext);
  const [userId, setuserid] = useState("");
  const [articles, setarticle] = useState([]);
  const [deleteResult, setDEleteResult] = useState("");
  const [updatedvalue, setUpdatedValue] = useState({
    title: "sr",
    description: "sf",
  });
  const [needupdate, setNeedUpdate] = useState("");
  const [comment, setComment] = useState("");
  let counter = 1;

  useEffect(() => {
    axios
      .get("http://localhost:5000/articles", {
        headers: { Authorization: token },
      })
      .then((Response) => {
        // console.log(Response);
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
        // console.log(result);
        setarticle(result);
        // console.log(articles);
      })
      .catch((err) => {
        setDEleteResult((current) => {
          current = err.response.data.message;
        });
      });
  };
  const UpdateByID = (id, index) => {
    axios
      .put(`http://localhost:5000/articles/${id}`, { ...updatedvalue })
      .then((response) => {
        console.log(response);

        const result = articles.map((article, i) => {
          if (article._id == id) {
            return (article = response.data.article);
          }
          return article;
        });
        console.log(result);
        setarticle(result);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  const CreateComment = (id) => {
    axios
      .post(
        `http://localhost:5000/articles/${id}/comments/`,
        { comment },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        const result = articles.map((article, i) => {
          if (article._id == id) {
            article.comments.push(response.data.comment);
          }
          return article;
        });
        console.log(result);
        setarticle(result);

        console.log(articles);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {articles &&
        articles != undefined &&
        articles.map((article, i) => {
          return (
            <>
              <p>{article.title}</p>
              <p>{article.description}</p>
              {article.comments.length > 0 &&
                article.comments.map((comment, i) => {
                  return <p>{comment.comment}</p>;
                })}
              
              <textarea
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                placeholder="comment..."
              />
              <button
                onClick={() => {
                  CreateComment(article._id);
                }}
              >
                Adding comment
              </button>
              {userId === articles[i].author && (
                <>
                  {needupdate === article._id && (
                    <>
                      {" "}
                      <input
                        onChange={(e) => {
                          setUpdatedValue((title) => {
                            return { ...title, title: e.target.value };
                          });
                        }}
                        type="text"
                        placeholder="title"
                      />
                      <textarea
                        onChange={(e) => {
                          setUpdatedValue((description) => {
                            return {
                              ...description,
                              description: e.target.value,
                            };
                          });
                        }}
                        placeholder="title"
                      />
                    </>
                  )}
                  <button
                    onClick={(e) => {
                      DeleteByID(article._id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setNeedUpdate(article._id);
                      counter++;
                      if (counter == 1) {
                        setNeedUpdate(-1);
                      }
                      console.log(counter);
                      if (counter === 2) {
                        UpdateByID(article._id, i);
                        counter = 1;
                        console.log(counter);
                      }
                    }}
                  >
                    Update
                  </button>
                </>
              )}
            </>
          );
        })}
    </div>
  );
};

export default Dashboard;
