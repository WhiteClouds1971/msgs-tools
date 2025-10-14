<script setup>
  import shiLiKa from '@/assets/constants/ShiLiKa.js';
  import DynamicGrid from '@/components/UI/DynamicGrid.vue';
  import SelectableButton from '@/components/UI/SelectableButton.vue';

  const props = defineProps({
    modelValue: String,
    fixedColumns:{
      type:Number,
      default:5
    }
  });

  const emit = defineEmits(['update:modelValue']); // 定义emit用于更新父组件中的值

  const sl = reactive(shiLiKa);

  const data = reactive({
    currentCode: props.modelValue, // 初始化currentCode为modelValue的值
  });

  watch(
    () => props.modelValue,
    newValue => {
      data.currentCode = newValue; // 监听modelValue的变化并更新currentCode
    }
  );

  const selected = item => {
    return item.code === data.currentCode;
  };

  const onClick = item => {
    data.currentCode = item.code;
    emit('update:modelValue', item.code); // 更新父组件中的值
  };
</script>

<template>
  <dynamic-grid :fixed-columns="fixedColumns">
    <selectable-button
      v-for="item in sl"
      :can-select="true"
      :selected="selected(item)"
      @click="onClick(item)"
    >
      <van-image :src="item.cover" width="50px" height="50px"></van-image>
    </selectable-button>
  </dynamic-grid>
</template>

<style scoped lang="less"></style>
