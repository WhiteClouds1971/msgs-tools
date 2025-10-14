<script setup>
  import SelectableSkills from '@/components/UI/SelectableSkills.vue';

  const data = reactive([
    {
      title: '〖妙剑〗（1级）',
      des: '出牌阶段限一次，你可以将一张【杀】当做刺【杀】使用，或将一张锦囊牌当做【无中生有】使用。',
      selected: true,
    },
    {
      title: '〖妙剑〗（2级）',
      des: '出牌阶段限一次，你可以将一张基本牌当做刺【杀】使用，或将一张非基本牌当做【无中生有】使用。',
    },
    {
      title: '〖妙剑〗（3级）',
      des: '出牌阶段限一次，你可以视为使用一张刺【杀】或视为使用一张【无中生有】。',
    },
    {
      title: '〖莲华〗（1级）',
      des: '当你成为其他角色使用【杀】的目标时，你摸一张牌。',
      selected: true,
    },
    {
      title: '〖莲华〗（2级）',
      des: '当你成为其他角色使用【杀】的目标时，你摸一张牌，然后进行一次判定，若判定结果为黑桃，则取消之。',
    },
    {
      title: '〖莲华〗（3级）',
      des: '当你成为其他角色使用【杀】的目标时，你摸一张牌，然后除非该角色弃置一张牌，否则取消之。',
    },
  ]);
</script>

<template>
  <div class="wrapper">
    <selectable-skills :skills="data"></selectable-skills>
  </div>
</template>

<style scoped lang="less"></style>
