
// import React, { useState, useEffect } from "react";
// import "../css/PostDetail.css";
// import axios from "axios"; // API 호출을 위한 Axios 추가
// import sampleImage from "../assets/images/안승현.jpg"; // 로컬 이미지 import
// import bookmarkDefault from "../assets/images/북마크 저장 전.png"; // 기본 북마크 아이콘
// import bookmarkActive from "../assets/images/북마크 저장 후.png"; // 활성화된 북마크 아이콘

// const PostDetail = ({ match }) => {
//   const postId = match?.params?.id || 1; // 게시물 ID를 URL에서 가져오기 (예: /post/:id)
//   const [isLiked, setIsLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(9); // 초기 좋아요 수
//   const [isBookmarked, setIsBookmarked] = useState(false); // 북마크 상태 추가
//   const [isReportOpen, setIsReportOpen] = useState(false); // 신고 메뉴 상태 추가
//   const [isBlocked, setIsBlocked] = useState(false); // 게시글 차단 상태 추가

//   const [post, setPost] = useState({
//     id: 1,
//     username: "재현",
//     profileImage: "https://via.placeholder.com/50",
//     location: "서울 중구",
//     title: "인생이 힘들어요",
//     content: `퓨항항항항항항항항
//             무야호우하하하하항\n\n무릎이 아파요.`,
//     date: "5분 전",
//     imageUrl: sampleImage,
//     likeCount: 9,
//     commentCount: 2,
//   });

//   const [comments, setComments] = useState([
//     {
//       id: 1,
//       username: "유니",
//       profileImage: "https://via.placeholder.com/40",
//       content: "좋은 글이네요!",
//       timestamp: Date.now(), // 현재 시간
//       replies: [],
//     },
//     {
//       id: 2,
//       username: "재현",
//       profileImage: "https://via.placeholder.com/40",
//       content: "감사합니다!",
//       timestamp: Date.now() - 60000, // 1분 전
//       replies: [],
//     },
//   ]);

//   const [newComment, setNewComment] = useState(""); // 새로운 댓글 입력 상태
//   const [reply, setReply] = useState({}); // 대댓글 입력 상태

//   // 상대적 시간 계산 함수
//   const getRelativeTime = (timestamp) => {
//     const now = Date.now();
//     const diff = Math.floor((now - timestamp) / 1000); // 초 단위 차이 계산

//     if (diff < 60) return `${diff}초 전`;
//     if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
//     if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
//     return `${Math.floor(diff / 86400)}일 전`;
//   };

//   // 게시물 데이터 및 댓글 데이터 가져오기
//   useEffect(() => {
//     // 나중에 Spring Boot API와 연결할 코드
//     /*
//     const fetchPostData = async () => {
//       try {
//         const postResponse = await axios.get(`/api/posts/${postId}`); // 게시물 데이터 API
//         setPost(postResponse.data); // 게시물 데이터 설정
//         setLikeCount(postResponse.data.likeCount); // 좋아요 수 업데이트
//         setIsLiked(postResponse.data.isLiked); // 좋아요 상태 설정

//         const commentsResponse = await axios.get(`/api/posts/${postId}/comments`); // 댓글 데이터 API
//         setComments(commentsResponse.data); // 댓글 데이터 설정
//       } catch (error) {
//         console.error("데이터를 불러오는 중 오류 발생:", error);
//       }
//     };

//     fetchPostData();
//     */
//   }, [postId]);

//   // 좋아요 버튼 클릭
//   const toggleLike = async () => {
//     setIsLiked(!isLiked);
//     setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

//     // 나중에 Spring Boot API와 연결할 코드
//     /*
//     try {
//       const response = await axios.post(`/api/posts/${postId}/like`); // 좋아요 API 호출
//       setLikeCount(response.data.likeCount); // 서버에서 반환된 좋아요 수
//       setIsLiked(response.data.isLiked); // 좋아요 상태 설정
//     } catch (error) {
//       console.error("좋아요 상태를 변경하는 중 오류 발생:", error);
//     }
//     */
//   };

//   // 북마크 버튼 클릭
//   const toggleBookmark = async () => {
//     setIsBookmarked(!isBookmarked);

//     // 나중에 Spring Boot API와 연결할 코드
//     /*
//     try {
//       await axios.post(`/api/posts/${postId}/bookmark`); // 북마크 API 호출
//     } catch (error) {
//       console.error("북마크 상태를 변경하는 중 오류 발생:", error);
//     }
//     */
//   };

//   // 신고 메뉴 열기/닫기
//   const openReportMenu = () => setIsReportOpen(true);
//   const closeReportMenu = () => setIsReportOpen(false);

//   // 게시글 신고
//   const blockPost = async () => {
//     setIsBlocked(true); // 차단 상태로 변경
//     setIsReportOpen(false); // 신고 메뉴 닫기

//     // 나중에 Spring Boot API와 연결할 코드
//     /*
//     try {
//       await axios.post(`/api/posts/${postId}/report`); // 신고 API 호출
//     } catch (error) {
//       console.error("게시글 신고 중 오류 발생:", error);
//     }
//     */
//   };

//   // 댓글 추가
//   const addComment = async () => {
//     if (newComment.trim()) {
//       setComments([
//         ...comments,
//         {
//           id: Date.now(),
//           username: "익명",
//           profileImage: "https://via.placeholder.com/40",
//           content: newComment,
//           timestamp: Date.now(),
//           replies: [],
//         },
//       ]);
//       setNewComment("");

//       // 나중에 Spring Boot API와 연결할 코드
//       /*
//       try {
//         const response = await axios.post(`/api/posts/${postId}/comments`, {
//           content: newComment,
//         }); // 댓글 추가 API 호출
//         setComments([...comments, response.data]); // 새로운 댓글 추가
//         setNewComment(""); // 입력 필드 초기화
//       } catch (error) {
//         console.error("댓글 추가 중 오류 발생:", error);
//       }
//       */
//     }
//   };

//   // 대댓글 추가
//   const addReply = async (commentId) => {
//     if (reply[commentId]?.trim()) {
//       setComments(
//         comments.map((comment) =>
//           comment.id === commentId
//             ? {
//                 ...comment,
//                 replies: [
//                   ...comment.replies,
//                   {
//                     id: Date.now(),
//                     username: "익명",
//                     profileImage: "https://via.placeholder.com/40",
//                     content: reply[commentId],
//                     timestamp: Date.now(),
//                   },
//                 ],
//               }
//             : comment
//         )
//       );
//       setReply({ ...reply, [commentId]: "" });

//       // 나중에 Spring Boot API와 연결할 코드
//       /*
//       try {
//         const response = await axios.post(`/api/comments/${commentId}/replies`, {
//           content: reply[commentId],
//         }); // 대댓글 추가 API 호출
//         setComments((prevComments) =>
//           prevComments.map((comment) =>
//             comment.id === commentId
//               ? {
//                   ...comment,
//                   replies: [...comment.replies, response.data], // 새로운 대댓글 추가
//                 }
//               : comment
//           )
//         );
//         setReply({ ...reply, [commentId]: "" }); // 대댓글 입력 필드 초기화
//       } catch (error) {
//         console.error("대댓글 추가 중 오류 발생:", error);
//       }
//       */
//     }
//   };

//   return (
//     <div className="post-detail">
//       {isBlocked ? (
//         <div className="blocked-message">
//           <p>이 게시글은 신고하여 차단되었습니다.</p>
//         </div>
//       ) : (
//         <>
//           {/* 게시물 헤더 */}
//           <div className="post-header">
//             <div className="profile">
//               <img
//                 src={post.profileImage}
//                 alt="프로필"
//                 className="profile-image"
//               />
//               <div className="profile-info">
//                 <span className="username">{post.username}</span>
//                 <span className="location">{post.location}</span>
//                 <span className="date">{post.date}</span>
//               </div>
//             </div>
//             <div className="actions">
//               <button className="bookmark-button" onClick={toggleBookmark}>
//                 <img
//                   src={isBookmarked ? bookmarkActive : bookmarkDefault}
//                   alt="북마크"
//                 />
//               </button>
//               <button className="report-button" onClick={openReportMenu}>
//                 신고
//               </button>
//             </div>
//           </div>

//           {/* 게시물 본문 */}
//           <div className="post-content">
//             <h1 className="title">{post.title}</h1>
//             <p className="content">{post.content}</p>
//             <img
//               src={post.imageUrl}
//               alt="게시물 이미지"
//               className="post-image"
//             />
//           </div>

//           {/* 게시물 푸터 */}
//           <div className="post-footer">
//             <div className="like-comment">
//               <button className="like-button" onClick={toggleLike}>
//                 {isLiked ? "❤️" : "🤍"} {likeCount}
//               </button>
//               <span className="comment-count">💬 {comments.length}</span>
//             </div>

//             {/* 댓글 섹션 */}
//             <div className="comment-section">
//               <ul className="comment-list">
//                 {comments.map((comment) => (
//                   <li key={comment.id} className="comment-item">
//                     <div className="comment-header">
//                       <img
//                         src={comment.profileImage}
//                         alt="프로필"
//                         className="profile-image"
//                       />
//                       <div className="comment-info">
//                         <span className="username">{comment.username}</span>
//                         <span className="timestamp">
//                           {getRelativeTime(comment.timestamp)}
//                         </span>
//                       </div>
//                     </div>
//                     <p className="comment-content">{comment.content}</p>

//                     {/* 대댓글 리스트 */}
//                     <ul className="reply-list">
//                       {comment.replies.map((reply) => (
//                         <li key={reply.id} className="reply-item">
//                           <div className="reply-header">
//                             <img
//                               src={reply.profileImage}
//                               alt="프로필"
//                               className="profile-image"
//                             />
//                             <div className="comment-info">
//                               <span className="username">
//                                 {reply.username}
//                               </span>
//                               <span className="timestamp">
//                                 {getRelativeTime(reply.timestamp)}
//                               </span>
//                             </div>
//                           </div>
//                           <p className="reply-content">{reply.content}</p>
//                         </li>
//                       ))}
//                     </ul>

//                     {/* 대댓글 입력 */}
//                     <div className="reply-input">
//                       <input
//                         type="text"
//                         placeholder="대댓글을 남겨보세요"
//                         value={reply[comment.id] || ""}
//                         onChange={(e) =>
//                           setReply({ ...reply, [comment.id]: e.target.value })
//                         }
//                       />
//                       <button onClick={() => addReply(comment.id)}>등록</button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//               <div className="comment-input">
//                 <input
//                   type="text"
//                   placeholder="댓글을 남겨보세요"
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                 />
//                 <button onClick={addComment}>등록</button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* 신고 메뉴 */}
//       {isReportOpen && (
//         <div className="report-menu">
//           <div className="report-menu-content">
//             <button onClick={blockPost} className="report-menu-button">
//               신고
//             </button>
//             <button className="report-menu-cancel" onClick={closeReportMenu}>
//               취소
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostDetail;



import React, { useState, useEffect } from "react";
import "../css/PostDetail.css";
import sampleImage from "../assets/images/안승현.jpg"; // 로컬 이미지 import
import bookmarkDefault from "../assets/images/북마크 저장 전.png"; // 기본 북마크 아이콘
import bookmarkActive from "../assets/images/북마크 저장 후.png"; // 활성화된 북마크 아이콘

const PostDetail = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(9); // 초기 좋아요 수
  const [isBookmarked, setIsBookmarked] = useState(false); // 북마크 상태 추가
  const [isReportOpen, setIsReportOpen] = useState(false); // 신고 메뉴 상태 추가
  const [isBlocked, setIsBlocked] = useState(false); // 게시글 차단 상태 추가

  const [post, setPost] = useState({
    id: 1,
    username: "재현",
    profileImage: "https://via.placeholder.com/50",
    location: "서울 중구",
    title: "인생이 힘들어요",
    content: `퓨항항항항항항항항
            무야호우하하하하항\n\n무릎이 아파요.`,
    date: "5분 전",
    imageUrl: sampleImage,
    likeCount: 9,
    commentCount: 2, // 댓글 개수 초기값
  });

  const [comments, setComments] = useState([
    {
      id: 1,
      username: "유니",
      profileImage: "https://via.placeholder.com/40",
      content: "좋은 글이네요!",
      timestamp: Date.now(), // 현재 시간
      replies: [],
    },
    {
      id: 2,
      username: "재현",
      profileImage: "https://via.placeholder.com/40",
      content: "감사합니다!",
      timestamp: Date.now() - 60000, // 1분 전
      replies: [],
    },
  ]);

  const [newComment, setNewComment] = useState(""); // 새로운 댓글 입력 상태
  const [reply, setReply] = useState({}); // 대댓글 입력 상태

  // 상대적 시간 계산 함수
  const getRelativeTime = (timestamp) => {
    const now = Date.now();
    const diff = Math.floor((now - timestamp) / 1000); // 초 단위 차이 계산

    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };

  // 좋아요 버튼 클릭
  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  // 북마크 버튼 클릭
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // 신고 메뉴 열기
  const openReportMenu = () => {
    setIsReportOpen(true);
  };

  // 신고 메뉴 닫기
  const closeReportMenu = () => {
    setIsReportOpen(false);
  };

  // 게시글 차단
  const blockPost = () => {
    setIsBlocked(true); // 게시글과 댓글 모두 차단
    setIsReportOpen(false); // 신고 메뉴 닫기
  };

  // 댓글 추가 함수
  const addComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          username: "익명",
          profileImage: "https://via.placeholder.com/40",
          content: newComment,
          timestamp: Date.now(),
          replies: [],
        },
      ]);
      setNewComment("");

      // 댓글 개수 증가
      setPost((prevPost) => ({
        ...prevPost,
        commentCount: prevPost.commentCount + 1,
      }));
    }
  };

  // 대댓글 추가 함수
  const addReply = (commentId) => {
    if (reply[commentId]?.trim()) {
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: Date.now(),
                    username: "익명",
                    profileImage: "https://via.placeholder.com/40",
                    content: reply[commentId],
                    timestamp: Date.now(),
                  },
                ],
              }
            : comment
        )
      );
      setReply({ ...reply, [commentId]: "" });

      // 댓글 개수 증가
      setPost((prevPost) => ({
        ...prevPost,
        commentCount: prevPost.commentCount + 1,
      }));
    }
  };

  return (
    <div className="post-detail">
      {isBlocked ? (
        <div className="blocked-message">
          <p>이 게시글은 신고하여 차단되었습니다.</p>
        </div>
      ) : (
        <>
          {/* 게시물 헤더 */}
          <div className="post-header">
            <div className="profile">
              <img
                src={post.profileImage}
                alt="프로필"
                className="profile-image"
              />
              <div className="profile-info">
                <span className="username">{post.username}</span>
                <span className="location">{post.location}</span>
                <span className="date">{post.date}</span>
              </div>
            </div>
            <div className="actions">
              <button className="bookmark-button" onClick={toggleBookmark}>
                <img
                  src={isBookmarked ? bookmarkActive : bookmarkDefault}
                  alt="북마크"
                />
              </button>
              <button className="report-button" onClick={openReportMenu}>
                신고
              </button>
            </div>
          </div>

          {/* 게시물 본문 */}
          <div className="post-content">
            <h1 className="title">{post.title}</h1>
            <p className="content">{post.content}</p>
            <img
              src={post.imageUrl}
              alt="게시물 이미지"
              className="post-image"
            />
          </div>

          {/* 게시물 푸터 */}
          <div className="post-footer">
            <div className="like-comment">
              <button className="like-button" onClick={toggleLike}>
                {isLiked ? "❤️" : "🤍"} {likeCount}
              </button>
              <span className="comment-count">💬 {post.commentCount}</span>
            </div>

            {/* 댓글 섹션 */}
            <div className="comment-section">
              <ul className="comment-list">
                {comments.map((comment) => (
                  <li key={comment.id} className="comment-item">
                    <div className="comment-header">
                      <img
                        src={comment.profileImage}
                        alt="프로필"
                        className="profile-image"
                      />
                      <div className="comment-info">
                        <span className="username">{comment.username}</span>
                        <span className="timestamp">
                          {getRelativeTime(comment.timestamp)}
                        </span>
                      </div>
                    </div>
                    <p className="comment-content">{comment.content}</p>

                    {/* 대댓글 리스트 */}
                    <ul className="reply-list">
                      {comment.replies.map((reply) => (
                        <li key={reply.id} className="reply-item">
                          <div className="reply-header">
                            <img
                              src={reply.profileImage}
                              alt="프로필"
                              className="profile-image"
                            />
                            <div className="comment-info">
                              <span className="username">
                                {reply.username}
                              </span>
                              <span className="timestamp">
                                {getRelativeTime(reply.timestamp)}
                              </span>
                            </div>
                          </div>
                          <p className="reply-content">{reply.content}</p>
                        </li>
                      ))}
                    </ul>

                    {/* 대댓글 입력 */}
                    <div className="reply-input">
                      <input
                        type="text"
                        placeholder="대댓글을 남겨보세요"
                        value={reply[comment.id] || ""}
                        onChange={(e) =>
                          setReply({ ...reply, [comment.id]: e.target.value })
                        }
                      />
                      <button onClick={() => addReply(comment.id)}>등록</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="comment-input">
                <input
                  type="text"
                  placeholder="댓글을 남겨보세요"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={addComment}>등록</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 신고 메뉴 */}
      {isReportOpen && (
        <div className="report-menu">
          <div className="report-menu-content">
            <button onClick={blockPost} className="report-menu-button">
              신고
            </button>
            <button className="report-menu-cancel" onClick={closeReportMenu}>
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
