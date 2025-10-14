<template>
  <div class="container">
    <!-- 遍历插槽内容并绑定样式 -->
    <component
      v-for="(item, index) in slotItems"
      :key="index"
      :is="item"
      :style="getItemStyle(index)"
    />
  </div>
</template>

<script setup>
  import { ref, useSlots, computed } from 'vue';

  const props = defineProps({
    fixedColumns: Number, // 固定列数
    maxColumns: Number, // 最大列数
    autoLayoutThreshold: Number, // 元素超过多少才自动布局
  });

  // 获取插槽内容
  const slots = useSlots();
  const slotItems = computed(() => {
    // 返回插槽内容数组，每个元素都是 VNode
    if (slots.default) {
      return (slots.default() || []).flatMap(item => {
        if (item?.children?.length) {
          return item.children;
        }
        return item;
      });
    }
    return [];
  });

  // 动态设置样式以实现响应式布局
  const getItemStyle = index => {
    const totalItems = slotItems.value.length;
    let columns = Math.floor(Math.sqrt(totalItems));
    if (props.fixedColumns) {
      columns = props.fixedColumns;
    } else if (props.maxColumns && columns > props.maxColumns) {
      columns = props.maxColumns;
    } else if (
      props.autoLayoutThreshold &&
      totalItems <= props.autoLayoutThreshold
    ) {
      columns = 1;
    }
    const width = `calc(${100 / columns}% - ${(10 * (columns - 1)) / columns}px)`;
    return {
      width,
    };
  };
</script>

<style lang="less">
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
    align-items: center;
  }
</style>
