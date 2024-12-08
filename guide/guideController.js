import pool from '../config/databaseSet.js';

// 유익함 올리기
export const upvoteGuide = async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.id;  // 인증된 사용자의 ID

    try {
        // 유익함 올리기: 해당 게시글에 대해 사용자가 유익함을 눌렀다는 정보 저장
        const [result] = await pool.query(`
            INSERT INTO guide_feedback (userId, postId, feedbackType)
            VALUES (?, ?, 'upvote')
        `, [userId, postId]);

        // guideRating을 업데이트
        await updateGuideRating(postId);

        res.status(200).json({ message: '유익함을 올렸습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '유익함 올리기 실패', error: error.message });
    }
};

// 유익함 내리기
export const cancelUpvoteGuide = async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.id;

    try {
        // 유익함 내리기: 해당 게시글에 대해 사용자가 유익함을 취소한 정보 삭제
        await pool.query(`
            DELETE FROM guide_feedback
            WHERE userId = ? AND postId = ? AND feedbackType = 'upvote'
        `, [userId, postId]);

        // guideRating을 업데이트
        await updateGuideRating(postId);

        res.status(200).json({ message: '유익함을 내렸습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '유익함 내리기 실패', error: error.message });
    }
};

// 유익하지 않음 올리기
export const downvoteGuide = async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.id;

    try {
        // 유익하지 않음 올리기: 해당 게시글에 대해 사용자가 유익하지 않음을 눌렀다는 정보 저장
        const [result] = await pool.query(`
            INSERT INTO guide_feedback (userId, postId, feedbackType)
            VALUES (?, ?, 'downvote')
        `, [userId, postId]);

        // guideRating을 업데이트
        await updateGuideRating(postId);

        res.status(200).json({ message: '유익하지 않음을 올렸습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '유익하지 않음 올리기 실패', error: error.message });
    }
};

// 유익하지 않음 내리기
export const cancelDownvoteGuide = async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.id;

    try {
        // 유익하지 않음 내리기: 해당 게시글에 대해 사용자가 유익하지 않음을 취소한 정보 삭제
        await pool.query(`
            DELETE FROM guide_feedback
            WHERE userId = ? AND postId = ? AND feedbackType = 'downvote'
        `, [userId, postId]);

        // guideRating을 업데이트
        await updateGuideRating(postId);

        res.status(200).json({ message: '유익하지 않음을 내렸습니다.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '유익하지 않음 내리기 실패', error: error.message });
    }
};

// guideRating 업데이트 함수
export const updateGuideRating = async (postId) => {
    try {
        // 유익함과 유익하지 않음 카운트
        const [upvoteCount] = await pool.query(`
            SELECT COUNT(*) AS count FROM guide_feedback
            WHERE postId = ? AND feedbackType = 'upvote'
        `, [postId]);

        const [downvoteCount] = await pool.query(`
            SELECT COUNT(*) AS count FROM guide_feedback
            WHERE postId = ? AND feedbackType = 'downvote'
        `, [postId]);

        // guideRating 계산: 유익함이 많으면 0, 유익하지 않음이 많으면 1
        const guideRating = upvoteCount[0].count > downvoteCount[0].count ? 0 : 1;

        // guideRating 업데이트
        await pool.query(`
            UPDATE posts SET guideRating = ?
            WHERE postId = ?
        `, [guideRating, postId]);
    } catch (error) {
        console.error('guideRating 업데이트 실패:', error);
        throw error;
    }
};
