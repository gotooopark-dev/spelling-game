import { PHOTO_SCENE } from '../data/photoSceneConfig';

// 배경 사진 위에 TV 화면 오버레이 이미지를 겹쳐서 보여주는 합성 뷰.
// 썸네일과 확대 모달이 이 컴포넌트를 함께 사용해 항상 같은 합성 결과를 보여준다.
export default function PhotoScene({ variant, className = '' }) {
  const { background, tvRegion } = PHOTO_SCENE.variants[variant];
  const { tvOverlay } = PHOTO_SCENE;

  return (
    <div className={`photo-scene ${className}`}>
      <img src={background} alt="" className="photo-scene-bg" />
      <img
        src={tvOverlay}
        alt=""
        className="photo-scene-tv-overlay"
        style={{
          top: `${tvRegion.top}%`,
          left: `${tvRegion.left}%`,
          width: `${tvRegion.width}%`,
          height: `${tvRegion.height}%`,
        }}
      />
    </div>
  );
}
