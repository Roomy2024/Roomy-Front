import React from "react";
import styles from "../css/checkModal.module.css";

function CheckModal({
    onClose, // Close함수
    onContinue, // Continue함수
    Content, // 모달 내용 텍스트
    ContinueBtnContent, // Continue버튼 텍스트
    CancleBtnContent, // Cancle버튼 텍스트
    oneBtn, // 버튼 1개만 필요시(확인 버튼만 필요 시) true 하면 됩니다~
  }) {
    return (
        <>
          <div className={styles.ModalOverlay} />
          <div className={styles.CancleCheckWrap}>
            <div className={styles.Content}>{Content}</div>
            <div className={styles.CancleBtnWrap}>
              {oneBtn ? (
                <button className={styles.ConfirmBtn} onClick={onClose}>
                  확인
                </button>
              ) : (
                <>
                  <button className={styles.CancleBtn} onClick={onClose}>
                    {CancleBtnContent}
                  </button>
                  <button className={styles.ContinueBtn} onClick={onContinue}>
                    {ContinueBtnContent}
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      );
    }
    
export default CheckModal;
