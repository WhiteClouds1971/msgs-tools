import { StickyCollections } from '@/assets/constants/Voice/sticky.js';
import { HeroesCollections } from '@/assets/constants/Voice/Heroes/index.js';

const STICKY_COLLECTION_KEY = 'Sticky';

const voiceCollections = {
  Sticky: StickyCollections,
  ...HeroesCollections,
};

// 构建 allVoicesMap，并为每条语音附加 collectionKey
const allVoicesMap = {};
Object.entries(voiceCollections).forEach(([collectionKey, collection]) => {
  collection.voices.forEach(voice => {
    allVoicesMap[voice.code] = {
      ...voice,
      package: collection.package,
      collectionKey, // 关键：每条语音知道它属于哪个集合
    };
  });
});

// 获取所有搜索的语音
const searchVoices = [];
Object.entries({ ...HeroesCollections }).forEach(
  ([collectionKey, collection]) => {
    collection.voices.forEach(voice => {
      searchVoices.push({
        ...voice,
        collectionKey,
      });
    });
  }
);
export { voiceCollections, allVoicesMap, STICKY_COLLECTION_KEY, searchVoices };
