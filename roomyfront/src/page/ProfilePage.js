import React, {
    useRef,
    useMemo,
    useCallback,
    useState,
    useEffect,
  } from "react";import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Mobile, DeskTop } from "../responsive/responsive";

const ProfileCompleted = () => {
    const isDeskTop = useMediaQuery({
      query: "(min-width:769px)",
    });
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const isTablet = useMediaQuery({
      query: "(min-width: 769px) and (max-width: 859px)",
    });
    const navigate = useNavigate();
    const goHome = () => {
      navigate("/");
    }

    return (
        <div></div>
    )
}