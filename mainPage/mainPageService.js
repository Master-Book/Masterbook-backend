const db = require("../config/databaseSet");

// 최신 글 5개 가져오기
async function fetchLatestPosts() {
    try {
        const [rows] = await db.query(`
            SELECT * FROM posts ORDER BY date DESC LIMIT 5
        `);
        return rows;
    } catch (error) {
        throw new Error('Failed to fetch latest posts');
    }
}

// 인기 글 5개 가져오기
async function fetchPopularPosts() {
    try {
        const [rows] = await db.query(`
            SELECT * FROM posts ORDER BY views DESC LIMIT 5
        `);
        return rows;
    } catch (error) {
        throw new Error('Failed to fetch popular posts');
    }
}

module.exports = { fetchLatestPosts, fetchPopularPosts };
