<template>
  <div>
    <van-sticky>
      <div class="padding-x-m" style="background-color: white">
        <van-search
          class="flex-full"
          ref="searchRef"
          v-model="keyword"
          placeholder="请输入汉字、拼音或拼音首字母"
          shape="round"
          @cancel="onCancel"
          @search="() => {}"
        />
      </div>
    </van-sticky>

    <voice-display-with-search
      v-show="keyword"
      :keyword="keyword"
      @cancel="onCancel"
    ></voice-display-with-search>
    <voice-display-with-collection
      v-show="!keyword"
      @cancel="onCancel"
    ></voice-display-with-collection>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import VoiceDisplayWithCollection from '@/components/Voice/VoiceDisplayWithCollection.vue';
  import VoiceDisplayWithSearch from '@/components/Voice/VoiceDisplayWithSearch.vue';

  const emits = defineEmits(['cancel']);
  const props = defineProps({
    showScript: false,
  });

  const keyword = ref('');
  const searchRef = ref(null);

  watch(
    () => props.showScript,
    nv => {
      if (nv) {
        keyword.value = '';
      }
    }
  );

  const onCancel = () => {
    emits('cancel');
  };
</script>

<style scoped lang="less">
  :deep(.van-search__action) {
    font-weight: var(--van-font-bold);
  }
  :deep(.van-field__left-icon) {
    color: #1989fa !important;
  }
</style>
