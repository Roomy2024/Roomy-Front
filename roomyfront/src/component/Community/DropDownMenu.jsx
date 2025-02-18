import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../css/DropDownMenu.css";
import CommunityApi from "../../api/CommunityApi";
import LikeApi from "../../api/LikeApi";

const userId = localStorage.getItem("userId") || "guest";
const pageSize = 10;

const formatNumber = (number) => {
  if (number === undefined || number === null) return "0";
  if (number >= 10000) return (number / 10000).toFixed(1) + "만";
  return number.toString();
};

const getRelativeTime = (timestamp) => {
  if (!timestamp) return "시간 없음";

  const now = new Date();
  const commentTime = new Date(timestamp);
  const diff = Math.floor((now - commentTime) / 1000);

  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
};

export const fixImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `http://43.202.98.145:8000/api${url}`;
};

const DropDownMenu = () => {
  const [posts, setPosts] = useState([]);
  const [postDetails, setPostDetails] = useState({});
  const [isLiking, setIsLiking] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  // 추가된 상태 변수들
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("전체");
  const [selectedSort, setSelectedSort] = useState("최신순"); // 선택된 정렬 옵션

  const menuItems = ["전체", "게시판", "꿀팁", "레시피"];
  const sortOptions = ["최신순", "좋아요순"];

  const handleSort = (option) => {
    setSelectedSort(option);
  };


      // ✅ 게시물 로드 함수 (페이지별로 10개씩 가져오기)
  // const fetchPosts = async (page) => {
  //   try {
  //     //신고된 게시물 목록 가져오기
  //     const reportedPosts = JSON.parse(localStorage.getItem("reportedPosts") || "[]");

  //     const posts = await CommunityApi.fetchPosts(page, pageSize);
  //     console.log("🔍 API 응답 데이터:", posts);
      
  //     //신고된 게시물 숨기기
  //     const filteredPosts = posts.filter(post => !reportedPosts.includes(post.communityId));
  //     setPosts(filteredPosts);

  //     if (!posts || posts.length === 0) {
  //       console.warn("⚠ 데이터가 없습니다. 페이지 번호를 확인하세요.");
  //       setHasMore(false);
  //       return;
  //     }
  
  //     // ✅ createdAt을 상대적 시간으로 변환하여 추가
  //     const formattedPosts = posts.map((post) => ({
  //       ...post,
  //       timeAgo: getRelativeTime(post.createdAt),
  //     }));
  
  //     // ✅ 기존 posts와 새로운 posts를 합친 후 중복 제거
  //     setPosts((prevPosts = []) => {
  //       const mergedPosts = [...prevPosts, ...formattedPosts];
        
  //       // ✅ 중복 제거: communityId가 같은 데이터는 한 번만 유지
  //       const uniquePosts = mergedPosts.reduce((acc, post) => {
  //         if (!acc.find((p) => p.communityId === post.communityId)) {
  //           acc.push(post);
  //         }
  //         return acc;
  //       }, []);
  
  //       return uniquePosts;
  //     });
  
  //   } catch (error) {
  //     console.error("게시물 불러오기 오류:", error);
  //   }
  // };
  // ✅ 게시물 불러오기 (정렬 옵션 추가)
  const fetchPosts = async (category, sortOption) => {
    try {
      console.log(`📌 선택한 카테고리: ${category}, 정렬 방식: ${sortOption}`);
      const posts = await CommunityApi.fetchPosts(0, 10, category);

      if (!posts || posts.length === 0) {
        setHasMore(false);
        return;
      }

      const formattedPosts = posts.map((post) => ({
        ...post,
        timeAgo: getRelativeTime(post.createdAt),
      }));

      // ✅ 정렬 적용 (최신순 또는 좋아요순)
      let sortedPosts;
      if (sortOption === "최신순") {
        sortedPosts = formattedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sortOption === "좋아요순") {
        sortedPosts = formattedPosts.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
      }

      setPosts(sortedPosts);
    } catch (error) {
      console.error("❌ 게시물 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchPosts(selectedCategory, selectedSort);
  }, [selectedCategory, selectedSort]);

  useEffect(() => {
    if (posts.length > 0) fetchPostDetails(posts);
  }, [posts]);

  const fetchPostDetails = async (posts) => {
    try {
      const details = {};
      for (const post of posts) {
        const postData = await CommunityApi.fetchPostById(post.communityId);
        details[post.communityId] = {
          likes: postData.likeCount || 0,
          comments: postData.totalCommentCount || 0,
        };
      }
      setPostDetails((prev) => ({ ...prev, ...details }));
    } catch (error) {
      console.error("게시물 상세 정보 가져오기 오류:", error);
    }
  };

  const toggleLike = async (id) => {
    if (isLiking[id]) return;
    setIsLiking((prev) => ({ ...prev, [id]: true }));

    try {
      const { isLiked: updatedIsLiked, likes: updatedLikeCount } =
        await LikeApi.toggleLikePost(id, userId);

      setPostDetails((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          likes: updatedLikeCount,
          isLiked: updatedIsLiked,
        },
      }));
    } catch (error) {
      console.error("좋아요 토글 오류:", error);
    } finally {
      setIsLiking((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="dropdown-container">
      {/* 드롭다운 메뉴 */}
      <div className="menu-container">
        <button
          className={`dropdown-button ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {selectedMenuItem}
        </button>
        <div className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
          {menuItems.map((item) => (
            <div
              key={item}
              className="dropdown-item"
              onClick={() => {
                setSelectedMenuItem(item);
                setIsMenuOpen(false);
                setSelectedCategory(item);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* 정렬 기준 */}
      <div className="sort-container">
        {sortOptions.map((option) => (
          <label key={option} style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              name="sort"
              value={option}
              checked={selectedSort === option}
              onChange={() => handleSort(option)}
            />
            {option}
          </label>
        ))}
      </div>

      {/* 게시물 목록 */}
      <div className="posts-container">
        {posts.map((post, index) => (
          <Link
            to={`/community/${post.communityId}`}
            key={post.communityId || `post-${index}`}
            className="post-card"
          >
            <div className="post-info">
              <div className="post-title">{post.title}</div>
              <div className="post-meta">
                <span>작성자: {post.author || "익명"}</span>
                <span> · {post.timeAgo}</span>
              </div>

              {/* 좋아요 및 댓글 수 */}
              <div className="post-actions">
                <div
                  className="like-button"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleLike(post.communityId);
                  }}
                >
                  {postDetails[post.communityId]?.likes > 0 ? "❤️" : "🤍"}{" "}
                  {formatNumber(postDetails[post.communityId]?.likes || 0)}
                </div>
                <div>💬 {formatNumber(postDetails[post.communityId]?.comments || 0)}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DropDownMenu;
