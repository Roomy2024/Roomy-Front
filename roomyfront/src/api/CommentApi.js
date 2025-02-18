import createAxios from "./CreateAxios"; // ✅ CreateAxios.js에서 가져오기

class CommentApi {
  constructor() {
    this.axios = createAxios("/comments");
  }

  // 📌 특정 커뮤니티의 댓글 가져오기
  // async fetchCommentsByCommunityId(communityId) {
  //   try {
  //     const response = await this.axios.get(`/community/${communityId}`);
  //     console.log("✅ 댓글 데이터 가져오기 성공:", response.data);

  //     // `createdAt`이 없는 경우 현재 시간으로 기본값 설정
  //     return response.data.map((comment) => ({
  //       ...comment,
  //       createdAt: comment.createdAt || new Date().toISOString(),
  //     }));
  //   } catch (error) {
  //     console.error("❌ 댓글 데이터를 가져오는 중 오류 발생:", error);
  //     throw error;
  //   }
  // }

  async fetchCommentsByCommunityId(communityId) {
    try {
      const response = await this.axios.get(`/community/${communityId}`);
      console.log("✅ 댓글 데이터 가져오기 성공:", response.data);
  
      return response.data.map((comment, index) => ({
        ...comment,
        id: comment.id || `comment-${index}`, // ✅ id가 없으면 index를 key로 사용
        replies: (comment.replies || []).map((reply, rIndex) => ({
          ...reply,
          id: reply.id || `reply-${comment.id}-${rIndex}`, // ✅ 대댓글도 고유한 key 보장
        })),
        createdAt: comment.createdAt || new Date().toISOString(),
      }));
    } catch (error) {
      console.error("❌ 댓글 데이터를 가져오는 중 오류 발생:", error);
      throw error;
    }
  }


  // 📌 댓글 추가
  async addComment(communityId, userId, content) {
    try {
      const response = await this.axios.post("/create", {
        communityId, // API 요구 필드
        userId, // 사용자 ID
        content, // 댓글 내용
      });
      return response.data;
    } catch (error) {
      console.error("❌ 댓글 추가 중 오류 발생:", error);
      throw error;
    }
  }

  // 📌 대댓글 추가
  async addReply(commentId, userId, content) {
    try {
      const response = await this.axios.post("/reply", {
        commentId, // 대댓글을 달 대상 댓글 ID
        userId, // 작성자 ID
        content, // 대댓글 내용
      });

     
      return response.data;
    } catch (error) {
      console.error("❌ 대댓글 추가 중 오류 발생:", error);

      if (error.response) {
        console.error("📌 서버 응답 상태 코드:", error.response.status);
        console.error("📌 서버 응답 데이터:", error.response.data);
      }

      throw error;
    }
  }
}

export default new CommentApi();
