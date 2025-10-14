<template>
  <div>
    <van-cell
      clickable
      @click.stop="playVoice"
      :class="{ 'current-playing': voice.code === currentVoiceCode }"
    >
      <template #title>
        <div class="flex-row flex-align-center flex-justify-between">
          <div>
            <van-tag
              v-if="(tags || []).length > 0"
              v-for="(tag, index) in tags"
              :class="{
                'margin-right-xs': index < tags.length - 1,
                'margin-right-s': index === tags.length - 1,
              }"
              :key="index"
              :color="randomColor(tag)"
            >
              {{ tag }}
            </van-tag>
          </div>

          <div class="flex-full voice-text">
            <div v-html="highlightedKeyword"></div>
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script setup>
  import { randomColor } from '@/util/random.js';
  import { voiceCollections } from '@/assets/constants/Voice/index.js';
  import { computed } from 'vue';
  import { getHighlightWords } from '@/util/search.js';
  import { useVoiceStore } from '@/stores/voiceStore.js';

  const store = useVoiceStore();
  const emits = defineEmits(['done']);

  const props = defineProps({
    keyword: String,
    voice: Object,
  });

  const currentVoiceCode = computed(() => store.currentVoiceCode);

  const tags = computed(() => {
    if (props.voice.tags?.length > 0) {
      return props.voice.tags;
    }
    return [
      voiceCollections[props.voice.collectionKey]?.name,
      props.voice.name,
    ];
  });

  // 辅助函数：转义正则特殊字符
  function _escapeRegExp(str) {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const highlightedKeyword = computed(() => {
    const voiceText = props.voice.text;
    const query = getHighlightWords(props.keyword, voiceText) || [];

    if (query.length === 0) return voiceText;

    // 第一步：用 query[0] 定位截取范围
    const firstKeyword = query[0];
    const escapedFirst = _escapeRegExp(firstKeyword);
    const firstRegex = new RegExp(escapedFirst, 'i');
    const firstMatch = firstRegex.exec(voiceText);

    let snippet;
    if (firstMatch) {
      const startIndex = firstMatch.index;
      const matchLength = firstMatch[0].length;
      const start = Math.max(0, startIndex - 20);
      const end = Math.min(voiceText.length, startIndex + matchLength + 20);
      snippet = voiceText.slice(start, end);
    } else {
      // 如果第一个词都找不到，就用整个字符串（或按需处理）
      snippet = voiceText;
    }

    const escapedWord = _escapeRegExp(query[0]);
    const highlightRegex = new RegExp(`(${escapedWord})`, 'gi');
    return snippet.replace(highlightRegex, '<mark>$1</mark>');
  });

  const playVoice = _ => {
    store.playByCodes([props.voice.code]);
    emits('done');
  };
</script>

<style lang="less" scoped>
  .voice-text {
    max-width: calc(100vw - 32px - 24px);
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
    font-size: 14px;
  }

  :deep(mark) {
    background-color: #fffacd;
    color: #d97706;
    padding: 0 2px;
    border-radius: 2px;
  }

  :deep(.current-playing) {
    background-color: #e6f7ff; // 淡蓝色背景，表示当前播放项
    color: #1989fa; // 主题色文字
    font-weight: bold;

    // 可选：添加左侧竖条装饰
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color: #1989fa;
    }
  }
</style>
