<script setup>
  import BiaoJiItem from '@/components/UI/BiaoJi/BiaoJiItem.vue';
  import TiLiKa from '@/components/UI/TiLiKa.vue';

  const data = reactive({
    lunQty: 0,
    tiLiKa: {
      tlz: 3,
      tlsx: 3,
    },
  });

  watch(
    () => data.lunQty,
    newValue => {
      if (newValue <= 4) {
        data.tiLiKa.tlsx++;
        data.tiLiKa.tlz++;
      } else if (newValue <= 7) {
        data.tiLiKa.tlsx--;
      }
    }
  );
</script>

<template>
  <div>
    <biao-ji-item v-model:value="data.lunQty" :code="'LunCi'"></biao-ji-item>
    <ti-li-ka :ti-li-ka-value="data.tiLiKa" />
  </div>
</template>

<style scoped lang="less"></style>
