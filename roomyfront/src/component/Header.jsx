import { faAngleLeft, faBell, faCartShopping, faHomeUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/Header.css";

function Header() { 
  const locationNow = useLocation();
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const goHome =() => {
    navigate("/community/") //홈 화면 이동 Link 사용이랑 navigate 을 사용한 onClick 둘 중 뭐가 나은가
  }

//나중에 세션이 추가될시 코드 추가
//
//   const handleConnectCart = () => {
//     if (userId === null) {
//       navigate("/login");
//     } else if (userId !== null) {
//       navigate("/Mypage");
//     }
//   };

  return (
    <header className="header">
  {/* 뒤로가기 아이콘 */}
  <div>
    <FontAwesomeIcon
      icon={faAngleLeft}
      className="back-icon"
      onClick={goBack}
      tabIndex="0"
    />
  </div>

  {/* 중앙 로고 */}
  <Link to="/community/" className="link">
    <h1 className="title">Roomy</h1>
  </Link>

  {/* 오른쪽 아이콘 (마이페이지, 알림) */}
  <div className="right-section">
    {/* 알림 이동 */}
    <Link to="/notifications" className="notification">
      <FontAwesomeIcon icon={faBell} className="notification-icon" />
    </Link>
  </div>
</header>

  );
}

export default Header;
