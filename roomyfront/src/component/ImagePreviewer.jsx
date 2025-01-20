const ImagePreviewer = ({ image, onClickCancel, onClickSave }) => {
  return (
    <div className="profile-preview-container">
      <div className="profile-preview-wrap">
        <div className="image-container">
          <img
            src={image}
            alt="프로필 사진"
            className="profile-image-preview"
          />

          <div className="overlay-container">
            <div className="dark-overlay"></div>
            <div className="circle-container">
              <div className="circle-mask"></div>
            </div>
          </div>
        </div>

        <div className="button-container">
          <button onClick={onClickCancel} className="nav-button">
            취소 ←
          </button>
          <button onClick={onClickSave} className="nav-button">
            등록 ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewer;
