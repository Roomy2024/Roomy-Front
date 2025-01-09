import { faAngleLeft, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Header.css";

function Header() { 
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

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
      <Link to="/" className="link">
        <h1 className="title">Roomy</h1>
      </Link>

      {/* 오른쪽 아이콘 (알림 이동) */}
      <div className="right-section">
        <Link to="/notifications" className="notification">
          <FontAwesomeIcon icon={faBell} className="notification-icon" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
