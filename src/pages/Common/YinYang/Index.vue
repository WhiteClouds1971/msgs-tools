<template>
  <div>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item>
        <dynamic-grid :fixed-columns="5">
          <selectable-button
            v-for="yy in validYinYang"
            :can-select="false"
            :key="yy.code"
            @click="add(yy)"
            :style="{ backgroundColor: randomColor(yy.code) }"
          >
            <dynamic-name
              :name="yy.name"
              class="white-bold-name"
            ></dynamic-name>
          </selectable-button>
        </dynamic-grid>
      </van-collapse-item>
    </van-collapse>
    <yin-yang-item
      class="margin-top-m"
      v-for="yy in selectedYinYang"
      :yin-yang="yy"
      :key="yy.code"
    />
  </div>
</template>

<script setup>
  import DynamicGrid from '@/components/UI/DynamicGrid.vue';
  import SelectableButton from '@/components/UI/SelectableButton.vue';
  import yinYang from '@/assets/constants/YinYang.js';
  import YinYangItem from '@/components/UI/YinYangItem.vue';
  import DynamicName from '@/components/UI/DynamicName.vue';
  import { ref } from 'vue';
  import { randomColor } from '@/util/random.js';
  import { useRoute } from 'vue-router';
  import { useVoiceStore } from '@/stores/voiceStore.js';

  const route = useRoute();
  const voiceStore = useVoiceStore();

  const activeName = ref(null);
  const validYinYang = reactive(yinYang.filter(it => !it.hidden));
  const selectedYinYang = reactive([]);

  const add = yy => {
    selectedYinYang.unshift(yy);
    if ((yy.voiceCodes || []).length > 0) {
      voiceStore.playByCodes(yy.voiceCodes);
    }
  };

  watch(
    () => route.query,
    nv => {
      const code = nv.code;
      if (code) {
        const yy = yinYang.find(it => it.code === code);
        if (yy) {
          add(yy);
        }
      }
    },
    { immediate: true }
  );
</script>

<style lang="less" scoped></style>
