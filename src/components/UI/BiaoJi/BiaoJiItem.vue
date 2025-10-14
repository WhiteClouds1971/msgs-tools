<script setup>
  import { ref, watch, computed } from 'vue';
  import BiaoJiIcon from '@/components/UI/BiaoJi/BiaoJiIcon.vue';
  import biaoJi from '@/assets/constants/BiaoJi.js';
  import { randomColor } from '@/util/random.js';

  const props = defineProps({
    value: Number,
    code: String,
  });

  const emit = defineEmits(['update:value']);

  const bj = biaoJi.find(it => it.code === props.code);

  const data = ref({
    qty: props.value || 0,
    name: bj.name,
    qtyMax: bj.qtyMax,
    info: bj.info,
    tags: bj.tags,
    code: bj.code,
  });

  // 监听 data.qty 的变化，并触发自定义事件更新父组件中的值
  watch(
    () => data.value.qty,
    newValue => {
      emit('update:value', newValue);
    }
  );

  watch(
    () => props.value,
    newValue => {
      data.value.qty = newValue;
    }
  );
</script>

<template>
  <div class="wrapper">
    <div
      v-if="data.tags || data.info"
      class="margin-bottom-s flex-row flex-justify-between"
    >
      <div>
        <van-popover v-if="data.info" placement="right">
          <div style="padding: 4px" class="info-text">
            <div v-html="data.info"></div>
          </div>
          <template #reference>
            <van-icon name="info-o" class="info" />
          </template>
        </van-popover>
      </div>
      <div>
        <van-tag
          v-if="data.tags"
          class="margin-left-xs"
          v-for="(tag, index) in data.tags"
          :key="index"
          :color="randomColor(tag)"
        >
          {{ tag }}
        </van-tag>
      </div>
    </div>
    <div class="bj">
      <biao-ji-icon
        style="width: 2.5cm; height: 2.5cm"
        :color="randomColor(data.code)"
        :name="data.name"
      ></biao-ji-icon>

      <van-stepper
        v-model="data.qty"
        theme="round"
        input-width="60px"
        button-size="40px"
        :min="0"
        :max="data.qtyMax"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
  @icon-height: 20px;
  @text-shadow: 5px;
  .wrapper {
    background-color: #fff;
    width: 100%;
    box-sizing: border-box; /* 添加此行 */
    padding: 12px;
  }

  .bj {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-family: 'Heiti SC', serif;
  }

  .info {
    color: #3967ff;
    font-size: 25px;
    line-height: 25px;
  }

  .info-text {
    font-size: 12px;
    background-color: #93a25e;
  }
</style>
