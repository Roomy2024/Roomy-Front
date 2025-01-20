import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/CreatePostButton.css";
import penIcon from "../assets/images/pen.png"; // pen.png 이미지 경로

const CreatePostButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="create-post-button"
      onClick={() => navigate("/create-post")}
    >
      <img src={penIcon} alt="Create Post" className="pen-icon" />
    </button>
  );
};

export default CreatePostButton;
