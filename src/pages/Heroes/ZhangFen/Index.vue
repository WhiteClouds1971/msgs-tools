<template>
  <div>
    <biao-ji-item :code="'LunCi'" v-model:value="data.lunCiQty"></biao-ji-item>
    <biao-ji-item
      v-model:value="data.zhuZhaoQty"
      :code="'ZhuZhao'"
    ></biao-ji-item>
    <van-divider>下次铸造大攻车需要的点数</van-divider>
    <dynamic-grid :fixed-columns="4">
      <selectable-button
        v-for="(item, index) in data.needZhuZhao"
        :can-select="item.canSelect"
        :selected="item.isSelected"
        @click="updateZhuZhao(index, item.value)"
      >
        {{ item.value }}点
      </selectable-button>
    </dynamic-grid>
  </div>
</template>

<script setup>
  import DynamicGrid from '@/components/UI/DynamicGrid.vue';
  import SelectableButton from '@/components/UI/SelectableButton.vue';
  import BiaoJiItem from '@/components/UI/BiaoJi/BiaoJiItem.vue';
  import { showNotify } from 'vant';

  const data = reactive({
    zhuZhaoQty: 0,
    lunCiQty: 1,
    needZhuZhao: [
      {
        value: 0,
        canSelect: false,
        isSelected: false,
      },
      {
        value: 2,
        canSelect: false,
        isSelected: false,
      },
      {
        value: 5,
        canSelect: false,
        isSelected: false,
      },
      {
        value: 5,
        canSelect: false,
        isSelected: false,
      },
    ],
  });

  const updateZhuZhao = (index, value) => {
    if (data.zhuZhaoQty - value < 0) {
      showNotify({ type: 'warning', message: '铸造标记数量不够，无法执行' });
      return;
    }

    data.zhuZhaoQty -= value;
    data.needZhuZhao[index].isSelected = true;

    showNotify({ type: 'success', message: '成功，铸造标记-' + value });
  };
</script>

<style lang="scss" scoped></style>
