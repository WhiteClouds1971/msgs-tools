<script setup>
  import SelectableSkills from '@/components/UI/SelectableSkills.vue';
  import DaQiItem from '@/components/UI/DaQiItem.vue';
  import DynamicGrid from '@/components/UI/DynamicGrid.vue';
  import SelectableButton from '@/components/UI/SelectableButton.vue';
  import OutPutDisplay from '@/components/UI/OutPutDisplay.vue';
  import Stepper from '@/components/UI/Stepper.vue';

  const data = reactive({
    shiYongPaiQty: 0,
    qiZhiPaiQty: 0,
    shiQuTiLiQty: 0,
    skills: [
      {
        title: '壮誓',
        des: '出牌阶段开始时，你可以执行任意项：1.弃置任意张手牌，然后你此阶段使用的前等量张牌无距离限制且不能被响应；2.失去任意点体力，然后你此阶段使用的前等量张牌不计入次数。',
        canSelect: false,
        selected: true,
        code: 'ZhuangShi',
      },
      {
        title: '饮战',
        des: '锁定技，当你使用【杀】对一名角色造成伤害时，若你的：体力值不大于其，此【杀】对其造成的伤害+1；手牌数不大于其，此【杀】结算结束后，你弃置其一张牌。乘势：你回复1点体力并获得其弃置的牌。',
        canSelect: false,
        selected: true,
        code: 'YinZhan',
      },
      {
        title: '忠傲',
        des: '使命技，游戏开始时，你获得〖狂骨〗。',
        canSelect: false,
        selected: true,
        code: 'ZhongAo',
      },
      {
        title: '狂骨（1级）',
        des: '当你对距离1以内的一名角色造成伤害后，你可以选择一项：1.回复1点体力；2.摸一张牌。',
        canSelect: false,
        selected: true,
        code: 'KuangGu1',
      },
      {
        title: '狂骨（2级）',
        des: '当你对距离1以内的一名角色造成伤害后，你可以选择一项：1.回复1点体力；2.摸一张牌；背水：弃置一张牌，然后你此阶段使用【杀】的次数上限+1。',
        canSelect: false,
        selected: false,
        code: 'KuangGu2',
      },
      {
        title: '困奋',
        des: '锁定技，结束阶段，你失去1点体力，然后摸两张牌。',
        canSelect: false,
        selected: false,
        code: 'KunFen',
      },
    ],
  });

  const outputDisplay = reactive({
    templateStore: [
      {
        code: 'moPai',
        templateStr: '你摸 {{moPaiShu}} 张牌',
      },
      {
        code: 'huiFuTiLi',
        templateStr: '你回复 {{huiFuTiLiShu}} 点体力',
      },
      {
        code: 'moPaiOrHuiFuTiLi',
        templateStr: '你回复 1 点体力（未受伤则改为摸一张牌）',
      },
    ],
    vars: {},
    displays: [
      {
        title: '输出',
        selectedCodes: [],
      },
    ],
  });

  const updateSkillStatus = skillCodes => {
    data.skills.forEach(skill => {
      skill.selected = (skillCodes || []).includes(skill.code);
    });
  };

  const success = () => {
    // 修改技能
    updateSkillStatus(['ZhuangShi', 'YinZhan', 'ZhongAo', 'KuangGu2']);
    if (data.shiYongPaiQty < data.qiZhiPaiQty) {
      outputDisplay.vars = {
        moPaiShu: 1,
      };
      outputDisplay.displays[0].selectedCodes = ['moPai'];
    }
    if (data.shiYongPaiQty < data.shiQuTiLiQty) {
      outputDisplay.displays[0].selectedCodes.push('moPaiOrHuiFuTiLi');
    }
  };
  const fail = () => {
    // 修改技能
    updateSkillStatus(['YinZhan', 'KunFen']);
    outputDisplay.vars = {
      moPaiShu: 2,
      huiFuTiLiShu: 2,
    };
    outputDisplay.displays[0].selectedCodes = ['huiFuTiLi', 'moPai'];
  };
</script>

<template>
  <div>
    <div style="background-color: white; padding: 8px">
      <stepper
        :title="'阶段使用的牌数'"
        :step="1"
        :min="0"
        v-model:value="data.shiYongPaiQty"
      ></stepper>
      <stepper
        class="margin-top-m"
        :title="'壮誓弃置的牌数'"
        :step="1"
        :min="0"
        v-model:value="data.qiZhiPaiQty"
      ></stepper>
      <stepper
        class="margin-top-m"
        :title="'壮誓失去的体力'"
        :step="1"
        :min="0"
        v-model:value="data.shiQuTiLiQty"
      ></stepper>
    </div>

    <dynamic-grid class="margin-top-m" :fixed-columns="2">
      <selectable-button :can-select="true" @click="success">
        成功：杀死一名角色
      </selectable-button>
      <selectable-button :can-select="true" @click="fail">
        失败：濒死/不执行壮誓
      </selectable-button>
    </dynamic-grid>

    <out-put-display class="margin-top-m" :output="outputDisplay" />

    <selectable-skills
      class="margin-top-m"
      :skills="data.skills"
    ></selectable-skills>
    <da-qi-item class="margin-top-m" :code="'ZhongAo'"></da-qi-item>
  </div>
</template>

<style scoped lang="less">
  .step-wrapper {
    display: flex;
    width: 100%;
    align-items: center; /* 垂直居中 */
    justify-content: space-around; /* 水平分布，使 title 和 stepper 分开 */

    .title {
      width: 150px;
    }
  }
</style>
