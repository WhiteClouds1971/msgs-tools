<template>
  <div>
    <div
      class="voice-dashboard flex-row flex-align-center flex-justify-between"
    >
      <!-- 当前台词（可点击打开列表） -->
      <van-notice-bar
        class="flex-full voice-text"
        :scrollable="isPlaying ? null : false"
        :text="currentText || '点击搜索台词'"
        @click="
          () => {
            showScript = true;
          }
        "
      >
        <template #left-icon>
          <div class="flex-row flex-center height-100" @click.stop="toggleMute">
            <van-icon
              class="iconfont icon margin-right-s"
              size="16"
              :class="isMute ? 'icon-guanbishengyin' : 'icon-zuidayinliang'"
            ></van-icon>
          </div>
        </template>
      </van-notice-bar>

      <div class="operator-container flex-row flex-align-center">
        <div
          class="playing flex-row flex-center"
          :class="{ 'is-playing': isPlaying }"
          @click="togglePlayPause"
        >
          <van-icon size="25" :name="isPlaying ? 'pause' : 'play'" />
        </div>

        <van-icon
          @click="cyclePlayMode"
          size="30"
          class="iconfont icon margin-left-s"
          :class="getIconName()"
        />
      </div>
    </div>

    <van-popup
      v-model:show="showScript"
      position="bottom"
      :style="{ height: '80%' }"
      teleport="#app"
    >
      <voice-display
        :showScript="showScript"
        @cancel="showScript = false"
      ></voice-display>
    </van-popup>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue';
  import { useVoiceStore } from '@/stores/voiceStore';
  import { allVoicesMap } from '@/assets/constants/Voice/index.js';
  import VoiceDisplay from '@/components/Voice/VoiceDisplay.vue';

  const store = useVoiceStore();

  const isPlaying = computed(() => store.isPlaying);
  const isMute = computed(() => store.isMute);
  const currentVoiceCode = computed(() => store.currentVoiceCode);
  const playMode = computed(() => store.playMode);

  const showScript = ref(false);

  const currentText = computed(() => {
    return allVoicesMap[currentVoiceCode.value]?.text || '';
  });

  // 循环切换播放模式
  const cyclePlayMode = () => {
    const modes = ['sequence', 'random', 'single'];
    const currentIndex = modes.indexOf(playMode.value);
    const nextIndex = (currentIndex + 1) % modes.length;
    store.setPlayMode(modes[nextIndex]);
  };

  // 获取对应图标名称
  const getIconName = () => {
    switch (playMode.value) {
      case 'sequence':
        return 'icon-liebiaoxunhuan'; // 顺序播放
      case 'random':
        return 'icon-suijibofang'; // 随机播放
      case 'single':
        return 'icon-danquxunhuan'; // 单曲循环
      default:
        return 'icon-liebiaoxunhuan';
    }
  };

  // 播放控制
  const togglePlayPause = () => store.togglePlayPause();
  const toggleMute = () => {
    store.toggleMute();
  };
</script>

<style lang="less" scoped>
  .voice-dashboard {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    gap: 8px;
    padding: 8px 12px;
    background: white;
    border-top: 1px solid #f0f0f0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.08);
    height: 50px;

    .voice-text {
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .operator-container {
      .playing {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #f0f0f0;
        border: none;
      }

      .is-playing {
        background-color: #1989fa;
        color: white;
      }
    }
  }
</style>
