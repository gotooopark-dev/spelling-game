import EndingFooter from '../components/EndingFooter';
import ShareButton from '../components/ShareButton';
import { successTitle } from '../data/scenario';

export default function SuccessScreen({ onRestart }) {
  return (
    <div className="cover-screen ending-screen ending-screen--success">
      <div className="ending-main">
        <div className="cover-emoji">💘</div>
        <h1 className="cover-title">{successTitle}</h1>
        <div className="ending-actions">
          <button type="button" className="primary-btn" onClick={onRestart}>
            다시 도전하기
          </button>
          <ShareButton />
        </div>
      </div>
      <EndingFooter />
    </div>
  );
}
