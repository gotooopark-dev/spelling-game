import { blockedBannerText } from '../data/scenario';

export default function ChoiceButtons({ choices, onSelect, disabled, blocked }) {
  if (blocked) {
    return (
      <div className="choice-area">
        <div className="blocked-banner">{blockedBannerText}</div>
      </div>
    );
  }

  if (!choices) return null;

  return (
    <div className="choice-area">
      <div className="choice-list">
        {choices.map((choice, i) => (
          <button
            key={i}
            type="button"
            className="choice-btn"
            disabled={disabled}
            onClick={() => onSelect(choice)}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}
