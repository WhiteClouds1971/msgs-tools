import seedrandom from 'seedrandom';
import colors from '@/assets/constants/Color.js';

/**
 * 加权随机选择函数
 * @param {Array} items - 可选项列表，每个元素应包含 { code, probability? }，probability 默认为 1
 * @param {number} count - 选择数量
 * @param {boolean} model - 是否允许重复。false = 不允许重复（唯一），true = 允许重复
 * @param {Array} exclude - 需要排除的项（通过 code 匹配）
 * @param {string|number} [seed] - 随机种子，可选。默认使用当前时间戳
 * @returns {Array} 选中的项列表
 */
const random = (
  items,
  count,
  model = false,
  exclude = [],
  seed = Date.now().toString()
) => {
  const rng = seedrandom(seed.toString());

  // 过滤排除项
  let candidates = [...items];
  if (exclude?.length > 0) {
    const excludeCodes = new Set(exclude.map(it => it.code));
    candidates = candidates.filter(item => !excludeCodes.has(item.code));
  }

  // 如果没有候选，直接返回空数组
  if (candidates.length === 0) return [];

  // 为每个项设置默认 probability = 1
  candidates = candidates.map(item => ({
    ...item,
    probability: item.probability ?? 1,
  }));

  const result = [];

  // 如果不允许重复（model === false），我们将在 candidates 中动态移除已选项
  let availableItems = model ? null : [...candidates];

  for (let i = 0; i < count; i++) {
    let currentPool = model ? candidates : availableItems;

    // 如果不允许重复且无剩余项，跳出
    if (!model && currentPool.length === 0) break;

    // 计算总权重
    const totalWeight = currentPool.reduce(
      (sum, item) => sum + item.probability,
      0
    );

    // 生成 [0, totalWeight) 的随机值
    let random = rng() * totalWeight;
    let selected = null;

    // 按权重区间选择
    for (const item of currentPool) {
      random -= item.probability;
      if (random < 0) {
        selected = item;
        break;
      }
    }

    // 防御性兜底：万一因浮点误差没选中，默认选第一个
    if (!selected) {
      selected = currentPool[currentPool.length - 1];
    }

    result.push(selected);

    // 如果不允许重复（model === false），从候选池中移除已选项
    if (!model) {
      const index = availableItems.indexOf(selected);
      if (index !== -1) {
        availableItems.splice(index, 1);
      }
    }
  }

  return count === 1 ? result[0] : result;
};

const colorPool = Object.keys(colors).map(key => ({ colorName: key }));

/**
 * @param colorSeed 生成颜色的随机种子
 */
const randomColor = colorSeed => {
  const colorName = random(colorPool, 1, false, null, colorSeed)?.colorName;
  return colors[colorName];
};

// 简单的带种子的随机数生成器
const _seededRandom = seed => {
  let state = seed;
  return function () {
    state = (state * 1664525 + 1013904223) % Math.pow(2, 32);
    return state / Math.pow(2, 32);
  };
};

/**
 * 带随机种子随机牌序
 * @param array
 * @param seed
 * @returns {*[]}
 */
const shuffleWithSeed = (array, seed) => {
  const rand = _seededRandom(seed);

  // Fisher-Yates 打乱函数（使用给定的 rand 函数）
  const shuffle = (arr, rng) => {
    const res = [...arr];
    for (let i = res.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [res[i], res[j]] = [res[j], res[i]];
    }
    return res;
  };

  return shuffle(array, rand);
};

export { random, randomColor, shuffleWithSeed };
