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

