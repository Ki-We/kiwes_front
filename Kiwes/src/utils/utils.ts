export const langList = [
  {key: 'KO', text: '한국어'},
  {key: 'EN', text: 'English'},
  {key: 'JP', text: '日本語'},
  {key: 'CH1', text: '中文(简体)'},
  {key: 'CH2', text: '中文(繁體)'},
  {key: 'FR', text: 'Français'},
  {key: 'ES', text: 'Español'},
  {key: 'DE', text: 'Deutsch'},
  {key: 'RU', text: 'Tiếng Việt'},
  {key: 'VN', text: 'Pyccкий'},
  {key: 'OTHER', text: '기타'},
];
export const categoryList: {key: string; text: string}[] = [
  {key: 'GAME', text: '🎮게임/보드게임'},
  {key: 'CULTURE', text: '🎟️문화/전시/공연'},
  {key: 'DRINK', text: '🍺술'},
  {key: 'SPORTS', text: '🏀스포츠'},
  {key: 'CRAFT', text: '🎨공예/그림'},
  {key: 'VOLUNTEER', text: '❤️봉사활동'},
  {key: 'OTHER', text: '🥝기타'},
  {key: 'KPOP', text: '🎧K-pop'},
  {key: 'CAFE', text: '🍔맛집/카페'},
  {key: 'STUDY', text: '📚스터디'},
  {key: 'TRAVEL', text: '✈️여행'},
  {key: 'KOREAN_CULTURE', text: '🇰🇷한국 문화'},
  {key: 'MOVIE', text: '🎬영화/드라마/애니'},
  {key: 'PARTY', text: '🎉파티/클럽'},
];

export const allCategoryList = [{key: 'ALL', text: '전체'}].concat(
  categoryList,
);
