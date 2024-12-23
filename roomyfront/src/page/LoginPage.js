import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mobile, DeskTop } from "../responsive/responsive";


const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const KakagoLogin = async() => {
        const resp = await AuthAPi.KakagoLogin();
        window.location.href = resp;
    }   

    return(
        <Mobile>
            <div className="">카카오톡 로그인</div>
        </Mobile>
    )
}