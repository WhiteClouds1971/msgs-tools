<template>
  <div>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item>
        <dynamic-grid :fixed-columns="5">
          <selectable-button
            v-for="bj in validBiaoJi"
            :can-select="false"
            :key="bj.code"
            @click="add(bj)"
            :style="{ backgroundColor: randomColor(bj.code) }"
          >
            <dynamic-name
              :name="bj.name"
              class="white-bold-name"
            ></dynamic-name>
          </selectable-button>
        </dynamic-grid>
      </van-collapse-item>
    </van-collapse>
    <biao-ji-item
      class="margin-top-m"
      v-for="(bj, index) in selectedBiaoJi"
      v-model:value="bj.qty"
      :code="bj.code"
      :key="bj.code"
    />
  </div>
</template>

<script setup>
  import DynamicGrid from '@/components/UI/DynamicGrid.vue';
  import SelectableButton from '@/components/UI/SelectableButton.vue';
  import biaoJi from '@/assets/constants/BiaoJi.js';
  import _ from 'lodash';
  import BiaoJiItem from '@/components/UI/BiaoJi/BiaoJiItem.vue';
  import DynamicName from '@/components/UI/DynamicName.vue';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { randomColor } from '@/util/random.js';
  import { useVoiceStore } from '@/stores/voiceStore.js';

  const activeName = ref(null);
  const validBiaoJi = reactive(biaoJi.filter(it => !it.hidden));
  const selectedBiaoJi = reactive([]);

  const voiceStore = useVoiceStore();

  const add = bj => {
    selectedBiaoJi.unshift(_.cloneDeep(bj));
  };

  const route = useRoute();
  watch(
    () => route.query,
    nv => {
      const code = nv.code;
      if (code) {
        const bj = biaoJi.find(it => it.code === code);
        if (bj) {
          add(bj);
        }
      }
    },
    { immediate: true }
  );
</script>

<style lang="less" scoped></style>
