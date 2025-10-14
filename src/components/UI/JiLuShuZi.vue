<template>
  <div>
    <ji-lu :data-source="data.dataSource" v-bind="props"></ji-lu>
  </div>
</template>

<script setup>
  import JiLu from '@/components/UI/JiLu/JiLu.vue';

  const props = defineProps({
    modelCodes: {
      type: Array,
      default: ['simpleMode', 'recordMode'],
    },
  });

  const data = reactive({
    dataSource: [
      {
        fixedColumns: 4,
        names: [
          { code: 1, label: '1' },
          { code: 2, label: '2' },
          { code: 3, label: '3' },
          { code: 4, label: '4' },
          { code: 5, label: '5' },
          { code: 6, label: '6' },
          { code: 7, label: '7' },
          { code: 8, label: '8' },
        ],
      },
    ],
  });
</script>

<style lang="scss" scoped></style>
