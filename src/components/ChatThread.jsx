import { useEffect, useRef } from 'react';
import PhotoMessageBubble from './PhotoMessageBubble';

export default function ChatThread({
  messages,
  typing,
  avatarSrc,
  hasChoices,
  photoVariant,
  photoPressed,
}) {
  const bodyRef = useRef(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, hasChoices]);

  return (
    <div className="chat-body" ref={bodyRef}>
      {messages.map((m) => (
        <div key={m.id} className={`chat-row chat-row--${m.from}`}>
          {m.from === 'partner' && avatarSrc && (
            <img src={avatarSrc} alt="" className="msg-avatar" />
          )}
          <div className="chat-row-content">
            {m.kind === 'photo' ? (
              <PhotoMessageBubble variant={photoVariant} pressed={photoPressed} />
            ) : (
              <div className={`bubble bubble--${m.from}`}>{m.text}</div>
            )}
          </div>
        </div>
      ))}
      {typing && (
        <div className="chat-row chat-row--partner">
          {avatarSrc && <img src={avatarSrc} alt="" className="msg-avatar" />}
          <div className="chat-row-content">
            <div className="bubble bubble--partner bubble--typing">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
