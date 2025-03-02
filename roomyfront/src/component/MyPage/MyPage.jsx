// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../../css/MyPage.css"; // 스타일 파일 import
// import bookmarkIcon from "../../asset/images/북마크 저장 후.png"; // 북마크 아이콘 import
// import blockUserIcon from "../../asset/images/block-user.png"; // 차단 아이콘 import
// import createAxios from "../../api/CreateAxios"; // API 요청을 위한 axios 인스턴스 가져오기
// import MyPageApi from "../../api/MyPageApi";

// const MyPage = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     username: "Roomy", // 기본값을 "Roomy"로 설정
//     age: "",
//     gender: "",
//     location: "",
//     profileImage: "https://via.placeholder.com/100", // 기본 이미지
//   });

//   // ✅ 유저 정보 가져오기
//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const axiosInstance = createAxios();
//         const response = await axiosInstance.get("/user/profile"); // 백엔드에서 유저 정보 가져오기

//         setUser({
//           username: response.data.username || "Roomy", // 만약 백엔드에서 이름이 없으면 "Roomy" 유지
//           age: response.data.age || "",
//           gender: response.data.gender || "",
//           location: response.data.location || "거주지 정보 없음",
//           profileImage: response.data.profileImage || "https://via.placeholder.com/100",
//         });
//       } catch (error) {
//         console.error("❌ 유저 정보 가져오기 실패:", error);
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   // 로그아웃 처리 함수
//   const handleLogout = () => {
//     alert("로그아웃 되었습니다.");
//     navigate("/login");
//   };

//   // 회원 탈퇴 처리 함수  
//   const handleDeleteAccount = () => {
//     alert("회원탈퇴가 완료되었습니다.");
//     navigate("/");
//   };

//   // 프로필 변경 이동 함수
//   const handleProfileChange = () => {
//     navigate("/profile-change"); // ProfileChangePage로 이동
//   };

//   return (
//     <div className="mypage-container">
//       {/* 프로필 섹션 */}
//       <div className="profile-section">
//         <img
//           src={user.profileImage}
//           alt="프로필 이미지"
//           className="profile-image"
//         />
//         <h2 className="username">{user.username}</h2>
//         <p className="user-info">{`${user.age ? user.age + "세" : ""} ${user.gender || ""}`}</p>
//         <p className="user-location">{user.location}</p>

//         <button className="edit-profile-button" onClick={handleProfileChange}>
//           프로필 변경
//         </button>
//       </div>

//       {/* 메뉴 섹션 */}
//       <div className="menu-section">
//         <div className="menu-item" onClick={() => navigate("/blocked-list")}>
//           <img src={blockUserIcon} alt="차단 목록 아이콘" className="menu-icon" />
//           <span>차단 목록</span>
//         </div>
//         <div className="menu-item" onClick={() => navigate("/bookmark")}>
//           <img src={bookmarkIcon} alt="스크랩북 아이콘" className="menu-icon" />
//           <span>스크랩북</span>
//         </div>
//       </div>

//       {/* 로그아웃 및 회원탈퇴 섹션 */}
//       <div className="logout-delete-container">
//         <div className="logout-item" onClick={handleLogout}>
//           <span>로그아웃</span>
//           <span className="arrow">›</span>
//         </div>
//         <div className="logout-item" onClick={handleDeleteAccount}>
//           <span>회원탈퇴</span>
//           <span className="arrow">›</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyPage;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/MyPage.css";
import bookmarkIcon from "../../asset/images/북마크 저장 후.png";
import blockUserIcon from "../../asset/images/block-user.png";
import MyPageApi from "../../api/MyPageApi"; // ✅ 최종 API import

const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "Roomy",
    age: "",
    gender: "",
    location: "",
    profileImage: "https://via.placeholder.com/100",
  });

  // ✅ 수정된 유저 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await MyPageApi.fetchUserProfile();
        setUser({
          username: data.username || "Roomy",
          age: data.age || "",
          gender: data.gender || "",
          location: data.location || "거주지 정보 없음",
          profileImage: data.profileImage || "https://via.placeholder.com/100",
        });
      } catch (error) {
        console.error("❌ 유저 정보 가져오기 실패:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    if(window.confirm("정말 로그아웃 하시겠습니까?")){
      try {
        await MyPageApi.logout();
        alert("로그아웃 되었습니다.");
        navigate("/loginpage");
      } catch (error) {
        alert("로그아웃 실패했습니다.");
      }
    }
  };

  const handleDeleteAccount = async () => {
    if(window.confirm("정말로 회원탈퇴 하시겠습니까? 이 작업은 되돌릴 수 없습니다.")){
      try {
        await MyPageApi.deleteAccount();
        alert("회원탈퇴가 완료되었습니다.");
        navigate("/");
      } catch (error) {
        alert("회원탈퇴 실패했습니다.");
      }
    }
  };

  const handleProfileChange = () => {
    navigate("/profile-change");
  };

  return (
    <div className="mypage-container">
      <div className="profile-section">
        <img src={user.profileImage} alt="프로필 이미지" className="profile-image" />
        <h2 className="username">{user.username}</h2>
        <p className="user-info">{`${user.age ? user.age + "세" : ""} ${user.gender || ""}`}</p>
        <p className="user-location">{user.location}</p>

        <button className="edit-profile-button" onClick={handleProfileChange}>
          프로필 변경
        </button>
      </div>

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
