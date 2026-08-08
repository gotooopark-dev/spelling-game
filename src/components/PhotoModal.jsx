import PhotoScene from './PhotoScene';

export default function PhotoModal({ variant, onClose }) {
  return (
    <div className="photo-modal-backdrop" onClick={onClose}>
      <div className="photo-modal-card" onClick={(e) => e.stopPropagation()}>
        <PhotoScene variant={variant} className="photo-modal-scene" />
        <button type="button" className="photo-modal-close" onClick={onClose} aria-label="닫기">
          ✕
        </button>
      </div>
    </div>
  );
}
