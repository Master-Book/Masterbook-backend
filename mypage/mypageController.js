import { getPostsByUserId, getCommentsByUserId, getLikesByUserId, getUserNickname } from './mypageService.js';

// 사용자 nickname 조회
export const getNickname = async (req, res) => {
    try {
        const userId = req.user.id;  // 인증된 사용자 정보 가져오기
        console.log('User ID:', userId);  // userId 로그 출력
        const nickname = await getUserNickname(userId);  // 닉네임 가져오기
        if (!nickname) {
            return res.status(404).json({ message: 'Nickname not found' });
        }
        res.status(200).json({ nickname });  // 닉네임 반환
    } catch (error) {
        console.error('Error fetching nickname:', error);
        res.status(500).json({ message: 'Error fetching nickname' });
    }
};


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
