import React, { useState } from "react";
import "../../css/CreatePost.css";
import { createPost } from "../../api/PostApi"; // 게시물 생성 API 호출 함수

const CreatePost = ({ addNewPost }) => { // addNewPost 함수 props로 받음
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // 이미지 상태
  const [preview, setPreview] = useState(null); // 미리보기 이미지 URL
  const [tags, setTags] = useState([]); // 선택된 태그 상태

  const tagOptions = ["게시판", "꿀 팁", "레시피"]; // 고정된 태그 목록

  // 이미지 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // 미리보기 URL 생성
    }
  };

  // 태그 선택/해제 핸들러
  const handleTagToggle = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag)); // 선택 해제
    } else {
      setTags([...tags, tag]); // 선택 추가
    }
  };

  // 게시물 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData 객체 생성
    const formData = new FormData();
    formData.append("title", title); // 제목 추가
    formData.append("content", content); // 내용 추가
    if (image) {
      formData.append("images", image); // 이미지 파일 추가
    }
    formData.append("type", tags.join(",")); // 태그 배열을 문자열로 변환 후 추가
    formData.append("userId", 1); // 고정된 userId 추가

    try {
      await createPost(formData); // API 호출
      alert("게시물이 저장되었습니다!");
      // 폼 초기화
      setTitle("");
      setContent("");
      setImage(null);
      setPreview(null);
      setTags([]);
      if (addNewPost) addNewPost(formData); // 새로운 게시물을 추가
    } catch (error) {
      console.error("게시물 저장 중 오류 발생:", error);
    }
  };

  return (
    <div className="create-post-container">
      <button
        type="submit"
        className="create-post-submit"
        onClick={handleSubmit}
      >
        작성 완료
      </button>

      <h1>게시물 작성</h1>

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

      <div className="create-post-tags">
        <label>태그</label>
        <div className="tag-options">
          {tagOptions.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`tag-option ${tags.includes(tag) ? "selected" : ""}`}
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

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
