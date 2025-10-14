<template>
  <div>
    <shi-li-ka />
    <ji-lu
      class="margin-top-m"
      :view-model="'recordMode'"
      :modelCodes="['recordMode']"
      :data-source="data.wuQingXi"
      :added-card-column="5"
      :added-card-max-number="5"
    />
    <da-qi-item class="margin-top-m" :code="'WuQinXi'"></da-qi-item>
  </div>
</template>

<script setup>
  import ShiLiKa from '@/components/UI/ShiLiKa.vue';
  import DaQiItem from '@/components/UI/DaQiItem.vue';
  import JiLu from '@/components/UI/JiLu/JiLu.vue';
  const data = reactive({
    wuQingXi: [
      {
        fixedColumns: 5,
        names: [
          {
            label: '虎',
            code: 'Hu',
          },
          {
            label: '鹿',
            code: 'Lu',
          },
          {
            label: '熊',
            code: 'Xiong',
          },
          {
            label: '猿',
            code: 'Yuan',
          },
          {
            label: '鹤',
            code: 'he',
          },
        ],
      },
    ],
  });
</script>

<style lang="scss" scoped></style>
