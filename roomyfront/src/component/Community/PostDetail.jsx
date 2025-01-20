
import React, { useState, useEffect } from "react";
import "../../css/PostDetail.css";
import { fetchPostById, toggleLikePost } from "../../api/PostApi"; // 게시물 API
import { addComment, addReply } from "../../api/CommentApi"; // 댓글 API
import bookmarkDefault from "../../asset/images/북마크 저장 전.png";
import bookmarkActive from "../../asset/images/북마크 저장 후.png";

const PostDetail = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [reply, setReply] = useState({});

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
        const data = await fetchPostById(postId);
        setPost(data);
        setIsLiked(data.isLiked);
        setLikeCount(data.likeCount);
        setComments(data.comments);
      } catch (error) {
        console.error("게시물 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchPost();
  }, [postId]);

  // 좋아요 토글
  const toggleLike = async () => {
    try {
      const updatedLikeCount = await toggleLikePost(postId);
      setIsLiked(!isLiked);
      setLikeCount(updatedLikeCount);
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  };

  // 댓글 추가
  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const newCommentData = await addComment(postId, newComment);
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

  // 상대적 시간 계산 함수
  const getRelativeTime = (timestamp) => {
    const now = Date.now();
    const diff = Math.floor((now - timestamp) / 1000);

    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };

  if (!post) return <p>게시물을 로드 중입니다...</p>;

  return (
    <div className="post-detail">
      {/* 게시물 헤더 */}
      <div className="post-header">
        <div className="profile">
          <img src={post.profileImage} alt="프로필" />
          <div>
            <h3>{post.username}</h3>
            <p>{post.location}</p>
          </div>
        </div>
        <button onClick={() => setIsBookmarked(!isBookmarked)}>
          <img
            src={isBookmarked ? bookmarkActive : bookmarkDefault}
            alt="북마크"
          />
        </button>
      </div>

      {/* 게시물 본문 */}
      <div className="post-content">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <img src={post.imageUrl} alt="게시물 이미지" />
      </div>

      {/* 게시물 푸터 */}
      <div className="post-footer">
        <button onClick={toggleLike}>
          {isLiked ? "❤️" : "🤍"} {likeCount}
        </button>
        <span>댓글: {comments.length}</span>
      </div>

      {/* 댓글 섹션 */}
      <div className="comment-section">
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <div>
                <strong>{comment.username}</strong>: {comment.content}
              </div>
              <ul>
                {comment.replies.map((reply) => (
                  <li key={reply.id}>
                    <strong>{reply.username}</strong>: {reply.content}
                  </li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="대댓글을 입력하세요"
                value={reply[comment.id] || ""}
                onChange={(e) =>
                  setReply({ ...reply, [comment.id]: e.target.value })
                }
              />
              <button onClick={() => handleAddReply(comment.id)}>
                대댓글 등록
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>댓글 등록</button>
      </div>

      {/* 신고 메뉴 */}
      {isReportOpen && (
        <div className="report-menu">
          <div>
            <h2>신고 사유를 선택하세요</h2>
            <ul>
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
            <button
              onClick={() => {
                if (!selectedReason) {
                  alert("신고 사유를 선택해주세요.");
                  return;
                }
                alert("신고가 접수되었습니다.");
                setIsReportOpen(false);
              }}
            >
              신고
            </button>
            <button onClick={() => setIsReportOpen(false)}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
