// 10번 시나리오 사진 메시지에 쓰이는 합성 이미지 설정.
// 배경 사진(남/여 분기) 위에 TV 화면 이미지를 겹쳐서 보여준다.
// TV 화면용 이미지만 나중에 손쉽게 교체할 수 있도록 경로/좌표를 분리해 두었다.

export const PHOTO_SCENE = {
  // TV 화면 위에 얹는 오버레이 이미지. 지금은 흰색 placeholder이며, 이 경로만 바꾸면 된다.
  tvOverlay: '/photos/tv-overlay.png',

  // tvOverlay가 실제 광고 이미지로 교체되면 true로 바꾼다.
  // true일 때만 TV 화면 위에 '광고' 표시가 나타난다. 지금은 광고가 없으므로 false.
  isAd: false,

  // 배경 사진은 대화 중인 상대(썸남/썸녀) 성별에 따라 달라진다.
  // top/left/width/height는 각 배경 사진 안에서 TV 화면이 차지하는 영역을 백분율로 표현한 값.
  // 배경 사진을 교체하거나 TV 위치를 조정할 때 해당 variant의 tvRegion만 수정하면 된다.
  variants: {
    male: {
      background: '/photos/chat-photo-male.png',
      tvRegion: { top: 12.2, left: 19.5, width: 58.8, height: 27.3 },
    },
    female: {
      background: '/photos/chat-photo-female.png',
      tvRegion: { top: 12.2, left: 19.3, width: 59.9, height: 27.6 },
    },
  },
};
