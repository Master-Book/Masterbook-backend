import pool from '../../config/databaseSet.js';

// 사용자 닉네임으로 userId 가져오기
export const getUserByNickname = async (nickname) => {
  try {
    const [rows] = await pool.query('SELECT userId FROM users WHERE nickname = ?', [nickname]);
    if (rows.length === 0) {
      throw new Error('User not found');
    }
    return rows;
  } catch (error) {
    throw new Error('Error retrieving user by nickname: ' + error.message);
  }
};

// 게시글 생성
export const createPost = async (title, authorId, author, content, gameId, characterId) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO posts (title, author, authorId, content, date, gameId, characterId) VALUES (?, ?, ?, ?, NOW(), ?, ?)',
      [title, author, authorId, content, gameId, characterId]
    );
    return result.insertId;
  } catch (error) {
    throw new Error('Error creating post: ' + error.message);
  }
};

// 게시글 수정
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

// 게시글 조회
export const getPost = async (postId) => {
  try {
    const [rows] = await pool.query('SELECT * FROM posts WHERE postId = ?', [postId]);
    if (rows.length === 0) {
      throw new Error('Post not found');
    }
    return rows[0]; // isAccurate 값도 포함된 게시글 반환
  } catch (error) {
    throw new Error('Error retrieving post: ' + error.message);
  }
};

// 게시글 삭제
export const deletePost = async (postId) => {
  try {
    await pool.query('DELETE FROM posts WHERE postId = ?', [postId]);
  } catch (error) {
    throw new Error('Error deleting post: ' + error.message);
  }
};

// 좋아요 추가
export const addLike = async (postId, userId) => {
  try {
    await pool.query('INSERT INTO likes (postId, userId) VALUES (?, ?)', [postId, userId]);
  } catch (error) {
    throw new Error('Error adding like: ' + error.message);
  }
};

// 좋아요 삭제
export const removeLike = async (postId, userId) => {
  try {
    await pool.query('DELETE FROM likes WHERE postId = ? AND userId = ?', [postId, userId]);
  } catch (error) {
    throw new Error('Error removing like: ' + error.message);
  }
};

// 좋아요 수 조회
export const getLikeCount = async (postId) => {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) as likeCount FROM likes WHERE postId = ?', [postId]);
    return rows[0].likeCount;
  } catch (error) {
    throw new Error('Error retrieving like count: ' + error.message);
  }
};

// isAccurate 값 조회
export const getIsAccurate = async (postId) => {
  try {
    console.log(`Fetching isAccurate for postId: ${postId}`);
    const [rows] = await pool.query('SELECT isAccurate FROM posts WHERE postId = ?', [postId]);
    if (rows.length === 0) {
      console.error(`Post with postId ${postId} not found`);
      throw new Error('Post not found');
    }
    console.log(`isAccurate value: ${rows[0].isAccurate}`);
    return rows[0].isAccurate;
  } catch (error) {
    console.error('Error retrieving isAccurate:', error.message);
    throw new Error('Error retrieving isAccurate: ' + error.message);
  }
};

export default {
  getUserByNickname,
  createPost,
  updatePost,
  getPost,
  deletePost,
  addLike,
  removeLike,
  getLikeCount,
  getIsAccurate
};
