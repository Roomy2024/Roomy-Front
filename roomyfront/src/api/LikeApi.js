import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://43.202.98.145:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});



// export const toggleLikePost = async ({ type, id, userId, isLiked }) => {
//     try {
//       // API URL 정의
//       const url = `http://43.202.98.145:8000/api/likes/${type}/${id}/like-toggle`;
  
//       // 좋아요 토글 요청
//       const response = await axiosInstance.post(
//         url,
//         { isLiked }, // 좋아요 상태를 본문에 전달
//         { params: { userId } } // 사용자 ID를 쿼리 파라미터로 전달
//       );
  
//       // 서버에서 반환된 데이터 (isLiked: 좋아요 여부, likes: 좋아요 수)
//       const { isLiked: updatedIsLiked, likes } = response.data;
  
//       // 데이터 리턴
//       return { isLiked: updatedIsLiked, likes };
//     } catch (error) {
//       console.error("좋아요 토글 요청 중 오류 발생:", error);
  
//       // 서버 응답이 없거나 상태 코드를 확인
//       if (error.response) {
//         console.error("응답 상태 코드:", error.response.status);
//         console.error("응답 데이터:", error.response.data);
//       }
  
//       throw error;
//     }
//   };
  

// 좋아요 토글 API
export const toggleLikePost = async ({ communityId, userId }) => {
  try {
    if (!communityId) {
      console.error("❌ toggleLikePost에서 communityId가 undefined 입니다.");
      return;
    }

    console.log("🔍 API 호출 - communityId:", communityId, "userId:", userId);
    
    const url = `/likes/${communityId}/like-toggle`;
    const response = await axiosInstance.post(url, {}, { params: { userId } });

    const { isLiked: updatedIsLiked, likes } = response.data;
    return { isLiked: updatedIsLiked, likes };
  } catch (error) {
    console.error("좋아요 토글 요청 중 오류 발생:", error);
    if (error.response) {
      console.error("응답 상태 코드:", error.response.status);
      console.error("응답 데이터:", error.response.data);
    }
    throw error;
  }
};


  // 좋아요 상태 확인 API 호출
  export const checkIsLiked = async (communityid) => {
    try {
      // 좋아요 여부 확인 요청
      const response = await axiosInstance.get(
        `http://43.202.98.145:8000/api/likes/${communityid}/is-liked` // URL 경로에 기본 API 주소 포함
      );
  
      // 서버에서 반환된 좋아요 여부 데이터
      const { isLiked } = response.data;
  
      // 좋아요 여부 반환
      return isLiked;
    } catch (error) {
      console.error("좋아요 상태 확인 중 오류 발생:", error);
  
      // 서버 응답이 없거나 상태 코드를 확인
      if (error.response) {
        console.error("응답 상태 코드:", error.response.status);
        console.error("응답 데이터:", error.response.data);
      }
  
      throw error;
    }
  };
  
  
  export const getLikeCount = async (communityid) => {
    try {
      // 좋아요 수 확인 요청
      const response = await axiosInstance.get(`/likes/${communityid}/count`); // 경로 수정
      // 서버에서 반환된 데이터 구조에서 count 추출
      const { count } = response.data;
  
      // 좋아요 수 반환
      return count;
    } catch (error) {
      console.error("좋아요 수 확인 중 오류 발생:", error);
  
      // 서버 응답이 없거나 상태 코드를 확인
      if (error.response) {
        console.error("응답 상태 코드:", error.response.status);
        console.error("응답 데이터:", error.response.data);
      }
  
      throw error;
    }
  };

  