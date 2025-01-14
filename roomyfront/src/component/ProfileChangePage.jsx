import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/ProfileChangePage.css";

function ProfileChangePage() {
  const [profileImage, setProfileImage] = useState(null); // 프로필 사진
  const [name, setName] = useState(""); // 사용자 이름
  const [address, setAddress] = useState(""); // 주소
  const [isEditingName, setIsEditingName] = useState(false); // 이름 수정 상태
  const [isEditingAddress, setIsEditingAddress] = useState(false); // 주소 수정 상태

  // 초기 데이터 로드 (GET 요청)
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/api/profile"); // 나중에 백엔드 연동
        setProfileImage(response.data.profileImage);
        setName(response.data.name);
        setAddress(response.data.address);
      } catch (error) {
        console.error("프로필 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchProfileData();
  }, []);

  // 프로필 사진 변경 핸들러
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const response = await axios.post("/api/profile/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setProfileImage(response.data.profileImage); // 업로드된 이미지 URL 반영
        alert("프로필 사진이 성공적으로 변경되었습니다!");
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
        alert("이미지 업로드에 실패했습니다.");
      }
    }
  };

  // 이름 수정 핸들러
  const handleNameEdit = () => setIsEditingName(true);
  const handleNameChange = (e) => setName(e.target.value);
  const handleNameSave = async () => {
    try {
      await axios.put("/api/profile", { name }); // 이름 업데이트 API 호출
      setIsEditingName(false);
      alert("이름이 성공적으로 변경되었습니다!");
    } catch (error) {
      console.error("이름 업데이트 중 오류 발생:", error);
      alert("이름 업데이트에 실패했습니다.");
    }
  };

  // 주소 수정 핸들러
  const handleAddressEdit = () => setIsEditingAddress(true);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleAddressSave = async () => {
    try {
      await axios.put("/api/profile", { address }); // 주소 업데이트 API 호출
      setIsEditingAddress(false);
      alert("주소가 성공적으로 변경되었습니다!");
    } catch (error) {
      console.error("주소 업데이트 중 오류 발생:", error);
      alert("주소 업데이트에 실패했습니다.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-image-container">
        <div className="profile-image-wrapper">
          {profileImage ? (
            <img
              src={profileImage}
              alt="프로필 사진"
              className="profile-image"
            />
          ) : (
            <div className="profile-placeholder">이미지 없음</div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="file-input"
          onChange={handleImageChange}
        />
        <label className="file-label">📷</label>
      </div>

      <div className="profile-info">
        {isEditingName ? (
          <div className="edit-container">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="edit-input"
            />
            <button className="save-button" onClick={handleNameSave}>
              저장
            </button>
          </div>
        ) : (
          <div className="info-container">
            <span>{name}</span>
            <button className="edit-button" onClick={handleNameEdit}>
              ✏️
            </button>
          </div>
        )}
      </div>

      <div className="profile-info">
        {isEditingAddress ? (
          <div className="edit-container">
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              className="edit-input"
            />
            <button className="save-button" onClick={handleAddressSave}>
              저장
            </button>
          </div>
        ) : (
          <div className="info-container">
            <span>{address}</span>
            <button className="edit-button" onClick={handleAddressEdit}>
              ✏️
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileChangePage;
