<!--&lt;!&ndash; App.vue &ndash;&gt;-->
<!--<template>-->
<!--  <div id="app">-->
<!--    <h2>语音测试页面</h2>-->
<!--    <van-button @click="() => $playVoice()">播放当前集</van-button>-->
<!--    <van-button @click="() => $playVoice(['greet_01', 'fight_02'])">-->
<!--      随机播放指定-->
<!--    </van-button>-->
<!--    <van-button @click="switchToCollection('collection1')">-->
<!--      切换到问候-->
<!--    </van-button>-->
<!--    <van-button @click="switchToCollection('collection2')">-->
<!--      切换到战斗-->
<!--    </van-button>-->

<!--    <VoiceDashboard />-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--  import { useVoiceStore } from '@/stores/voiceStore';-->
<!--  import VoiceDashboard from '@/components/Voice/Index.vue';-->

<!--  const store = useVoiceStore();-->

<!--  const switchToCollection = key => {-->
<!--    store.currentCollection = key;-->
<!--    store.switchCollection();-->
<!--  };-->
<!--</script>-->

<template>
  <div>
    <div class="voice-dashboard flex-row flex-align-center">
      <!-- 播放/暂停 -->
      <van-button
        round
        :class="{ 'is-playing': isPlaying }"
        @click="togglePlayPause"
      >
        <van-icon size="24" :name="isPlaying ? 'pause' : 'play'" />
      </van-button>

      <!--      &lt;!&ndash; 当前台词（可点击打开列表） &ndash;&gt;-->
      <!--      <div class="voice-text" @click="showScript = true">-->
      <!--        {{ currentText || '点击播放语音' }}-->
      <!--      </div>-->

      <!--      &lt;!&ndash; 模式切换按钮（合并成一个，自动循环） &ndash;&gt;-->
      <!--      <van-button-->
      <!--        round-->
      <!--        size="small"-->
      <!--        @click="cyclePlayMode"-->
      <!--        :class="{ 'active-mode': playMode === 'sequence' }"-->
      <!--        title="切换播放模式"-->
      <!--      >-->
      <!--        <van-icon :name="getIconName()" />-->
      <!--      </van-button>-->
    </div>
    <!--    <van-popup-->
    <!--      v-model:show="showScript"-->
    <!--      position="bottom"-->
    <!--      :style="{ height: '60%' }"-->
    <!--      round-->
    <!--    >-->
    <!--      <van-nav-bar-->
    <!--        title="全部语音"-->
    <!--        left-text="关闭"-->
    <!--        @click-left="showScript = false"-->
    <!--      />-->
    <!--      <van-cell-group inset>-->
    <!--        <van-cell-->
    <!--          v-for="(voice, index) in currentVoices"-->
    <!--          :key="voice.code"-->
    <!--          :title="voice.text"-->
    <!--          clickable-->
    <!--          :class="{ 'current-playing': index === currentPlayIndex }"-->
    <!--          @click="playByIndex(index)"-->
    <!--        />-->
    <!--      </van-cell-group>-->
    <!--    </van-popup>-->
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useVoiceStore } from '@/stores/voiceStore';

  const store = useVoiceStore();

  const isPlaying = computed(() => store.isPlaying);
  const currentVoices = computed(() => store.currentVoices);
  const currentPlayIndex = computed(() => store.currentPlayIndex);
  const playMode = computed(() => store.playMode);

  const currentText = computed(() => {
    return currentVoices.value[currentPlayIndex.value]?.text || '';
  });

  const showScript = ref(false);

  // 播放控制
  const togglePlayPause = () => store.togglePlayPause();

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
        return 'list'; // 顺序播放
      case 'random':
        return 'exchange'; // 随机播放
      case 'single':
        return 'replay'; // 单曲循环
      default:
        return 'list';
    }
  };

  // 打开台词列表
  const openScript = () => {
    showScript.value = true;
  };

  const playByIndex = index => {
    store.playByIndex(index);
    showScript.value = false;
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
    height: 60px;

    .is-playing {
      background-color: #1989fa;
      color: white;
    }
  }

  /*.voice-text {
  flex: 1;
  font-size: 13px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 8px;
  border-radius: 12px;
  background: #f8f8f8;
  cursor: pointer;
  transition: background 0.2s;
}

.voice-text:hover {
  background: #eee;
}

 .voice-dashboard .van-button {
   width: 36px;
   height: 36px;
   padding: 0;
   display: flex;
   align-items: center;
   justify-content: center;
 }



 .voice-dashboard .active-mode {
   background-color: #e6f7ff;
   color: #1989fa;
   border-color: #1989fa;
 }*/
</style>
