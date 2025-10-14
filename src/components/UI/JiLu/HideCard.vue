<script setup>
  import CardItem from '@/components/UI/JiLu/CardItem.vue';

  const props = defineProps({
    isHide: Boolean,
    name: String,
    hsIcon: String,
    hsColor: String,
    dianShu: String,
  });

  const data = reactive({
    isHide: props.isHide,
  });

  const onClick = () => {
    data.isHide = !data.isHide;
  };

  watch(
    () => props.isHide,
    newValue => {
      data.isHide = newValue;
    }
  );
</script>

<template>
  <div @click.stop="onClick">
    <card-item
      v-if="data.isHide"
      :ds="'**'"
      :hs-icon="'*'"
      :name="'****'"
    ></card-item>
    <card-item
      v-else
      :ds="props.dianShu"
      :hs-icon="props.hsIcon"
      :hs-color="props.hsColor"
      :name="props.name"
    ></card-item>
  </div>
</template>

<style scoped lang="less"></style>
