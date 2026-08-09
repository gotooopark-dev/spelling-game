// ─────────────────────────────────────────────────────────────
// 대화/문제 데이터
// ─────────────────────────────────────────────────────────────

export const GENDER = {
  FEMALE: 'female', // 플레이어가 여성 -> 상대는 썸남
  MALE: 'male', // 플레이어가 남성 -> 상대는 썸녀
};

// 오답으로 차단되는 순간 상대 프로필을 대신할 기본 회색 아이콘
export const DEFAULT_AVATAR = '/profiles/default.svg';

// 플레이어 성별에 따른 상대 정보
export function getPartner(playerGender) {
  return playerGender === GENDER.FEMALE
    ? { type: 'someNam', label: '썸남', name: '썸남', avatar: '/profiles/male.png' }
    : { type: 'someNyeo', label: '썸녀', name: '썸녀', avatar: '/profiles/female.png' };
}

// ── 오프닝: 친구와의 대화 ──────────────────────────────────
// speaker: 'friend' | 'me'
const openingByGender = {
  [GENDER.FEMALE]: [
    // 상대가 썸남일 때
    { speaker: 'friend', text: '야 어땠어' },
    { speaker: 'me', text: '미쳤어. 존잘이야..' },
    { speaker: 'me', text: '사랑해 친구야ㅠㅠㅠ' },
  ],
  [GENDER.MALE]: [
    // 상대가 썸녀일 때
    { speaker: 'friend', text: '야 어땠어' },
    { speaker: 'me', text: '내 천년의 이상형..ㅠㅠㅠㅠ' },
    { speaker: 'me', text: '사랑한다 친구야' },
  ],
};

const openingCommon = [
  { speaker: 'friend', text: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋ 잘됐네' },
  { speaker: 'friend', text: '아 근데 걔 맞춤법 엄청 본다던데' },
  { speaker: 'me', text: '예?' },
  { speaker: 'friend', text: '맞춤법 틀리면 좀 깬다고 하더라' },
  { speaker: 'me', text: '문제 없어ㅋㅋ' },
  { speaker: 'me', text: '나 국어 잘해' },
  { speaker: 'friend', text: '과연' },
];

export function getOpeningScript(playerGender) {
  return [...openingByGender[playerGender], ...openingCommon];
}

// ── 본게임: 썸남/썸녀와의 대화 (총 10문제) ──────────────────
// 각 문제 구조:
//   lines: 선택지 등장 전 오가는 대사. speaker는 'partner' | 'me'
//   choices: 답장 보기 2개. 하나만 correct: true (정답 위치는 문제마다 섞여 있음)
//   followup: 정답을 고른 뒤 이어지는 대사. speaker는 'partner' | 'me'
export const mainGameQuestions = [
  {
    id: 1,
    topic: "의존 명사 '만'",
    lines: [
      { speaker: 'partner', text: '집 잘 들어갔어?' },
      { speaker: 'me', text: '응ㅋㅋ 방금 도착했어' },
      { speaker: 'me', text: '너는?' },
      { speaker: 'partner', text: '나는 아직 가는 중ㅋㅋ' },
      { speaker: 'partner', text: '근데 오늘 처음 본 거 맞나 싶다' },
      { speaker: 'partner', text: '생각보다 안 어색했어' },
    ],
    choices: [
      { text: '그러게ㅋㅋ 만난 지 몇 시간만에 엄청 편해졌네', correct: false },
      { text: '그러게ㅋㅋ 만난 지 몇 시간 만에 엄청 편해졌네', correct: true },
    ],
    followup: [
      { speaker: 'partner', text: '그치ㅋㅋ' },
      { speaker: 'partner', text: '시간도 엄청 빨리 갔어' },
    ],
  },
  {
    id: 2,
    topic: '액세서리 / 악세서리',
    lines: [
      { speaker: 'partner', text: '아 맞다' },
      { speaker: 'partner', text: '아까 말하려다 까먹었는데' },
      { speaker: 'partner', text: '오늘 차고 있던 팔찌 예쁘더라' },
    ],
    choices: [
      { text: '고마워ㅋㅋ 나 액세서리 구경하는 거 좋아해', correct: true },
      { text: '고마워ㅋㅋ 나 악세서리 구경하는 거 좋아해', correct: false },
    ],
    followup: [
      { speaker: 'partner', text: '역시ㅋㅋ' },
      { speaker: 'partner', text: '옷이랑 잘 어울렸어' },
    ],
  },
  {
    id: 3,
    topic: "'-든지 / -던지'",
    lines: [
      { speaker: 'partner', text: '근데 버스가 진짜 안 와ㅠㅋㅋ' },
      { speaker: 'me', text: '아직도 기다리는 중이야?' },
      { speaker: 'partner', text: '응ㅋㅋㅋㅋ' },
    ],
    choices: [
      { text: '너무 안 오면 택시 타던지 해ㅋㅋ', correct: false },
      { text: '너무 안 오면 택시 타든지 해ㅋㅋ', correct: true },
    ],
    followup: [
      { speaker: 'partner', text: '걱정해 주는 거야?' },
      { speaker: 'me', text: '아니 뭐ㅋㅋ 그냥' },
      { speaker: 'partner', text: 'ㅋㅋㅋㅋ 버스 왔다' },
    ],
  },
  {
    id: 4,
    topic: '삼가다 / 삼가하다',
    lines: [
      { speaker: 'partner', text: '근데 타자마자 정신없네ㅋㅋ' },
      { speaker: 'me', text: '왜?' },
      { speaker: 'partner', text: '뒤에서 어떤 사람이 통화를 엄청 크게 해' },
    ],
    choices: [
      { text: '대중교통에서는 그런 건 좀 삼가야지ㅋㅋ', correct: true },
      { text: '대중교통에서는 그런 건 좀 삼가해야지ㅋㅋ', correct: false },
    ],
    followup: [
      { speaker: 'partner', text: '그러니까ㅋㅋ' },
      { speaker: 'partner', text: '이어폰 끼고 있는데도 다 들려' },
    ],
  },
  {
    id: 5,
    topic: "의존 명사 '데'",
    lines: [
      { speaker: 'partner', text: '그러고 보니 오늘 카페' },
      { speaker: 'partner', text: '네가 찾은 거랬지?' },
      { speaker: 'me', text: '응ㅋㅋ' },
      { speaker: 'partner', text: '찾느라 오래 걸렸어?' },
    ],
    choices: [
      { text: '응ㅋㅋ 괜찮은 데 찾는 데만 한 시간 걸렸어', correct: true },
      { text: '응ㅋㅋ 괜찮은 데 찾는데만 한 시간 걸렸어', correct: false },
    ],
    followup: [
      { speaker: 'partner', text: '한 시간이나?ㅋㅋㅋㅋ' },
      { speaker: 'partner', text: '난 그냥 우연히 찾은 줄 알았는데' },
    ],
  },
  {
    id: 6,
    topic: '내로라하다 / 내노라하다',
    lines: [],
    choices: [
      { text: '그 동네에서 내노라하는 카페는 다 찾아봤지ㅋㅋ', correct: false },
      { text: '그 동네에서 내로라하는 카페는 다 찾아봤지ㅋㅋ', correct: true },
    ],
    followup: [
      { speaker: 'partner', text: '진심이었네ㅋㅋㅋㅋ' },
      { speaker: 'partner', text: '그래서 오늘 간 데가 제일 괜찮았어?' },
      { speaker: 'me', text: '음...' },
    ],
  },
  {
    id: 7,
    topic: "접사 '-째'",
    lines: [{ speaker: 'partner', text: '원래 가려던 곳 아니었어?ㅋㅋㅋㅋ' }],
    choices: [
      { text: '세 번째 후보였어ㅋㅋ 원래 가려던 데는 따로 있었어', correct: true },
      { text: '세 번 째 후보였어ㅋㅋ 원래 가려던 데는 따로 있었어', correct: false },
    ],
    followup: [
      { speaker: 'partner', text: '세 군데나 찾아봤어?ㅋㅋ' },
      { speaker: 'me', text: '열심히 골랐지' },
      { speaker: 'partner', text: '덕분에 좋긴 했어ㅋㅋ' },
    ],
  },
  {
    id: 8,
    topic: '자리를 빌려 / 자리를 빌어',
    lines: [
      { speaker: 'partner', text: '그러고 보니' },
      { speaker: 'partner', text: '너 오늘 10분 늦었지' },
    ],
    choices: [
      { text: '이 자리를 빌어 다시 사과할게. 미안해!!', correct: false },
      { text: '이 자리를 빌려 다시 사과할게. 미안해!!', correct: true },
    ],
    followup: [
      { speaker: 'partner', text: 'ㅋㅋㅋㅋㅋㅋ 무슨 시상식 소감인 줄' },
      { speaker: 'me', text: '진심을 담았습니다' },
      { speaker: 'partner', text: '이번만 봐드립니다ㅋㅋㅋㅋㅋ' },
    ],
  },
  {
    id: 9,
    topic: '느지막이 / 느즈막이',
    lines: [
      { speaker: 'me', text: 'ㅋㅋㅋㅋ 감사합니다' },
      { speaker: 'partner', text: '너 내일은 뭐 해?' },
    ],
    choices: [
      { text: '별거 없어ㅋㅋ 느지막이 일어나서 쉴 듯', correct: true },
      { text: '별거 없어ㅋㅋ 느즈막이 일어나서 쉴 듯', correct: false },
    ],
    followup: [
      { speaker: 'partner', text: '나는 내일 아침 9시에 친구 만나야 돼ㅠ' },
      { speaker: 'me', text: '주말인데 엄청 일찍 만나네ㅋㅋ' },
      { speaker: 'partner', text: '그치ㅠ' },
      { speaker: 'partner', text: '대신 일찍 헤어질 듯' },
    ],
  },
  {
    id: 10,
    topic: '얻다 / 어따',
    lines: [
      { speaker: 'partner', text: '아 잠깐만' },
      { speaker: 'partner', text: '나 이어폰이 안 보이는데' },
      { speaker: 'me', text: '버스에서 끼고 있었다며' },
      { speaker: 'partner', text: '그러니까ㅠ' },
      { speaker: 'partner', text: '집에 들고 온 것 같은데 안 보여' },
    ],
    choices: [
      { text: '어따 뒀는지 잘 생각해 봐ㅋㅋ 가방 안에는 없어?', correct: false },
      { text: '얻다 뒀는지 잘 생각해 봐ㅋㅋ 가방 안에는 없어?', correct: true },
    ],
    followup: [
      { speaker: 'partner', text: '아 잠깐만' },
      { speaker: 'partner', text: 'ㅋㅋㅋㅋ' },
      { type: 'photo' },
      { speaker: 'partner', text: 'ㅋㅋㅋㅋㅋㅋ' },
      { speaker: 'partner', text: '주머니에 있었어' },
      { speaker: 'me', text: '그럴 줄 알았다ㅋㅋ' },
      { speaker: 'partner', text: '찾아 준 기념으로' },
      { speaker: 'partner', text: '다음 주에 밥 살게' },
      { speaker: 'me', text: '오ㅋㅋ' },
      { speaker: 'partner', text: '토요일 어때?' },
    ],
  },
];

// 오프닝 종료 후, 상단 알림 배너에 미리보기로 표시할 상대의 첫 메시지
export function getFirstMessagePreview() {
  return mainGameQuestions[0]?.lines?.[0]?.text ?? '';
}

// ── 엔딩 ──────────────────────────────────────────────────
// 10번 문제의 followup(다음 데이트 제안 대사)이 끝나면 대화창을 잠깐 더 보여준 뒤 성공 화면으로 이어진다.
export const successTitle = '다음 약속을 잡았습니다💘';

// 결과 공유하기 버튼에 쓰이는 문구
export const successShareText = '다음 데이트 잡는 데 성공 💘';
export function getFailureShareText(questionId) {
  return `${questionId}번째 맞춤법에서 썸 종료🥲`;
}

// 오답 선택 후 정적 -> 차단 연출 중, 대화창 하단에 잠깐 보여줄 안내 문구
export const blockedBannerText = '메시지를 보낼 수 없습니다.';

// 문제별 정답/해설. 실패 엔딩에서 플레이어가 틀린 문제 번호에 맞춰 보여준다.
export const wrongAnswerInfo = [
  {
    id: 1,
    answer: '그러게ㅋㅋ 만난 지 몇 시간 만에 엄청 편해졌네',
    explanation: "'만'이 지난 시간이나 거리를 나타내는 의존 명사일 때는 앞말과 띄어 써요.",
  },
  {
    id: 2,
    answer: '고마워ㅋㅋ 나 액세서리 구경하는 거 좋아해',
    explanation: "외래어 표준 표기는 '액세서리'예요.",
  },
  {
    id: 3,
    answer: '너무 안 오면 택시 타든지 해ㅋㅋ',
    explanation: "'-든지'는 여러 가능성 중 하나를 선택할 때 써요. '-던지'는 과거의 일을 떠올릴 때 쓰여요.",
  },
  {
    id: 4,
    answer: '대중교통에서는 그런 건 좀 삼가야지ㅋㅋ',
    explanation: "기본형은 '삼가다'예요. 따라서 '삼가야지'로 활용해요.",
  },
  {
    id: 5,
    answer: '응ㅋㅋ 괜찮은 데 찾는 데만 한 시간 걸렸어',
    explanation: "'데'가 '일·경우·장소' 등을 뜻하는 의존 명사일 때는 앞말과 띄어 써요.",
  },
  {
    id: 6,
    answer: '그 동네에서 내로라하는 카페는 다 찾아봤지ㅋㅋ',
    explanation: "어떤 분야에서 뛰어나거나 대표할 만하다는 뜻의 말은 '내로라하다'예요.",
  },
  {
    id: 7,
    answer: '세 번째ㅋㅋ 원래 가려던 데는 따로 있었어',
    explanation: "'차례'나 '등급'의 뜻을 더하는 접미사인 '-째'는 접미사라는 점에서 앞말과 붙여 써요.",
  },
  {
    id: 8,
    answer: '그럼 이 자리를 빌려 다시 사과할게ㅋㅋ 미안',
    explanation: "장소나 기회를 이용한다는 뜻에서는 '빌리다'를 써서 '이 자리를 빌려'라고 해요.",
  },
  {
    id: 9,
    answer: '별거 없어ㅋㅋ 느지막이 일어나서 쉴 듯',
    explanation: "'시간이나 기한이 꽤 늦게'라는 뜻의 표준어는 '느지막이'예요.",
  },
  {
    id: 10,
    answer: '얻다 뒀는지 잘 생각해 봐ㅋㅋ 가방 안에는 없어?',
    explanation: "'얻다'는 '어디에다'가 줄어든 말이에요.",
  },
];

export function getWrongAnswerInfo(questionId) {
  return wrongAnswerInfo.find((item) => item.id === questionId) ?? null;
}
