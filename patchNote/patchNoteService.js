import axios from 'axios';

const getPatchNotes = async (gameId) => {
  try {
    const response = await axios.get(`https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?appid=${gameId}`);
    return response.data; // 실제 API 호출에 맞는 형식으로 데이터를 반환해야 합니다.
  } catch (error) {
    throw new Error('Error fetching patch notes from Steam API: ' + error.message);
  }
};

const comparePatchNotesWithPost = (patchNotes, postContent) => {
  // 유사도 비교를 위한 간단한 예시: 키워드 매칭을 기반으로 유사도 계산
  const patchKeywords = patchNotes.toLowerCase().split(' '); // 패치 노트에서 단어 추출
  const postKeywords = postContent.toLowerCase().split(' '); // 게시글 내용에서 단어 추출

  let matchCount = 0;
  postKeywords.forEach((keyword) => {
    if (patchKeywords.includes(keyword)) {
      matchCount++;
    }
  });

  const similarity = (matchCount / patchKeywords.length) * 100;
  return similarity; // 유사도 백분율 반환
};

export default {
  getPatchNotes,
  comparePatchNotesWithPost
};
