

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "./component/Header";
// import { BrowserRouter as Router } from "react-router-dom";
// import NavBar from "./component/NavBar";
// import DropDownMenu from "./component/DropDownMenu";
// import PostList from "./component/PostList";
// import CreatePostButton from "./component/CreatePostButton";

// function App() {
//   const [posts, setPosts] = useState([]); // 게시물 데이터 상태
//   const [selectedSort, setSelectedSort] = useState("최신순"); // 정렬 상태

//   // 스프링 백엔드에서 데이터 가져오기
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/posts"); // 스프링 API 호출
//         setPosts(response.data); // 데이터 설정
//       } catch (error) {
//         console.error("게시물 데이터를 가져오는 중 오류가 발생했습니다.", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // 정렬 로직
//   const handleSort = (sortOption) => {
//     setSelectedSort(sortOption); // 정렬 기준 업데이트

//     // 정렬 로직
//     const sortedPosts = [...posts]; // 원본 배열 복사
//     if (sortOption === "최신순") {
//       sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date)); // 최신순 정렬
//     } else if (sortOption === "좋아요순") {
//       sortedPosts.sort((a, b) => b.likes - a.likes); // 좋아요순 정렬
//     }

//     setPosts(sortedPosts); // 정렬된 데이터 상태 업데이트
//   };

//   return (
//     <Router>
//       <Header />

//       {/* DropDownMenu에 정렬 핸들러와 선택된 정렬 기준 전달 */}
//       <DropDownMenu
//         selectedSort={selectedSort}
//         onSortChange={handleSort}
//       />

//       {/* PostList에 정렬된 게시물 전달 */}
//       <PostList posts={posts} />
//       <CreatePostButton onClick={handleCreatePost} />
//       <NavBar />
//     </Router>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./component/Header";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./component/NavBar";
import DropDownMenu from "./component/DropDownMenu";
import PostList from "./component/PostList";
import CreatePostButton from "./component/CreatePostButton";

//d
function App() {
  const [posts, setPosts] = useState([]); //게시물 데이터를 관리하는 상태
  const [selectedSort, setSelectedSort] = useState("최신순"); // 정렬 기준을 관리하는 상태 ("최신순" 기본값)

  //게시물 데이터를 가져오는 함수
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        //스프링 뱍앤드에서 api에서 게시물 데이터를 가져옴
        const response = await axios.get("http://localhost:8080/api/posts");
        setPosts(response.data);//가져온 데이터를 상태로 설정
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
    // 여기에서 게시물 작성 화면으로 이동하거나, 모달을 열 수 있음
  };

  return (
    <Router>
      <Header />
      <DropDownMenu selectedSort={selectedSort} onSortChange={handleSort} />
      
      <PostList posts={posts} />
      <CreatePostButton onClick={handleCreatePost} />
      <NavBar />
    </Router>
  );
}

export default App;
