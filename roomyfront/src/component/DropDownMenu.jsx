// import React, { useState } from "react";
// import "../css/DropDownMenu.css";

// const DropDownMenu = ({ selectedSort, onSortChange }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState("게시판");

//   const menuItems = ["게시판", "꿀팁", "레시피"];
//   const sortOptions = ["최신순", "좋아요순"];

//   return (
//     <div className="dropdown-container">
//       {/* 드롭다운 메뉴 */}
//       <div className="menu-container">
//         <button
//           className={`dropdown-button ${isMenuOpen ? "open" : ""}`}
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           {selectedItem}
//         </button>
//         <div className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
//           {menuItems.map((item) => (
//             <div
//               key={item}
//               className="dropdown-item"
//               onClick={() => {
//                 setSelectedItem(item);
//                 setIsMenuOpen(false);
//               }}
//             >
//               {item}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 정렬 버튼 */}
//       <div className="sort-container">
//         {sortOptions.map((option) => (
//           <label key={option} style={{ marginLeft: "10px" }}>
//             <input
//               type="radio"
//               name="sort"
//               value={option}
//               checked={selectedSort === option}
//               onChange={() => onSortChange(option)}
//             />
//             {option}
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DropDownMenu;








import React, { useState, useEffect } from "react";
import "../css/DropDownMenu.css";
import PostList from "./PostList";


const DropDownMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("게시판");
  const [selectedSort, setSelectedSort] = useState("최신순");
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const examplePosts = [
        {
          id: 1,
          username: "김재현",
          timeAgo: "5분 전",
          title: "인생이 힘들어요",
          content: "퓨항항항항항항항항",
          likes: 9,
          comments: 10,
          date: "2024-12-20T15:30:00",
          imageUrl: "https://via.placeholder.com/100",
        },
        {
          id: 2,
          username: "박준희",
          timeAgo: "10분 전",
          title: "오늘 날씨 좋다",
          content: "햇살이 따뜻하네요.",
          likes: 12,
          comments: 5,
          date: "2024-12-19T14:00:00",
          imageUrl: "https://via.placeholder.com/100",
        },
        {
          id: 3,
          username: "안승현",
          timeAgo: "1시간 전",
          title: "오늘은 운세가 좋아요!!",
          content: "하면 된다!!",
          likes: 15,
          comments: 8,
          date: "2024-12-21T09:00:00",
          imageUrl: "https://via.placeholder.com/100",
        },
        
      ];
      setPosts(examplePosts);
    };

    fetchData();
  }, []);

  const handleSort = (sortOption) => {
    setSelectedSort(sortOption);

    const sortedPosts = [...posts];
    if (sortOption === "최신순") {
      sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === "좋아요순") {
      sortedPosts.sort((a, b) => b.likes - a.likes);
    }

    setPosts(sortedPosts);
  };

  const menuItems = ["게시판", "꿀팁", "레시피"];
  const sortOptions = ["최신순", "좋아요순"];

  return (
    <div className="dropdown-container">
      {/* 드롭다운 메뉴 */}
      <div className="menu-container">
        <button
          className={`dropdown-button ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {selectedItem}
        </button>
        <div className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
          {menuItems.map((item) => (
            <div
              key={item}
              className="dropdown-item"
              onClick={() => {
                setSelectedItem(item);
                setIsMenuOpen(false);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* 정렬 버튼 */}
      <div className="sort-container">
        {sortOptions.map((option) => (
          <label key={option} style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              name="sort"
              value={option}
              checked={selectedSort === option}
              onChange={() => handleSort(option)}
            />
            {option}
          </label>
        ))}
      </div>

      {/* 게시물 목록 */}
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-info">
              <div className="post-title">{post.title}</div>
              <div className="post-content">{post.content}</div>
              <div className="post-meta">
                {post.username} · {post.timeAgo}
              </div>
              <div className="post-actions">
                <div>❤️ {post.likes}</div>
                <div>💬 {post.comments}</div>
              </div>
            </div>
            <img
              className="post-image"
              src={post.imageUrl}
              alt={`${post.title}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropDownMenu;
