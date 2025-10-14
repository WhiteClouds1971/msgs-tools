<template>
  <div>
    <ji-lu :data-source="data.dataSource"></ji-lu>
  </div>
</template>

<script setup>
  import JiLu from '@/components/UI/JiLu/JiLu.vue';
  import { dianShu } from '@/components/UI/JiLu/YouXiPaiConstants.js';

  const data = reactive({
    dataSource: [
      {
        fixedColumns: 5,
        names: dianShu,
      },
    ],
  });
</script>

<style lang="scss" scoped></style>
