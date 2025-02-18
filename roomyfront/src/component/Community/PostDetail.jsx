import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBookmarkStatus, toggleBookmark } from "../../api/BookmarkApi";
import CommentApi from "../../api/CommentApi";
import CommunityApi from "../../api/CommunityApi";
import LikeApi from "../../api/LikeApi"
import bookmarkDefault from "../../asset/images/북마크 저장 전.png"; // 기본 북마크 아이콘
import bookmarkActive from "../../asset/images/북마크 저장 후.png"; // 활성화된 북마크 아이콘
import sampleImage from "../../asset/images/user-icon.png"; // 로컬 이미지 import
import "../../css/PostDetail.css";
import ReportApi from "../../api/ReportApi";


const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // 점 3개 메뉴 상태 추가
  const [selectedReason, setSelectedReason] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [reply, setReply] = useState({});
  const { id: communityId } = useParams(); // URL에서 id 가져오기
  const [currentSlide, setCurrentSlide] = useState(0); // 슬라이드 인덱스 관리
  const navigate = useNavigate();
  const userId = "1"; // 현재 로그인한 사용자 ID (테스트 값, 실제 구현에서는 동적으로 할당)
  const [replyContent, setReplyContent] = useState({}); // 대댓글 입력 상태
  
  //   const { user } = useAuth();
  //   const userId = user?.id; // 로그인한 사용자 ID

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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("Fetching post with ID:", communityId);
  
        // 게시물 데이터 가져오기
        const postData = await CommunityApi.fetchPostById(communityId);
        
  
        // 이미지 URL 디버깅
        if (postData.imageUrls && postData.imageUrls.length > 0) {
          console.log("Fetched Image URLs:", postData.imageUrls); // 이미지 URL 출력
        } else {
          console.warn("이미지 URL이 비어 있습니다.");
        }
  
        // 댓글 데이터 가져오기
        const commentsData = await CommentApi.fetchCommentsByCommunityId(communityId);
        

        const isLikedStatus = await LikeApi.checkIsLiked(communityId, userId);
        const likeCountData = await LikeApi.getLikeCount(communityId);

        // 상태 설정
        setPost(postData);
        setIsLiked(postData.isLiked || false);
        setLikeCount(postData.likeCount ?? 0);
        setComments(commentsData || []);
      } catch (error) {
        console.error("게시물 데이터를 가져오는 중 오류 발생:", error);
      }
    };
  
    fetchPost();
  }, [communityId]);
  

  useEffect(() => {
    const fetchLikeData = async () => {
      try {
        const isLikedStatus = await LikeApi.checkIsLiked(communityId, userId);
        const likeCount = await LikeApi.getLikeCount(communityId);
    
        setIsLiked(isLikedStatus);
        setLikeCount(likeCount);
      } catch (error) {
        console.error("좋아요 데이터 불러오기 오류:", error);
      }
    };
  
    fetchLikeData();
  }, [communityId, userId]);

  
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        const status = await fetchBookmarkStatus(userId, communityId);
        setIsBookmarked(status); // API에서 가져온 북마크 상태 반영
      } catch (error) {
        console.error("북마크 상태 불러오기 오류:", error);
      }
    };

    checkBookmarkStatus();
  }, [userId, communityId]); // 페이지 진입 시 북마크 상태 확인

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
    if (!timestamp) return "시간 없음"; // `timestamp`가 없을 경우 기본값 반환

    const now = new Date();
    const commentTime = new Date(timestamp); // ISO 형식 변환
    const diff = Math.floor((now - commentTime) / 1000); // 초 단위 차이 계산

    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };


    // ✅ 좋아요 토글 함수 (중복 실행 방지 포함)
    const toggleLike = async () => {
      if (isLiking) return;
      setIsLiking(true);
  
      try {
        setIsLiked((prev) => !prev);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  
        // 좋아요 상태 변경 API 호출
        const { isLiked: updatedIsLiked, likes: updatedLikeCount } =
          await LikeApi.toggleLikePost(communityId, userId);
  
        console.log("좋아요 상태:", updatedIsLiked, "좋아요 개수:", updatedLikeCount);
  
        // API에서 최신 개수 다시 불러오기
        const latestLikeCount = await LikeApi.getLikeCount(communityId);
        setIsLiked(updatedIsLiked);
        setLikeCount(latestLikeCount);
      } catch (error) {
        console.error("좋아요 처리 중 오류 발생:", error);
      } finally {
        setIsLiking(false);
      }
    };
    
  const handleLike = async () => {
    try {
      // API 요청을 먼저 보낸 후, 응답 데이터를 기반으로 상태 업데이트
      const { isLiked: updatedIsLiked, likes: updatedLikeCount } =
        await LikeApi.toggleLikePost(communityId, userId);
  
      console.log("📌 좋아요 상태 업데이트:", updatedIsLiked, "좋아요 개수:", updatedLikeCount);
  
      setIsLiked(updatedIsLiked); // 최신 좋아요 상태 반영
      setLikeCount(updatedLikeCount); // 최신 좋아요 개수 반영
    } catch (error) {
      console.error("❌ 좋아요 처리 중 오류 발생:", error);
    }
  };
  

  // 게시물 삭제
  const handleDeletePost = async () => {
    const confirmDelete = window.confirm(
      "정말로 이 게시물을 삭제하시겠습니까?"
    );
    if (!confirmDelete) return; // 사용자가 취소하면 중단

    try {
      await CommunityApi.deletePost(communityId, userId); // userId 추가하여 삭제 요청
      alert("게시물이 삭제되었습니다.");
      navigate("/"); // 삭제 후 메인 페이지(또는 목록)로 이동
    } catch (error) {
      console.error("게시물 삭제 중 오류 발생:", error);
      alert("게시물 삭제에 실패했습니다.");
    }
  };

  const handleEditPost = () => {
    if (!post) return;
    navigate(`/edit/${post.id}`, { state: { postData: post } });
  };

  // 📌 댓글 추가 (useEffect 바깥으로 이동)
const handleAddComment = async () => {
  if (newComment.trim()) {
    try {
      const newCommentData = await CommentApi.addComment(
        communityId,
        userId,
        newComment
      ); // userId를 1로 예시 지정
      setComments([...comments, newCommentData]); // 기존 댓글에 새 댓글 추가
      setNewComment("");
    } catch (error) {
      console.error("댓글 추가 중 오류 발생:", error);
    }
  }
};

// 📌 대댓글 추가 (useEffect 바깥으로 이동)
const handleAddReply = async (commentId) => {
  console.log("📌 클릭된 댓글 ID:", commentId);

  // reply 객체에 해당 commentId에 대한 값이 존재하고 공백이 아닌지 확인
  if (reply[commentId]?.trim()) {
    try {
      const userId = localStorage.getItem("userId");
      console.log("📌 대댓글 API 요청 데이터:", {
        commentId,
        userId,
        content: reply[commentId],
      });

      const newReplyData = await CommentApi.addReply(
        commentId,
        userId,
        reply[commentId]
      );

      // 댓글 목록 업데이트: 해당 댓글의 대댓글 배열에 새 대댓글 추가
      setComments((prevComments) =>
        prevComments.map((comment) =>
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

  const handleBookmark = async () => {
    try {
      const updatedBookmarkStatus = await toggleBookmark(userId, communityId);
      setIsBookmarked(updatedBookmarkStatus); // UI 업데이트

      if (updatedBookmarkStatus) {
        alert("게시물이 북마크에 추가되었습니다! 📌");
      } else {
        alert("북마크가 해제되었습니다.");
      }
    } catch (error) {
      alert("북마크 변경 중 오류 발생!");
    }
  };
  

  const handleReportSubmit = async () => {
    if (!selectedReason) {
      alert("신고 사유를 선택해주세요.");
      return;
    }
  
    try {
      await ReportApi.reportPost("community", communityId, userId, selectedReason);
      alert("신고가 접수되었습니다!");
  
      // ✅ 신고한 게시물을 localStorage에 저장하여 숨김
      const reportedPosts = JSON.parse(localStorage.getItem("reportedPosts") || "[]");
      if (!reportedPosts.includes(communityId)) {
        reportedPosts.push(communityId);
        localStorage.setItem("reportedPosts", JSON.stringify(reportedPosts));
      }
  
      setIsReportOpen(false);
      navigate("/community"); // ✅ 신고 후 홈으로 이동 (필요 시)
    } catch (error) {
      console.error("🚨 신고 요청 오류:", error);
      alert("신고 중 오류가 발생했습니다.");
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
            <span className="date">
              {post.createdAt ? getRelativeTime(post.createdAt) : "시간 없음"}
            </span>{" "}
            {/* 게시물 업로드 시간 표시 */}
          </div>
        </div>

        {/* 점 3개 버튼 */}
        <div className="menu-container">
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ⋮
          </button>
          {menuOpen && (
            <ul className="menu-dropdown">
              <li>
                <button className="edit-button" onClick={handleEditPost}>
                  수정
                </button>
              </li>
              <li>
                <button className="bookmark-button" onClick={handleBookmark}>
                  <img
                    src={isBookmarked ? bookmarkActive : bookmarkDefault}
                    alt="북마크"
                  />
                  {isBookmarked ? " 북마크 해제" : " 북마크"}
                </button>
              </li>
              <li>
                <button className="delete-button" onClick={handleDeletePost}>
                  삭제
                </button>
              </li>
              <li>
                <button
                  className="report-button"
                  onClick={() => setIsReportOpen(true)}
                >
                  신고
                </button>
              </li>
            </ul>
          )}
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
              const { isLiked: updatedIsLiked, likes: updatedLikeCount } =
              await LikeApi.toggleLikePost(communityId, userId); // ✅ LikeApi에서 가져오기

              setIsLiked(updatedIsLiked); // 좋아요 상태 업데이트
              setLikeCount(updatedLikeCount); // 좋아요 수 업데이트
            } catch (error) {
              console.error("좋아요 처리 중 오류 발생:", error);
            }
          }}
          style={{
            color: isLiked ? "red" : "black",
            fontSize: "18px",
            cursor: "pointer",
            border: "none",
            background: "none",
          }}
        >
          <button className="like-button" onClick={toggleLike}>
            {isLiked ? "❤️" : "🤍"} {likeCount}
          </button>
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
                    {comment.createdAt
                      ? getRelativeTime(comment.createdAt)
                      : "시간 없음"}
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
                  value={reply[comment.commentId] ?? ""}
                  onChange={(e) =>
                    setReply((prevReply) => ({
                      ...prevReply,
                      [comment.commentId]: e.target.value,
                    }))
                  }
                />
                <button onClick={() => handleAddReply(comment.commentId)}>
                  등록
                </button>
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
