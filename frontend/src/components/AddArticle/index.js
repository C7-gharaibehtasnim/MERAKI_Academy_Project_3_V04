import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";
const AddArticle = () => {
  const { token } = useContext(UserContext);
  const [savedata, setSaveData] = useState({
    title: "HI",
    description: "hello",
  });
  const [resultData,setResultData]=useState("")
  const CreateArticle = () => {
    axios
      .post("http://localhost:5000/articles", { ...savedata}, {headers: {Authorization: token}})
      .then((Response) => {
        setResultData((current)=>{return current=Response.data.message})
      })
      .catch((err) => {
        setResultData((current)=>{return current=err.response.data.message})

        console.log();
      });
  };

  return (
    <div>
      <input
        onChange={(e) => {
          setSaveData((title) => {
            return { ...title, title: e.target.value };
          });
        }}
        type="text"
        placeholder="Title"
      />
      <textarea
        onChange={(e) => {
          setSaveData((description) => {
            return { ...description, description: e.target.value };
          });
        }}
        placeholder="Description"
      />
      <button onClick={()=>{CreateArticle()}}>Create New Article</button>
  <p>{resultData}</p>
    </div>
  );
};

export default AddArticle;
