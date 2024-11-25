import db from '../config/databaseSet.js';

// 전체 최신 글 가져오기
async function fetchLatestPosts() {
    try {
        const [rows] = await db.query(`
            SELECT * FROM posts ORDER BY date DESC
        `); // 전체 글을 최신순으로 정렬하여 가져옵니다.
        return rows;
    } catch (error) {
        throw new Error('Failed to fetch latest posts');
    }
}

// 전체 인기 글 가져오기
async function fetchPopularPosts() {
    try {
        const [rows] = await db.query(`
            SELECT * FROM posts ORDER BY view DESC
        `); // 전체 글을 인기순으로 정렬하여 가져옵니다.
        return rows;
    } catch (error) {
        throw new Error('Failed to fetch popular posts');
    }
}

export { fetchLatestPosts, fetchPopularPosts };
