import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBookBible, faComment, faLocation, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";


const Login = (socialtype) => {
    const REST_API_KEY = '';
    const REDIRECT_URI = '';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const loginHandler = () => {
        window.location.href = link;
    }

    // const KaKaoLogin = async() => {
    //     const resp = await AuthApi.KaKaoLogin();  
    //     window.location.href = resp;
    // }

    return(
        <button type = "button" onClick={loginHandler}>
            카카오 로그인 하기
        </button>
    )
}

export default Login;