import { getPostsByUserId, getCommentsByUserId, getLikesByUserId } from './mypageService.js';

// 게시글 조회
export const getPosts = async (req, res) => {
    try {
        const userId = req.user.id; // 인증된 사용자 정보 가져오기
        const posts = await getPostsByUserId(userId); // 서비스 함수 호출
        res.status(200).json(posts); // 게시글 반환
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
};

// 댓글 조회
export const getComments = async (req, res) => {
    try {
        const userId = req.user.id; // 인증된 사용자 정보 가져오기
        const comments = await getCommentsByUserId(userId); // 서비스 함수 호출
        res.status(200).json(comments); // 댓글 반환
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Error fetching comments' });
    }
};

// 좋아요 항목 조회
export const getLikes = async (req, res) => {
    try {
        const userId = req.user.id; // 인증된 사용자 정보 가져오기
        const likes = await getLikesByUserId(userId); // 서비스 함수 호출
        res.status(200).json(likes); // 좋아요 항목 반환
    } catch (error) {
        console.error('Error fetching likes:', error);
        res.status(500).json({ message: 'Error fetching likes' });
    }
};