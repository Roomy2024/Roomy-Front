import createAxios from "./CreateAxios";

class ReportApi {
  constructor() {
    this.axios = createAxios("/report");
  }

  // 📌 게시물 신고 API (백엔드에 맞게 수정)
  async reportPost(type, id, userId, reason) {
    try {
      const response = await this.axios.post(`/${type}/${id}`, {
        userId,
        reason, // ✅ 백엔드에 신고 사유 전달
      });
      return response.data;
    } catch (error) {
      console.error("🚨 신고 요청 오류:", error);
      throw error;
    }
  }

  // 📌 신고된 게시물 조회 (관리자 확인용)
  async getReportedPosts() {
    try {
      const response = await this.axios.get("/get_community"); // ✅ 백엔드 경로에 맞춤
      return response.data;
    } catch (error) {
      console.error("🚨 신고된 게시물 조회 오류:", error);
      return [];
    }
  }
}

export default new ReportApi();
