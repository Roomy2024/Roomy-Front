import axios from 'axios';
import React, { useEffect, useContext } from "react";
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
import { PostProvider, PostContext } from "./context/PostContext";


const App = () => {
  const { posts, setPosts, selectedSort, handleSort, addNewPost } = useContext(PostContext); // ✅ setPosts 추가

  const isDesktop = useMediaQuery({ query: "(min-width:769px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });


  return (
    <div className="App">
      {/* Header는 모든 페이지에서 표시 */}
      <Header />

      <Routes>
        {/* 기본 경로로 /Community로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/community" />} />

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
        <Route path="/loginPage" element={<LoginPage></LoginPage>}></Route>
        <Route path="/bookmark" element={<BookmarkPage />} />
      </Routes>

      {/* NavBar는 모든 페이지에서 표시 */}
      <NavBar />
    </div>
  );
};

export default function AppWrapper() {
  return (
    <PostProvider>
    <Router>
      <App />
    </Router>
    </PostProvider>
  );
}
