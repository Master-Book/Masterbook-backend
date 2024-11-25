import db from '../config/databaseSet.js';

// 특정 게임의 게시물 목록 가져오기
async function fetchPostsByGame(gameId) {
    try {
        const [rows] = await db.query(`
            SELECT p.postId, p.title, p.author, p.content, p.date, p.view AS views, g.gameId, c.characterId
            FROM posts p
            JOIN games g ON p.gameId = g.gameId
            JOIN characters c ON p.characterId = c.characterId
            WHERE g.gameId = ? 
            ORDER BY p.date DESC
        `, [gameId]);
        return rows;
    } catch (error) {
        throw new Error('Failed to fetch posts for game');
    }
}

export { fetchPostsByGame };
