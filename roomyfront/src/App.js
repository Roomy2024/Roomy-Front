
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "./component/Header";
// import { BrowserRouter as Router } from "react-router-dom";
// import NavBar from "./component/NavBar";
// import DropDownMenu from "./component/DropDownMenu";
// import PostList from "./component/PostList";
// import CreatePostButton from "./component/CreatePostButton";
// import NotificationList from "./component/NotificationList";


// function App() {
//   const [posts, setPosts] = useState([]); //게시물 데이터를 관리하는 상태
//   const [selectedSort, setSelectedSort] = useState("최신순"); // 정렬 기준을 관리하는 상태 ("최신순" 기본값)

//   //게시물 데이터를 가져오는 함수
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         //스프링 뱍앤드에서 api에서 게시물 데이터를 가져옴
//         const response = await axios.get("http://localhost:8080/api/posts");
//         setPosts(response.data);//가져온 데이터를 상태로 설정
//       } catch (error) {
//         console.error("게시물 데이터를 가져오는 중 오류가 발생했습니다.", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const handleSort = (sortOption) => {
//     setSelectedSort(sortOption);

//     const sortedPosts = [...posts];
//     if (sortOption === "최신순") {
//       sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
//     } else if (sortOption === "좋아요순") {
//       sortedPosts.sort((a, b) => b.likes - a.likes);
//     }

//     setPosts(sortedPosts);
//   };

//   const handleCreatePost = () => {
//     alert("게시물 작성 화면으로 이동!");
//     // 여기에서 게시물 작성 화면으로 이동하거나, 모달을 열 수 있음
//   };

//   return (
//     <Router>
//       <Header />
//       <DropDownMenu selectedSort={selectedSort} onSortChange={handleSort} />
      
//       <PostList posts={posts} />
//       <CreatePostButton onClick={handleCreatePost} />
//       <NavBar />
//       <NotificationList />
//     </Router>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import NavBar from "./component/NavBar"; // NavBar 컴포넌트 가져오기
import DropDownMenu from "./component/DropDownMenu";
import PostList from "./component/PostList";
import CreatePostButton from "./component/CreatePostButton";
import NotificationList from "./component/NotificationList";

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedSort, setSelectedSort] = useState("최신순");

  // 게시물 데이터를 가져오는 함수
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("게시물 데이터를 가져오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchPosts();
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

  const handleCreatePost = () => {
    alert("게시물 작성 화면으로 이동!");
  };

  return (
    <Router>
      <Header /> {/* 모든 페이지에 공통적으로 표시되는 헤더 */}
      <Routes>
        {/* 메인 페이지 */}
        <Route
          path="/"
          element={
            <>
              <DropDownMenu selectedSort={selectedSort} onSortChange={handleSort} />
              <PostList posts={posts} />
              <CreatePostButton onClick={handleCreatePost} />
            </>
          }
        />
        {/* 알림 페이지 */}
        <Route path="/notifications" element={<NotificationList />} />
      </Routes>
      <NavBar /> {/* 모든 페이지에 공통적으로 표시되는 NavBar */}
    </Router>
  );
}

export default App;
