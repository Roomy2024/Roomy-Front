// import createAxios from "./CreateAxios";

// const axiosInstance = createAxios("/comments");

// // 댓글 가져오기
// export const fetchComments = async (postId) => {
//   const response = await axiosInstance.get(`/${postId}`);
//   return response.data;
// };

// // 댓글 추가
// export const addComment = async (postId, content) => {
//   const response = await axiosInstance.post("/", { postId, content });
//   return response.data; // 서버에서 추가된 댓글 데이터 반환
// };

// // 댓글 삭제
// export const deleteComment = async (commentId) => {
//   const response = await axiosInstance.delete(`/${commentId}`);
//   return response.data;
// };

// // 대댓글 추가
// export const addReply = async (commentId, content) => {
//   const response = await axiosInstance.post(`/${commentId}/reply`, { content });
//   return response.data; // 서버에서 추가된 대댓글 데이터 반환
// };



import createAxios from "./CreateAxios";

// 더미 댓글 데이터
const dummyComments = [
  {
    id: 1,
    postId: 1,
    username: "유저1",
    content: "첫 번째 댓글입니다.",
    replies: [
      { id: 101, commentId: 1, username: "유저2", content: "첫 번째 댓글에 대한 대댓글입니다." },
    ],
  },
  {
    id: 2,
    postId: 1,
    username: "유저3",
    content: "두 번째 댓글입니다.",
    replies: [],
  },
];

// 댓글 가져오기
export const fetchComments = async (postId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyComments.filter((comment) => comment.postId === postId));
    }, 500); // 0.5초 딜레이
  });
};

// 댓글 추가
export const addComment = async (postId, content) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newComment = {
        id: Date.now(),
        postId,
        username: "익명",
        content,
        replies: [],
      };
      dummyComments.push(newComment);
      resolve(newComment);
    }, 500); // 0.5초 딜레이
  });
};

// 대댓글 추가
export const addReply = async (commentId, content) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const comment = dummyComments.find((c) => c.id === commentId);
      if (comment) {
        const newReply = {
          id: Date.now(),
          commentId,
          username: "익명",
          content,
        };
        comment.replies.push(newReply);
        resolve(newReply);
      } else {
        resolve({ success: false, message: "댓글을 찾을 수 없습니다." });
      }
    }, 500); // 0.5초 딜레이
  });
};
