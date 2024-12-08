// patchNotesService.js
import axios from 'axios';
import db from '../config/databaseSet.js';  // 데이터베이스 연결 모듈
import RSSParser from 'rss-parser';  // RSS 파싱을 위한 패키지

const parser = new RSSParser();

// 패치노트 데이터를 가져오고 게시글을 업데이트하는 함수
const analyzePatchNotes = async () => {
  try {
    // 스타듀 밸리의 RSS 피드에서 패치노트 데이터를 가져옵니다.
    const feed = await parser.parseURL('https://store.steampowered.com/feeds/news/app/413150/');
    const patchNotes = feed.items.map(item => item.contentSnippet); // 각 패치노트의 설명 추출

    // 게시글을 가져옵니다.
    const [posts] = await db.execute('SELECT * FROM posts');

    // 각 게시글에 대해 패치노트와 비교
    for (const post of posts) {
      // 게시글과 패치노트를 비교하는 함수 (예: 유사도 비교)
      const isSimilar = compareWithPatchNotes(post.content, patchNotes);

      // 유사한 내용이 발견되면 게시글의 isAccurate를 0으로 업데이트
      if (isSimilar) {
        await db.execute('UPDATE posts SET isAccurate = 0 WHERE postId = ?', [post.postId]);
      }
    }

  } catch (error) {
    console.error('패치노트 분석 오류:', error.message);
    throw new Error('패치노트 분석 실패');
  }
};

// 게시글 내용과 패치노트의 유사도를 비교하는 함수 (예시로 간단한 문자열 비교)
const compareWithPatchNotes = (postContent, patchNotes) => {
  // 여기서는 간단한 문자열 포함 여부로 유사도를 판단하는 예시입니다.
  // 실제로는 더 정교한 텍스트 분석 또는 NLP 기법을 사용할 수 있습니다.
  return patchNotes.some(patchNote => postContent.includes(patchNote));
};

export default { analyzePatchNotes };  // default 내보내기
