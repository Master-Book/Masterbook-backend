import axios from 'axios';
import pool from '../config/databaseSet.js';

// Ollama API를 통해 공략 내용 생성
export const generateGuide = async () => {
  const data = {
    model: 'llama2',
    messages: [
      { role: 'user', content: '리그오브레전드 공략을 만들어줘' }
    ]
  };

  try {
    const response = await axios.post('http://localhost:11434/v1/chat/completions', data);
    return response.data.choices[0].message.content;  // 공략 내용 반환
  } catch (error) {
    console.error('Ollama API 호출 오류:', error);
    throw error;  // 에러가 발생하면 예외 처리
  }
};

// 공략을 DB에 저장
export const saveGuideToDB = async (guideContent) => {
  const query = `
    INSERT INTO posts (title, authorId, author, content, gameId, characterId)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  try {
    const [result] = await pool.query(query, [
      '롤 공략', // title
      1,         // authorId 
      'AI 생성',  // author
      guideContent, // content
      1,           // gameId 
      1            // characterId 
    ]);

    return {
      postId: result.insertId,
      title: '롤 공략',
      authorId: 1,
      author: 'AI 생성',
      content: guideContent,
      gameId: 1,
      characterId: 1
    };
  } catch (error) {
    console.error('DB 저장 오류:', error);
    throw error;  // 에러가 발생하면 예외 처리
  }
};
