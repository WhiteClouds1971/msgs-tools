<template>
  <shi-li-ka v-model:model-value="value" :fixedColumns="1"/>
</template>

<script setup>
  import ShiLiKa from '@/components/UI/ShiLiKa.vue';

  const value = ref(null);
</script>

<style lang="less" scoped></style>
