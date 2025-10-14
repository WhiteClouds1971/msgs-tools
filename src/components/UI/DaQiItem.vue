<template>
  <div>
    <van-image
      style="width: 100%"
      v-for="image in dq?.images || []"
      :src="image"
    ></van-image>
  </div>
</template>

<script setup>
  import daQi from '@/assets/constants/DaQi.js';
  const props = defineProps({
    code: String,
  });

  const dq = computed(() => daQi.find(it => it.code === props?.code));
</script>

<style lang="scss" scoped></style>
