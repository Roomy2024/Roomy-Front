
import React, { useEffect } from "react"
import { PiGenderMaleBold, PiGenderFemaleBold } from "react-icons/pi"
import { useMediaQuery } from "react-responsive"

const UserGender = ({
    gender,                
    setGender,               
    setNextPossible         
}) => {
    const isDeskTop = useMediaQuery({ query: "(min-width:769px)" })
    const isMobile  = useMediaQuery({ query: "(max-width: 768px)" })
    const isTablet  = useMediaQuery({
        query: "(min-width: 769px) and (max-width: 859px)",
    })

    useEffect(() => {
        if (!gender) {
            setNextPossible(false)
        } else {
            setNextPossible(true)
        }
    }, [gender, setNextPossible])

    const ShowGender = ({ icon, label, value }) => {
        return (
            <div
                style={{
                    border: gender === value ? "2px solid #000" : "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    margin: "5px",
                    cursor: "pointer",
                    width: "100px",
                    textAlign: "center"
                }}
                onClick={() => {
                    setGender(value)
                }}
            >
                <div style={{ fontSize: "24px" }}>{icon}</div>
                <div>{label}</div>
            </div>
        )
    }

    return (
        <div style={{ margin: "20px" }}>
            <h1>성별을 알려주세요</h1>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <ShowGender
                    value="남자"
                    icon={<PiGenderMaleBold />}
                    label="남자"
                />
                <ShowGender
                    value="여자"
                    icon={<PiGenderFemaleBold />}
                    label="여자"
                />
            </div>
        </div>
    )
}

export default UserGender