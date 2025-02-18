import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/MyPage.css"; // 스타일 파일 import
import bookmarkIcon from "../../asset/images/북마크 저장 후.png"; // 북마크 아이콘 import
import blockUserIcon from "../../asset/images/block-user.png"; // 차단 아이콘 import

const MyPage = () => {
  const navigate = useNavigate();

  // 로그아웃 처리 함수
  const handleLogout = () => {
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  // 회원 탈퇴 처리 함수  
  const handleDeleteAccount = () => {
    alert("회원탈퇴가 완료되었습니다.");
    navigate("/");
  };

  // 프로필 변경 이동 함수
  const handleProfileChange = () => {
    navigate("/profile-change"); // ProfileChangePage로 이동
  };

  return (
    <div className="mypage-container">
      {/* 프로필 섹션 */}
      <div className="profile-section">
        <img
          src="https://via.placeholder.com/100"
          alt="프로필 이미지"
          className="profile-image"
        />
        <h2 className="username">Roomy</h2>
        <button
          className="edit-profile-button"
          onClick={handleProfileChange} // 클릭 이벤트 추가
        >
          프로필 변경
        </button>
      </div>

      {/* 메뉴 섹션 */}
      <div className="menu-section">
        <div className="menu-item" onClick={() => navigate("/blocked-list")}>
          <img src={blockUserIcon} alt="차단 목록 아이콘" className="menu-icon" />
          <span>차단 목록</span>
        </div>
        <div className="menu-item" onClick={() => navigate("/bookmark")}>
          <img src={bookmarkIcon} alt="스크랩북 아이콘" className="menu-icon" />
          <span>스크랩북</span>
        </div>
      </div>

      {/* 로그아웃 및 회원탈퇴 섹션 */}
      <div className="logout-delete-container">
        <div className="logout-item" onClick={handleLogout}>
          <span>로그아웃</span>
          <span className="arrow">›</span>
        </div>
        <div className="logout-item" onClick={handleDeleteAccount}>
          <span>회원탈퇴</span>
          <span className="arrow">›</span>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
