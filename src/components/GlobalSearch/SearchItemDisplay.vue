<script setup>
  import { computed } from 'vue';
  import { randomColor } from '@/util/random.js';
  import { useRouter } from 'vue-router';
  import { getHighlightWords } from '@/util/search.js';

  const props = defineProps({
    keyword: {
      type: String,
      default: '',
    },
    displayItem: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  });

  const router = useRouter();

  const emits = defineEmits(['done']);

  const shouldShowKeyword = computed(() => {
    const query = props.keyword.trim(); // 搜索词
    const itemKeyword = props.displayItem.keyword; // item的keyword

    return (
      query &&
      itemKeyword &&
      typeof itemKeyword === 'string' &&
      itemKeyword.trim().length > 0
    );
  });

  // 辅助函数：转义正则特殊字符
  function escapeRegExp(str) {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const highlightedKeyword = computed(() => {
    if (!shouldShowKeyword.value) return '';

    const itemKeyword = props.displayItem.keyword;
    const query = getHighlightWords(props.keyword, itemKeyword) || [];

    if (query.length === 0) return itemKeyword;

    // === 第一步：用 query[0] 定位截取范围 ===
    const firstKeyword = query[0];
    const escapedFirst = escapeRegExp(firstKeyword);
    const firstRegex = new RegExp(escapedFirst, 'i');
    const firstMatch = firstRegex.exec(itemKeyword);

    let snippet;
    if (firstMatch) {
      const startIndex = firstMatch.index;
      const matchLength = firstMatch[0].length;
      const start = Math.max(0, startIndex - 20);
      const end = Math.min(itemKeyword.length, startIndex + matchLength + 20);
      snippet = itemKeyword.slice(start, end);
    } else {
      // 如果第一个词都找不到，就用整个字符串（或按需处理）
      snippet = itemKeyword;
    }

    const escapedWord = escapeRegExp(query[0]);
    const highlightRegex = new RegExp(`(${escapedWord})`, 'gi');
    return snippet.replace(highlightRegex, '<mark>$1</mark>');
  });

  const toPage = () => {
    let path = '';
    let query = {
      code: encodeURIComponent(props.displayItem.code),
    };

    switch (props.displayItem.type) {
      case 'BJ':
        path = '/BiaoJi';
        break;
      case 'GJ':
        path = props.displayItem.sourceData.url;
        break;
      case 'WJ':
        path = props.displayItem.sourceData.url;
        break;
      case 'DQ':
        path = '/DaQi';
        break;
      case 'ZH':
        path = '/YinYang';
        break;
      case 'QA':
        path = '/QA';
        query = {
          keyword: encodeURIComponent(props.displayItem.keyword),
        };
        break;
    }
    emits('done');
    router.push({
      path: path,
      query: query,
    });
  };
</script>

<template>
  <van-cell clickable @click.stop="toPage">
    <template #title>
      <div class="flex-row flex-align-center flex-justify-between">
        <div class="flex-row flex-align-center">
          <span
            class="item-type-tag margin-right-s"
            :style="{ color: randomColor(displayItem.typeName) }"
          >
            {{ displayItem.typeName }}
          </span>

          <span v-if="displayItem.name" class="item-name margin-right-xs">
            {{ displayItem.name }}
          </span>

          <van-tag
            v-if="(displayItem.tags || []).length > 0"
            v-for="(tag, index) in displayItem.tags"
            :class="{
              'margin-right-xs': index < displayItem.tags.length - 1,
              'margin-right-s': index === displayItem.tags.length - 1,
            }"
            :key="index"
            :color="randomColor(tag)"
          >
            {{ tag }}
          </van-tag>
        </div>

        <div class="item-keyword">
          <div v-if="shouldShowKeyword" v-html="highlightedKeyword"></div>
        </div>
      </div>
    </template>
  </van-cell>
</template>

<style scoped lang="less">
  .item-type-tag {
    writing-mode: vertical-rl;
    white-space: nowrap;
    flex-shrink: 0;
    text-orientation: mixed;
  }

  .item-name {
    font-weight: 500;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-keyword {
    flex: 1;
    max-width: calc(100vw - 64px);
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #666;
  }

  :deep(mark) {
    background-color: #fffacd;
    color: #d97706;
    padding: 0 2px;
    border-radius: 2px;
  }
</style>
