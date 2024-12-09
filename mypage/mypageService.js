import pool from '../config/databaseSet.js';

// 내가 작성한 글 조회
export const getMyPosts = async (userId) => {
  try {
    const [rows] = await pool.query(
      'SELECT postId, title, content, date, gameId, characterId FROM posts WHERE authorId = ?',
      [userId]
    );
    return rows;
  } catch (error) {
    throw new Error('Error retrieving user posts: ' + error.message);
  }
};

// 내가 작성한 댓글 조회
export const getMyComments = async (userId) => {
  try {
    const [rows] = await pool.query(
      'SELECT commentId, postId, content, date FROM comments WHERE userId = ?',
      [userId]
    );
    return rows;
  } catch (error) {
    throw new Error('Error retrieving user comments: ' + error.message);
  }
};

// 내가 좋아요 누른 글 조회
export const getMyLikedPosts = async (userId) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.postId, p.title, p.author, p.date 
       FROM posts p
       JOIN likes l ON p.postId = l.postId
       WHERE l.userId = ?`,
      [userId]
    );
    return rows;
  } catch (error) {
    throw new Error('Error retrieving liked posts: ' + error.message);
  }
};

export default {
  getMyPosts,
  getMyComments,
  getMyLikedPosts,
};
