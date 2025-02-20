import axios from "axios";

const createAxios = (middlePath = "") => {
    const token = localStorage.getItem("accessToken"); // 로컬스토리지나 쿠키에 저장된 JWT 토큰 가져오기
    const instance = axios.create({
        // baseURL: `http://43.202.98.145:8000/api${middlePath}`,
        baseURL: `http://localhost:8000/api${middlePath}`,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "", // Authorization 헤더에 JWT 추가
        },
        withCredentials: false, // JWT는 쿠키 인증과 다르게 설정
    });

    // 응답 인터셉터 추가
  instance.interceptors.response.use(
    response => response, // 응답이 성공적일 경우 그대로 반환
    error => {
        if (error.response && error.response.status === 401) {
            // 401 Unauthorized 상태 코드가 반환되면 로그인 페이지로 리다이렉트
            window.location.href = 'http://localhost:3000/login'; // 프론트엔드 로그인 페이지 URL
          }
      return Promise.reject(error); // 오류를 프로미스 체인으로 전달
    }
  );

  return instance;

}

export default createAxios;
