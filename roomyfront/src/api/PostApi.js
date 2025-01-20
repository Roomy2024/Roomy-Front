import createAxios from "./CreateAxios";

const axiosInstance = createAxios("/community");

// 게시물 목록 가져오기
export const fetchPosts = async () => {
    const response = await axiosInstance.get("/");
    return response.data;
};

// 게시물 생성
export const createPost = async (PostData) => {
    const response = await axiosInstance.post("/create", PostData); // FormData → PostData
    return response.data;
};

// 특정 게시물 가져오기
export const fetchPostById = async (postId) => { // 중복 함수 제거, fetchPostById로 통합
    const response = await axiosInstance.get(`/${postId}`);
    return response.data;
};

// 게시물 삭제
export const deletePost = async (postId) => {
    const response = await axiosInstance.delete(`/${postId}`); // 문자열 템플릿 수정
    return response.data;
};

// 좋아요 토글
export const toggleLikePost = async (postId) => {
    const response = await axiosInstance.post(`/${postId}/like`);
    return response.data.likeCount; // 서버에서 업데이트된 좋아요 수 반환
};
