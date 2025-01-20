import createAxios from "./CreateAxios.js";
import axios from "axios";

const MID_URL = "/auth";

class AuthApi {
    constructor() {
        this.axios = createAxios(MID_URL);
    }

    // JWT 토큰을 로컬스토리지나 쿠키에서 가져오기
    getToken() {
        return localStorage.getItem("token"); // JWT 토큰을 로컬스토리지에서 가져옴
    }

    // 카카오 로그인 요청
    async KakagoLogin() {
        try {
            const token = this.getToken(); // JWT 토큰 가져오기

            const response = await this.axios.get(
                "/kakao/login", // 백엔드의 카카오 로그인 엔드포인트
                {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "", // Authorization 헤더에 JWT 포함
                    },
                    withCredentials: false, // JWT는 쿠키를 사용하지 않음
                }
            );

            console.log(response);
            return response.data;
        } catch (error) {
            console.error("Kakao login error:", error);
            throw error;
        }
    }
}

export default AuthApi;
