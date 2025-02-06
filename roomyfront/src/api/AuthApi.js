import createAxios from "./CreateAxios.js";

class AuthApi {
  constructor() {
    this.axios = createAxios("/oauth2");
  }

  // 카카오 로그인 URL 받아오기
  async KakaoLogin() {
    try {
      const response = await this.axios.get("/kakao/login", {
        withCredentials: false,
      });
      console.log(response.data)

      const userdata = {
        userid : response.data.id,
        accesToken: response.data.accesToken,
        username : response.data.username,
        user : response.headers
      }
      return response.data;
    } catch (error) { 
      console.error("Kakao login error:", error);
      throw error;
    }
  }
}



export default AuthApi;
