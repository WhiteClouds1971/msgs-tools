import { pinyin } from 'pinyin-pro';

/**
 * 将包含汉字的文本（可含 HTML 标签）转换为完整拼音和拼音首字母缩写
 * @param {string} originalText - 输入的原始文本（可能包含 HTML 标签）
 * @returns {{
 *   pinyin: string,
 *   acronym: string
 * }} 包含完整拼音和首字母缩写的对象
 */
const convertChineseToPinyin = originalText => {
  // 去除 HTML 标签，保留纯文本内容
  const cleanText = originalText.replace(/<[^>]*>/g, '');

  // 获取完整拼音（无声调，拼接为字符串）
  const fullPinyin = pinyin(cleanText, {
    toneType: 'none',
    type: 'array',
  }).join('');

  // 获取每个汉字拼音的首字母并拼接为缩写
  const pinyinAcronym = pinyin(cleanText, {
    toneType: 'none',
    pattern: 'first',
    type: 'array',
  }).join('');

  return {
    pinyin: fullPinyin,
    acronym: pinyinAcronym,
  };
};

export { convertChineseToPinyin };
