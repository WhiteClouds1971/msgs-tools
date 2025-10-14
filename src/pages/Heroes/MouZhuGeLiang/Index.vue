<template>
  <div>
    <ji-lu-you-xi-pai
      :zhuang-bei-visible="false"
      :view-model="'recordMode'"
      :modelCodes="['recordMode']"
      :added-card-column="4"
      :added-card-max-number="4"
    />
    <biao-ji-item class="margin-top-m" :code="'HuoJi'" />
    <da-qi-item class="margin-top-m" :code="'HuoJi'" />
  </div>
</template>

<script setup>
  import JiLuYouXiPai from '@/components/UI/JiLuYouXiPai.vue';
  import BiaoJiItem from '@/components/UI/BiaoJi/BiaoJiItem.vue';
  import DaQiItem from '@/components/UI/DaQiItem.vue';
  import JiLu from '@/components/UI/JiLu/JiLu.vue';
</script>

<style lang="scss" scoped></style>
