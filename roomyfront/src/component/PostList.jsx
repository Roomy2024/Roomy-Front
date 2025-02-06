import React from "react";
import "../css/PostList.css";

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.length > 0 &&
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-content-container">
              {/* 게시물 헤더 */}
              <div className="post-header">
                <div className="post-username">내 이름 {post.username}</div>
                <div className="post-time">{post.timeAgo}</div>
              </div>

              {/* 게시물 본문 */}
              <div className="post-body">
                <div className="post-title">{post.title}</div>
                <div className="post-content">{post.content}</div>
              </div>

              {/* 게시물 하단 (좋아요, 댓글 수) */}
              <div className="post-footer">
                <div className="post-likes">❤️ {post.likes}</div>
                <div className="post-comments">💬 {post.comments}</div>
              </div>
            </div>

            {/* 게시물 이미지 */}
            <div className="post-image-container">
              <img src={post.imageUrl} alt="post" className="post-image" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
