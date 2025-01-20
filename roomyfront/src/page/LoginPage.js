import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mobile, DeskTop } from "../responsive/responsive";
import { useMediaQuery } from "react-responsive";
import AuthApi from "../api/AuthApi";
import "../css/LoginPage.css"
import { ReactComponent as KakaoLoginBtn } from "../asset/icon/KakaoLoginBtn.svg";
import { ReactComponent as GoogleLoginBtn } from "../asset/icon/GoogleLoginBtn.svg";


const LoginPage = () => {
    const navigate = useNavigate()

    const isDeskTop = useMediaQuery({
        query: "(min-width:769px)",
      });
      const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
      const isTablet = useMediaQuery({
        query: "(min-width: 769px) and (max-width: 859px)",
      });

      const handleKakaoLogin = async () => {
        try {
            const authApi = new AuthApi(); // AuthApi 인스턴스 생성
            const resp = await authApi.KakagoLogin(); // KakagoLogin 메서드 호출
            window.location.href = resp; // 리다이렉트
        } catch (error) {
            console.error("Kakao Login Error:", error);
        }
    };  

    return(
        <Mobile>
            <div>
                <div className="middle">
                    <div>혼자서도 잘 해먹고, 잘 살고 싶다면</div>
                    <div className="middle-text">이제 자취의 모든것을 <br></br>한곳에서 해결하세요!</div>
                </div>
                <div className="kakao-btn-wapper">
                    <KakaoLoginBtn className="login-btn" onClick={handleKakaoLogin}></KakaoLoginBtn>
                    <GoogleLoginBtn className="login-btn"></GoogleLoginBtn>
                </div>
            </div>
        </Mobile>
    )
}

export default LoginPage;
