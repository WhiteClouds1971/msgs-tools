<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    name: String,
    color: String,
  });

  // 计算字体大小
  const fontSize = computed(() => {
    return props.name.length === 1 ? '45px' : '30px';
  });
</script>

<template>
  <div class="circle-container">
    <!-- 底层图片 -->
    <van-image class="background-image" :src="'/BiaoJi/bjbj-1.png'"></van-image>
    <!-- 背景颜色层 -->
    <div class="color-layer" :style="{ backgroundColor: props.color }"></div>
    <!-- 顶层图片 -->
    <van-image class="top-image" src="/BiaoJi/bjbj-2.png"></van-image>
    <!-- 居中文本 -->
    <div class="centered-number" :style="{ fontSize }">{{ props.name }}</div>
  </div>
</template>

<style scoped lang="less">
  .circle-container {
    position: relative;
    display: inline-block;
    width: 100%; /* 设置宽度 */
    height: 100%; /* 设置高度 */
    border-radius: 50%; /* 创建圆形 */

    .background-image {
      position: absolute;
      width: 100%; /* 宽度与容器相同 */
      height: 100%; /* 高度与容器相同 */
      border-radius: 50%; /* 继承容器的圆形样式 */
      object-fit: cover; /* 确保图片填充整个圆形 */
    }

    .top-image,
    .color-layer {
      position: absolute;
      width: calc(100% - 15px); /* 宽度与容器相同 */
      height: calc(100% - 15px); /* 高度与容器相同 */
      border-radius: 50%; /* 继承容器的圆形样式 */
      object-fit: cover; /* 确保图片填充整个圆形 */
      top: 50%; /* 垂直居中 */
      left: 50%; /* 水平居中 */
      transform: translate(-50%, -50%); /* 精确居中 */
    }

    .color-layer {
      background-color: rgba(
        255,
        0,
        0,
        0.5
      ); /* 自定义背景颜色，这里使用半透明红色作为示例 */
    }

    .centered-number {
      font-family: 'YouYuan', sans-serif; /* 使用浏览器自带的更简洁字体 */
      position: absolute;
      top: 50%;
      left: 50%;
      color: white; /* 文字颜色为白色 */
      transform: translate(-50%, -50%);
      font-weight: bold;
      text-align: center;
      writing-mode: vertical-rl;
      white-space: nowrap;

      /* 更改描边效果以确保它更清晰，并添加更明显的高亮效果 */
      text-shadow:
        -2px -2px 0 black,
        2px -2px 0 black,
        -2px 2px 0 black,
        2px 2px 0 black,
        0 0 20px rgba(255, 255, 255, 1),
        0 0 40px rgba(255, 255, 255, 0.8),
        0 0 60px rgba(255, 255, 255, 0.6);
    }
  }
</style>
