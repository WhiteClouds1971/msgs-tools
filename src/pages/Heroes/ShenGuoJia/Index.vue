<script setup>
  import ShiLiKa from '@/components/UI/ShiLiKa.vue';
  import JiLuShuZi from '@/components/UI/JiLuShuZi.vue';
  import TiLiKa from '@/components/UI/TiLiKa.vue';
  import DaQiItem from '@/components/UI/DaQiItem.vue';
  import DynamicGrid from '@/components/UI/DynamicGrid.vue';
  import SelectableButton from '@/components/UI/SelectableButton.vue';
  import DynamicName from '@/components/UI/DynamicName.vue';
  import { showNotify } from 'vant';

  const data = reactive({
    tiLiKa: {
      tlz: 3,
      tlsx: 3,
    },
  });

  const updateTiLiKa = (tlsx, tlz) => {
    data.tiLiKa.tlsx += tlsx;
    if (tlz) {
      data.tiLiKa.tlz += tlz;
    }
    showNotify({
      type: 'success',
      message: '体力信息已更新！',
      duration: 550,
    });
  };
</script>

<template>
  <div>
    <shi-li-ka />
    <ji-lu-shu-zi class="margin-top-m" :model-codes="['simpleMode']" />
    <ti-li-ka :ti-li-ka-value="data.tiLiKa"></ti-li-ka>
    <dynamic-grid :fixed-columns="3" class="margin-top-s">
      <selectable-button
        :can-select="false"
        @click="
          () => {
            if (data.tiLiKa.tlsx < 10) {
              updateTiLiKa(1);
            }
          }
        "
      >
        <dynamic-name :name="'上限<10且【慧识】成功，上限+1'"></dynamic-name>
      </selectable-button>
      <selectable-button :can-select="false" @click="updateTiLiKa(-1)">
        <dynamic-name :name="'【慧识】角色手牌全场最多，上限-1'"></dynamic-name>
      </selectable-button>
      <selectable-button :can-select="false" @click="updateTiLiKa(-1)">
        <dynamic-name :name="'【佐幸】印普通锦囊，上限-1'"></dynamic-name>
      </selectable-button>
    </dynamic-grid>
    <dynamic-grid :fixed-columns="1" class="margin-top-l">
      <selectable-button :can-select="true" @click="updateTiLiKa(2, 1)">
        限定技【天翊】上限+2，体力+1
      </selectable-button>
      <selectable-button :can-select="true" @click="updateTiLiKa(-2)">
        限定技【辉逝】体力上限>=角色数，上限-2
      </selectable-button>
    </dynamic-grid>
    <da-qi-item class="margin-top-m" :code="'ZuoXin'" />
  </div>
</template>

<style scoped lang="less"></style>
