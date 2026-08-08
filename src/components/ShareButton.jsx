import { useState } from 'react';

async function copyToClipboard(value) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // 권한 거부 등으로 실패 — 아래 레거시 방식으로 재시도
    }
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ url });
      } catch {
        // 사용자가 공유를 취소한 경우 — 별도 처리 없음
      }
      return;
    }

    const ok = await copyToClipboard(url);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="share-wrap">
      <button type="button" className="primary-btn primary-btn--outline" onClick={handleShare}>
        친구에게 공유하기
      </button>
      {copied && <div className="share-toast">링크가 복사되었습니다.</div>}
    </div>
  );
}
