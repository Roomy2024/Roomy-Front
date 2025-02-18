
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/comments",
  headers: {
    "Content-Type": "application/json",
  },
});

// 댓글 가져오기
export const fetchCommentsByCommunityId = async (communityId) => {
  try {
    const response = await axiosInstance.get(`/community/${communityId}`);
    console.log(`댓글 데이터 가져오기 성공:`, response.data);

    // `createdAt`이 없는 경우 현재 시간으로 기본값 설정
    const commentsWithTime = response.data.map(comment => ({
      ...comment,
      createdAt: comment.createdAt || new Date().toISOString(),
    }));

    return commentsWithTime;
  } catch (error) {
    console.error(`댓글 데이터를 가져오는 중 오류 발생:`, error);
    throw error;
  }
};


export const addComment = async (communityId, userId, content) => {
  try {
    // JSON 데이터를 API에 전송
    const response = await axiosInstance.post("/create", {
      communityId, // API 요구 필드
      userId,      // 사용자 ID
      content,     // 댓글 내용
    });

    return response.data; // 서버에서 반환된 응답 데이터
  } catch (error) {
    console.error("댓글 추가 중 오류 발생:", error);
    throw error;
  }
};


export const addReply = async (commentId, userId, content) => {
  try {
    const response = await axiosInstance.post(`/reply`, {
      commentId, // 대댓글을 달 대상 댓글 ID
      userId,    // 작성자 ID
      content    // 대댓글 내용
    });

    console.log(`✅ 대댓글 추가 성공:`, response.data);
    return response.data;
  } catch (error) {
    console.error(` 대댓글 추가 중 오류 발생:`, error);

    if (error.response) {
      console.error(" 서버 응답 상태 코드:", error.response.status);
      console.error(" 서버 응답 데이터:", error.response.data);
    }
    
    throw error;
  }
};


