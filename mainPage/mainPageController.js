const mainPageService = require("./mainPageService");

// 최신 글 목록 가져오기
async function getLatestPosts(req, res) {
    try {
        const posts = await mainPageService.fetchLatestPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching latest posts', error });
    }
}

// 인기 글 목록 가져오기
async function getPopularPosts(req, res) {
    try {
        const posts = await mainPageService.fetchPopularPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching popular posts', error });
    }
}

module.exports = { getLatestPosts, getPopularPosts };
