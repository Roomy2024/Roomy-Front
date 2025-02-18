import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import AuthApi from "../api/AuthApi";
import axios from "axios";

import "../css/LoginPage.css";
import { ReactComponent as KakaoLoginBtn } from "../asset/icon/KakaoLoginBtn.svg";
import { ReactComponent as GoogleLoginBtn } from "../asset/icon/GoogleLoginBtn.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isDeskTop = useMediaQuery({ query: "(min-width: 769px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 859px)",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    const userId = searchParams.get("userid");
    const userName = searchParams.get("username");

    if (
      accessToken &&                 // null, undefined, 빈문자열이면 false
      accessToken !== "null" &&      // 문자열 "null" 방지
      accessToken !== "undefined"    // 문자열 "undefined" 방지
    ) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      console.log("헤더 설정 완료:", axios.defaults.headers.common["Authorization"]);
    }
    if (accessToken) {
      localStorage.setItem("refresh_token", accessToken);
    }
    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken);
    }
    if (userId) {
      localStorage.setItem("user_id", userId);
    }

    if (refreshToken) {
      axios.defaults.headers.common["X-Refresh-Token"] = refreshToken;
    }
    if (userId) {
      axios.defaults.headers.common["X-User-Id"] = userId;
    }

    if (accessToken || refreshToken || userId) {
      navigate("/UserInput");
    }
  }, [location, navigate]);

  const handleKakaoLogin = async () => {
    try {
      window.location.href = "http://localhost:8000/api/oauth2/authorization/kakao";
    } catch (error) {
      console.error("Kakao Login Error:", error);
    }
  };

  return (
    <div>
      <div className="middle">
        <div>혼자서도 잘 해먹고, 잘 살고 싶다면</div>
        <div className="middle-text">
          이제 자취의 모든것을 <br />
          한곳에서 해결하세요!
        </div>
      </div>
      <div className="kakao-btn-wapper">
        <KakaoLoginBtn className="login-btn" onClick={handleKakaoLogin} />
        <GoogleLoginBtn className="login-btn" />
      </div>
    </div>
  );
};

export default LoginPage;
