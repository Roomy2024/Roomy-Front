// MyPageApi.js

import createAxios from "./CreateAxios";

class MyPageApi {
  constructor() {
    this.axios = createAxios();
  }

  // 로그아웃 API
  async logout() {
    try {
      const response = await this.axios.post("/logout");
      localStorage.removeItem("accessToken"); // 토큰 삭제
      localStorage.removeItem("user_id"); // 사용자 ID 삭제
      return response.data;
    } catch (error) {
      console.error("로그아웃 실패:", error);
      throw error;
    }
  }

  // 회원탈퇴 API
  async deleteAccount() {
    try {
      const response = await this.axios.delete("/user/delete-account");
      localStorage.clear(); // 모든 데이터 삭제
      return response.data;
    } catch (error) {
      console.error("회원탈퇴 실패:", error);
      throw error;
    }
  }
    // 사용자 프로필 정보 가져오기
    async fetchUserProfile() {
        try {
          const response = await this.axios.get("/user/profile");
          return response.data;
        } catch (error) {
          console.error("사용자 정보 가져오기 실패:", error);
          throw error;
        }
      }
}

export default new MyPageApi();
