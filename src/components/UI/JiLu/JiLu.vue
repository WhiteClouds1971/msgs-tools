<template>
  <div>
    <div v-for="(area, index) in dataSource">
      <dynamic-grid
        v-if="!area.collapse?.use"
        :fixed-columns="area.fixedColumns"
        :class="{
          'margin-top-m': index > 0,
        }"
      >
        <selectable-button
          v-for="name in area.names"
          :can-select="data.viewModel === 'simpleMode'"
          @click.stop="handleAdd(name)"
        >
          <span class="black-bold-name">
            {{ name.label }}
          </span>
        </selectable-button>
      </dynamic-grid>

      <van-collapse
        v-else
        v-model="area.collapse.defaultCollapse"
        class="margin-top-m"
        accordion
      >
        <van-collapse-item :title="area.collapse.title" name="1">
          <dynamic-grid :fixed-columns="area.fixedColumns">
            <selectable-button
              v-for="name in area.names"
              :can-select="data.viewModel === 'simpleMode'"
              @click.stop="handleAdd(name)"
            >
              <span class="black-bold-name">
                {{ name.label }}
              </span>
            </selectable-button>
          </dynamic-grid>
        </van-collapse-item>
      </van-collapse>
    </div>

    <div class="card margin-top-m">
      <div v-if="operatorVisible" class="show">
        <van-icon
          v-if="data.viewModel !== 'simpleMode'"
          :name="data.eye ? 'eye-o' : 'closed-eye'"
          @click.stop="onEyeChange"
        />

        <van-icon
          v-if="data.viewModel !== 'simpleMode'"
          class="margin-left-l"
          name="cross"
          @click.stop="removeAddedCard"
        />
        <van-popover
          v-if="modelCodes.length >= 2"
          v-model:show="data.showPopover"
          :actions="viewModelList"
          @select="handleModelSwitch"
        >
          <template #reference>
            <van-icon
              :class="{
                'margin-left-l': data.viewModel !== 'simpleMode',
              }"
              name="exchange"
            />
          </template>
        </van-popover>
      </div>
      <dynamic-grid
        v-if="data.viewModel !== 'simpleMode'"
        class="margin-top-m"
        :fixed-columns="props.addedCardColumn"
      >
        <del-card
          v-for="(item, index) in data.addedCards"
          :key="item.id"
          :id="item.id"
          :is-hide="item.hide"
          :dian-shu="item.dianShu?.label"
          :hs-icon="item.huaSe?.icon"
          :hs-color="item.huaSe?.color"
          :name="item.name?.label"
          @del="handleDel"
        ></del-card>
      </dynamic-grid>
    </div>
  </div>
</template>

<script setup>
  import DynamicGrid from '@/components/UI/DynamicGrid.vue';
  import SelectableButton from '@/components/UI/SelectableButton.vue';
  import { useModal } from '@/components/Modal/index.js';
  import { v4 } from 'uuid';
  import DelCard from '@/components/UI/JiLu/DelCard.vue';
  import { showConfirmDialog, showNotify } from 'vant';
  import { useDefineModel } from '@/util/defineModel.js';
  import { computed } from 'vue';

  const props = defineProps({
    dataSource: Array,
    viewModel: {
      type: String,
      default: 'simpleMode',
    },
    modelCodes: {
      type: Array,
      default: ['simpleMode', 'recordMode'],
    },
    addedCardColumn: {
      type: Number,
      default: 3,
    },
    addedCardMaxNumber: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER,
    },
    operatorVisible: {
      type: Boolean,
      default: true,
    },
  });

  const viewModelList = computed(() => {
    return [
      // 简单模式
      {
        text: '简单模式',
        value: 'simpleMode',
      },
      // 记录模式，点击后直接添加，不需要选择花色和点数。支持删除，不支持模式切换。用于神华佗，谋诸葛，友诸葛
      {
        text: '记录模式',
        value: 'recordMode',
      },
      // 复杂模式
      {
        text: '复杂模式',
        value: 'complexMode',
      },
    ].filter(it => props.modelCodes.includes(it.value));
  });

  const emit = defineEmits([
    'clickButton',
    'remove',
    'removeAll',
    'removed',
    'removedAll',
  ]);

  const model = defineModel();
  const data = useDefineModel(model, {
    eye: true,
    viewModel: props.viewModel,
    showPopover: false,
    addedCards: [],
  });
  const removeAddedCard = () => {
    showConfirmDialog({
      title: '确认',
      message: '确认要删除所有已记录的游戏牌吗？',
    }).then(_ => {
      emit('remove', null);
      emit('removeAll');
      data.addedCards = [];
      emit('removed', null);
      emit('removedAll');
    });
  };

  const onEyeChange = () => {
    data.eye = !data.eye;
    data.addedCards.forEach(it => {
      it.hide = !data.eye;
    });
  };

  const handleModelSwitch = action => {
    data.viewModel = action.value;
  };

  const handleAdd = name => {
    if (data.addedCards.length >= props.addedCardMaxNumber) {
      // 主要通知
      showNotify({ type: 'warning', message: '无法继续添加卡牌' });
      return;
    }

    if (data.viewModel === 'simpleMode') {
      emit('clickButton', data.handleCard);
      return;
    }
    data.handleCard = {};
    data.handleCard.name = name;
    if (data.viewModel === 'recordMode') {
      data.handleCard.id = v4();
      data.addedCards.push(data.handleCard);
      emit('clickButton', data.handleCard);
      return;
    }
    useModal().open({
      component: () => import(`./AddCard.vue`),
      modal: {
        title: '记录牌',
        showCancelButton: true,
      },
      props: {
        card: data.handleCard,
        onHusSeClick: hs => {
          data.handleCard.huaSe = hs;
        },
        onDianShuClick: ds => {
          data.handleCard.dianShu = ds;
        },
      },
      ok: handleOk,
    });
  };

  const handleOk = () => {
    data.handleCard.id = v4();
    data.handleCard.hide = false;
    data.addedCards.push(data.handleCard);
    emit('clickButton', data.handleCard);
  };

  const handleDel = id => {
    const i = data.addedCards.findIndex(card => card.id === id);
    const temp = data.addedCards[i];
    data.addedCards.splice(i, 1);
    nextTick(() => {
      emit('remove', temp);
    });
  };
</script>
<style scoped lang="less">
  .card {
    .show {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
    }
  }
</style>
