<template>
  <div>
    <selectable-button :can-select="false" @click.stop="openSkill">
      点击，抽取三个技能
    </selectable-button>
    <van-collapse v-model="active" class="margin-top-m" accordion>
      <van-collapse-item title="查看所有技能" name="1">
        <selectable-skills :skills="skills"></selectable-skills>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script setup>
  import SelectableButton from '@/components/UI/SelectableButton.vue';
  import { useModal } from '@/components/Modal/index.js';
  import SelectableSkills from '@/components/UI/SelectableSkills.vue';

  const active = ref(null);

  const skills = [
    {
      title: '驱虎',
      des: '出牌阶段限一次，你可以与体力值大于你的一名角色拼点：若你赢，你令该角色对其攻击范围内的另一名角色造成1点伤害；若你没赢，其对你造成1点伤害。',
      canSelect: false,
    },
    {
      title: '强袭',
      des: '出牌阶段限一次，你可以失去1点体力或弃置一张武器牌，并对你攻击范围内的一名其他角色造成1点伤害。',
      canSelect: false,
    },
    {
      title: '奇策',
      des: '出牌阶段限一次，你可以将所有手牌当任意一张普通锦囊牌使用。',
      canSelect: false,
    },
    {
      title: '盗书',
      des: '出牌阶段限一次，你可以选择一名角色并选择一种花色，然后获得该角色一张手牌。若此牌与你选择的花色相同，你对其造成1点伤害且此技能视为未发动过；若花色不同，则你交给该角色一张其他花色的手牌（若没有需展示所有手牌）。',
      canSelect: false,
    },
    {
      title: '挑衅',
      des: '出牌阶段限一次，你可以选择一名攻击范围内含有你的角色，然后除非该角色对你使用一张【杀】且此【杀】对你造成伤害，否则你弃置其一张牌，然后将此技能修改为出牌阶段限两次直到回合结束。',
      canSelect: false,
    },
    {
      title: '枪舞',
      des: '出牌阶段限一次，你可以进行判定，然后本回合你使用点数小于判定结果的【杀】无距离限制，点数大于判定结果的【杀】无次数限制。',
      canSelect: false,
    },
    {
      title: '天义',
      des: '出牌阶段限一次，你可以与一名角色拼点：若你赢，本回合你可以多使用一张【杀】、使用【杀】无距离限制且可以多选择一个目标；若你没赢，本回合你不能使用【杀】。',
      canSelect: false,
    },
    {
      title: '制衡',
      des: '出牌阶段限一次，你可以弃置任意张牌，然后摸等量的牌。若你以此法弃置了所有的手牌，则额外摸一张牌。',
      canSelect: false,
    },
    {
      title: '结姻',
      des: '出牌阶段限一次，你可以选择一名男性角色，弃置一张手牌或将一张装备牌置入其装备区：你与其体力值较高的角色摸一张牌，体力值较低的角色回复1点体力。',
      canSelect: false,
    },
    {
      title: '国色',
      des: '出牌阶段限一次，你可以选择一项，然后摸一张牌：1.将一张方块牌当【乐不思蜀】使用；2.弃置一张方块牌并弃置场上的一张【乐不思蜀】。',
      canSelect: false,
    },
    {
      title: '离间',
      des: '出牌阶段限一次，你可以弃置一张牌，令一名男性角色视为对另一名男性角色使用一张【决斗】。',
      canSelect: false,
    },
    {
      title: '青囊',
      des: '出牌阶段限一次，你可以弃置一张手牌令一名角色回复1点体力。',
      canSelect: false,
    },
    {
      title: '除疠',
      des: '出牌阶段限一次，你可以选择任意名势力各不相同的其他角色，然后你弃置你和这些角色的各一张牌。被弃置黑桃牌的角色各摸一张牌。',
      canSelect: false,
    },
    {
      title: '离魂',
      des: '出牌阶段限一次，你可以弃置一张牌并翻面，然后获得一名男性角色的所有手牌。出牌阶段结束时，你将X张牌交给该角色（X为其体力值）。',
      canSelect: false,
    },
    {
      title: '明策',
      des: '出牌阶段限一次，你可以将一张装备牌或【杀】交给一名其他角色，然后其选择一项：1.视为对你选择的另一名角色使用一张【杀】；2.摸一张牌。',
      canSelect: false,
    },
    {
      title: '密诏',
      des: '出牌阶段限一次，你可以将所有手牌交给一名其他角色，然后令该角色与另一名其他角色拼点，拼点赢的角色视为对拼点没赢的角色使用一张【杀】。',
      canSelect: false,
    },
    {
      title: '三陈',
      des: '出牌阶段限一次，你可以令一名角色摸三张牌，然后弃置三张牌。若其以此法弃置的牌种类均不同，则其摸一张牌，并视为该技能未发动过（本回合不能再指定其为目标）。',
      canSelect: false,
    },
    {
      title: '攻心',
      des: '出牌阶段限一次，你可以观看一名其他角色的手牌，然后你可以展示其中一张红桃牌，选择一项：1.弃置此牌；2.将此牌置于牌堆顶。',
      canSelect: false,
    },
  ];

  const openSkill = () => {
    useModal().open({
      component: () => import(`./SkillModal.vue`),
      modal: {
        title: '技能组',
        width: '90%',
      },
    });
  };
</script>

<style lang="scss" scoped></style>
