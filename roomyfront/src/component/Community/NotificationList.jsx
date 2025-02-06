// import React, { useState, useEffect } from "react";
// import "../css/NotificationList.css";

// const NotificationList = () => {
//   const [notifications, setNotifications] = useState([]);

//   // 스프링 서버에서 알림 데이터 가져오기
//   const fetchNotifications = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/notifications"); // 스프링 API 엔드포인트
//       if (!response.ok) throw new Error("데이터를 가져오는데 실패했습니다.");
//       const data = await response.json();
//       setNotifications(data);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications(); // 컴포넌트 마운트 시 데이터 가져오기
//   }, []);

//   return (
//     <div className="notification-list">
//       <h2>좋아요 및 댓글</h2>
//       <ul>
//         {notifications.map((notification) => (
//           <li key={notification.id} className="notification-item">
//             <img
//               src={notification.avatar}
//               alt={`${notification.username} 프로필`}
//               className="avatar"
//             />
//             <div className="notification-content">
//               <p>
//                 <strong>{notification.username}</strong>님이{" "}
//                 {notification.type === "like" ? (
//                   <>
//                     <span className="heart">❤️</span>를 누르셨습니다.
//                   </>
//                 ) : (
//                   <>
//                     댓글을 남겼습니다.
//                     <br />
//                     <span className="comment">"{notification.comment}"</span>
//                   </>
//                 )}
//               </p>
//               <span className="time">{notification.time}</span>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default NotificationList;




import React, { useState, useEffect } from "react";
import "../../css/NotificationList.css";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  // 임시 샘플 데이터
  const sampleNotifications = [
    {
      id: 1,
      username: "김재현",
      type: "like", // 좋아요
      time: "5분 전",
      avatar: "https://via.placeholder.com/40", // 임시 프로필 이미지
    },
    {
      id: 2,
      username: "박준희",
      type: "comment", // 댓글
      time: "10분 전",
      avatar: "https://via.placeholder.com/40",
      comment: "좋은 글이네요!",
    },
    {
      id: 3,
      username: "안승현",
      type: "like", // 좋아요
      time: "1시간 전",
      avatar: "https://via.placeholder.com/40",
    },
  ];

  // 데이터를 가져오는 함수 (실제 API 대신 샘플 데이터 사용)
  const fetchNotifications = async () => {
    try {
      // API 대신 샘플 데이터를 바로 설정
      setNotifications(sampleNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications(); // 컴포넌트가 마운트될 때 실행
  }, []);

  return (
    <div className="notification-list">
      <h2>좋아요 및 댓글</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className="notification-item">
            <img
              src={notification.avatar}
              alt={`${notification.username} 프로필`}
              className="avatar"
            />
            <div className="notification-content">
              <p>
                <strong>{notification.username}</strong>님이{" "}
                {notification.type === "like" ? (
                  <>
                    <span className="heart">❤️</span>를 눌렀습니다.
                  </>
                ) : (
                  <>
                    댓글을 남겼습니다.
                    <br />
                    <span className="comment">"{notification.comment}"</span>
                  </>
                )}
              </p>
              <span className="time">{notification.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
