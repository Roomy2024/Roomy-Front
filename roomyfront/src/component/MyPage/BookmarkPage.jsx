import React, { useEffect, useState } from "react";
import { fetchUserBookmarks } from "../../api/BookmarkApi";
import CommunityApi from "../../api/CommunityApi";  
import { useNavigate } from "react-router-dom";
import "../../css/BookmarkPage.css";

export const fixImageUrl = (url) => {
  if (!url) return "/default-thumbnail.jpg";
  if (url.startsWith("http")) return url;
  return `http://43.202.98.145:8000/api${url}`;
};

// ✅ 상대적 시간 계산 함수 추가
const getRelativeTime = (timestamp) => {
  if (!timestamp) return "시간 정보 없음";

  const now = new Date();
  const postTime = new Date(timestamp);
  const diff = Math.floor((now - postTime) / 1000);

  if (diff < 0) return "방금 전";
  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
};

const BookmarkPage = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const userId = localStorage.getItem("user_id") || null;
  const navigate = useNavigate();

  useEffect(() => {
    const loadBookmarks = async () => {
      if (!userId) {
        console.warn("유저 정보가 없습니다. 로그인해주세요.");
        return;
      }

      const bookmarks = await fetchUserBookmarks(userId);

      const fetchPostDetails = async () => {
        const postDetails = await Promise.all(
          bookmarks.map(async (bookmark) => {
            const post = await CommunityApi.fetchPostById(bookmark.communityId);
            return post
              ? { 
                  ...bookmark,
                  ...post,
                  timeAgo: getRelativeTime(post.createdAt) // ✅ 여기에 추가
                }
              : bookmark;
          })
        );
        setBookmarkedPosts(postDetails);
      };

      fetchPostDetails();
    };

    loadBookmarks();
  }, [userId]);

  return (
    <div className="bookmark-container">
      <h2>북마크</h2>
      {bookmarkedPosts.length === 0 ? (
        <p>북마크한 게시물이 없습니다.</p>
      ) : (
        <div className="posts-container">
          {bookmarkedPosts.map((post) => (
            <div
              key={post.id}
              className="post-card"
              onClick={() => navigate(`/community/${post.communityId}`)}
            >
              <div className="post-info">
                <div className="post-title">{post.title || "제목 없음"}</div>
                <div className="post-meta">
                  <span>작성자: {post.author || "익명"}</span>
                  <span> · {post.timeAgo}</span> {/* ✅ 여기에 적용됨 */}
                </div>
                <div className="post-actions">
                  <div className="like-button">
                    {post.isLiked ? "❤️" : "🤍"} {post.likes ?? 0}
                  </div>
                  <div>💬 {post.comments ?? 0}</div>
                </div>
              </div>

              <img
                className="post-image"
                src={fixImageUrl(post.imageUrls?.[0] || post.thumbnail || "")}
                alt="게시물 이미지"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;
