const channelPageService = require("./channelPageService");

// 특정 게임의 채널 내 게시물 가져오기
async function getPostsByGame(req, res) {
    const { gameName } = req.params;
    try {
        const posts = await channelPageService.fetchPostsByGame(gameName);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts for game', error });
    }
}

module.exports = { getPostsByGame };
