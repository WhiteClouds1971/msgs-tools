<template>
  <div>
    <stepper class="qty" v-model:value="data.qty" title="出牌数" :min="0" />

    <div class="card">
      <span>获得牌：{{ card }}</span>
    </div>
  </div>
</template>

<script setup>
  import Stepper from '@/components/UI/Stepper.vue';
  import { random } from '@/util/random.js';

  const data = reactive({
    qty: 0,
  });

  const card = computed(() => {
    let str = [];
    if (data.qty !== 0 && data.qty % 3 === 0) {
      str.push(random([{ des: '【杀】' }, { des: '【闪】' }], 1).des);
    }
    if (data.qty !== 0 && data.qty % 5 === 0) {
      str.push(random([{ des: '【桃】' }, { des: '【酒】' }], 1).des);
    }
    if (data.qty !== 0 && data.qty % 8 === 0) {
      str.push(random([{ des: '【无中生有】' }, { des: '【决斗】' }], 1).des);
    }
    return str.join('、');
  });
</script>

<style lang="less" scoped>
  .qty {
    background-color: white;
    box-sizing: border-box;
    padding: 8px;
  }

  .card {
    margin-top: 20px;
    background-color: white;
    padding: 8px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
