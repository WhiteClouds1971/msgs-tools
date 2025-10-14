import { Tags } from '@/assets/constants/Tags.js';

export default {
  JsrgLiuBei: {
    code: 'JsrgLiuBei',
    name: '起刘备',
    package: 'heroes.jsrg',
    voices: [
      {
        name: '积善',
        code: '$jishan:1',
        text: '勿以善小而不为。',
      },
      {
        name: '积善',
        code: '$jishan:2',
        text: '积善成德，而神明自得。',
      },
      {
        name: '振鞘',
        code: '$zhenqiao:1',
        text: '豺狼满朝，且看我剑出鞘。',
      },
      {
        name: '振鞘',
        code: '$zhenqiao:2',
        text: '欲信大义，此剑一匡天下。',
      },
      {
        name: Tags.VoiceZhengWang,
        code: '$~js__liubei',
        text: '大义未信，唯念黎庶之苦……',
      },
    ],
  },
};
