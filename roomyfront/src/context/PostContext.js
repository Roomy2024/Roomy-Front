import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]); // ✅ 항상 배열을 유지하도록 초기값 설정
  const [selectedSort, setSelectedSort] = useState("최신순");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://43.202.98.145:8000/api/community/getall");

        console.log("📌 API 응답 데이터:", response.data); // ✅ 디버깅용 로그 추가

        if (Array.isArray(response.data.content)) {
          setPosts(response.data.content); // ✅ `content` 배열을 사용
        } else {
          console.error("⚠ 게시물 데이터가 배열이 아닙니다:", response.data);
          setPosts([]); // ✅ 안전 처리
        }
      } catch (error) {
        console.error("게시물 데이터를 가져오는 중 오류 발생:", error);
        setPosts([]); // ✅ 오류 발생 시 빈 배열로 설정
      }
    };

    fetchPosts();
  }, []);

  // ✅ 새로운 게시물 추가 시, 빈 배열을 기본값으로 설정
  const addNewPost = (newPost) => {
    setPosts((prevPosts = []) => [newPost, ...prevPosts]); // ✅ 안전한 배열 업데이트
  };

  // ✅ 정렬 함수 (최신순 & 좋아요순)
  const handleSort = (sortOption) => {
    setSelectedSort(sortOption);
  
    setPosts((prevPosts = []) => {
      let sortedPosts = [...prevPosts];
      if (sortOption === "최신순") {
        sortedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sortOption === "좋아요순") {
        sortedPosts.sort((a, b) => b.likeCount - a.likeCount);
      }
      return sortedPosts;
    });
  };
  

  return (
    <PostContext.Provider value={{ posts, setPosts, selectedSort, addNewPost, handleSort }}>
      {children}
    </PostContext.Provider>
  );
};
