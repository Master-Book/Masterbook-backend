import * as mainPageService from './mainPageService.js';

// 최신 글 목록 가져오기
export async function getLatestPosts(req, res) {
    try {
        const posts = await mainPageService.fetchLatestPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching latest posts', error: error.message });
    }
}

// 인기 글 목록 가져오기
export async function getPopularPosts(req, res) {
    try {
        const posts = await mainPageService.fetchPopularPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching popular posts', error: error.message });
    }
}
