import pool from '../../config/databaseSet.js';

// 사용자의 userId를 가져오는 함수
export const getUserByNickname = async (nickname) => {
  try {
    const [rows] = await pool.query('SELECT userId FROM users WHERE nickname = ?', [nickname]);
    if (rows.length === 0) {
      throw new Error('User not found');
    }
    return rows; // 사용자 정보를 반환
  } catch (error) {
    throw new Error('Error retrieving user by nickname: ' + error.message);
  }
};

// 게시글 생성 함수
export const createPost = async (title, authorId, author, content, gameId, characterId) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO posts (title, author, authorId, content, date, gameId, characterId) VALUES (?, ?, ?, ?, NOW(), ?, ?)',
      [title, author, authorId, content, gameId, characterId]
    );
    return result.insertId; // 생성된 게시글 ID 반환
  } catch (error) {
    throw new Error('Error creating post: ' + error.message);
  }
};

// 게시글 수정 함수
export const updatePost = async (postId, title, authorId, author, content, gameId, characterId) => {
  try {
    await pool.query(
      'UPDATE posts SET title = ?, author = ?, authorId = ?, content = ?, gameId = ?, characterId = ? WHERE postId = ?',
      [title, author, authorId, content, gameId, characterId, postId]
    );
  } catch (error) {
    throw new Error('Error updating post: ' + error.message);
  }
};

// 게시글 조회 함수
export const getPost = async (postId) => {
  try {
    const [rows] = await pool.query('SELECT * FROM posts WHERE postId = ?', [postId]);
    if (rows.length === 0) {
      throw new Error('Post not found');
    }
    return rows[0]; // 게시글 정보 반환
  } catch (error) {
    throw new Error('Error retrieving post: ' + error.message);
  }
};

// 게시글 삭제 함수
export const deletePost = async (postId) => {
  try {
    await pool.query('DELETE FROM posts WHERE postId = ?', [postId]);
  } catch (error) {
    throw new Error('Error deleting post: ' + error.message);
  }
};

// 모든 함수들을 객체로 내보냄
export default {
  getUserByNickname,
  createPost,
  updatePost,
  getPost,
  deletePost
};
