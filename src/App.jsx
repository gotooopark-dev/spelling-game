import { useCallback, useState } from 'react';
import './App.css';
import './styles/chat.css';
import './styles/screens.css';
import PhoneFrame from './components/PhoneFrame';
import StartScreen from './screens/StartScreen';
import GenderSelectScreen from './screens/GenderSelectScreen';
import FriendChatScreen from './screens/FriendChatScreen';
import MainGameScreen from './screens/MainGameScreen';
import BlockedScreen from './screens/BlockedScreen';
import SuccessScreen from './screens/SuccessScreen';
import { GENDER } from './data/scenario';

const SCREEN = {
  START: 'start',
  GENDER: 'gender',
  FRIEND: 'friend',
  GAME: 'game',
  BLOCKED: 'blocked',
  SUCCESS: 'success',
};

function App() {
  const [screen, setScreen] = useState(SCREEN.START);
  const [playerGender, setPlayerGender] = useState(GENDER.FEMALE);
  const [wrongQuestionId, setWrongQuestionId] = useState(null);

  const restart = useCallback(() => {
    setPlayerGender(GENDER.FEMALE);
    setWrongQuestionId(null);
    setScreen(SCREEN.START);
  }, []);

  // 실패 화면의 "다시 하기": 성별 선택/친구 대화는 건너뛰고, 같은 상대와의
  // 본 대화를 1번 문제부터 바로 다시 시작한다.
  const retryMainGame = useCallback(() => {
    setWrongQuestionId(null);
    setScreen(SCREEN.GAME);
  }, []);

  let content;
  switch (screen) {
    case SCREEN.START:
      content = <StartScreen onStart={() => setScreen(SCREEN.GENDER)} />;
      break;
    case SCREEN.GENDER:
      content = (
        <GenderSelectScreen
          onSelect={(gender) => {
            setPlayerGender(gender);
            setScreen(SCREEN.FRIEND);
          }}
        />
      );
      break;
    case SCREEN.FRIEND:
      content = (
        <FriendChatScreen
          playerGender={playerGender}
          onEnterGame={() => setScreen(SCREEN.GAME)}
        />
      );
      break;
    case SCREEN.GAME:
      content = (
        <MainGameScreen
          playerGender={playerGender}
          onWrong={(questionId) => {
            setWrongQuestionId(questionId);
            setScreen(SCREEN.BLOCKED);
          }}
          onComplete={() => setScreen(SCREEN.SUCCESS)}
        />
      );
      break;
    case SCREEN.BLOCKED:
      content = <BlockedScreen questionId={wrongQuestionId} onRestart={retryMainGame} />;
      break;
    case SCREEN.SUCCESS:
      content = <SuccessScreen onRestart={restart} />;
      break;
    default:
      content = null;
  }

  return <PhoneFrame>{content}</PhoneFrame>;
}

export default App;
