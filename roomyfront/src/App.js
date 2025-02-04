import axios from 'axios';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Navigate 추가
import { useMediaQuery } from "react-responsive";
import Header from "./component/Header";
import NavBar from "./component/NavBar";
import DropDownMenu from "./component/Community/DropDownMenu";
import CreatePostButton from "./component/Community/CreatePostButton";
import PostDetail from "./component/Community/PostDetail";
import NotificationList from "./component/Community/NotificationList";
import CreatePost from "./component/Community/CreatePost";
import MyPage from "./component/MyPage/MyPage";
import ProfileChangePage from "./component/MyPage/ProfileChangePage";
import LoginPage from "./page/LoginPage";
import BookmarkPage from "./component/MyPage/BookmarkPage";

const App = () => {
  const [posts, setPosts] = useState([]); // 게시물 상태
  const [selectedSort, setSelectedSort] = useState("최신순");

  const isDesktop = useMediaQuery({ query: "(min-width:769px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // 게시물 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://43.202.98.145:8000/api/community/getall");
        setPosts(response.data);
      } catch (error) {
        console.error("게시물 데이터를 가져오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchPosts();
  }, []);

  // 게시물 추가 핸들러
  const addNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // 새 게시물을 posts 상태에 추가
  };

  // 정렬 변경 핸들러
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

  return (
    <div className="App">
      {/* Header는 모든 페이지에서 표시 */}
      <Header />

      <Routes>
        {/* 기본 경로로 /Community로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/Community" />} />

        {/* Community 경로 */}
        <Route
          path="/Community"
          element={
            <>
              <CreatePostButton />
              <DropDownMenu
                posts={posts}
                selectedSort={selectedSort}
                onSortChange={handleSort}
              />
            </>
          }
        />

        {/* CreatePost 컴포넌트에 addNewPost 전달 */}
        <Route
          path="/create-post"
          element={<CreatePost addNewPost={addNewPost} />}
        />

        {/* 다른 페이지 경로들 */}
        <Route path="/notifications" element={<NotificationList />} />
        <Route path="/" element={<DropDownMenu />} />
        <Route path="/community/:id" element={<PostDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/profile-change" element={<ProfileChangePage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/edit/:id" element={<CreatePost />} />
        <Route path="/bookmark" element={<BookmarkPage />} />
      </Routes>

      {/* NavBar는 모든 페이지에서 표시 */}
      <NavBar />
    </div>
  );
};

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
