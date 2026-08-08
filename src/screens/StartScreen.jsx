export default function StartScreen({ onStart }) {
  return (
    <div className="cover-screen cover-screen--start">
      <div className="cover-emoji">💬</div>
      <h1 className="cover-title">썸, 맞춤법에 달렸다</h1>
      <button type="button" className="primary-btn" onClick={onStart}>
        시작하기
      </button>
    </div>
  );
}
