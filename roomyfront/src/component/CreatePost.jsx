import React, { useState } from "react";
import "../css/CreatePost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // 이미지 상태
  const [preview, setPreview] = useState(null); // 미리보기 이미지 URL

  // 이미지 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // 미리보기 URL 생성
    }
  };

  // 게시물 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // FormData 객체 생성
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    // 서버로 데이터 전송 (예: axios 사용)
    console.log("FormData:", formData);
    alert("게시물이 저장되었습니다!");
  };

  return (
    <div className="create-post-container">
      {/* 작성 완료 버튼 (우측 상단) */}
      <button type="submit" className="create-post-submit" onClick={handleSubmit}>
        작성 완료
      </button>

      <h1>게시물 작성</h1>

      {/* 게시물 입력 폼 */}
      <form>
        <div>
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="create-post-input"
          />
        </div>
        <div>
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="create-post-textarea"
          />
        </div>
      </form>

      {/* 이미지 업로드 버튼과 미리보기 */}
      <div className="create-post-image-upload">
        <label htmlFor="file-upload" className="create-post-upload-label">
          이미지 업로드
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="create-post-file-input"
          onChange={handleImageChange}
        />
        {preview && (
          <img
            src={preview}
            alt="미리보기"
            className="create-post-image-preview"
          />
        )}
      </div>
    </div>
  );
};

export default CreatePost;
