export default function ChatHeader({ name, subtitle, avatar }) {
  return (
    <div className="chat-header">
      <div className="chat-header-avatar">
        {avatar ? <img src={avatar} alt={name} className="avatar-img" /> : (name?.[0] ?? '♥')}
      </div>
      <div className="chat-header-info">
        <div className="chat-header-name">{name}</div>
        {subtitle && <div className="chat-header-sub">{subtitle}</div>}
      </div>
    </div>
  );
}
