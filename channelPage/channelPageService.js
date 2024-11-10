const db = require("../config/databaseSet");

// 특정 게임의 게시물 목록 가져오기
async function fetchPostsByGame(gameName) {
    try {
        const [rows] = await db.query(`
            SELECT * FROM posts WHERE gameName = ? ORDER BY date DESC
        `, [gameName]);
        return rows;
    } catch (error) {
        throw new Error('Failed to fetch posts for game');
    }
}

module.exports = { fetchPostsByGame };
