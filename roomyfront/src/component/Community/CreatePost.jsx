import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/CreatePost.css";
import { createPost } from "../../api/CommunityApi";

const CreatePost = ({ addNewPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]); // 다중 이미지 상태
  const [previews, setPreviews] = useState([]); // 미리보기 이미지 URL 배열
  const [tags, setTags] = useState([]); // 태그 상태
  const navigate = useNavigate();

  const tagOptions = ["게시판", "꿀 팁", "레시피"]; // 고정된 태그 목록

  // 다중 이미지 선택 핸들러
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // 선택된 파일 배열로 변환

    if (images.length + selectedFiles.length > 15) {
      alert("이미지는 최대 15개까지 업로드할 수 있습니다.");
      return;
    }

    setImages((prev) => [...prev, ...selectedFiles]); // 상태에 추가
    const newPreviews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews((prev) => [...prev, ...newPreviews]); // 미리보기 추가
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
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image); // 다중 이미지 추가
    });
    formData.append("type", tags.join(",")); // 태그 배열을 문자열로 변환 후 추가
    formData.append("userId", 1); // 고정된 userId 추가

    try {
      // createPost 함수 호출 후 반환값 저장
      const response = await createPost(formData); // API 호출
      console.log("API 응답:", response); // 성공적인 응답 확인
      alert("게시물이 저장되었습니다!");

      // 폼 초기화
      setTitle("");
      setContent("");
      setImages([]);
      setPreviews([]);
      setTags([]);

      if (addNewPost) addNewPost(response); // 새로운 게시물을 추가
      navigate("/Community"); // 커뮤니티 페이지로 이동
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
          이미지 업로드 (최대 15개)
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="create-post-file-input"
          onChange={handleImageChange}
          multiple // 다중 파일 선택 가능
        />
        <div className="image-previews">
          {previews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`미리보기 ${index + 1}`}
              className="create-post-image-preview"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
