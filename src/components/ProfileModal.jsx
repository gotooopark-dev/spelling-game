export default function ProfileModal({ name, statusMessage, avatar, background, onClose }) {
  return (
    <div className="profile-modal-backdrop">
      <div
        className="profile-modal-bg"
        style={{ backgroundImage: `url(${background})` }}
      >
        <button type="button" className="profile-modal-close" onClick={onClose} aria-label="닫기">
          ✕
        </button>
        <div className="profile-modal-info">
          <img src={avatar} alt={name} className="profile-modal-avatar" />
          <div className="profile-modal-name">{name}</div>
          <div className="profile-modal-status">{statusMessage}</div>
        </div>
      </div>
    </div>
  );
}
