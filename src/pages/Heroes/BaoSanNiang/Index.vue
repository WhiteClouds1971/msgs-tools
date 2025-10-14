<script setup>
  import SelectableSkills from '@/components/UI/SelectableSkills.vue';

  const data = reactive([
    {
      title: '武圣',
      des: '你可以将一张红色牌当普通【杀】使用或打出。',
      canSelect: true,
      selected: false,
    },
    {
      title: '当先',
      des: '锁定技，回合开始时，你执行一个额外的出牌阶段。',
      canSelect: true,
      selected: false,
    },
    {
      title: '制蛮',
      des: '当你对其他角色造成伤害时，你可以防止此伤害，然后获得其装备区或判定区里的一张牌。',
      canSelect: true,
      selected: false,
    },
  ]);
</script>

<template>
  <selectable-skills :skills="data" />
</template>

<style scoped lang="less"></style>
