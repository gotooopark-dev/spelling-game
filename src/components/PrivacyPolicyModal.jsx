import {
  privacyPolicyContact,
  privacyPolicyEffectiveDate,
  privacyPolicyParagraphs,
} from '../data/privacyPolicy';

export default function PrivacyPolicyModal({ onClose }) {
  return (
    <div className="privacy-modal-backdrop" onClick={onClose}>
      <div className="privacy-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="privacy-modal-header">
          <h2 className="privacy-modal-title">개인정보처리방침</h2>
          <button type="button" className="privacy-modal-close" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </div>
        <div className="privacy-modal-body">
          {privacyPolicyParagraphs.map((p) => (
            <p key={p} className="privacy-modal-p">
              {p}
            </p>
          ))}
          <p className="privacy-modal-meta">{privacyPolicyContact}</p>
          <p className="privacy-modal-meta">{privacyPolicyEffectiveDate}</p>
        </div>
      </div>
    </div>
  );
}
