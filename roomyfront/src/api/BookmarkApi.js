import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

// 북마크 추가/삭제 토글
export const toggleBookmark = async (userId, communityId) => {
    try {
      const response = await axios.post(`${BASE_URL}/bookmarks/${userId}/${communityId}/toggle`);
      return response.data; // 북마크 여부 반환 (true/false)
    } catch (error) {
      console.error("북마크 토글 오류:", error);
      throw error;
    }
  };
  
  // 특정 유저의 북마크된 게시물 목록 조회
  export const fetchUserBookmarks = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/bookmarks/${userId}`);
      return response.data; // 북마크된 게시물 리스트 반환
    } catch (error) {
      console.error("유저 북마크 조회 오류:", error);
      return [];
    }
  };
  
  // 특정 게시물의 북마크 상태 확인
  export const fetchBookmarkStatus = async (userId, communityId) => {
    try {
      const response = await axios.get(`${BASE_URL}/bookmarks/${communityId}/user/${userId}`);
      
      return response.data; // true 또는 false 반환
    } catch (error) {
      console.error("북마크 상태 조회 오류:", error);
      return false;
    }
  };