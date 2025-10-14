<script setup>
  import Stepper from '@/components/UI/Stepper.vue';
  import SelectableSkills from '@/components/UI/SelectableSkills.vue';

  const data = reactive({
    skills: [
      {
        title: '笔心',
        des: '每名角色的准备阶段和结束阶段， 你可以声明一种牌的类型并摸3张牌（每种类型限1次），展示所有手牌并将所有此类型手牌当你本轮未使用过的基本牌使用。',
        canSelect: true,
        selected: true,
      },
      {
        title: '笔心（第一次修改）',
        des: '准备阶段和结束阶段，你可以声明一种牌的类型并摸3张牌（每种类型限1次），展示所有手牌并将所有此类型手牌当你本轮未使用过的基本牌使用。',
        canSelect: true,
        selected: false,
      },
      {
        title: '笔心（第二次修改）',
        des: '结束阶段，你可以声明一种牌的类型并摸3张牌（每种类型限1次），展示所有手牌并将所有此类型手牌当你本轮未使用过的基本牌使用。',
        canSelect: true,
        selected: false,
      },
      {
        title: '笔心（第三次修改）',
        des: '当你需要使用基本牌时，你可以声明一种牌的类型并摸1张牌（每种类型限3次），展示所有手牌并将所有此类型手牌当你本轮未使用过的基本牌使用。',
        canSelect: true,
        selected: false,
      },
    ],
  });
</script>

<template>
  <div>
    <stepper :value="0" title="基本牌" :min="0" :max="3" />
    <stepper class="margin-top-m" :value="0" title="锦囊牌" :min="0" :max="3" />
    <stepper class="margin-top-m" :value="0" title="装备牌" :min="0" :max="3" />
    <selectable-skills
      class="margin-top-m"
      :skills="data.skills"
    ></selectable-skills>
  </div>
</template>

<style scoped lang="less"></style>
