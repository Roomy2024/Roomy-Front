
import createAxios from "./CreateAxios"; 

class LikeApi {
  constructor() {
    this.axios = createAxios("/likes");
  }

  // 좋아요 토글 API
  async toggleLikePost(communityId, userId) {
    if (!communityId || !userId) {
      console.error("좋아요 토글 오류: communityId 또는 userId가 비어 있음", { communityId, userId });
      return { isLiked: false, likes: 0 };
    }
  
    try {
      console.log("좋아요 API 호출:", { communityId, userId });
  
      const response = await this.axios.post(`/${communityId}/like-toggle`, {}, { params: { userId } });
  
      // 🔥 응답 구조 확인
      console.log("📌 좋아요 API 응답:", response);
  
      if (!response.data || typeof response.data !== "object") {
        console.error("좋아요 API 응답이 예상과 다릅니다:", response);
        return { isLiked: false, likes: 0 };
      }
  
      // ✅ 응답 데이터 구조 변경 처리
      if (typeof response.data.isLiked === "undefined" || typeof response.data.likes === "undefined") {
        console.warn("⚠️ API 응답 데이터가 예상과 다름, 변환 시도:", response.data);
  
        // 🚀 응답이 `{ data: 1 }` 형식일 경우 강제 변환 (추정)
        return { isLiked: response.data.data === 1, likes: 0 };
      }
  
      return response.data;
    } catch (error) {
      console.error("좋아요 토글 요청 중 오류 발생:", error);
      return { isLiked: false, likes: 0 };
    }
  }
  

  // 현재 사용자의 좋아요 상태 확인
  async checkIsLiked(communityId, userId) {
    try {
      const response = await this.axios.get(`/${communityId}/is-liked`, { params: { userId } });
      return response.data.isLiked;
    } catch (error) {
      console.error("좋아요 상태 확인 중 오류 발생:", error);
      return false;
    }
  }

  // 좋아요 개수 조회 API
  async getLikeCount(communityId) {
    try {
      const response = await this.axios.get(`/${communityId}/count`);
      return response.data.count ?? 0;
    } catch (error) {
      console.error("좋아요 개수 조회 중 오류 발생:", error);
      return 0;
    }
  }
}

export default new LikeApi();
