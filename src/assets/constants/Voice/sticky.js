import { Tags } from '@/assets/constants/Tags.js';

const StickyCollections = {
  name: '常驻语音',
  package: 'sticky',
  voices: [
    {
      code: '$#wine',
      text: '🍷🍷🍷 酒杯 ！！！',
      tags: [Tags.VoiceChangZhu],
    },
    {
      code: '$#sock',
      text: '拖鞋 ！！！',
      url: '/Voices/Sticky/sock.mp3',
      tags: [Tags.VoiceChangZhu],
    },
    {
      code: '$#wanjunqushou',
      text: '无双 万军取首！',
      tags: [Tags.VoiceChangZhu],
    },
  ],
};

export { StickyCollections };
