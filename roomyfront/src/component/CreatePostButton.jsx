import React from "react";
import "../css/CreatePostButton.css";

const CreatePostButton = ({ onClick }) => {
  return (
    <button className="create-post-button" onClick={onClick}>
      <i className="icon-pencil"></i>
    </button>
  );
};

export default CreatePostButton;
