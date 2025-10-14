<template>
  <div
    class="item"
    :class="{ 'item-selected': data.isSelected }"
    @click="toggleSelection"
  >
    <slot :is-selected="data.isSelected"></slot>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import { useDefineModel } from '@/util/defineModel.js';

  const props = defineProps({
    canSelect: Boolean,
    clearSelection: Boolean,
    selected: Boolean, // 新增属性，用于接收父组件传递的选中状态
  });

  const emit = defineEmits(['click', 'clearSelection', 'change']);

  const model = defineModel();
  const data = useDefineModel(model, {
    isSelected: props.selected || false,
  });

  // 监听 selected 属性的变化
  watch(
    () => props.selected,
    newVal => {
      data.isSelected = newVal;
    }
  );

  const toggleSelection = event => {
    if (props.canSelect) {
      data.isSelected = !data.isSelected;
      emit('change', data.isSelected);
    }
    emit('click', event);
  };

  watch(
    () => props.clearSelection,
    newValue => {
      if (newValue) {
        data.isSelected = false;
        emit('clearSelection', false); // 告诉父组件已处理清除操作
      }
    }
  );
</script>

<style scoped>
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    box-sizing: border-box; /* 添加此行 */
    width: 100%; /* 确保宽度包含边框和内边距 */
  }

  .item-selected {
    background-color: #e6f7ff;
    border: 1px solid #1890ff;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
  }
</style>
