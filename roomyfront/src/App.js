
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from './component/Header';
import { BrowserRouter as Router, Routes ,  Route,useLocation,
} from 'react-router-dom';
import NavBar from './component/NavBar';
import LoginPage from './page/LoginPage'; 
import Login from './component/Login';
import { useMediaQuery } from "react-responsive";
import { UserProvider } from "./api/UserContext";

function App() {
  const location = useLocation();
  const isDeskTop = useMediaQuery({
    query: "(min-width:769px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const showNavbarPaths = ["/","/home", "/schedule", "/map", "/mypage"];
  const showNavbarWebPaths = [
    "/",
    "/home"
  ]
    return (
      
      <div className='App'>
        {showNavbarPaths.includes(location.pathname) && isMobile && (
          <>
            <Header />
            <NavBar />
          </>
        )}        
        <Routes>
          <Route path="/loginPage" element={<LoginPage></LoginPage>}></Route>
        </Routes>
      </div>
      
    );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}