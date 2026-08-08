import EndingFooter from '../components/EndingFooter';
import ShareButton from '../components/ShareButton';
import { getWrongAnswerInfo } from '../data/scenario';

export default function BlockedScreen({ questionId, onRestart }) {
  const info = getWrongAnswerInfo(questionId);

  return (
    <div className="cover-screen ending-screen ending-screen--blocked">
      <div className="ending-main">
        <div className="cover-emoji">🚫</div>
        <h1 className="cover-title">{questionId}번 문제에서 까였습니다.</h1>
        {info && (
          <div className="answer-card">
            <div className="answer-card-label">정답</div>
            <div className="answer-card-text">{info.answer}</div>
            <div className="answer-card-explain">{info.explanation}</div>
          </div>
        )}
        <div className="ending-actions">
          <button type="button" className="primary-btn primary-btn--dark" onClick={onRestart}>
            다시 도전하기
          </button>
          <ShareButton />
        </div>
      </div>
      <EndingFooter />
    </div>
  );
}
