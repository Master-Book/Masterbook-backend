// patchNotesController.js
import patchNoteService from './patchNotesService.js';  // default 내보내기 방식으로 가져오기

const analyzePatchNotesController = async (req, res) => {
  try {
    // 패치노트 분석 및 게시글 업데이트 호출
    await patchNoteService.analyzePatchNotes();
    res.status(200).send('패치노트 분석 완료');
  } catch (error) {
    console.error('패치노트 분석 실패:', error.message);
    res.status(500).send('패치노트 분석 실패');
  }
};

export { analyzePatchNotesController };  // 이름을 analyzePatchNotesController로 내보내기
