import { useEffect, useState } from 'react';

export default function NotificationBanner({ name, avatar, preview, onTap }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <button
      type="button"
      className={`push-banner${visible ? ' push-banner--visible' : ''}`}
      onClick={onTap}
    >
      <span className="push-banner-avatar">
        {avatar ? <img src={avatar} alt={name} className="avatar-img" /> : (name?.[0] ?? '♥')}
      </span>
      <span className="push-banner-body">
        <span className="push-banner-name">{name}</span>
        <span className="push-banner-preview">{preview}</span>
      </span>
    </button>
  );
}
