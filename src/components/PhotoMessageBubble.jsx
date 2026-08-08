import PhotoScene from './PhotoScene';

// 사용자 조작 없이 자동으로 눌림 연출이 재생되는 사진 썸네일.
// pressed 상태는 상위(MainGameScreen)의 자동 재생 타이머가 제어한다.
export default function PhotoMessageBubble({ variant, pressed }) {
  return (
    <div className={`photo-thumb-btn${pressed ? ' photo-thumb-btn--pressed' : ''}`}>
      <PhotoScene variant={variant} className="photo-thumb-scene" />
    </div>
  );
}
