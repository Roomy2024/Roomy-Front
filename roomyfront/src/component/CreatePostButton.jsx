// import React from "react";
// import "../css/CreatePostButton.css";



// const CreatePostButton = ({ onClick }) => {
//   return (
//     <button className="create-post-button" onClick={onClick}>
//       <i className="icon-pencil"></i>
//     </button>
//   );
// };

// export default CreatePostButton;



import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/CreatePostButton.css";

const CreatePostButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="create-post-button"
      onClick={() => navigate("/create-post")}
    >
      <i className="icon-pencil"></i>
    </button>
  );
};

export default CreatePostButton;
