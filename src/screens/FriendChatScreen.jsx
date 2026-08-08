import { useEffect, useMemo, useRef, useState } from 'react';
import ChatHeader from '../components/ChatHeader';
import ChatThread from '../components/ChatThread';
import NotificationBanner from '../components/NotificationBanner';
import { useChatEngine } from '../hooks/useChatEngine';
import { getFirstMessagePreview, getOpeningScript, getPartner } from '../data/scenario';

const BANNER_DELAY = 1000;

export default function FriendChatScreen({ playerGender, onEnterGame }) {
  const partner = getPartner(playerGender);
  const preview = getFirstMessagePreview();

  const steps = useMemo(() => {
    const script = getOpeningScript(playerGender);
    const chatSteps = script.map((line) =>
      line.speaker === 'friend' ? { type: 'incoming', text: line.text } : { type: 'auto', text: line.text }
    );
    return [...chatSteps, { type: 'finish' }];
  }, [playerGender]);

  const [showBanner, setShowBanner] = useState(false);
  const bannerTimer = useRef(null);

  const { messages, typing } = useChatEngine(steps, {
    onFinish: () => {
      bannerTimer.current = setTimeout(() => setShowBanner(true), BANNER_DELAY);
    },
  });

  useEffect(() => () => clearTimeout(bannerTimer.current), []);

  return (
    <div className="chat-screen">
      <ChatHeader name="베프" />
      <ChatThread messages={messages} typing={typing} />
      {showBanner && (
        <NotificationBanner
          name={partner.name}
          avatar={partner.avatar}
          preview={preview}
          onTap={onEnterGame}
        />
      )}
    </div>
  );
}
