import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mobile, DeskTop } from "../responsive/responsive";
import { useMediaQuery } from "react-responsive";

const categoryMap = {
    board : "게시판" ,
    tips : "꿀팁" ,
    recipes : "레시피"
}

const { category } = useParams();

const handleCategoryChange = (newCategory) => {
    navigate(`/community/preview/${newCategory}`, {
      replace: true,
    });
  };

return (
    <Mobile>
        <div className={styles.category_buttons_area}>
            <button
              className={styles.category_button}
              onClick={() => handleCategoryChange("board")}
              disabled={category === "board"}
            >
              게시판
           </button>
           <button
              className={styles.category_button}
              onClick={() => handleCategoryChange("tips")}
              disabled={category === "tips"}
            >
              꿀팁
           </button>
           <button
              className={styles.category_button}
              onClick={() => handleCategoryChange("recipes")}
              disabled={category === "recipes"}
            >
              레시피 
           </button>
        </div>
    </Mobile>
)