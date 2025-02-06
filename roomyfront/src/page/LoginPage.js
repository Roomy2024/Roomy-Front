import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import AuthApi from "../api/AuthApi";

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

    // 값이 있으면 localStorage에 저장
    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
    }
    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken);
    }
    if (userId) {
      localStorage.setItem("user_id", userId);
    }

    if (accessToken || refreshToken || userId) {
      navigate("/");
    }
  }, [location, navigate]);

  const handleKakaoLogin = async () => {
    try {
      const authApi = new AuthApi();

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
