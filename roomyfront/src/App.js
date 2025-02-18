import axios from 'axios';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate , useLocation } from "react-router-dom"; // Navigate 추가
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
import UserInputPage from './page/UserInputPage';

const App = () => {
  
  const [posts, setPosts] = useState([]); // 게시물 상태
  const [selectedSort, setSelectedSort] = useState("최신순");

  const isDesktop = useMediaQuery({ query: "(min-width:769px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const location = useLocation()
  const hideHeaderNavPaths = ["/loginpage" , "/UserInput"]
  const shouldHideHeaderNav = hideHeaderNavPaths.includes(location.pathname)


  

  // 정렬 변경 핸들러
  

  return (
    <div className="App">
      { !shouldHideHeaderNav && <Header /> }
      <Routes>   
        <Route path="/notifications" element={<NotificationList />} />
        <Route path="/community/:id" element={<PostDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/profile-change" element={<ProfileChangePage />} />
        <Route path="/loginPage" element={<LoginPage></LoginPage>}></Route>
        <Route path="/edit/:id" element={<CreatePost />} />
        <Route path="/bookmark" element={<BookmarkPage />} />
        <Route path="/UserInput" element ={<UserInputPage/>} />
      </Routes>
      { !shouldHideHeaderNav && <NavBar /> }
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
