import { pinyin } from 'pinyin-pro';
import Fuse from 'fuse.js';

/**
 * 根据关键词在搜索项中匹配汉字、拼音或拼音首字母，
 * 并保持匹配结果在原始数据中的顺序。
 * @param {string} keyword - 用户输入的搜索关键词
 * @param {Fuse} fuse - 已初始化的 Fuse.js 搜索实例，包含待搜索的数据
 * @returns {Array} - 按原始顺序排列的匹配项列表；若无匹配或关键词为空，则返回空数组
 */
const searchItemsByKeyword = (keyword, fuse) => {
  const normalizedKeyword = keyword.trim();
  if (!normalizedKeyword) {
    return [];
  }

  // 执行模糊搜索
  const searchResults = fuse.search(normalizedKeyword);

  // 提取匹配项及其原始索引
  const matchedItemsWithIndex = searchResults.map(result => ({
    item: result.item,
    refIndex: result.refIndex, // Fuse 提供的原始索引
  }));

  // 按原始索引升序排序，以恢复原始顺序
  matchedItemsWithIndex.sort((a, b) => a.refIndex - b.refIndex);

  // 返回仅包含 item 的数组
  return matchedItemsWithIndex.map(entry => entry.item);
};

/**
 * 根据关键词在搜索项中匹配汉字的汉字数组
 */
const getHighlightWords = (keyword, text) => {
  const kw = keyword.trim().toLowerCase();
  if (!kw) return [];

  // 如果关键词本身就是汉字，直接返回
  if (/[\u4e00-\u9fa5]/.test(kw)) {
    return [kw];
  }

  // 需要按拼音搜索的文字太长，性能消耗太大，直接返回
  if (text.length >= 20) {
    return [kw];
  }

  const words = [];
  const len = text.length;
  // 遍历所有子串，检查其拼音或首字母是否匹配关键词
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j <= len; j++) {
      const substr = text.slice(i, j);
      // 跳过纯非汉字（如标点、英文）
      if (!/[\u4e00-\u9fa5]/.test(substr)) continue;

      const py = pinyin(substr, { toneType: 'none', type: 'array' })
        .join('')
        .toLowerCase();
      const acr = pinyin(substr, {
        toneType: 'none',
        pattern: 'first',
        type: 'array',
      })
        .join('')
        .toLowerCase();

      if (py.startsWith(keyword) || acr.startsWith(keyword)) {
        words.push(substr);
        break;
      }
    }
    if (words.length > 0) {
      break;
    }
  }

  // 去重 + 按长度降序（优先高亮长词，避免碎片）
  return [...new Set(words)].sort((a, b) => b.length - a.length);
};

export { searchItemsByKeyword, getHighlightWords };
