import {
  faCamera,
  faCheckCircle,
  faPencil,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/ProfileChangePage.css";
import ImagePreviewer from "./ImagePreviewer";
import RegionSelector from "./RegionSelector";

function ProfileChangePage() {
  const [profileImage, setProfileImage] = useState(null); // 프로필 사진
  const [imagePreview, setImagePreview] = useState(null); // 프로필 사진 미리보기
  const [name, setName] = useState("Rommy"); // 사용자 이름: 임시로 기본값 설정
  const [address, setAddress] = useState("서울 종로구 청운동"); // 주소: 임시로 기본값 설정
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
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // 선택한 파일 가져오기
    if (file && file.type.startsWith("image/")) {
      setProfileImage(file);

      // 미리보기 생성
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // base64 URL 저장
      };
      reader.readAsDataURL(file); // 파일 읽기
    } else {
      alert("이미지 파일만 업로드할 수 있습니다.");
    }
  };
  const handleImageSave = async () => {
    if (profileImage) {
      const formData = new FormData();
      formData.append("profileImage", profileImage);

      try {
        const response = await axios.post("/api/profile/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setProfileImage(response.data.profileImage); // 업로드된 이미지 URL 반영
        setImagePreview(null);
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
      // TODO 임시 주석처리
      // await axios.put("/api/profile", { name }); // 이름 업데이트 API 호출
      setIsEditingName(false);
      // alert("이름이 성공적으로 변경되었습니다!");
    } catch (error) {
      console.error("이름 업데이트 중 오류 발생:", error);
      alert("이름 업데이트에 실패했습니다.");
    }
  };

  // 주소 수정 핸들러
  const handleAddressEdit = () => setIsEditingAddress(true);
  const handleAddressSave = async (address) => {
    try {
      // TODO 임시 주석처리
      // await axios.put("/api/profile", { address }); // 주소 업데이트 API 호출
      setIsEditingAddress(false);
      setAddress(address);
      // alert("주소가 성공적으로 변경되었습니다!");
    } catch (error) {
      console.error("주소 업데이트 중 오류 발생:", error);
      alert("주소 업데이트에 실패했습니다.");
    }
  };

  // 프로필 이미지가 변경된 경우, 이미지 미리보기 컴포넌트 렌더링
  if (imagePreview) {
    return (
      <ImagePreviewer
        image={imagePreview}
        onClickCancel={() => {
          setImagePreview(null);
          setProfileImage(null);
        }}
        onClickSave={handleImageSave}
      />
    );
  }

  // 주소 수정 상태가 true인 경우, 지역 선택 컴포넌트 렌더링
  if (isEditingAddress) {
    return (
      <RegionSelector
        address={address}
        onClickCancel={() => setIsEditingAddress(false)}
        onClickSave={handleAddressSave}
      />
    );
  }

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
            <div className="profile-placeholder">
              <FontAwesomeIcon icon={faUser} className="user-icon" size="3x" />
            </div>
          )}
        </div>
        <label className="file-label">
          <FontAwesomeIcon icon={faCamera} className="camera-icon" />
          <input
            type="file"
            accept="image/*"
            className="file-input"
            onChange={handleImageChange}
          />
        </label>
      </div>
      <div className="profile-info">
        <div className="info-container">
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="edit-input"
            readOnly={!isEditingName}
          />
          {isEditingName ? (
            <button className="edit-button" onClick={handleNameSave}>
              <FontAwesomeIcon icon={faCheckCircle} className="save-icon" />
            </button>
          ) : (
            <button className="edit-button" onClick={handleNameEdit}>
              <FontAwesomeIcon icon={faPencil} className="edit-icon" />
            </button>
          )}
        </div>
      </div>
      <div className="profile-info">
        <div className="info-container">
          <input
            type="text"
            value={address}
            className="edit-input"
            readOnly={true}
          />
          <button className="edit-button" onClick={handleAddressEdit}>
            <FontAwesomeIcon icon={faPencil} className="edit-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileChangePage;
