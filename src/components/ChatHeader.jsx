export default function ChatHeader({ name, subtitle, avatar, onAvatarClick }) {
  const avatarContent = avatar ? (
    <img src={avatar} alt={name} className="avatar-img" />
  ) : (
    (name?.[0] ?? '♥')
  );

  return (
    <div className="chat-header">
      {onAvatarClick ? (
        <button
          type="button"
          className="chat-header-avatar chat-header-avatar--clickable"
          onClick={onAvatarClick}
          aria-label={`${name} 프로필 보기`}
        >
          {avatarContent}
        </button>
      ) : (
        <div className="chat-header-avatar">{avatarContent}</div>
      )}
      <div className="chat-header-info">
        <div className="chat-header-name">{name}</div>
        {subtitle && <div className="chat-header-sub">{subtitle}</div>}
      </div>
    </div>
  );
}
