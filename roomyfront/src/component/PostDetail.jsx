
import React, { useState } from "react";
import "../css/PostDetail.css";
import sampleImage from "../assets/images/안승현.jpg"; // 로컬 이미지 import

const PostDetail = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(9); // 초기 좋아요 수
  const [comments, setComments] = useState(["좋은 글이네요!", "감사합니다!"]); // 초기 댓글
  const [newComment, setNewComment] = useState(""); // 새로운 댓글 입력 상태

  // 게시물 데이터
  const post = {
    username: "재현",
    profileImage: "https://via.placeholder.com/50", // 임시 프로필 이미지
    location: "서울 중구", // 거주 지역
    title: "인생이 힘들어요",
    content: `퓨항항항항항항항항
            무야호우하하하하항\n\n무릎이 아파요.`,
    date: "5분 전",
    imageUrl: sampleImage, // 로컬 이미지를 게시물 이미지로 사용
    likeCount: likeCount,
    commentCount: comments.length,
  };

  // 좋아요 버튼 클릭
  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  // 댓글 추가 함수
  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]); // 댓글 추가
      setNewComment(""); // 입력창 초기화
    }
  };

  return (
    <div className="post-detail">
      {/* 게시물 헤더 */}
      <div className="post-header">
        <div className="profile">
          <img src={post.profileImage} alt="프로필" className="profile-image" />
          <div className="profile-info">
            <span className="username">{post.username}</span>
            <span className="location">{post.location}</span>
            <span className="date">{post.date}</span>
          </div>
        </div>
        <div className="actions">
          <button className="bookmark-button">🔖</button>
          <button className="report-button">신고</button>
        </div>
      </div>

      {/* 게시물 본문 */}
      <div className="post-content">
        <h1 className="title">{post.title}</h1>
        <p className="content">{post.content}</p>
        <img
          src={post.imageUrl} // 로컬 이미지 사용
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
            {comments.map((comment, index) => (
              <li key={index} className="comment-item">
                {comment}
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
    </div>
  );
};

export default PostDetail;
