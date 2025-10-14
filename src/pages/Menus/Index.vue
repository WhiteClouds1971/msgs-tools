<script setup>
  import { ref, computed } from 'vue';
  import DynamicGrid from '@/components/UI/DynamicGrid.vue';
  import MenuItem from '@/pages/Menus/Comp/MenuItem.vue';
  import menuConstants from '@/assets/constants/Menus.js';

  // 原始数据（只读）
  const allMenus = menuConstants;

  // 当前已加载的数量（偏移量）
  const loadedCount = ref(0);
  const loading = ref(false);
  const finished = ref(false);

  // 计算当前应显示的菜单项（最多 loadedCount 个有效项）
  const validMenus = ref([]);

  // 加载更多
  const onLoad = () => {
    loading.value = true;

    setTimeout(() => {
      const nextCount = loadedCount.value + 14;
      loadedCount.value = Math.min(nextCount, allMenus.length);
      validMenus.value = allMenus.slice(0, loadedCount.value);

      if (loadedCount.value >= allMenus.length) {
        finished.value = true;
      }
      loading.value = false;
    }, 0);
  };
</script>

<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <dynamic-grid :fixed-columns="2">
      <menu-item
        v-for="(menu, index) in validMenus"
        :key="index"
        :menu-constant="menu"
      />
    </dynamic-grid>
  </van-list>
</template>

<style lang="less" scoped></style>
