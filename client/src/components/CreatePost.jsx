import { useState } from "react";
import { useForm } from "react-hook-form";
import "./CreatePost.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

export default function App() {
  const navigate = useNavigate();

  const URL = `http://localhost:3030/api/items`;
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const onSubmit = async (data) => {
    setResult(JSON.stringify(data));
    await axios
      .post(URL, data)
      .catch((err) => console.log(err.massage))
      .then(navigate("../thank"));
  };

  return (
    <>
      <Typography
      variant="h6"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
        }}
      >
      
        Please fill the following form in order for us to help:
        
      </Typography>
      <br/>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div style={{ width: "500px" }}>
          <input {...register("name")} placeholder="your name" />

          <select {...register("currClass")} required>
            <option value="">Select a Class</option>
            <option value={9}>9th Grade</option>
            <option value={10}>10th Grade</option>
            <option value={11}>11th Grade</option>
            <option value={12}>12th Grade</option>
          </select>
          <select {...register("responsibilityId")} required>
            <option value="">Select a Teacher</option>
            <option value="1">Doron Freeman</option>
            <option value="2">Itay Yafti</option>
            <option value="3">Avi Ron</option>
          </select>
          <textarea
            rows="10"
            {...register("content")}
            placeholder="Content"
            required
          />
          <p>{result}</p>
          <input type="submit" />
        </div>
      </form>
    </>
  );
}
