const db = require('../../config/databaseSet');

// 게시물 작성
async function createPost({ gameName, characterName, title, authorId, content }) {
    try {
        const [result] = await db.query(`
            INSERT INTO posts (gameName, characterName, title, authorId, content, date)
            VALUES (?, ?, ?, ?, ?, NOW())
        `, [gameName, characterName, title, authorId, content]);
        return { postId: result.insertId, gameName, characterName, title, authorId, content };
    } catch (error) {
        throw new Error('Failed to create post');
    }
}

// 게시물 ID로 게시물 조회
async function getPostById(postId) {
    try {
        const [rows] = await db.query(`
            SELECT * FROM posts WHERE postId = ?
        `, [postId]);
        return rows[0];
    } catch (error) {
        throw new Error('Failed to fetch post by ID');
    }
}

// 최신 게시물 5개 조회
async function getLatestPosts() {
    try {
        const [rows] = await db.query(`
            SELECT * FROM posts ORDER BY date DESC LIMIT 5
        `);
        return rows;
    } catch (error) {
        throw new Error('Failed to fetch latest posts');
    }
}

// 인기 게시물 5개 조회
async function getPopularPosts() {
    try {
        const [rows] = await db.query(`
            SELECT * FROM posts ORDER BY views DESC LIMIT 5
        `);
        return rows;
    } catch (error) {
        throw new Error('Failed to fetch popular posts');
    }
}

module.exports = { createPost, getPostById, getLatestPosts, getPopularPosts };
