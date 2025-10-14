<template>
  <div>
    <van-cell
      v-for="(voice, index) in currentAllVoices"
      :key="voice.code"
      clickable
      :class="{ 'current-playing': voice.code === currentVoiceCode }"
      @click="playVoice(voice.code)"
    >
      <template #title>
        <div class="flex-row flex-align-center flex-justify-between">
          <div>
            <van-tag
              v-if="(tags(voice) || []).length > 0"
              v-for="(tag, index) in tags(voice)"
              :class="{
                'margin-right-xs': index < tags(voice).length - 1,
                'margin-right-s': index === tags(voice).length - 1,
              }"
              :key="index"
              :color="randomColor(tag)"
            >
              {{ tag }}
            </van-tag>
          </div>
          <div class="flex-full voice-text">{{ voice.text }}</div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { useVoiceStore } from '@/stores/voiceStore.js';

  import { voiceCollections } from '@/assets/constants/Voice/index.js';
  import { randomColor } from '@/util/random.js';

  const store = useVoiceStore();

  const emits = defineEmits(['cancel']);

  const currentCollectionKey = computed(() => store.currentCollectionKey);
  const currentVoiceCode = computed(() => store.currentVoiceCode);
  const currentAllVoices = computed(() => store.currentAllVoices);

  const tags = voice => {
    if (voice.tags?.length > 0) {
      return voice.tags;
    }
    return [voiceCollections[currentCollectionKey.value]?.name, voice.name];
  };

  const playVoice = code => {
    store.playByCodes([code]);
    emits('cancel');
  };
</script>

<style lang="less" scoped>
  .voice-text {
    max-width: calc(100vw - 32px - 24px);
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
    font-size: 14px;
  }

  :deep(.current-playing) {
    background-color: #e6f7ff; // 淡蓝色背景，表示当前播放项
    color: #1989fa; // 主题色文字
    font-weight: bold;

    // 可选：添加左侧竖条装饰
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color: #1989fa;
    }
  }
</style>
