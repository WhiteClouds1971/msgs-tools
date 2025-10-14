<script setup>
  import { ref, onMounted, watch, computed } from 'vue';
  import { mdToHtml } from '@/plugins/marked.js';

  const props = defineProps({
    src: {
      type: String,
      required: true,
    },
  });

  const content = ref('');
  const loading = ref(false);

  const loadMarkdown = async url => {
    if (!url) return;
    loading.value = true;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      content.value = await res.text();
    } catch (err) {
      console.error(err);
      content.value = '';
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => loadMarkdown(props.src));
  watch(
    () => props.src,
    nv => loadMarkdown(nv)
  );

  const renderedHTML = computed(() => {
    return { __html: mdToHtml(content.value || '') };
  });
</script>

<template>
  <div class="markdown-viewer">
    <van-loading v-if="loading" size="24px">加载中...</van-loading>
    <div
      class="markdown-content"
      v-else-if="content"
      v-html="renderedHTML.__html"
    />
    <div v-else class="placeholder">暂无内容</div>
  </div>
</template>

<style scoped>
  .markdown-viewer {
    background-color: #f9f9f9;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }

  .markdown-content {
    line-height: 1.6;
    font-size: 16px;
    color: #333;
  }

  .markdown-content ::v-deep(h1),
  .markdown-content ::v-deep(h2),
  .markdown-content ::v-deep(h3),
  .markdown-content ::v-deep(h4),
  .markdown-content ::v-deep(h5),
  .markdown-content ::v-deep(h6) {
    margin: 0.1rem 0;
  }

  .markdown-content ::v-deep(p) {
    margin: 0;
  }

  .markdown-content ::v-deep(h4) {
    margin-left: 0;
    font-size: 1rem;
  }
  .markdown-content ::v-deep(h5) {
    margin-left: 1em;
    font-size: 14px;
  }

  .markdown-content ::v-deep(ul),
  .markdown-content ::v-deep(ol) {
    padding-left: 2em;
  }

  .markdown-content ::v-deep(li) {
    list-style-type: disc;
    font-size: 14px;
  }

  .markdown-content ::v-deep(p) {
    text-indent: 1em;
    font-size: 14px;
  }

  .placeholder {
    text-align: center;
    color: #999;
    margin-top: 20px;
  }

  .markdown-viewer h1,
  .markdown-viewer h2,
  .markdown-viewer h3,
  .markdown-viewer h4,
  .markdown-viewer h5,
  .markdown-viewer h6 {
    margin: 0.5em 0; /* 调整这个值以适应你的需求 */
  }
</style>
