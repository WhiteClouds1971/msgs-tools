<script setup>
  import { dianShu, huaSe } from '@/components/UI/JiLu/YouXiPaiConstants.js';
  import DynamicGrid from '@/components/UI/DynamicGrid.vue';
  import SelectableButton from '@/components/UI/SelectableButton.vue';
  import CardItem from '@/components/UI/JiLu/CardItem.vue';

  const props = defineProps({
    card: Object,
    onHusSeClick: Function,
    onDianShuClick: Function,
  });

  const onHusSeClick = hs => {
    props.card.huaSe = hs;
    props.onHusSeClick(hs);
  };

  const onDianShuClick = ds => {
    props.card.dianShu = ds;
    props.onDianShuClick(ds);
  };
</script>

<template>
  <div class="wrapper">
    <dynamic-grid :fixed-columns="7">
      <selectable-button
        v-for="dsItem in dianShu"
        :can-select="true"
        :selected="props.card.dianShu?.code === dsItem.code"
        @click="onDianShuClick(dsItem)"
        :key="dsItem.code"
      >
        {{ dsItem.label }}
      </selectable-button>
    </dynamic-grid>
    <dynamic-grid class="margin-top-m" :fixed-columns="4">
      <selectable-button
        v-for="hsItem in huaSe"
        :key="hsItem.code"
        :can-select="true"
        :selected="props.card.huaSe?.code === hsItem.code"
        @click="onHusSeClick(hsItem)"
      >
        <span>{{ hsItem.title }}</span>
        <span class="margin-left-s" :style="{ color: hsItem.color }">
          {{ hsItem.icon }}
        </span>
      </selectable-button>
    </dynamic-grid>
    <div class="card-item-wrapper margin-top-m">
      <card-item
        :name="props.card.name.label"
        :ds="props.card.dianShu?.label"
        :hs-icon="props.card.huaSe?.icon"
        :hs-color="props.card.huaSe?.color"
        style="width: 120px"
      ></card-item>
    </div>
  </div>
</template>

<style scoped lang="less">
  .wrapper {
    background-color: #f7f8fa;
    padding: 8px;

    .card-item-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
