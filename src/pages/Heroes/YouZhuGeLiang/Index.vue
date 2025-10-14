<template>
  <div>
    <stepper
      :title="'卧龙演策牌数'"
      v-model:value="data.woLongYanCeCount"
      :step="1"
      :max="7"
    ></stepper>
    <van-divider>预测出牌</van-divider>
    <ji-lu
      v-model="childrenData.schCard"
      class="margin-top-m"
      :data-source="store.woLongYanCeType"
      :view-model="'recordMode'"
      :modelCodes="['recordMode']"
      :added-card-column="5"
      :added-card-max-number="data.woLongYanCeCount"
      @removeAll="handleSchRemove"
      @click-button="updateOutput"
    />
    <selectable-button
      v-model="childrenData.fangQiu"
      :can-select="childrenData.fangQiu.canSelect"
      class="margin-top-m"
      @click="
        updateOutput();
        showAllCard();
      "
    >
      发动【方遒】，结算时数值+1
    </selectable-button>
    <van-divider>实际出牌</van-divider>
    <ji-lu
      v-model="childrenData.actCard"
      class="margin-top-m"
      :data-source="store.woLongYanCeType"
      :view-model="'recordMode'"
      :added-card-column="5"
      :added-card-max-number="data.woLongYanCeCount"
      :operator-visible="false"
      @click-button="handleActYouXiPaiClick"
    />
    <out-put-display class="margin-top-m" :output="store.outputDisplay" />
    <da-qi-item class="margin-top-m" :code="'WoLongYanCe'" />
  </div>
</template>

<script setup>
  import Stepper from '@/components/UI/Stepper.vue';
  import JiLu from '@/components/UI/JiLu/JiLu.vue';
  import DaQiItem from '@/components/UI/DaQiItem.vue';
  import { showNotify } from 'vant';
  import SelectableButton from '@/components/UI/SelectableButton.vue';
  import OutPutDisplay from '@/components/UI/OutPutDisplay.vue';

  const childrenData = reactive({
    schCard: {},
    actCard: {},
    fangQiu: {
      isSelected: false,
      canSelect: true,
    },
  });

  const fangQiuValue = computed(() => {
    return childrenData.fangQiu.isSelected ? 1 : 0;
  });

  const data = reactive({
    woLongYanCeCount: 3,
    output: {
      vars: {
        _shiQUTiLi: 1,
        get shiQUTiLi() {
          return this._shiQUTiLi + fangQiuValue.value;
        },

        _yuCePaiShu: 1,
        get yuCePaiShu() {
          return this._yuCePaiShu + fangQiuValue.value;
        },

        _qiZhiPaiShu: 2,
        get qiZhiPaiShu() {
          return this._qiZhiPaiShu + fangQiuValue.value;
        },

        _zhiDingPai: 1,
        get zhiDingPai() {
          return this._zhiDingPai + fangQiuValue.value;
        },

        _maPai: 2,
        get maPai() {
          return this._maPai + fangQiuValue.value;
        },

        fangQiu: '失效',
      },
      selectedCodes: [],
    },
  });

  const store = reactive({
    outputDisplay: {
      codeEnums: {
        'YanCe=0': 'YanCe=0',
        'YanCe<Half': 'YanCe<Half',
        'YanCe>=Half': 'YanCe>=Half',
        'YanCe=All': 'YanCe=All',
        fangQiu: 'fangQiu',
      },
      templateStore: [
        {
          code: 'YanCe=0',
          templateStr:
            '正确 0：失去 {{shiQUTiLi}} 体力，预测牌数 -{{yuCePaiShu}}。',
        },
        {
          code: 'YanCe<Half',
          templateStr: '正确不足一半：弃置 {{qiZhiPaiShu}} 张牌。',
        },
        {
          code: 'YanCe>=Half',
          templateStr:
            '正确至少一半（向上取整）：获得 {{zhiDingPai}} 张指定的颜色或类型牌。',
        },
        {
          code: 'YanCe=All',
          templateStr:
            '全部正确：摸 {{maPai}} 张牌，预测牌数 +{{yuCePaiShu}}。',
        },
        {
          code: 'fangQiu',
          templateStr: '技能【方遒】已{{fangQiu}}。',
        },
      ],
      vars: {},
      displays: [
        {
          title: '输出',
          selectedCodes: [],
        },
      ],
    },
    woLongYanCeType: [
      {
        fixedColumns: 5,
        names: [
          {
            label: '红色',
            code: 'HongSe',
          },
          {
            label: '黑色',
            code: 'HeiSe',
          },
          {
            label: '基本',
            code: 'JiBen',
          },
          {
            label: '锦囊',
            code: 'JinNang',
          },
          {
            label: '装备',
            code: '装备',
          },
        ],
      },
    ],
  });

  const showAllCard = () => {
    childrenData.schCard.addedCards.forEach(it => {
      it.hide = false;
    });
  };

  const woLongYanCeRightQty = computed(() => {
    let count = 0;
    childrenData.actCard.addedCards.forEach((it, index) => {
      const currentSchCard = childrenData.schCard.addedCards[index];
      currentSchCard?.name?.code === it?.name?.code ? count++ : false;
    });
    return count;
  });

  const handleActYouXiPaiClick = card => {
    const currentIndex = childrenData.actCard.addedCards.length - 1;
    const currentSchCard = childrenData.schCard.addedCards[currentIndex];
    const currentActCard = childrenData.actCard.addedCards[currentIndex];
    let flag = currentSchCard?.name?.code === currentActCard?.name?.code;
    if (!currentActCard) {
      flag = false;
    }

    if (flag) {
      if (woLongYanCeRightQty.value <= 5) {
        showNotify({ type: 'success', message: '你摸一张牌', duration: 550 });
      }
    } else {
      showNotify({ type: 'danger', message: '预测错误', duration: 550 });
    }
    currentSchCard.hide = false;

    updateOutput();
  };

  const updateOutput = () => {
    if (childrenData.schCard.addedCards.length < data.woLongYanCeCount) {
      return;
    }

    const half = data.woLongYanCeCount / 2;
    const halfCeil = Math.ceil(data.woLongYanCeCount / 2);
    data.output.selectedCodes = [];
    data.output.vars.fangQiu = '失效';

    if (woLongYanCeRightQty.value <= 0) {
      data.output.selectedCodes.push(store.outputDisplay.codeEnums['YanCe=0']);
    }

    if (woLongYanCeRightQty.value < half) {
      data.output.selectedCodes.push('YanCe<Half');
    }
    if (woLongYanCeRightQty.value >= halfCeil) {
      data.output.selectedCodes.push(
        store.outputDisplay.codeEnums['YanCe>=Half']
      );
    }

    if (woLongYanCeRightQty.value === data.woLongYanCeCount) {
      data.output.selectedCodes.push(
        store.outputDisplay.codeEnums['YanCe=All']
      );
    }

    if (childrenData.fangQiu.isSelected) {
      data.output.selectedCodes.push(store.outputDisplay.codeEnums.fangQiu);
      if (
        woLongYanCeRightQty.value > 3 &&
        woLongYanCeRightQty.value === data.woLongYanCeCount
      ) {
        data.output.vars.fangQiu = '重置';
      }
    }

    store.outputDisplay.displays[0].selectedCodes = [
      ...data.output.selectedCodes,
    ];
    store.outputDisplay.vars = data.output.vars;
  };

  const handleSchRemove = removeCard => {
    if (
      childrenData.fangQiu.isSelected &&
      childrenData.schCard.addedCards.length === data.woLongYanCeCount &&
      woLongYanCeRightQty.value <= 3
    ) {
      childrenData.fangQiu.canSelect = false;
    }

    if (woLongYanCeRightQty.value === data.woLongYanCeCount) {
      data.woLongYanCeCount += data.output.vars.yuCePaiShu;
      if (data.woLongYanCeCount > 7) {
        data.woLongYanCeCount = 7;
      }
    }
    if (
      woLongYanCeRightQty.value === 0 &&
      data.woLongYanCeCount > 0 &&
      childrenData.schCard.addedCards.length === data.woLongYanCeCount
    ) {
      data.woLongYanCeCount -= data.output.vars.yuCePaiShu;
      if (data.woLongYanCeCount < 0) {
        data.woLongYanCeCount = 0;
      }
    }

    childrenData.fangQiu.isSelected = false;
    data.output.selectedCodes = [];
    store.outputDisplay.displays[0].selectedCodes = [
      ...data.output.selectedCodes,
    ];
    childrenData.schCard.addedCards = [];
    childrenData.schCard.eye = true;
    childrenData.actCard.addedCards = [];
  };
</script>

<style lang="scss" scoped></style>
