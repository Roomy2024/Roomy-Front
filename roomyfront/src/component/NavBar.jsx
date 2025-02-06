import React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBookBible, faComment, faLocation, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const NavBar = () =>{
    return(
        <nav className="nav-wrapper">
            <Link to = "/Community" className="nav-link">
                <div>
                    <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
                </div>
            </Link>
            <Link to = "/Talk" className="nav-link">
                <div>
                    <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
                </div>
            </Link>
            <Link to = "/Map" className="nav-link">
                <div>
                    <FontAwesomeIcon icon={faLocation}></FontAwesomeIcon>
                </div>
            </Link>
            <Link to = "/MyPage" className="nav-link">
                <div>
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </div>
            </Link>
        </nav>
    )
}

export default NavBar;
