import axios from "axios";

// const axiosInstance = createAxios("/community");

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/community",
  // baseURL: "http://192.168.0.33:8000/api/community",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const fetchPosts = async () => {
  try {
    const response = await axiosInstance.get("/getall");

    // 게시물 목록에 첫 번째 이미지 URL 추가
    const postsWithImages = response.data.map((post) => ({
      ...post,
      imageUrl: post.imageUrls?.[0]
        ? `http://localhost:8000/api/${post.imageUrls[0]}` // 첫 번째 이미지 URL 가공
        : "", // 이미지가 없는 경우 빈 문자열
    }));

    return postsWithImages; // 가공된 데이터를 반환
  } catch (error) {
    console.error("게시물 목록 가져오기 중 오류:", error);
    throw error;
  }
};

// 게시물 생성 (에러 처리 추가)
export const createPost = async (PostData) => {
  try {
    const response = await axiosInstance.post("/create", PostData);
    return response.data;
  } catch (error) {
    console.error("게시물 생성 중 오류:", error);
    throw error;
  }
};

// export const fetchPostById = async (communityId) => {
//   try {
//     const response = await axiosInstance.get(`/${communityId}`); // communityId를 URL에 포함
//     console.log(
//       `게시물(${communityId}) 상세 데이터 가져오기 성공:`,
//       response.data
//     );
//     return response.data;
//   } catch (error) {
//     console.error(
//       `게시물(${communityId}) 상세 데이터를 가져오는 중 오류 발생:`,
//       error
//     );
//     throw error;
//   }
// };

export const fetchPostById = async (communityId) => {
  try {
    const response = await axiosInstance.get(`/${communityId}`); // API 호출
    console.log(`게시물(${communityId}) 상세 데이터 가져오기 성공:`, response.data);

    // 경로 가공: imageUrls가 존재할 경우, 최대 15개 URL만 추가
    const postData = {
      ...response.data,
      imageUrls: response.data.imageUrls?.slice(0, 15).map(
        (url) => `http://localhost:8000/api${url}` // URL 가공
      ),
    };

    console.log("가공된 Post Data:", postData);
    return postData; // 가공된 데이터를 반환
  } catch (error) {
    console.error(
      `게시물(${communityId}) 상세 데이터를 가져오는 중 오류 발생:`,
      error
    );
    throw error;
  }
};





// 게시물 삭제 (에러 처리 추가)
export const deletePost = async (postId) => {
  try {
    const response = await axiosInstance.delete(`/delete/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`게시물(${postId}) 삭제 중 오류:`, error);
    throw error;
  }
};

// 좋아요 토글 API 호출
// ? 파라미터가 많을 경우 객체로 받으면 순서 실수로 인한 버그 발생 방지 가능
// export const toggleLikePost = async ({ type, id, userId }) => {
//   try {
//     // 좋아요 토글 요청
//     const response = await axiosInstance.post(
//       `/likes/${type}/${id}/like-toggle`,
//       null,
//       // * 쿼리 파라미터로 유저 아이디 전달
//       {
//         params: { userId },
//       }
//     );

//     // 서버에서 반환된 데이터 (isLiked: 좋아요 여부, likes: 좋아요 수)
//     const { isLiked, likes } = response.data;

//     // 데이터 리턴
//     return { isLiked, likes };
//   } catch (error) {
//     console.error("좋아요 토글 요청 중 오류 발생:", error);

//     // 서버 응답이 없거나 상태 코드를 확인
//     if (error.response) {
//       console.error("응답 상태 코드:", error.response.status);
//       console.error("응답 데이터:", error.response.data);
//     }

//     throw error;
//   }
// };
export const toggleLikePost = async ({ type, id, userId, isLiked }) => {
  try {
    // API URL 정의
    const url = `http://localhost:8000/api/likes/${type}/${id}/like-toggle`;

    // 좋아요 토글 요청
    const response = await axiosInstance.post(
      url,
      { isLiked }, // 좋아요 상태를 본문에 전달
      { params: { userId } } // 사용자 ID를 쿼리 파라미터로 전달
    );

    // 서버에서 반환된 데이터 (isLiked: 좋아요 여부, likes: 좋아요 수)
    const { isLiked: updatedIsLiked, likes } = response.data;

    // 데이터 리턴
    return { isLiked: updatedIsLiked, likes };
  } catch (error) {
    console.error("좋아요 토글 요청 중 오류 발생:", error);

    // 서버 응답이 없거나 상태 코드를 확인
    if (error.response) {
      console.error("응답 상태 코드:", error.response.status);
      console.error("응답 데이터:", error.response.data);
    }

    throw error;
  }
};






// 좋아요 상태 확인 API 호출
export const checkIsLiked = async (type, id) => {
  try {
    // 좋아요 여부 확인 요청
    const response = await axiosInstance.get(
      `http://localhost:8000/api/likes/${type}/${id}/is-liked` // URL 경로에 기본 API 주소 포함
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


export const getLikeCount = async (type, id) => {
  try {
    // 좋아요 수 확인 요청
    const response = await axiosInstance.get(`/likes/${type}/${id}/count`); // 경로 수정
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

