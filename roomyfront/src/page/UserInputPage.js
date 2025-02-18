import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate , useLocation } from "react-router-dom"; // Navigate 추가
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import UserNameAndPhoto from "../component/UserInputComp/UserNameAndPhoto";
import UserGender from "../component/UserInputComp/UserGender";
import UserRegionSelector from "../component/UserInputComp/UserRegionSelector";
import CheckModal from "../component/CeckModal";
import UserInputTopBar from "../component/UserInputTopBar";
import "../css/UserInputPage.css"
import AuthApi from "../api/AuthApi";
import axios from "axios";
const UserInputPage = () => {
    const isDeskTop = useMediaQuery({
        query: "(min-width:769px)",
      });
      const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
      const isTablet = useMediaQuery({
        query: "(min-width: 769px) and (max-width: 859px)",
      });

    const defaultImage =
    "https://ifh.cc/g/NNsbbO.png";

    const [stepNum , setSetpNum] = useState(1);
    const [userName , setUserName] = useState("");
    const [area , setArea] = useState("");
    const [gender , setGender] = useState("");
    const [photo , setPhoto] = useState(defaultImage);
    const [nextPossible, setNextPossible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
      };

    const [userData , setUserData] = useState({
        usernName : "",
        area : "",
        gender : "",
        photo : ""
    });
    
    useEffect(() => {
    nextStepNum();
    nextFunction(stepNum)
    } , [stepNum])

    useEffect(() => {
        NextPossibleComp();
      }, [nextPossible]);
      const navigate = useNavigate();
      const goHome = () => {
        navigate(`/`);
      };

    
    const handleGenderChannge = (value) => {
        if(value == ""){
            setNextPossible(false);
        }
        else {
            setGender(value)
            setNextPossible(true);
        }
    }

    const handleNameChange = (value) => {
        const tempName = value.target.value.trim()
        if(tempName.length <= 8){
            setUserName(tempName);
        }
        setNextPossible(tempName != "")
    }

    const handleareaChange = (value) => {
        if(value == ""){
            setNextPossible(false)
        }
        else{
            setArea(value); 
        }
    }

    const handlePhotoChange = (value) => {
        setPhoto(value);
    }

    const submitForm = async() => {
        setNextPossible(true)

        try{
            const formData = new FormData();
            formData.append("id", localStorage.getItem('user_id'))
            formData.append("username" , userName)
            formData.append("area" , area)
            formData.append("gender" , gender)
            formData.append("profileImage", photo)
            formData.append("Authorization", axios.defaults.headers.common["Authorization"])
            console.log("유저ID : " + formData.get("id"))
            console.log(formData.get("username"))
            console.log("주소" + formData.get("area"))
            console.log(formData.get("gender"))
            console.log(formData.get("profileImage"))
            console.log("헤더 설정 완료:", axios.defaults.headers.common["Authorization"]);

            const authApi = new AuthApi();
            const resp = await authApi.postAuthData(formData);
            console.log(resp.status)

            console.log(resp);
            toggleModal();
            
           
        }
        catch (error){
            throw error;
        }
    }
    
    const handleRegistFin = () => {
        setNextPossible(false);
        submitForm();
      };
    
    const prevStep = () => { 
        if (stepNum == 1) {
        }
        if (stepNum > 1) {
            setSetpNum(stepNum - 1);
        } else {
            setSetpNum(1);
        }
      };

      const nextStep = () => {
        if (stepNum < 3) {
            setSetpNum(stepNum + 1);
        } else {
            setSetpNum(3);
        }
        setNextPossible(false);
      };
    

    function nextFunction(stepNum){
        switch(stepNum){
            case 1:
                userName == "" ? setNextPossible(false) : setNextPossible(true)
            case 2:
                gender == "" ? setNextPossible(false) : setNextPossible(true)
            case 3:
                area == "" ? setNextPossible(true) : setNextPossible(true)
        }
    }

    const nextStepNum = () => {
        switch (stepNum) {
            case 1:
                return(
                    <div>
                        <UserNameAndPhoto
                            defaultImage={defaultImage}
                            photo={photo}
                            setPhoto={setPhoto}
                            handlePhotoChange={
                                handleNameChange
                            }
                            userName={userName}
                            setUserName={setUserName}
                            handleNameChange={
                                handleNameChange
                            }
                            nextPossible={nextPossible}
                            setNextPossible={setNextPossible}
                        >
                        </UserNameAndPhoto>
                        <NextPossibleComp />
                    </div>
                )   
            case 2:
                return(
                    <div>
                        <UserGender
                        gender={gender}
                        setGender={setGender}
                        setNextPossible={setNextPossible}>
                        </UserGender>
                        <NextPossibleComp />
                    </div>
                )  
            case 3:
                return(
                    <div>
                        <UserRegionSelector 
                        area={area}
                        setArea={setArea}
                        nextPossible={nextPossible}
                        setNextPossible={setNextPossible}
                        />
                        <NextPossibleComp />
                    </div>
                )  
        }
    }

    const NextPossibleComp = () => {
        return (
            <div className="next-possible-container">
                {stepNum == 1 ? (
                    ""
                ) : (
                    <button className="next-possible-btn"
                    onClick={prevStep}>
                        이전
                    </button>
                )}
                {nextPossible ? (
                    stepNum == 3 ? (
                        <button className="next-possible-btn" onClick={handleRegistFin} 
                        >
                        완료
                        </button>
                    ) : (
                        <button className="next-possible-btn"
                        onClick={nextStep}>
                        다음
                        </button>
                    )
                ) : (
                    <button className="next-possible-btn" disabled>
                        {stepNum < 3 ? "다음" : "완료"}
                    </button>
                )}
            </div>
        )
    }
    return (
        <div>
            <UserInputTopBar stepNum={stepNum}/>
            {nextStepNum(stepNum)}
            {showModal && (
            <CheckModal
            Content={"등록되었습니다."}
            onClose={goHome}
            oneBtn={true}
            />
        )}
        </div>
    )
}

export default UserInputPage;