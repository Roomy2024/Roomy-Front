import React from "react";
import { faAngleLeft, faBell, faCartShopping, faHomeUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LoginTopBar(){

    const navigate = useNavigate();
    const goBack = () => {
      navigate(-1); // 이전 페이지로 이동
    };



    return(
        <LoginTopBar>
            <div className="topBar">
                <div>
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        className="back-icon"
                        onClick={goBack}
                        tabIndex="0"
                    />
                </div>
                <div className="middle-number">
                    
                </div>
            </div>
        </LoginTopBar>
    );
}