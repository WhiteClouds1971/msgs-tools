<script setup>
  import { randomColor } from '@/util/random.js';
  import { useVoiceStore } from '@/stores/voiceStore.js';

  const props = defineProps({
    yinYang: Object,
  });

  const voiceStore = useVoiceStore();

  const data = reactive({
    currentSkillCode: props.yinYang.skills[0].code,
    skills: props.yinYang.skills,
  });

  const currentSkill = computed(() => {
    return props.yinYang.skills.find(s => s.code === data.currentSkillCode);
  });

  const emit = defineEmits(['update:modelValue']); // 定义 emit 事件

  const onClick = () => {
    const index = data.skills.findIndex(s => s.code === data.currentSkillCode);
    const nextIndex = (index + 1) % data.skills.length;
    data.currentSkillCode = data.skills[nextIndex].code;
    if (data.skills[nextIndex]?.voiceCodes?.length > 0) {
      voiceStore.playByCodes(data.skills[nextIndex]?.voiceCodes);
    }
    emit('update:modelValue', data.currentSkillCode);
  };
</script>

<template>
  <div class="wrapper-333">
    <div class="head">
      <div>
        <van-popover v-if="yinYang.info" placement="right">
          <div style="padding: 4px" class="info-text">
            <div v-html="yinYang.info"></div>
          </div>
          <template #reference>
            <van-icon name="info-o" class="info" />
          </template>
        </van-popover>
      </div>
      <div class="title">{{ yinYang.name }}</div>
      <div class="height-100 flex-column">
        <van-tag
          v-if="yinYang.tags"
          class="margin-left-xs"
          v-for="(tag, index) in yinYang.tags"
          :key="index"
          :color="randomColor(tag)"
        >
          {{ tag }}
        </van-tag>
      </div>
    </div>
    <div class="wrapper">
      <div class="des-wrapper">
        <van-highlight
          :keywords="currentSkill.keywords"
          :source-string="props.yinYang.text"
        />
      </div>
      <div class="cover-wrapper" @click="onClick">
        <van-image
          round
          :src="currentSkill.cover"
          width="2.5cm"
          height="2.5cm"
        ></van-image>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .wrapper-333 {
    background-color: #fff;
    box-sizing: border-box; /* 添加此行 */
    padding: 8px;
  }

  .head {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'YouYuan', sans-serif; /* 使用浏览器自带的更简洁字体 */
    height: 41px;
    font-size: 25px;
    line-height: 25px;
    text-align: center;
  }

  .info {
    color: #3967ff;
  }

  .info-text {
    font-size: 12px;
    background-color: #93a25e;
  }

  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .des-wrapper .cover-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .des-wrapper {
      font-size: 12px;
      padding: 8px;
    }
  }
</style>
