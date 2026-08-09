import { useEffect, useRef, useState } from 'react';

// 대화 진행 스텝 타입
//  - { type: 'incoming', text }   상대가 보내는 메시지 (타이핑 인디케이터 후 도착)
//  - { type: 'auto', text }       내가 자동으로 보내는 대사 (오프닝 연출용)
//  - { type: 'question', choices, meta } 플레이어가 답장 2개 중 하나를 고르는 차례
//  - { type: 'photo' }            상대가 사진을 보내는 차례. 사용자가 사진을 열어봐야 다음으로 진행된다
//  - { type: 'finish' }           스텝 종료, onFinish 호출
//
// 오답 선택 시: 메시지 전송 -> 정적 -> 차단(프로필 회색 처리 + 답장 불가 안내) -> onWrongAnswer(meta) 호출

const TYPING_DELAY = 900;
const NEXT_STEP_DELAY = 550;
const BLOCK_SILENCE_DELAY = 2000;
const BLOCK_HOLD_DELAY = 3000;

let uid = 0;
const nextId = () => `m${++uid}`;

export function useChatEngine(steps, { onFinish, onWrongAnswer, onCorrectAnswer } = {}) {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [pendingChoices, setPendingChoices] = useState(null);
  const [pendingPhoto, setPendingPhoto] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [phase, setPhase] = useState('playing'); // 'playing' | 'blocking' | 'done'
  const [correctCount, setCorrectCount] = useState(0);

  const stepIndexRef = useRef(0);
  const questionMetaRef = useRef(null);
  const timers = useRef([]);
  const onFinishRef = useRef(onFinish);
  const onWrongRef = useRef(onWrongAnswer);
  const onCorrectRef = useRef(onCorrectAnswer);
  onFinishRef.current = onFinish;
  onWrongRef.current = onWrongAnswer;
  onCorrectRef.current = onCorrectAnswer;

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const schedule = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timers.current.push(id);
    return id;
  };

  const runStep = (index) => {
    const step = steps[index];

    if (!step || step.type === 'finish') {
      onFinishRef.current?.();
      setPhase('done');
      return;
    }

    if (step.type === 'incoming') {
      setTyping(true);
      schedule(() => {
        setTyping(false);
        setMessages((prev) => [...prev, { id: nextId(), from: 'partner', text: step.text }]);
        schedule(() => {
          stepIndexRef.current = index + 1;
          runStep(index + 1);
        }, NEXT_STEP_DELAY);
      }, TYPING_DELAY);
      return;
    }

    if (step.type === 'auto') {
      schedule(() => {
        setMessages((prev) => [...prev, { id: nextId(), from: 'me', text: step.text }]);
        schedule(() => {
          stepIndexRef.current = index + 1;
          runStep(index + 1);
        }, NEXT_STEP_DELAY);
      }, 350);
      return;
    }

    if (step.type === 'question') {
      questionMetaRef.current = step.meta ?? null;
      setPendingChoices(step.choices);
      return;
    }

    if (step.type === 'photo') {
      setTyping(true);
      schedule(() => {
        setTyping(false);
        setMessages((prev) => [...prev, { id: nextId(), from: 'partner', kind: 'photo' }]);
        setPendingPhoto(true);
      }, TYPING_DELAY);
      return;
    }
  };

  useEffect(() => {
    runStep(stepIndexRef.current);
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectChoice = (choice) => {
    if (phase !== 'playing' || !pendingChoices) return;
    setPendingChoices(null);
    const msgId = nextId();
    setMessages((prev) => [...prev, { id: msgId, from: 'me', text: choice.text }]);

    if (choice.correct) {
      setCorrectCount((c) => c + 1);
      onCorrectRef.current?.();
      schedule(() => {
        const next = stepIndexRef.current + 1;
        stepIndexRef.current = next;
        runStep(next);
      }, NEXT_STEP_DELAY);
      return;
    }

    // 오답: 전송 -> 정적 -> 차단(프로필 회색 + 답장 불가 안내) -> 실패 엔딩
    setPhase('blocking');
    const wrongMeta = questionMetaRef.current;
    schedule(() => {
      setBlocked(true);
      schedule(() => {
        onWrongRef.current?.(wrongMeta);
      }, BLOCK_HOLD_DELAY);
    }, BLOCK_SILENCE_DELAY);
  };

  // 진행 중인 스텝(대기/타이핑 등)을 즉시 정리하고 finish 스텝에 도달한 것처럼 처리한다.
  const skip = () => {
    if (phase === 'done') return;
    clearTimers();
    setTyping(false);
    setPendingChoices(null);
    setPendingPhoto(false);
    setPhase('done');
    onFinishRef.current?.();
  };

  const confirmPhotoViewed = () => {
    if (!pendingPhoto) return;
    setPendingPhoto(false);
    schedule(() => {
      const next = stepIndexRef.current + 1;
      stepIndexRef.current = next;
      runStep(next);
    }, NEXT_STEP_DELAY);
  };

  return {
    messages,
    typing,
    pendingChoices,
    selectChoice,
    pendingPhoto,
    confirmPhotoViewed,
    blocked,
    phase,
    correctCount,
    skip,
  };
}
