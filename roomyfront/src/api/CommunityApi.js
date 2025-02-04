import axios from "axios";

// const axiosInstance = createAxios("/community");

const axiosInstance = axios.create({
  baseURL: "http://43.202.98.145:8000/api/community",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});


const fixImageUrl = (url) => {
  if (!url) return ""; 
  if (url.startsWith("http")) return url;  // 이미 절대 URL이면 그대로 반환
  return `http://43.202.98.145:8000/api/${url}`; // 상대 URL일 경우만 가공
};

export const fetchPosts = async () => {
  try {
    const response = await axiosInstance.get("/getall");

    const postsWithImagesAndLikes = response.data.map((post) => ({
      ...post,
      imageUrls: post.imageUrls?.map((url) => fixImageUrl(url)) || [], // 모든 이미지 URL 가공
      imageUrl: post.imageUrls?.length ? fixImageUrl(post.imageUrls[0]) : "", // 첫 번째 이미지만 대표 이미지로 사용
      likes: post.likes || 0, 
      comments: post.comments || 0,
    }));

    return postsWithImagesAndLikes;
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
//     const response = await axiosInstance.get(`/${communityId}`);

//     console.log(`게시물(${communityId}) 상세 데이터 가져오기 성공:`, response.data);

//     const postData = {
//       ...response.data,
//       imageUrls: response.data.imageUrls?.slice(0, 15).map((url) => fixImageUrl(url)) || [],
//     };

//     console.log("가공된 Post Data:", postData);
//     return postData;
//   } catch (error) {
//     console.error(`게시물(${communityId}) 상세 데이터를 가져오는 중 오류 발생:`, error);
//     throw error;
//   }
// };


export const fetchPostById = async (communityId) => {
  try {
    const response = await axiosInstance.get(`/${communityId}`);

    console.log(`게시물(${communityId}) 상세 데이터 가져오기 성공:`, response.data);

    const postData = {
      ...response.data,
      imageUrls: response.data.imageUrls?.slice(0, 15).map((url) => fixImageUrl(url)) || [],
      createdAt: response.data.createdAt || response.data.timestamp || null, // 게시물 생성 시간 추가
    };

    console.log("📌 가공된 Post Data:", postData);
    return postData;
  } catch (error) {
    console.error(`게시물(${communityId}) 상세 데이터를 가져오는 중 오류 발생:`, error);
    throw error;
  }
};






// 게시물 삭제 (에러 처리 추가)
export const deletePost = async (postId, userId) => {
  try {
    const response = await axiosInstance.delete(`/delete/${postId}`, {
      params: { userId }, // 쿼리 파라미터로 userId 추가
    });
    return response.data;
  } catch (error) {
    console.error(`게시물(${postId}) 삭제 중 오류 발생:`, error);
    throw error;
  }
};

export const updatePost = async (postId, updatedData) => {
  try {
    const response = await axiosInstance.post(`/update/${postId}`, updatedData, {
      headers: { "Content-Type": "multipart/form-data" }, // FormData 전송
    });
    return response.data;
  } catch (error) {
    console.error(`게시물(${postId}) 수정 중 오류 발생:`, error);
    throw error;
  }
};
