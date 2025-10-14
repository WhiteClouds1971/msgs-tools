<template>
  <div class="name" :style="nameStyle">
    {{ name }}
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  name: String
});

const nameLength = props.name.length;

const nameStyle = computed(() => {
  const baseFontSize = 16; // 基础字体大小，单位为px
  const minFontSize = 8; // 最小字体大小，单位为px
  const maxFontSize = 15; // 最大字体大小，单位为px

  let fontSize;

  if (nameLength <= 2) {
    fontSize = 14;
  } else if (nameLength <= 4) {
    fontSize = 8;
  } else {
    // 对于更长的名字，可以根据需要进一步调整
    fontSize = Math.max(minFontSize, Math.min(maxFontSize, 15 - (nameLength - 4) * 1));
  }

  return {
    fontSize: `${fontSize}px`,
    width: '100%',
    height: '100%',
    whiteSpace: 'pre-wrap', // 允许换行
    wordBreak: 'break-all' // 允许单词内部断行
  };
});
</script>

<style scoped>
.name {
  text-align: center;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 控制显示的行数，例如显示2行 */
  -webkit-box-orient: vertical;
}
</style>