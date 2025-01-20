import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/DropDownMenu.css";
import { fetchPosts } from "../../api/PostApi";


// 숫자를 포맷팅하는 함수
const formatNumber = (number) => {
  if (number === undefined || number === null) {
    return "0"; // undefined나 null일 경우 기본값 반환
  }
  if (number >= 10000) {
    return (number / 10000).toFixed(1) + "만"; // 10000 이상이면 "1.0만" 형식으로 변환
  }
  return number.toString(); // 그 외는 그대로 반환
};

const DropDownMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 드롭다운 메뉴 열림/닫힘 상태
  const [selectedSort, setSelectedSort] = useState("최신순"); // 정렬 기준
  const [selectedMenuItem, setSelectedMenuItem] = useState("게시판"); // 선택된 메뉴 항목
  const [posts, setPosts] = useState([]); // 게시물 목록 상태

  // 초기 데이터를 가져오는 함수 (더미 버전)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const examplePosts = [
  //       {
  //         id: 1,
  //         username: "김재현",
  //         timeAgo: "5분 전",
  //         title: "인생이 힘들어요",
  //         content: "퓨항항항항항항항항",
  //         likes: 9000,
  //         isLiked: false,
  //         comments: 10023,
  //         date: "2024-12-20T15:30:00",
  //         imageUrl: "https://via.placeholder.com/100",
  //       },
  //       {
  //         id: 2,
  //         username: "박준희",
  //         timeAgo: "10분 전",
  //         title: "오늘 날씨 좋다",
  //         content: "햇살이 따뜻하네요.",
  //         likes: 12000,
  //         isLiked: false,
  //         comments: 500,
  //         date: "2024-12-19T14:00:00",
  //         imageUrl: "https://via.placeholder.com/100",
  //       },
  //       {
  //         id: 3,
  //         username: "안승현",
  //         timeAgo: "1시간 전",
  //         title: "오늘은 운세가 좋아요!!",
  //         content: "하면 된다!!",
  //         likes: 13990,
  //         isLiked: false,
  //         comments: 999999,
  //         date: "2024-12-21T09:00:00",
  //         imageUrl: "https://via.placeholder.com/100",
  //       },
  //     ];
  //     setPosts(examplePosts); // 가져온 데이터를 상태로 설정
  //   };
  
  //초기 데이터 가져오는 함수
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPosts(); // API를 통해 데이터 가져오기
        setPosts(data);
      } catch (error) {
        console.error("게시물을 가져오는 중 오류 발생:", error);
      }
    };
    fetchData(); // 컴포넌트가 렌더링될 때 실행
  }, []);

  // 정렬 기준 변경 함수
  const handleSort = (sortOption) => {
    setSelectedSort(sortOption); // 선택된 정렬 기준 업데이트

    const sortedPosts = [...posts];
    if (sortOption === "최신순") {
      sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date)); // 최신순으로 정렬
    } else if (sortOption === "좋아요순") {
      sortedPosts.sort((a, b) => b.likes - a.likes); // 좋아요순으로 정렬
    }

    setPosts(sortedPosts); // 정렬된 데이터를 상태로 업데이트
  };

  // 좋아요 버튼 클릭 함수
  const toggleLike = (id) => {
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
  };

  const menuItems = ["게시판", "꿀팁", "레시피"]; // 드롭다운 항목
  const sortOptions = ["최신순", "좋아요순"]; // 정렬 옵션

  return (
    <div className="dropdown-container">
      {/* 드롭다운 메뉴 */}
      <div className="menu-container">
        <button
          className={`dropdown-button ${isMenuOpen ? "open" : ""}`} // 메뉴 열림/닫힘에 따라 클래스 변경
          onClick={() => setIsMenuOpen(!isMenuOpen)} // 버튼 클릭 시 메뉴 토글
        >
          {selectedMenuItem} {/* 선택된 메뉴 항목 표시 */}
        </button>
        <div className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
          {menuItems.map((item) => (
            <div
              key={item}
              className="dropdown-item"
              onClick={() => {
                setSelectedMenuItem(item); // 선택된 메뉴 항목 업데이트
                setIsMenuOpen(false); // 메뉴 닫기
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* 정렬 버튼 */}
      <div className="sort-container">
        {sortOptions.map((option) => (
          <label key={option} style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              name="sort"
              value={option}
              checked={selectedSort === option} // 현재 선택된 정렬 옵션
              onChange={() => handleSort(option)} // 정렬 기준 변경
            />
            {option}
          </label>
        ))}
      </div>

      {/* 게시물 목록 */}
      <div className="posts-container">
        {posts.map((post) => (
          <Link to={`/post/${post.id}`} key={post.id} className="post-card">
            <div className="post-info">
              <div className="post-title">{post.title}</div> {/* 게시물 제목 */}
              <div className="post-content">{post.content}</div> {/* 게시물 내용 */}
              <div className="post-meta">
                {post.username} · {post.timeAgo} {/* 작성자와 시간 */}
              </div>
              <div className="post-actions">
                <div
                  className="like-button"
                  onClick={(e) => {
                    e.preventDefault(); // Link 기본 동작 방지
                    toggleLike(post.id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {post.isLiked ? "❤️" : "🤍"} {formatNumber(post.likes)}
                </div>
                <div>💬 {formatNumber(post.comments)}</div> {/* 댓글 수 */}
              </div>
            </div>
            <img
              className="post-image"
              src={post.imageUrl} // 게시물 이미지
              alt={`${post.title}`} // 이미지 대체 텍스트
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DropDownMenu;




