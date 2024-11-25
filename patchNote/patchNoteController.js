import postService from '../service/postService.js';

export const createPostWithPatchNoteCheck = async (req, res) => {
  const { title, author, content, gameId, characterId } = req.body;

  try {
    // 게시글 생성
    const postId = await postService.createPost(title, author, content, gameId, characterId);

    // 패치 노트와 게시글 유사도 비교
    const patchNotes = await postService.getPatchNotes(gameId);
    const similarity = postService.comparePatchNotesWithPost(patchNotes, content);

    res.status(201).json({
      message: 'Post created successfully',
      postId,
      patchSimilarity: similarity
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};
