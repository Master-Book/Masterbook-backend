import { generateGuide } from './guideService.js';
import { saveGuideToDB } from './guideService.js';

export const createGuide = async (req, res) => {
  try {
    const guideContent = await generateGuide();  // Ollama API로 공략 생성
    const savedGuide = await saveGuideToDB(guideContent);  // DB에 저장
    res.status(200).json({
      message: '공략이 성공적으로 저장되었습니다.',
      post: savedGuide
    });
  } catch (error) {
    res.status(500).json({ message: '공략 생성 및 저장 중 오류가 발생했습니다.', error: error.message });
  }
};
