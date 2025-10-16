<template>
  <div v-if="!showSearch" @click="openSearch">
    <van-search
      readonly
      placeholder="点击搜索"
      shape="round"
      input-align="center"
      :clearable="false"
    />
  </div>

  <van-popup
    v-model:show="showSearch"
    position="top"
    :style="{ height: '100%' }"
    teleport="#app"
  >
    <Search :showSearch="showSearch" @cancel="showSearch = false" />
  </van-popup>
</template>

<script setup>
  import { ref } from 'vue';
  import Search from '@/components/GlobalSearch/Search.vue';

  const showSearch = ref(false);

  const openSearch = () => {
    showSearch.value = true;
  };
</script>

<style scoped>
  :deep(.van-search__action) {
    font-weight: var(--van-font-bold);
  }
  :deep(.van-field__left-icon) {
    color: #1989fa !important;
  }
</style>
