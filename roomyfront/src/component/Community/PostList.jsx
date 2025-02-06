// import React from "react";
// import { Link } from "react-router-dom"; // Link 추가
// import "../../css/PostList.css";

// const PostList = ({ posts }) => {
//   return (
//     <div className="post-list">
//       {posts.length > 0 &&
//         posts.map((post) => (
//           <Link to={`/post/${post.id}`} key={post.id} className="post-link"> {/* 게시글 클릭 시 상세 페이지로 이동 */}
//             <div className="post-card">
//               <div className="post-content-container">
//                 {/* 게시물 헤더 */}
//                 <div className="post-header">
//                   <div className="post-username">내 이름 {post.username}</div>
//                   <div className="post-time">{post.timeAgo}</div>
//                 </div>

//                 {/* 게시물 본문 */}
//                 <div className="post-body">
//                   <div className="post-title">{post.title}</div>
//                   <div className="post-content">{post.content}</div>
//                 </div>

//                 {/* 게시물 하단 (좋아요, 댓글 수) */}
//                 <div className="post-footer">
//                   <div className="post-likes">❤️ {post.likes}</div>
//                   <div className="post-comments">💬 {post.comments}</div>
//                 </div>
//               </div>

//               {/* 게시물 이미지 */}
//               <div className="post-image-container">
//                 <img src={post.imageUrl} alt="post" className="post-image" />
//               </div>
//             </div>
//           </Link>
//         ))}
//     </div>
//   );
// };

// export default PostList;




import React from "react";
import { Link } from "react-router-dom"; // Link 추가
import "../../css/PostList.css";

// 상대적인 시간 계산 함수
const getRelativeTime = (dateString) => {
  const now = new Date();
  const postDate = new Date(dateString);
  const diffInSeconds = Math.floor((now - postDate) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}초 전`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  return `${Math.floor(diffInSeconds / 86400)}일 전`;
};

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Link
            to={`/post/${post.id}`}
            key={post.id}
            className="post-link"
          >{/* 게시글 클릭 시 상세 페이지로 이동 */}
            <div className="post-card">
              <div className="post-content-container">
                {/* 게시물 헤더 */}
                <div className="post-header">
                  <div className="post-username">작성자: {post.username || "익명"}</div>
                  <div className="post-time">{getRelativeTime(post.date)}</div>
                </div>

                {/* 게시물 본문 */}
                <div className="post-body">
                  <div className="post-title">{post.title}</div>
                  <div className="post-content">{post.content}</div>
                </div>

                {/* 게시물 하단 (좋아요, 댓글 수) */}
                <div className="post-footer">
                  <div className="post-likes">❤️ {post.likes || 0}</div>
                  <div className="post-comments">💬 {post.comments || 0}</div>
                </div>
              </div>

              {/* 게시물 이미지 */}
              {post.imageUrl && (
                <div className="post-image-container">
                  <img src={post.imageUrl} alt="post" className="post-image" />
                </div>
              )}
            </div>
          </Link>
        ))
      ) : (
        <p className="no-posts">게시물이 없습니다. 게시물을 작성해주세요!</p>
      )}
    </div>
  );
};

export default PostList;
