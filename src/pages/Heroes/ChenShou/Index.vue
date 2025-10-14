<template>
  <div>
    <van-divider>
      〖点墨〗技能（{{ data.selectedSkills.length }}/4）
    </van-divider>
    <selectable-skills :skills="data.selectedSkills"></selectable-skills>

    <selectable-button
      class="margin-top-m"
      :can-select="false"
      @click.stop="openSkill"
    >
      点击，抽取两个“转换类”技能
    </selectable-button>
    <van-collapse v-model="data.active" class="margin-top-m" accordion>
      <van-collapse-item title="查看所有技能" name="1">
        <selectable-skills :skills="data.skills"></selectable-skills>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script setup>
  import SelectableButton from '@/components/UI/SelectableButton.vue';
  import SelectableSkills from '@/components/UI/SelectableSkills.vue';
  import { useModal } from '@/components/Modal/index.js';

  const data = reactive({
    active: null,
    selectedSkills: [],
    skills: [
      {
        title: '武圣',
        des: '你可以将一张红色牌当【杀】使用或打出；你使用方块【杀】无距离限制。',
        canSelect: false,
        code: 'wusheng',
      },
      {
        title: '奇策',
        des: '出牌阶段限一次，你可以将所有手牌当任意一张普通锦囊牌使用。',
        canSelect: false,
        code: 'qice',
      },
      {
        title: '诛害',
        des: '其他角色的结束阶段，若其本回合造成过伤害，你可以将一张手牌当【杀】或【过河拆桥】对其使用。',
        canSelect: false,
        code: 'zhuhai',
      },
      {
        title: '国色',
        des: '出牌阶段限一次，你可以选择一项：1. 将一张方块牌当【乐不思蜀】使用；2. 弃置一张方块牌并弃置场上的一张【乐不思蜀】。选择完成后，你摸一张牌。',
        canSelect: false,
        code: 'guose',
      },
      {
        title: '火计',
        des: '你可以将一张红色牌当【火攻】使用；你的【火攻】改为展示目标角色一张手牌，你弃置与其展示牌颜色相同的手牌以造成伤害。',
        canSelect: false,
        code: 'huoji',
      },
      {
        title: '连环',
        des: '你可以将一张梅花牌当【铁索连环】使用或重铸；你使用【铁索连环】可以多指定一名角色为目标。',
        canSelect: false,
        code: 'lianhuang',
      },
      {
        title: '双雄',
        des: '摸牌阶段结束时，你可以弃置一张牌，然后本回合你可以将一张与之颜色不同的牌当【决斗】使用。结束阶段，你获得本回合对你造成伤害的牌。',
        canSelect: false,
        code: 'shuangxiong',
      },
      {
        title: '乱击',
        des: '你可以将两张花色相同的手牌当【万箭齐发】使用；你使用【万箭齐发】可以少选择一个目标。',
        canSelect: false,
        code: 'luanji',
      },
      {
        title: '断粮',
        des: '你可以将一张黑色非锦囊牌当【兵粮寸断】使用；若你本回合未造成过伤害，你使用【兵粮寸断】无距离限制。',
        canSelect: false,
        code: 'duanliang',
      },
      {
        title: '倾国',
        des: '你可以将一张黑色手牌当【闪】使用或打出。',
        canSelect: false,
        code: 'qingguo',
      },
      {
        title: '龙魂',
        des: '你可以将至多两张同花色的牌按以下规则使用或打出：红桃当【桃】；方块当火【杀】；梅花当【闪】；黑桃当【无懈可击】。若你以此法转化了两张：红色牌，此牌回复值或伤害值+1；黑色牌，你弃置当前回合角色一张牌。',
        canSelect: false,
        code: 'longhun',
      },
      {
        title: '战绝',
        des: '你可以将所有手牌当【决斗】使用，然后你和因此受伤的角色各摸一张牌。若你本阶段因此技能而摸过至少三张牌，此技能本阶段失效。',
        canSelect: false,
        code: 'zhanjue',
      },
      {
        title: '念恩',
        des: '你可以将一张牌当任意基本牌使用或打出，然后若你以此法转化后的牌不为红色普通【杀】，直到回合结束，你视为拥有〖马术〗且不能发动此技能。',
        canSelect: false,
        code: 'nianen',
      },
      {
        title: '绝武',
        des: '你可以将一张点数为2的牌当任意伤害牌使用（每回合每种牌名限一次）。你从其他角色区域里获得的手牌点数均视为2。',
        canSelect: false,
        code: 'juewu',
      },
      {
        title: '晖云',
        des: '你可以将一张牌当【火攻】使用，结算后选择一项（每轮每项限一次），令目标可以：1.使用展示牌，然后重铸所有手牌；2.使用一张手牌，然后重铸展示牌；3.摸一张牌。',
        canSelect: false,
        code: 'huiyun',
      },
      {
        title: '急救',
        des: '你于回合外可以将一张红色牌当【桃】使用。',
        canSelect: false,
        code: 'jijiu',
      },
      {
        title: '肃疾',
        des: '一名已受伤角色的出牌阶段开始时，你可以将一张黑色牌当【杀】使用，若其受到了此【杀】造成的伤害，你获得其一张牌。',
        canSelect: false,
        code: 'suyi',
      },
      {
        title: '蛮嗣',
        des: '出牌阶段限一次，你可以将所有手牌当【南蛮入侵】使用；当一名角色受到【南蛮入侵】的伤害后，你摸一张牌。',
        canSelect: false,
        code: 'manshi',
      },
      {
        title: '破竹',
        des: '出牌阶段，你可以将一张手牌当【出其不意】使用，若此【出其不意】未造成伤害，此技能失效直到回合结束。',
        canSelect: false,
        code: 'pozhu',
      },
      {
        title: '谬焰',
        des: '转换技，阳：你可以将一张黑色牌当【火攻】使用，若此牌造成伤害，你获得本阶段展示过的所有手牌；阴：你可以将一张黑色牌当【火攻】使用，若此牌未造成伤害，本轮本技能失效。',
        canSelect: false,
        code: 'miuyan',
      },
      {
        title: '酒池',
        des: '你可以将一张黑桃手牌当【酒】使用。你使用【酒】无次数限制。',
        canSelect: false,
        code: 'jiuchi',
      },
      {
        title: '父魂',
        des: '你可以将两张手牌当【杀】使用或打出；当你于出牌阶段内以此法造成伤害后，你于此回合内拥有〖武圣〗和〖咆哮〗。',
        canSelect: false,
        code: 'fuhun',
      },
      {
        title: '解悬',
        des: '转换技，限定技，阳：你可以将一张红色牌当【顺手牵羊】使用；阴：你可以将一张黑色牌当【过河拆桥】使用。',
        canSelect: false,
        code: 'jiexuan',
      },
      {
        title: '奇袭',
        des: '你可以将一张黑色牌当【过河拆桥】使用。',
        canSelect: false,
        code: 'qixi',
      },
      {
        title: '连讨',
        des: '出牌阶段开始时，你可以令一名其他角色选择一种颜色，然后你展示所有手牌并依次将此颜色的手牌当【决斗】对其使用，直到有一方进入濒死状态，然后你摸X张牌（X为你此法造成的伤害值）。若该角色未因此受到伤害，你摸一张牌、本回合手牌上限+1且不能使用【杀】。',
        canSelect: false,
        code: 'liantao',
      },
      {
        title: '威临',
        des: '每回合限一次，你可以将一张牌当任意一种【杀】或【酒】使用，此牌目标角色与此牌颜色相同的手牌视为【杀】直到回合结束。',
        canSelect: false,
        code: 'weilin',
      },
      {
        title: '违忤',
        des: '出牌阶段限一次，你可以将一张红色牌当【顺手牵羊】对手牌数大于你的角色使用。',
        canSelect: false,
        code: 'weiwu',
      },
      {
        title: '看破',
        des: '你可以将一张黑色牌当【无懈可击】使用；你的【无懈可击】不能被响应。',
        canSelect: false,
        code: 'kanpo',
      },
      {
        title: '煮酒',
        des: '你可以将至少X+1张牌当【酒】使用（X为你本回合已使用过【酒】的次数），若这些牌不均为梅花，此技能本回合失效。',
        canSelect: false,
        code: 'zhujie',
      },
      {
        title: '谗逆',
        des: '出牌阶段限一次，你可以交给一名其他角色任意张手牌，然后其可以将至多等量张手牌当一张【决斗】使用。其因此【决斗】：造成伤害后，其摸X张牌（X为其转化此【决斗】的牌数）；受到伤害后，你弃置所有手牌。',
        canSelect: false,
        code: 'channi',
      },
      {
        title: '伺盗',
        des: '出牌阶段内限一次，当你对一名其他角色连续使用两张牌后，你可以将一张手牌当【顺手牵羊】对其使用。',
        canSelect: false,
        code: 'sidao',
      },
      {
        title: '垦伤',
        des: '你可以将至少两张牌当【杀】使用，然后可以将目标改为等量名角色。若这些牌数大于此牌造成的伤害，你摸一张牌。',
        canSelect: false,
        code: 'kenshang',
      },
    ],
  });

  const l = data.skills.length;
  data.skills.find(it => it.code === 'wusheng').probability = l / 3.0;
  data.skills.find(it => it.code === 'longhun').probability = l / 3.0;

  const openSkill = () => {
    useModal().open({
      component: () => import(`./SkillModal.vue`),
      modal: {
        title: '选择技能',
        width: '90%',
      },
      props: {
        selectedSkills: data.selectedSkills,
        skills: data.skills,
        done: (selectedSkill, replaceSkill) => {
          const index = data.selectedSkills.findIndex(
            item => item.code === replaceSkill?.code
          );

          if (index !== -1) {
            data.selectedSkills[index] = selectedSkill;
          } else if (data.selectedSkills.length <= 4) {
            data.selectedSkills.push(selectedSkill);
          }
        },
      },
    });
  };
</script>

<style lang="scss" scoped></style>
