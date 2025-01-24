  


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {addComment,addReply,fetchCommentsByCommunityId,} from "../../api/CommentApi"; // 댓글 API
// import { fetchPostById, toggleLikePost } from "../../api/PostApi"; // 게시물 API
// import bookmarkDefault from "../../asset/images/북마크 저장 전.png"; // 기본 북마크 아이콘
// import bookmarkActive from "../../asset/images/북마크 저장 후.png"; // 활성화된 북마크 아이콘
// import sampleImage from "../../asset/images/안승현.jpg"; // 로컬 이미지 import
// import "../../css/PostDetail.css";

// const PostDetail = () => {
//   const [post, setPost] = useState(null);
//   const [isLiked, setIsLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(0);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [isReportOpen, setIsReportOpen] = useState(false);
//   const [selectedReason, setSelectedReason] = useState("");
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [reply, setReply] = useState({});
//   const { id: communityId } = useParams(); // URL에서 id 가져오기
  

//   const reportReasons = [
//     "불법정보",
//     "욕설, 인신공격",
//     "음란성, 선정성",
//     "영리목적, 홍보성",
//     "개인정보 노출",
//     "도배",
//     "악성코드",
//     "혐오 발언, 암시",
//     "폭력, 위험한 조직",
//     "거짓 정보",
//   ];

//   // 게시물 데이터 가져오기
// // 게시물 데이터 가져오기
// useEffect(() => {
//   const fetchPost = async () => {
//     try {
//       console.log("Fetching post with ID:", communityId);

//       // 게시물 데이터 가져오기
//       const postData = await fetchPostById(communityId);
//       console.log("Fetched Post Data:", postData); // 데이터 확인

//       // 이미지 URL 디버깅
//       if (postData.imageUrls && postData.imageUrls.length > 0) {
//         console.log("Fetched Image URLs:", postData.imageUrls); // 이미지 URL 출력
//       } else {
//         console.warn("이미지 URL이 비어 있습니다.");
//       }

//       // 댓글 데이터 가져오기
//       const commentsData = await fetchCommentsByCommunityId(communityId);

//       // 상태 설정
//       setPost(postData);
//       setIsLiked(postData.isLiked || false);
//       setLikeCount(postData.likeCount || 0);
//       setComments(commentsData || []);
//     } catch (error) {
//       console.error("게시물 데이터를 가져오는 중 오류 발생:", error);
//     }
//   };

//   fetchPost();
// }, [communityId]);


//   // 상대적 시간 계산 함수
//   const getRelativeTime = (timestamp) => {
//     const now = Date.now();
//     const diff = Math.floor((now - timestamp) / 1000);

//     if (diff < 60) return `${diff}초 전`;
//     if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
//     if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
//     return `${Math.floor(diff / 86400)}일 전`;
//   };

//   // 좋아요 토글
//   const toggleLike = async () => {
//     try {
//       // TODO 타입, 유저 아이디 넣기
//       const updatedLikeCount = await toggleLikePost({
//         id: communityId,
//         type: "",
//         userId: "",
//       });
//       setIsLiked(!isLiked);
//       setLikeCount(updatedLikeCount);
//     } catch (error) {
//       console.error("좋아요 처리 중 오류 발생:", error);
//     }
//   };

//   // 댓글 추가
//   const handleAddComment = async () => {
//     if (newComment.trim()) {
//       try {
//         const newCommentData = await addComment(communityId, newComment);
//         setComments([...comments, newCommentData]);
//         setNewComment("");
//       } catch (error) {
//         console.error("댓글 추가 중 오류 발생:", error);
//       }
//     }
//   };

//   // 대댓글 추가
//   const handleAddReply = async (commentId) => {
//     if (reply[commentId]?.trim()) {
//       try {
//         const newReplyData = await addReply(commentId, reply[commentId]);
//         setComments(
//           comments.map((comment) =>
//             comment.id === commentId
//               ? { ...comment, replies: [...comment.replies, newReplyData] }
//               : comment
//           )
//         );
//         setReply({ ...reply, [commentId]: "" });
//       } catch (error) {
//         console.error("대댓글 추가 중 오류 발생:", error);
//       }
//     }
//   };

//   if (!post) return <p>게시물을 로드 중입니다...</p>;

//   return (
//     <div className="post-detail">
//       {/* 게시물 헤더 */}
//       <div className="post-header">
//         <div className="profile">
//           <img
//             src={post.profileImage || sampleImage}
//             alt="프로필"
//             className="profile-image"
//           />
//           <div className="profile-info">
//             <span className="username">{post.username}</span>
//             <span className="location">{post.location}</span>
//             <span className="date">{getRelativeTime(post.timestamp)}</span>
//           </div>
//         </div>
//         <div className="actions">
//           <button
//             className="bookmark-button"
//             onClick={() => setIsBookmarked(!isBookmarked)}
//           >
//             <img
//               src={isBookmarked ? bookmarkActive : bookmarkDefault}
//               alt="북마크"
//             />
//           </button>
//           <button
//             className="report-button"
//             onClick={() => setIsReportOpen(true)}
//           >
//             신고
//           </button>
//         </div>
//       </div>
//         {/* 게시물 본문 */}
//         <div className="post-content">
//           <h1 className="title">{post.title}</h1>
//           <p className="content">{post.content}</p>

//             {/* 업로드된 이미지가 배열로 제공될 경우 */}
//             {post.imageUrls && post.imageUrls.length > 0 && (
//               <div className="post-images">
//                 {post.imageUrls.map((url, index) => (
//                   <img
//                     key={index}
//                     src={url.startsWith("http") ? url : `http://192.168.0.33:8000/api${url}`} // 상대 경로를 절대 경로로 변환
//                     alt={`이미지 ${index + 1}`}
//                     className="post-image"
//                   />
//                 ))}
//               </div>
//             )}
//         </div>


//       {/* 게시물 푸터 */}
//       <div className="post-footer">
//         <button className="like-button" onClick={toggleLike}>
//           {isLiked ? "❤️" : "🤍"} {likeCount}
//         </button>
//         <span className="comment-count">💬 {comments.length}</span>
//       </div>

//       {/* 댓글 섹션 */}
//       <div className="comment-section">
//         <ul className="comment-list">
//           {comments.map((comment) => (
//             <li key={comment.id} className="comment-item">
//               <div className="comment-header">
//                 <img
//                   src={comment.profileImage || sampleImage}
//                   alt="프로필"
//                   className="profile-image"
//                 />
//                 <div className="comment-info">
//                   <span className="username">{comment.username}</span>
//                   <span className="timestamp">
//                     {getRelativeTime(comment.timestamp)}
//                   </span>
//                 </div>
//               </div>
//               <p className="comment-content">{comment.content}</p>

//               {/* 대댓글 리스트 */}
//               <ul className="reply-list">
//                 {comment.replies.map((reply) => (
//                   <li key={reply.id} className="reply-item">
//                     <div className="reply-header">
//                       <img
//                         src={reply.profileImage || sampleImage}
//                         alt="프로필"
//                         className="profile-image"
//                       />
//                       <div className="reply-info">
//                         <span className="username">{reply.username}</span>
//                         <span className="timestamp">
//                           {getRelativeTime(reply.timestamp)}
//                         </span>
//                       </div>
//                     </div>
//                     <p className="reply-content">{reply.content}</p>
//                   </li>
//                 ))}
//               </ul>

//               {/* 대댓글 입력 */}
//               <div className="reply-input">
//                 <input
//                   type="text"
//                   placeholder="대댓글을 남겨보세요"
//                   value={reply[comment.id] || ""}
//                   onChange={(e) =>
//                     setReply({ ...reply, [comment.id]: e.target.value })
//                   }
//                 />
//                 <button onClick={() => handleAddReply(comment.id)}>등록</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//         <div className="comment-input">
//           <input
//             type="text"
//             placeholder="댓글을 남겨보세요"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//           />
//           <button onClick={handleAddComment}>등록</button>
//         </div>
//       </div>

//       {/* 신고 메뉴 */}
//       {isReportOpen && (
//         <div className="report-menu">
//           <h2>신고 사유를 선택하세요</h2>
//           <ul className="report-reasons">
//             {reportReasons.map((reason, index) => (
//               <li key={index}>
//                 <label>
//                   <input
//                     type="radio"
//                     name="report-reason"
//                     value={reason}
//                     onChange={(e) => setSelectedReason(e.target.value)}
//                     checked={selectedReason === reason}
//                   />
//                   {reason}
//                 </label>
//               </li>
//             ))}
//           </ul>
//           <div className="report-actions">
//             <button
//               onClick={() => {
//                 alert("신고가 접수되었습니다!");
//                 setIsReportOpen(false);
//               }}
//               className="report-menu-button"
//             >
//               신고
//             </button>
//             <button
//               onClick={() => setIsReportOpen(false)}
//               className="report-menu-cancel"
//             >
//               취소
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostDetail;




import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addComment,
  addReply,
  fetchCommentsByCommunityId,
} from "../../api/CommentApi"; // 댓글 API
import { fetchPostById, toggleLikePost } from "../../api/PostApi"; // 게시물 API
import bookmarkDefault from "../../asset/images/북마크 저장 전.png"; // 기본 북마크 아이콘
import bookmarkActive from "../../asset/images/북마크 저장 후.png"; // 활성화된 북마크 아이콘
import sampleImage from "../../asset/images/안승현.jpg"; // 로컬 이미지 import
import "../../css/PostDetail.css";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [reply, setReply] = useState({});
  const { id: communityId } = useParams(); // URL에서 id 가져오기
  const [currentSlide, setCurrentSlide] = useState(0); // 슬라이드 인덱스 관리

  const reportReasons = [
    "불법정보",
    "욕설, 인신공격",
    "음란성, 선정성",
    "영리목적, 홍보성",
    "개인정보 노출",
    "도배",
    "악성코드",
    "혐오 발언, 암시",
    "폭력, 위험한 조직",
    "거짓 정보",
  ];

  // 게시물 데이터 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("Fetching post with ID:", communityId);

        // 게시물 데이터 가져오기
        const postData = await fetchPostById(communityId);
        console.log("Fetched Post Data:", postData); // 데이터 확인

        // 이미지 URL 디버깅
        if (postData.imageUrls && postData.imageUrls.length > 0) {
          console.log("Fetched Image URLs:", postData.imageUrls); // 이미지 URL 출력
        } else {
          console.warn("이미지 URL이 비어 있습니다.");
        }

        // 댓글 데이터 가져오기
        const commentsData = await fetchCommentsByCommunityId(communityId);

        // 상태 설정
        setPost(postData);
        setIsLiked(postData.isLiked || false);
        setLikeCount(postData.likeCount || 0);
        setComments(commentsData || []);
      } 
        
        catch (error) {
        console.error("게시물 데이터를 가져오는 중 오류 발생:", error);
      }
      

    };

    fetchPost();
  }, [communityId]);

  // 슬라이드 이동 함수
  const handleNextSlide = () => {
    if (post.imageUrls && currentSlide < post.imageUrls.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // 상대적 시간 계산 함수
  const getRelativeTime = (timestamp) => {
    const now = Date.now();
    const diff = Math.floor((now - timestamp) / 1000);

    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };

  // // 좋아요 토글
  // const toggleLike = async () => {
  //   try {
  //     // TODO 타입, 유저 아이디 넣기
  //     const updatedLikeCount = await toggleLikePost({
  //       id: communityId,
  //       type: "community",
  //       userId  : "1",
  //     });
  //     setIsLiked(!isLiked);
  //     setLikeCount(updatedLikeCount);
  //   } catch (error) {
  //     console.error("좋아요 처리 중 오류 발생:", error);
  //   }
  // };

  const toggleLike = async () => {
    try {
      // 좋아요 토글 API 호출
      const updatedLikeData = await toggleLikePost({
        id: communityId,
        type: "community",
        userId: "1", // 사용자 ID
        isLiked: !isLiked, // 현재 상태를 반전해서 전달
        baseURL: "http://localhost:8000/api/", // 기본 API URL
      });
  
      // 서버에서 반환된 좋아요 상태와 좋아요 개수로 업데이트
      setIsLiked(updatedLikeData.isLiked);
      setLikeCount(updatedLikeData.likes);
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  };
  




  
  // 댓글 추가
  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const newCommentData = await addComment(communityId, newComment);
        setComments([...comments, newCommentData]);
        setNewComment("");
      } catch (error) {
        console.error("댓글 추가 중 오류 발생:", error);
      }
    }
  };

  // 대댓글 추가
  const handleAddReply = async (commentId) => {
    if (reply[commentId]?.trim()) {
      try {
        const newReplyData = await addReply(commentId, reply[commentId]);
        setComments(
          comments.map((comment) =>
            comment.id === commentId
              ? { ...comment, replies: [...comment.replies, newReplyData] }
              : comment
          )
        );
        setReply({ ...reply, [commentId]: "" });
      } catch (error) {
        console.error("대댓글 추가 중 오류 발생:", error);
      }
    }
  };

  if (!post) return <p>게시물을 로드 중입니다...</p>;

  return (
    <div className="post-detail">
      {/* 게시물 헤더 */}
      <div className="post-header">
        <div className="profile">
          <img
            src={post.profileImage || sampleImage}
            alt="프로필"
            className="profile-image"
          />
          <div className="profile-info">
            <span className="username">{post.author}</span>
            <span className="location">{post.location}</span>
            <span className="date">{getRelativeTime(post.timestamp)}</span>
          </div>
        </div>
        <div className="actions">
          <button
            className="bookmark-button"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <img
              src={isBookmarked ? bookmarkActive : bookmarkDefault}
              alt="북마크"
            />
          </button>
          <button
            className="report-button"
            onClick={() => setIsReportOpen(true)}
          >
            신고
          </button>
        </div>
      </div>

      {/* 게시물 본문 */}
      <div className="post-content">
        <h1 className="title">{post.title}</h1>
        <p className="content">{post.content}</p>

        {/* 이미지 슬라이더 */}
        {post.imageUrls && post.imageUrls.length > 0 && (
          <div className="post-slider">
            <button
              className="slider-button prev"
              onClick={handlePrevSlide}
              disabled={currentSlide === 0} // 첫 슬라이드에서 비활성화
            >
              &#8249;
            </button>
            <div className="slider-wrapper">
              <img
                src={post.imageUrls[currentSlide]}
                alt={`이미지 ${currentSlide + 1}`}
                className="post-image"
                style={{
                  width: "100%",
                  height: "400px", // 고정된 높이
                  objectFit: "contain", // 비율 유지하며 잘리지 않도록
                  backgroundColor: "#f0f0f0", // 빈 공간 배경색 (선택 사항)
                }}
              />
            </div>

            <button
              className="slider-button next"
              onClick={handleNextSlide}
              disabled={currentSlide === post.imageUrls.length - 1} // 마지막 슬라이드에서 비활성화
            >
              &#8250;
            </button>
          </div>
        )}
      </div>
{/* 게시물 푸터 */}
<div className="post-footer">
  <button
    className="like-button"
    onClick={async () => {
      try {
        // 좋아요 토글 API 호출
        const { isLiked: updatedIsLiked, likes: updatedLikeCount } =
          await toggleLikePost({
            id: communityId,
            type: "community",
            userId: "1", // 유저 ID
          });

        // 상태 업데이트
        setIsLiked(updatedIsLiked); // 좋아요 상태 업데이트
        setLikeCount(updatedLikeCount); // 좋아요 수 업데이트
      } catch (error) {
        console.error("좋아요 처리 중 오류 발생:", error);
      }
    }}
    style={{
      color: isLiked ? "red" : "black", // 좋아요 상태에 따라 색상 변경
      fontSize: "18px", // 버튼 크기 조정
      cursor: "pointer", // 마우스 포인터 변경
      border: "none", // 테두리 제거
      background: "none", // 배경 제거
    }}
  >
    {isLiked ? "❤️" : "🤍"} {likeCount} {/* 좋아요 수 표시 */}
  </button>
  <span className="comment-count">💬 {comments.length}</span>
</div>



      {/* 댓글 섹션 */}
      <div className="comment-section">
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <div className="comment-header">
                <img
                  src={comment.profileImage || sampleImage}
                  alt="프로필"
                  className="profile-image"
                  
                />
                <div className="comment-info">
                  <span className="username">{comment.author}</span>
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
                        src={reply.profileImage || sampleImage}
                        alt="프로필"
                        className="profile-image"
                      />
                      <div className="reply-info">
                        <span className="username">{reply.author}</span>
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
                <button onClick={() => handleAddReply(comment.id)}>등록</button>
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
          <button onClick={handleAddComment}>등록</button>
        </div>
      </div>

      {/* 신고 메뉴 */}
      {isReportOpen && (
        <div className="report-menu">
          <h2>신고 사유를 선택하세요</h2>
          <ul className="report-reasons">
            {reportReasons.map((reason, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name="report-reason"
                    value={reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    checked={selectedReason === reason}
                  />
                  {reason}
                </label>
              </li>
            ))}
          </ul>
          <div className="report-actions">
            <button
              onClick={() => {
                alert("신고가 접수되었습니다!");
                setIsReportOpen(false);
              }}
              className="report-menu-button"
            >
              신고
            </button>
            <button
              onClick={() => setIsReportOpen(false)}
              className="report-menu-cancel"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
