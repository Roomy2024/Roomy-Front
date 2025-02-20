import createAxios from "./CreateAxios";

class ReportApi {
  constructor() {
    this.axios = createAxios("/report");
  }

  async reportPost(type, id, userId, reason) {
    try {
      const response = await this.axios.post(
        `/${type}/${id}`,
        { userId, reason }, 
        {
          headers: {
            Authorization: localStorage.getItem("accessToken") 
              ? `Bearer ${localStorage.getItem("accessToken")}` 
              : "",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("🚨 신고 요청 오류:", error);
      throw error;
    }
  }

  async getReportedPosts() {
    try {
      const response = await this.axios.get("/get_community", {
        headers: {
          Authorization: localStorage.getItem("accessToken") 
            ? `Bearer ${localStorage.getItem("accessToken")}` 
            : "",
        },
      });
      return response.data;
    } catch (error) {
      console.error("🚨 신고된 게시물 조회 오류:", error);
      return [];
    }
  }
}

export default new ReportApi();
