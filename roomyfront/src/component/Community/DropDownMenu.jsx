import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/DropDownMenu.css";
import { fetchPosts } from "../../api/PostApi";

// 숫자를 포맷팅하는 함수 (ex: 10000 이상 -> "1.0만")
const formatNumber = (number) => {
  if (number === undefined || number === null) {
    return "0";
  }
  if (number >= 10000) {
    return (number / 10000).toFixed(1) + "만";
  }
  return number.toString();
};

const DropDownMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 드롭다운 메뉴 열림/닫힘 상태
  const [selectedSort, setSelectedSort] = useState("최신순"); // 정렬 기준
  const [selectedMenuItem, setSelectedMenuItem] = useState("게시판"); // 선택된 메뉴 항목
  const [posts, setPosts] = useState([]); // 게시물 목록 상태

  // 초기 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPosts(); // API로 게시물 데이터 가져오기
        console.log("게시물 출력 로그", data); // 게시물 데이터를 로그로 출력 코드
        setPosts(data); // 게시물 상태 업데이트
      } catch (error) {
        console.error("게시물을 가져오는 중 오류 발생:", error);
      }
    };
    fetchData();
  }, []);

  // 정렬 기준 변경 함수
  const handleSort = (sortOption) => {
    setSelectedSort(sortOption); // 선택된 정렬 기준 업데이트
    const sortedPosts = [...posts];

    if (sortOption === "최신순") {
      sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date)); // 최신순 정렬
    } else if (sortOption === "좋아요순") {
      sortedPosts.sort((a, b) => b.likes - a.likes); // 좋아요순 정렬
    }

    setPosts(sortedPosts); // 정렬된 게시물 목록 업데이트
  };

  // 좋아요 버튼 클릭 시 동작
  const toggleLike = async (community, id) => {
    if (!community || !id) {
      console.error("유효하지 않은 type 또는 id입니다.", { community, id });
      return;
    }

    try {
      const response = await fetch(`/likes/community/${id}/like-toggle`, {
        method: "POST",
      });

      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === id
              ? {
                  ...post,
                  likes: post.isLiked ? post.likes - 1 : post.likes + 1, // 좋아요 증가/감소
                  isLiked: !post.isLiked, // 좋아요 상태 반전
                }
              : post
          )
        );
      } else {
        console.error("좋아요 토글 실패:", response.statusText);
      }
    } catch (error) {
      console.error("좋아요 토글 중 오류 발생:", error);
    }
  };

  const menuItems = ["게시판", "꿀팁", "레시피"]; // 드롭다운 항목
  const sortOptions = ["최신순", "좋아요순"]; // 정렬 기준

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
  {posts.map((post) => (
    <Link
      to={`/community/${post.communityId}`} // communityId를 PostDetail로 전달
      key={post.communityId}
      className="post-card"
    >
      <div className="post-info">
        {/* 게시물 제목 */}
        <div className="post-title">{post.title}</div>

        {/* 작성자 닉네임과 작성 시간 */}
        <div className="post-meta">
          <span>
            작성자: {post.author || "익명"} {/* username이 없는 경우 "익명" 표시 */}
          </span>
          <span> · {post.timeAgo}</span>
        </div>

        {/* 좋아요 및 댓글 수 */}
        <div className="post-actions">
          <div
            className="like-button"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              toggleLike("post", post.communityId); // 좋아요 토글
            }}
          >
            {post.isLiked ? "❤️" : "🤍"} {formatNumber(post.likes)}
          </div>
          <div>💬 {formatNumber(post.comments)}</div>
        </div>
      </div>

{/* 게시물 이미지 */}
{post.imageUrls && post.imageUrls.length > 0 ? (
  <img
    className="post-image"
    src={`http://localhost:8000/api${post.imageUrls[0]}`} // 첫 번째 이미지 URL 가공
    alt="게시물 이미지"
  />
) : (
  <div className="no-image">이미지 없음</div> // 이미지가 없는 경우
)}
    </Link>
  ))}
</div>

    </div>
  );
};

export default DropDownMenu;
