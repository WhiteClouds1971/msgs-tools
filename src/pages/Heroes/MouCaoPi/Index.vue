<template>
  <div>
    <ti-li-ka />
    <biao-ji-item v-model:value="data.songWeiQty" :code="'SongWei'" />
    <selectable-button class="margin-top-m" @click="updateSongWeiQty(2)">
      角色受伤（每回合限一次）或死亡，+2颂威
    </selectable-button>
    <van-divider>【放逐】（出牌阶段限1次）</van-divider>
    <dynamic-grid :fixed-columns="1">
      <selectable-button @click="updateSongWeiQty(-2)">
        <div class="skill-description">
          -2颂威(限基本)，直到其下回合结束，其不能使用非基本手牌
        </div>
      </selectable-button>
      <selectable-button @click="updateSongWeiQty(-4)">
        <div class="skill-description">
          -4颂威(强中)，直到其下回合结束，其不能响应除其外的角色使用的牌
        </div>
      </selectable-button>
      <selectable-button @click="updateSongWeiQty(-6)">
        <div class="skill-description">
          -6颂威(限锦囊/封技能)，直到其下回合结束，其不能使用非锦囊手牌/武将技能失效
        </div>
      </selectable-button>
      <selectable-button @click="updateSongWeiQty(-8)">
        <div class="skill-description">
          -8颂威(翻面/限装备），其翻面，或直到其下回合结束，其不能使用非装备手牌
        </div>
      </selectable-button>
    </dynamic-grid>
    <van-divider>【行殇】（出牌阶段限2次）</van-divider>
    <dynamic-grid :fixed-columns="1">
      <selectable-button @click="updateSongWeiQty(-2)">
        <div class="skill-description">-2颂威，复原武将牌，或摸三张牌</div>
      </selectable-button>
      <selectable-button @click="updateSongWeiQty(-3)">
        <div class="skill-description">
          -3颂威，回复1点体力并加1点体力上限，然后随机恢复一个被废除的装备栏（不可对体力上限大于9的角色选择此项）
        </div>
      </selectable-button>
      <selectable-button @click="updateSongWeiQty(-4)">
        <div class="skill-description">
          -4颂威，追思一名已阵亡的角色（仅可对武将牌上有〖行殇〗的自己选择此项），然后你失去〖行殇〗、〖放逐〗和〖颂威〗
        </div>
      </selectable-button>
    </dynamic-grid>
    <da-qi-item class="margin-top-m" :code="'XingShang'"></da-qi-item>
  </div>
</template>

<script setup>
  import BiaoJiItem from '@/components/UI/BiaoJi/BiaoJiItem.vue';
  import TiLiKa from '@/components/UI/TiLiKa.vue';
  import DaQiItem from '@/components/UI/DaQiItem.vue';
  import SelectableButton from '@/components/UI/SelectableButton.vue';
  import DynamicGrid from '@/components/UI/DynamicGrid.vue';
  import { showNotify } from 'vant';

  const data = reactive({
    songWeiQty: 0,
  });

  const updateSongWeiQty = value => {
    if (data.songWeiQty + value < 0) {
      showNotify({ type: 'warning', message: '颂威数量不够，无法执行' });
      return;
    }
    data.songWeiQty += value;
    if (data.songWeiQty > 9) {
      data.songWeiQty = 9;
    }
    if (value < 0) {
      showNotify({ type: 'success', message: '成功，颂威' + value });
    }
    if (value > 0) {
      showNotify({ type: 'success', message: '颂威+' + value });
    }
  };
</script>

<style lang="scss" scoped></style>
