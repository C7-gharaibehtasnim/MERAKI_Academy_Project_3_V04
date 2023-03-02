import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../../App";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let counter = 1;

  useEffect(() => {
    axios
      .get("http://localhost:5000/articles", {
        headers: { Authorization: `Bearer ${token}` },
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
    <div className="dashboard">
      {articles.length &&
        articles != undefined &&
        articles.map((article, i) => {
          return (
            <div className="article">
              <p id="title">{article.title}</p>
              <p id="description">{article.description}</p>
              <div className="commentsdiv">
                {article.comments.length > 0 &&
                  article.comments.map((comment, i) => {
                    return <p id="comment">{comment.comment}</p>;
                  })}

                <textarea
                  id="commenttextarea"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  placeholder="comment..."
                />
                <button
                  id="commentbtn"
                  onClick={() => {
                    CreateComment(article._id);
                  }}
                >
                  Adding comment
                </button>
              </div>
              {userId === articles[i].author && (
                <>
                <div className="Update">
           
              

                
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleShow();
                        setNeedUpdate(article._id);
                      }}
                    >
                      Update
                    </Button>

                    <Modal
                      className="popup"
                      show={show && needupdate === article._id}
                      onHide={handleClose}
                    >
                      <Modal.Header>
                        <Modal.Title>Update</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
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
                          placeholder="description"
                        />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => {
                            UpdateByID(article._id, i);
                            handleClose();
                          }}
                        >
                          Save
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    </div>
                  <button
                    id="delete"
                    onClick={(e) => {
                      DeleteByID(article._id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                  </>
              )}
            </div>
          );
        })}
    </div>
  );
 
};

export default Dashboard;
