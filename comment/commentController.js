import pool from '../config/databaseSet.js';  // MySQL 연결 설정

// 댓글 추가
export const addComment = async (req, res) => {
    const { postId, content } = req.body;
    const userId = req.user.id;  // 인증된 사용자의 ID

    try {
        // 댓글 추가: 게시글에 대해 사용자 ID와 내용을 저장
        const [result] = await pool.query(`
            INSERT INTO comments (postId, userId, content)
            VALUES (?, ?, ?)
        `, [postId, userId, content]);

        res.status(200).json({
            message: '댓글이 추가되었습니다.',
            commentId: result.insertId  // 새로 추가된 댓글의 ID
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '댓글 추가 실패', error: error.message });
    }
};

// 댓글 수정
export const updateComment = async (req, res) => {
    const { commentId, content } = req.body;
    const userId = req.user.id;

    try {
        // 댓글 수정: 사용자가 작성한 댓글만 수정 가능
        const [result] = await pool.query(`
            UPDATE comments
            SET content = ?, updatedAt = CURRENT_TIMESTAMP
            WHERE commentId = ? AND userId = ?
        `, [content, commentId, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
        }

        res.status(200).json({ message: '댓글이 수정되었습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '댓글 수정 실패', error: error.message });
    }
};

// 댓글 삭제
export const deleteComment = async (req, res) => {
    const { commentId } = req.body;
    const userId = req.user.id;

    try {
        // 댓글 삭제: 사용자가 작성한 댓글만 삭제 가능
        const [result] = await pool.query(`
            DELETE FROM comments
            WHERE commentId = ? AND userId = ?
        `, [commentId, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
        }

        res.status(200).json({ message: '댓글이 삭제되었습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '댓글 삭제 실패', error: error.message });
    }
};

// 댓글 조회 (게시글에 달린 댓글 조회)
export const getComments = async (req, res) => {
    const { postId } = req.params;

    try {
        // 게시글에 달린 댓글 조회
        const [comments] = await pool.query(`
            SELECT c.commentId, c.content, c.createdAt, c.updatedAt, u.nickname
            FROM comments c
            JOIN users u ON c.userId = u.userId
            WHERE c.postId = ?
            ORDER BY c.createdAt DESC
        `, [postId]);

        res.status(200).json({ comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '댓글 조회 실패', error: error.message });
    }
};
