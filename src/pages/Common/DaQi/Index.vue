<script setup>
  import DynamicGrid from '@/components/UI/DynamicGrid.vue';
  import SelectableButton from '@/components/UI/SelectableButton.vue';
  import DynamicName from '@/components/UI/DynamicName.vue';
  import daQi from '@/assets/constants/DaQi.js';
  import DaQiItem from '@/components/UI/DaQiItem.vue';
  import { ref } from 'vue';
  import { randomColor } from '@/util/random.js';
  import { useRoute } from 'vue-router';
  import YinYangItem from '@/components/UI/YinYangItem.vue';
  import yinYang from '@/assets/constants/YinYang.js';

  const activeName = ref(null);
  const validDaQi = reactive(daQi.filter(it => !it.hidden));
  const selectedDq = reactive([]);

  const add = dq => {
    selectedDq.unshift(dq);
  };

  const route = useRoute();
  watch(
    () => route.query,
    nv => {
      const code = nv.code;
      if (code) {
        const dq = daQi.find(it => it.code === code);
        if (dq) {
          add(dq);
        }
      }
    },
    { immediate: true }
  );
</script>

<template>
  <div>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item>
        <dynamic-grid :fixed-columns="5">
          <selectable-button
            v-for="dq in validDaQi"
            :can-select="false"
            :key="dq.code"
            @click="add(dq)"
            :style="{ backgroundColor: randomColor(dq.code) }"
          >
            <dynamic-name
              :name="dq.name"
              class="white-bold-name"
            ></dynamic-name>
          </selectable-button>
        </dynamic-grid>
      </van-collapse-item>
    </van-collapse>

    <da-qi-item
      class="margin-top-m"
      v-for="dq in selectedDq"
      :code="dq.code"
      :key="dq.code"
    ></da-qi-item>
  </div>
</template>

<style scoped lang="less"></style>
