import { useState } from 'react';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';

export default function StartScreen({ onStart }) {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <div className="cover-screen cover-screen--start">
      <div className="ending-main">
        <div className="cover-emoji">💬</div>
        <h1 className="cover-title">썸, 맞춤법에 달렸다</h1>
        <button type="button" className="primary-btn" onClick={onStart}>
          시작하기
        </button>
      </div>
      <p className="site-intro">
        무료 맞춤법 게임
        <br />
        메신저로 진행되는 연애 시뮬레이션에서 맞춤법 문제를 풀고 썸을 지켜 보세요.
      </p>
      <button type="button" className="privacy-link" onClick={() => setPrivacyOpen(true)}>
        개인정보처리방침
      </button>
      {privacyOpen && <PrivacyPolicyModal onClose={() => setPrivacyOpen(false)} />}
    </div>
  );
}
