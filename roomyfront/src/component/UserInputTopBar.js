import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { Mobile, DeskTop } from "../responsive/responsive";
import { useMediaQuery } from "react-responsive";
import styles from "../css/UserInputTopBar.module.css";

const UserInputTopBar = ({stepNum}) => {
    const isDeskTop = useMediaQuery({
        query: "(min-width:769px)",
      });
      const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
      const isTablet = useMediaQuery({
        query: "(min-width: 769px) and (max-width: 859px)",
      });
    
      const navigate = useNavigate();
    
      const [index, setIndex] = useState();
      const Sequence = () => {
        setIndex((current) => current + 1);
      };
    
      const goBack = () => {
        navigate(-1); // 뒤로가기
      };
    
      //progress bar width
      const progressWidth = (100 * stepNum) / 3 + "%";
    
      return (
        <div className={styles.wrapper}>
          <div className={`${styles.registertopBar} ${isMobile && styles.mbver}`}>
            {isMobile && <GoArrowLeft className={styles.icon} onClick={goBack} />}
            <div className={styles.sequence} onChange={Sequence}>
              {stepNum}/3
            </div>
          </div>
          <div
            className={`${styles.progressbar} ${isDeskTop && styles.dtver}`}
            style={{
              width: progressWidth,
            }}
          ></div>
        </div>
      );
    };

export default UserInputTopBar;