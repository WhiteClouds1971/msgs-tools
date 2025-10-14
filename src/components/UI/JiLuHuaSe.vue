<template>
  <div>
    <ji-lu :data-source="data.dataSource"></ji-lu>
  </div>
</template>

<script setup>
  import JiLu from '@/components/UI/JiLu/JiLu.vue';
  import { huaSe } from '@/components/UI/JiLu/YouXiPaiConstants.js';

  const names = huaSe.map(it => ({
    code: it.code,
    label: `${it.icon} ${it.title}`,
  }));
  const data = reactive({
    dataSource: [
      {
        fixedColumns: 2,
        names: names,
      },
    ],
  });
</script>

<style lang="scss" scoped></style>
