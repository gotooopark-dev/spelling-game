import { GENDER } from '../data/scenario';

export default function GenderSelectScreen({ onSelect }) {
  return (
    <div className="cover-screen">
      <h1 className="cover-title">내 성별을 선택하세요</h1>
      <div className="gender-list">
        <button type="button" className="gender-btn" onClick={() => onSelect(GENDER.FEMALE)}>
          <span className="gender-emoji">👩</span>
          여성
        </button>
        <button type="button" className="gender-btn" onClick={() => onSelect(GENDER.MALE)}>
          <span className="gender-emoji">🙎🏻</span>
          남성
        </button>
      </div>
    </div>
  );
}
