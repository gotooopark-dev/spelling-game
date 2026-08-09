import { useEffect, useMemo, useRef, useState } from 'react';
import ChatHeader from '../components/ChatHeader';
import ChatThread from '../components/ChatThread';
import ChoiceButtons from '../components/ChoiceButtons';
import PhotoModal from '../components/PhotoModal';
import ProfileModal from '../components/ProfileModal';
import { useChatEngine } from '../hooks/useChatEngine';
import { DEFAULT_AVATAR, getPartner, mainGameQuestions } from '../data/scenario';

const lineToStep = (line) =>
  line.type === 'photo'
    ? { type: 'photo' }
    : { type: line.speaker === 'partner' ? 'incoming' : 'auto', text: line.text };

const SUCCESS_HOLD_DELAY = 3000;

// 사진 메시지 자동 연출 타이밍: 도착 -> 잠시 대기 -> 눌림 -> 확대 -> 유지 -> 자동 닫힘
const PHOTO_PRE_PRESS_DELAY = 700;
const PHOTO_PRESS_DURATION = 150;
const PHOTO_MODAL_HOLD = 2000;

export default function MainGameScreen({ playerGender, onWrong, onComplete }) {
  const partner = getPartner(playerGender);

  const steps = useMemo(() => {
    const questionSteps = mainGameQuestions.flatMap((q) => [
      ...q.lines.map(lineToStep),
      { type: 'question', choices: q.choices, meta: q.id },
      ...q.followup.map(lineToStep),
    ]);
    return [...questionSteps, { type: 'finish' }];
  }, []);

  const completeTimer = useRef(null);

  const {
    messages,
    typing,
    pendingChoices,
    selectChoice,
    pendingPhoto,
    confirmPhotoViewed,
    blocked,
    phase,
  } = useChatEngine(steps, {
    onFinish: () => {
      completeTimer.current = setTimeout(onComplete, SUCCESS_HOLD_DELAY);
    },
    onWrongAnswer: onWrong,
  });

  useEffect(() => () => clearTimeout(completeTimer.current), []);

  const [photoPressed, setPhotoPressed] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);
  const confirmPhotoViewedRef = useRef(confirmPhotoViewed);
  confirmPhotoViewedRef.current = confirmPhotoViewed;

  // 사진 메시지가 도착하면 사용자 조작 없이 눌림 -> 확대 -> 자동 닫힘까지 이어서 재생한다.
  useEffect(() => {
    if (!pendingPhoto) return undefined;

    const timers = [];
    const schedule = (fn, delay) => timers.push(setTimeout(fn, delay));

    schedule(() => {
      setPhotoPressed(true);
      schedule(() => {
        setPhotoPressed(false);
        setPhotoOpen(true);
        schedule(() => {
          setPhotoOpen(false);
          confirmPhotoViewedRef.current();
        }, PHOTO_MODAL_HOLD);
      }, PHOTO_PRESS_DURATION);
    }, PHOTO_PRE_PRESS_DELAY);

    return () => timers.forEach(clearTimeout);
  }, [pendingPhoto]);

  const closePhoto = () => {
    setPhotoOpen(false);
    confirmPhotoViewed();
  };

  const [profileOpen, setProfileOpen] = useState(false);

  const avatar = blocked ? DEFAULT_AVATAR : partner.avatar;
  const photoVariant = partner.type === 'someNam' ? 'male' : 'female';

  return (
    <div className="chat-screen">
      <ChatHeader
        name={partner.name}
        avatar={avatar}
        onAvatarClick={() => setProfileOpen(true)}
      />
      <ChatThread
        messages={messages}
        typing={typing}
        avatarSrc={avatar}
        hasChoices={!!pendingChoices}
        photoVariant={photoVariant}
        photoPressed={photoPressed}
        onAvatarClick={() => setProfileOpen(true)}
      />
      <ChoiceButtons
        choices={pendingChoices}
        onSelect={selectChoice}
        disabled={phase !== 'playing'}
        blocked={blocked}
      />
      {photoOpen && <PhotoModal variant={photoVariant} onClose={closePhoto} />}
      {profileOpen && (
        <ProfileModal
          name={partner.name}
          statusMessage={partner.statusMessage}
          avatar={partner.avatar}
          background={partner.profileBackground}
          onClose={() => setProfileOpen(false)}
        />
      )}
    </div>
  );
}
