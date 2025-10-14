<script setup>
  import DynamicGrid from '@/components/UI/DynamicGrid.vue';
  import SelectableButton from '@/components/UI/SelectableButton.vue';
  import { showNotify } from 'vant';
  import ShiLiKa from '@/components/UI/ShiLiKa.vue';

  const all = reactive([
    {
      label: '2',
      value: 2,
      code: '2',
    },
    {
      label: '3',
      value: 3,
      code: '3',
    },
    {
      label: '4',
      value: 4,
      code: '4',
    },
    {
      label: '5',
      value: 5,
      code: '5',
    },
    {
      label: '6',
      value: 6,
      code: '6',
    },
    {
      label: '7',
      value: 7,
      code: '7',
    },
    {
      label: '8',
      value: 8,
      code: '8',
    },
    {
      label: '9',
      value: 9,
      code: '9',
    },
    {
      label: '10',
      value: 10,
      code: '10',
    },
    {
      label: 'J',
      value: 11,
      code: 'J',
    },
    {
      label: 'Q',
      value: 12,
      code: 'Q',
    },
    {
      label: 'K',
      value: 13,
      code: 'K',
    },
    {
      label: 'A',
      value: 1,
      code: 'A',
    },
  ]);

  const data = reactive({
    huangQty: 0,
  });

  const onClick = item => {
    const origin = Math.floor(Math.abs(data.huangQty) / 10) % 10;
    data.huangQty += item.value;
    const current = Math.floor(Math.abs(data.huangQty) / 10) % 10;
    if (origin !== current) {
      showNotify({
        type: 'success',
        message: '摸一张牌！',
      });
    } else {
      showNotify({
        type: 'warning',
        message: '不摸牌！',
      });
    }
  };
</script>

<template>
  <div>
    <shi-li-ka />

    <div class="qty margin-y-l">
      <span>黄：{{ data.huangQty }}</span>
    </div>
    <dynamic-grid :fixed-columns="5">
      <selectable-button
        :can-select="false"
        v-for="item in all"
        :key="item.code"
        @click="onClick(item)"
      >
        {{ item.label }}
      </selectable-button>
    </dynamic-grid>
  </div>
</template>

<style scoped lang="less">
  .qty {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
