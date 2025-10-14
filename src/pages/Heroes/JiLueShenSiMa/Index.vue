<script setup>
  import shiLiKa from '@/assets/constants/ShiLiKa.js';
  import biaoJi from '@/assets/constants/BiaoJi.js';
  import ShiLiKa from '@/components/UI/ShiLiKa.vue';
  import BiaoJiItem from '@/components/UI/BiaoJi/BiaoJiItem.vue';
  import SelectableSkills from '@/components/UI/SelectableSkills.vue';
  import DynamicGrid from '@/components/UI/DynamicGrid.vue';
  import SelectableButton from '@/components/UI/SelectableButton.vue';
  import DynamicName from '@/components/UI/DynamicName.vue';
  import { showNotify } from 'vant';

  const data = reactive({
    sl: null,
    renQty: 0,
    lunCiQty: 1,
    renShangXian: 4,
    xuanZeJiNengCount: 0,
    skills: [
      {
        title: '鬼才',
        des: '当一名角色的判定牌生效前，你可以打出一张手牌代替之。',
        code: '鬼才',
        canSelect: true,
        selected: false,
      },
      {
        title: '放逐',
        code: shiLiKa.find(it => it.code === 'WEI').code,
        des: '当你受到伤害后，你可以令一名其他角色翻面，然后该角色摸X张牌（X为你已损失的体力值）。',
        canSelect: true,
        selected: false,
      },
      {
        title: '集智',
        des: '当你使用非转化的普通锦囊牌时，你可以摸一张牌。',
        code: shiLiKa.find(it => it.code === 'SHU').code,
        canSelect: true,
        selected: false,
      },
      {
        title: '制衡',
        des: '出牌阶段限一次，你可以弃置任意张牌，然后摸等量的牌。',
        code: shiLiKa.find(it => it.code === 'WU').code,
        canSelect: true,
        selected: false,
      },
      {
        title: '完杀',
        des: '锁定技，你的回合内，若有角色处于濒死状态，只有你和处于濒死状态的角色才能使用【桃】。',
        code: shiLiKa.find(it => it.code === 'QUN').code,
        canSelect: true,
        selected: false,
      },
    ],
  });

  const xuanZeJiNengRen = computed(() => {
    return data.xuanZeJiNengCount + 1 < 2 ? 2 : data.xuanZeJiNengCount + 1;
  });

  watch(
    () => data.renQty,
    newValue => {
      if (newValue >= 4) {
        data.skills.find(it => it.code === '鬼才').selected = true;
        if (data.sl)
          data.skills.find(it => it.code === data.sl).selected = true;
      }
    }
  );

  watch(
    () => data.lunCiQty,
    newValue => {
      data.renShangXian = 4;
    }
  );
</script>

<template>
  <div class="wrapper">
    <shi-li-ka v-model:model-value="data.sl"></shi-li-ka>
    <biao-ji-item
      class="margin-top-m"
      v-model:value="data.lunCiQty"
      :code="'LunCi'"
      :key="'LunCi'"
    />
    <biao-ji-item
      class="margin-top-m"
      v-model:value="data.renQty"
      :code="'Ren'"
      :key="'Ren'"
    />
    <dynamic-grid :fixed-columns="2" class="margin-top-m">
      <selectable-button>
        <dynamic-name
          :name="'未响应牌，忍+1'"
          @click="
            () => {
              if (data.renShangXian > 0) {
                data.renQty++;
                data.renShangXian--;
                showNotify({
                  type: 'success',
                  message: '操作成功！',
                  duration: 550,
                });
              }
            }
          "
        ></dynamic-name>
      </selectable-button>
      <selectable-button
        @click="
          () => {
            if (data.renQty - xuanZeJiNengRen < 0) {
              return;
            }

            data.renQty -= xuanZeJiNengRen;
            data.xuanZeJiNengCount++;
            showNotify({
              type: 'success',
              message: '操作成功！',
              duration: 550,
            });
          }
        "
      >
        <dynamic-name :name="`忍-${xuanZeJiNengRen}，获得技能`"></dynamic-name>
      </selectable-button>
    </dynamic-grid>
    <selectable-skills class="margin-top-l" :skills="data.skills" />
  </div>
</template>

<style scoped lang="less"></style>
