<!--预设游戏牌：基本、锦囊、装备-->
<template>
  <ji-lu :dataSource="youXiPaiNames" v-bind="props" />
</template>

<script setup>
  import JiLu from '@/components/UI/JiLu/JiLu.vue';
  import { name } from '@/components/UI/JiLu/YouXiPaiConstants.js';

  const props = defineProps({
    jiBenVisible: {
      type: Boolean,
      default: true,
    },
    jinNangVisible: {
      type: Boolean,
      default: true,
    },
    zhuangBeiVisible: {
      type: Boolean,
      default: true,
    },
    viewModel: {
      type: String,
      default: 'simpleMode',
    },
    modelCodes: {
      type: Array,
      default: ['simpleMode', 'recordMode', 'complexMode'],
    },
    addedCardColumn: {
      type: Number,
      default: 3,
    },
    modelSwitchVisible: {
      type: Boolean,
      default: true,
    },
  });

  /**
   * [
   *     {
   *       fixedColumns: Number,
   *       collapse: {
   *         title: '',
   *         use: Boolean, // 使用折叠
   *         defaultCollapse: String, // 默认不展开
   *       },
   *       names: [
   *         {
   *           label: String,
   *           code: String,
   *         },
   *       ],
   *     },
   *   ];
   */
  const youXiPaiNames = reactive([]);

  if (props.jiBenVisible) {
    youXiPaiNames.push({
      fixedColumns: 6,
      names: name.jinBen,
    });
  }
  if (props.jinNangVisible) {
    youXiPaiNames.push({
      fixedColumns: 4,
      names: name.jinNang,
    });
  }
  if (props.zhuangBeiVisible) {
    youXiPaiNames.push({
      fixedColumns: 3,
      names: name.zhuangBei,
      collapse: {
        title: '装备牌',
        use: true, // 使用折叠
        defaultCollapse: null, // 默认不展开
      },
    });
  }
</script>

<style lang="scss" scoped></style>
