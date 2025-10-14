<template>
  <div ref="contentContainer">
    <md-viewer src="/Doc/CunGui.md" />
    <md-viewer class="margin-top-m" src="/Doc/DouDiZhu.md" />
    <md-viewer class="margin-top-m" src="/Doc/PaiWei.md" />
    <md-viewer class="margin-top-m" src="/Doc/QA.md" />
  </div>
</template>

<script setup>
  import MdViewer from '@/components/UI/MdViewer.vue';
  import { useRoute } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import Mark from 'mark.js';

  const contentContainer = ref(null);
  const mounted = ref(false);

  // 高亮 + 滚动
  const highlightAndScroll = keyword => {
    nextTick(() => {
      if (!contentContainer.value) return;
      const instance = new Mark(contentContainer.value);

      instance.unmark({
        done: () => {
          // 高亮所有匹配词
          instance.mark([keyword], {
            caseSensitive: false,
            separateWordSearch: false,
            done: () => {
              const firstMark = contentContainer.value.querySelector('mark');
              if (firstMark) {
                firstMark.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                });
              }
            },
          });
        },
      });
    });
  };

  const route = useRoute();
  watch(
    () => route.query,
    nv => {
      const keyword = decodeURIComponent(nv.keyword);
      if (keyword && mounted) {
        highlightAndScroll(keyword);
      }
    },
    { immediate: true }
  );

  onMounted(() => {
    mounted.value = true;
    const keyword = decodeURIComponent(route.query.keyword);
    if (keyword) {
      setTimeout(() => {
        highlightAndScroll(keyword);
      }, 300);
    }
  });
</script>

<style lang="less" scoped>
  mark {
    background-color: #ffeb3b;
    color: #000;
    padding: 0 2px;
    border-radius: 2px;
  }
</style>
