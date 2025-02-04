import React, { useEffect, useState } from "react";
import { fetchUserBookmarks } from "../../api/BookmarkApi";
import { fetchPostById } from "../../api/CommunityApi"; // 개별 게시글 정보 가져오기
import { useNavigate } from "react-router-dom";
import "../../css/BookmarkPage.css";

export const fixImageUrl = (url) => {
  if (!url) return "/default-thumbnail.jpg"; // 기본 이미지 설정
  if (url.startsWith("http")) return url; // 절대 URL이면 그대로 사용
  return `http://43.202.98.145:8000/api${url}`; // 상대 URL이면 변환
};

const BookmarkPage = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const userId = "2"; // TODO: 실제 로그인된 유저 ID로 변경
  const navigate = useNavigate();

  useEffect(() => {
    const loadBookmarks = async () => {
      const bookmarks = await fetchUserBookmarks(userId);
      console.log("📌 북마크 API 응답 데이터:", bookmarks);

      // 북마크된 게시글의 communityId를 이용해 개별 게시글 정보 가져오기
      const fetchPostDetails = async () => {
        const postDetails = await Promise.all(
          bookmarks.map(async (bookmark) => {
            const post = await fetchPostById(bookmark.communityId);
            return post ? { ...bookmark, ...post } : bookmark; // 게시글 정보 병합
          })
        );
        console.log("📌 게시글 정보 추가된 북마크 데이터:", postDetails);
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
                  <span> · {post.timeAgo || "시간 정보 없음"}</span>
                </div>
                <div className="post-actions">
                  <div className="like-button">
                    {post.isLiked ? "❤️" : "🤍"} {post.likes ?? 0}
                  </div>
                  <div>💬 {post.comments ?? 0}</div>
                </div>
              </div>

              {/* 대표 이미지 표시 (게시글 이미지가 있으면 첫 번째 이미지 사용) */}
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
