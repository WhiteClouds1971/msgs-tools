<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useModal } from '@/components/Modal/index.js';

  const props = defineProps({
    menuConstant: {
      type: Object,
      default: () => ({}),
    },
  });
  const router = useRouter();

  const cover = ref(props.menuConstant.cover);

  // 定义点击事件处理函数
  const handleClick = () => {
    // 路由跳转
    if (props.menuConstant.url) {
      router.push(props.menuConstant.url);
      return;
    }
    // 打开指定弹窗
    const modalView = props.menuConstant.getModalView(props.menuConstant);
    if (modalView) {
      useModal().open(modalView);
      return;
    }
  };
</script>

<template>
  <div class="wrapper" @click="handleClick">
    <van-image class="image" fit="cover" :src="cover" />
    <van-divider vertical :style="{ borderColor: '#1989fa', height: '100%' }" />
    <div class="title">
      <van-text-ellipsis
        rows="1"
        expand-text="展开"
        collapse-text="收起"
        :content="props.menuConstant.name"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
  .wrapper {
    display: flex;
    width: 100%;
    padding: 8px;
    box-sizing: border-box; /* 添加此行 */
    background-color: #ffffff;
  }

  .image {
    width: 40px;
    height: 40px;
  }

  .title {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
</style>
