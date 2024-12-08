import { analyzePatchNotes } from '../service/patchnoteService.js';

// 패치노트 분석을 트리거하는 함수
export const analyzePatchNotesController = async (req, res) => {
  try {
    await analyzePatchNotes();
    return res.status(200).json({ message: '패치노트 분석 완료' });
  } catch (error) {
    console.error('패치노트 분석 오류:', error.message);
    return res.status(500).json({ message: '패치노트 분석 실패', error: error.message });
  }
};
