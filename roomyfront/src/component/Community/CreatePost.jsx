
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "../../css/CreatePost.css";
import { createPost, updatePost } from "../../api/CommunityApi";

const CreatePost = ({ addNewPost }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const postData = location.state?.postData || null; // 기존 게시물 데이터 가져오기
  const { id: postIdFromParams } = useParams(); // URL에서 postId 가져오기
  const postId = postData?.id || postIdFromParams; // postData 없으면 URL에서 가져옴

  const [title, setTitle] = useState(postData?.title || "");
  const [content, setContent] = useState(postData?.content || "");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState(postData?.images || []);
  const [tags, setTags] = useState(postData?.type ? postData.type.split(",") : []);
  const [isEditing, setIsEditing] = useState(!!postData); // 수정 모드 여부 확인

  useEffect(() => {
    if (postData && postData.images) {
      setPreviews(postData.images);
    }
  }, [postData]);

  // 이미지 변경 핸들러
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // 미리보기 URL 생성
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviews(previews);
  };

  // 태그 선택 핸들러
  const handleTagToggle = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  // 게시물 제출 핸들러 (작성 + 수정 통합)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData 객체 생성
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
    formData.append("type", tags.join(","));
    formData.append("userId",1); // 고정된 userId (동적으로 변경 가능)

    try {
      if (isEditing) {
        // 기존 게시물 수정
        await updatePost(postData.id, formData);
        alert("게시물이 수정되었습니다!");
      } else {
        // 새 게시물 생성
        const response = await createPost(formData);
        console.log("API 응답:", response);
        alert("게시물이 저장되었습니다!");

        if (addNewPost) addNewPost(response); // 새로운 게시물을 추가
      }

      navigate("/Community"); // 커뮤니티 페이지로 이동
    } catch (error) {
      console.error("게시물 저장 중 오류 발생:", error);
    }
  };

  return (
    <div className="create-post-container">
      <button type="submit" className="create-post-submit" onClick={handleSubmit}>
        {isEditing ? "수정 완료" : "작성 완료"}
      </button>

      <h1>{isEditing ? "게시물 수정" : "게시물 작성"}</h1>

      <form>
        <div>
          <label>제목</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="create-post-input" />
        </div>
        <div>
          <label>내용</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required className="create-post-textarea" />
        </div>
      </form>

      <div className="create-post-tags">
        <label>태그</label>
        <div className="tag-options">
          {["게시판", "꿀  팁", "레시피"].map((tag) => (
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
        <input id="file-upload" type="file" accept="image/*" className="create-post-file-input" onChange={handleImageChange} multiple />
        <div className="image-previews">
          {previews.map((preview, index) => (
            <img key={index} src={preview} alt={`미리보기 ${index + 1}`} className="create-post-image-preview" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
