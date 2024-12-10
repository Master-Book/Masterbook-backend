import db from '../config/databaseSet.js';

// 사용자 ID로 작성한 게시글 가져오기
export const getPostsByUserId = async (userId) => {
    try {
        const posts = await db.query('SELECT * FROM posts WHERE user_id = ?', [userId]);
        return posts;
    } catch (error) {
        throw new Error('Error fetching posts from database');
    }
};

// 사용자 ID로 작성한 댓글 가져오기
export const getCommentsByUserId = async (userId) => {
    try {
        const comments = await db.query('SELECT * FROM comments WHERE user_id = ?', [userId]);
        return comments;
    } catch (error) {
        throw new Error('Error fetching comments from database');
    }
};

// 사용자 ID로 좋아요한 항목 가져오기
export const getLikesByUserId = async (userId) => {
    try {
        const likes = await db.query('SELECT * FROM likes WHERE user_id = ?', [userId]);
        return likes;
    } catch (error) {
        throw new Error('Error fetching likes from database');
    }
};
