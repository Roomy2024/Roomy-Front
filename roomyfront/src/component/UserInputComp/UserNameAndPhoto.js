import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
  } from "react";
  import { TbPhoto } from "react-icons/tb";
  import { useMediaQuery } from "react-responsive";
  import "../../css/UserInputNameAndPhoto.css";  // <-- CSS 불러오기
  
  const UserNameAndPhoto = ({
    userName,
    setUserName,
    defaultImage,
    nextPossible,
    setNextPossible,
    photo,
    setPhoto,
    handlePhotoChange,
    handleNameChange
  }) => {
  
    const isDeskTop = useMediaQuery({ query: "(min-width:769px)" });
    const isMobile  = useMediaQuery({ query: "(max-width: 768px)" });
    const isTablet  = useMediaQuery({
      query: "(min-width: 769px) and (max-width: 859px)",
    });
  
    const fileInput = useRef(null);
  
    useEffect(() => {
      // photo가 아직 없으면 기본이미지로 설정
      if (photo === undefined || photo === null) {
        setPhoto(defaultImage);
      }
      // userName이 없으면 다음 버튼 비활성화
      if (!userName) {
        setNextPossible(false);
      } else {
        setNextPossible(true);
      }
    }, [userName, photo, nextPossible, defaultImage, setPhoto, setNextPossible]);
  
    const photoSelct = useCallback(() => {
      fileInput.current.click();
    }, []);
  
    const handleFileChange = useCallback(
      (event) => {
        const photoImg = event.target.files[0];
        setPhoto(photoImg);
      },
      [setPhoto]
    );
  
    const ProfilePhoto = useMemo(() => {
      return (
        <div className="profile-photo-wrapper" onChange={handlePhotoChange}>
          {photo && typeof photo === "object" ? (
            <img
              className="profile-photo"
              src={URL.createObjectURL(photo)}
              alt="profile preview"
            />
          ) : (
            <img
              className="profile-photo"
              src={photo}
              alt="profile preview"
            />
          )}
        </div>
      );
    }, [photo, handlePhotoChange]);
  
    const selectingPhoto = useMemo(() => {
      return (
        <div className="photo-icon-wrapper" onClick={photoSelct}>
          <input
            type="file"
            ref={fileInput}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />
          <TbPhoto className="photo-icon" />
        </div>
      );
    }, [photoSelct, handleFileChange]);
  
    return (
      <div className="userNameAndPhoto-container">
        {/* 프로필 + 닉네임 부분 */}
        <div className="group-16">
          {ProfilePhoto}
          {selectingPhoto}
        </div>
  
        {/* 이름 라벨 */}
        <div className="name-label">이름 (2-8자리 한글 및 영문)</div>
  
        {/* 실제 입력창 */}
        <div className="user-name-input-wrapper">
          <input
            className="name-input"
            value={userName || ""}
            maxLength={10}
            onChange={handleNameChange}
            placeholder="이름을 입력해주세요"
          />
          <div className="line-29"></div>
        </div>
  
        {/* 안내 문구 */}
        <p className="name-desc">
          루미에서 사용하실 닉네임을 설정해주세요! <br />
          신중하게 본인을 가장 잘 나타내는 이름으로 설정해주세요!
        </p>
      </div>
    );
  };
  
  export default UserNameAndPhoto;
  