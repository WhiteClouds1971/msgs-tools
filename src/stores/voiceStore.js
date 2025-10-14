import { defineStore } from 'pinia';
import {
  voiceCollections,
  allVoicesMap,
  STICKY_COLLECTION_KEY,
} from '@/assets/constants/Voice/index.js';

const _getVoiceUrl = voice => {
  const packageUrl = voice?.package?.split('.')?.join('/');

  let code = voice.code;
  let codeUrl = null;
  code = code.substring(1);
  if (code.startsWith('~')) {
    codeUrl = 'death/' + code.substring(1);
  } else if (code.startsWith('#')) {
    codeUrl = code.substring(1);
  } else {
    codeUrl = 'skill/' + code.split(':').join('');
  }

  if (!packageUrl || !codeUrl) {
    return '';
  }
  return ['/Voices', packageUrl, codeUrl + '.mp3'].join('/');
};

const _playSingle = (voice, state, actions) => {
  if (state.currentAudio) {
    state.currentAudio.pause();
  }

  const audio = new Audio(_getVoiceUrl(voice));
  state.currentAudio = audio;
  state.isPlaying = true;

  state.currentVoiceCode = voice.code;

  audio.play().catch(e => {
    state.isPlaying = false;
  });

  audio.onended = () => {
    state.isPlaying = false;
  };

  audio.onerror = () => {
    state.isPlaying = false;
  };
};

export const useVoiceStore = defineStore('voice', {
  state: () => ({
    defaultInitVoiceCodes: ['$#wine'],
    currentCollectionKey: null, // 当前选中的非 sticky 集合 key
    currentVoiceCode: null, // 当前播放语音的code
    currentVoices: [], // 当前播放列表（不含 sticky，除非由 codes 触发）
    isPlaying: false,
    isMute: false,
    playMode: 'random', // 'sequence' | 'random' | 'single'
    currentAudio: null, // HTMLAudioElement
  }),

  getters: {
    currentAllVoices(state) {
      return [
        ...voiceCollections[STICKY_COLLECTION_KEY].voices,
        ...(voiceCollections[state.currentCollectionKey]?.voices ?? []),
      ];
    },
  },

  actions: {
    // 切换到指定语音集（不能切换到 sticky）
    switchCollection(collectionKey) {
      if (collectionKey === STICKY_COLLECTION_KEY) return;

      this.currentCollectionKey = collectionKey;
      const col = voiceCollections[collectionKey];
      this.currentVoices = col.voices ?? [];
    },

    // 根据 codes 播放（可包含 sticky 语音）
    playByCodes(codes) {
      if (this.isMute) return;

      const validVoices = codes.map(code => allVoicesMap[code]).filter(Boolean);

      if (validVoices.length === 0) return;

      this.switchCollection(validVoices[0].collectionKey);

      const randomVoice =
        validVoices[Math.floor(Math.random() * validVoices.length)];
      _playSingle(randomVoice, this);
    },

    // 播放当前集合中的语音（不包含 sticky）
    playFromCurrentCollection() {
      if (this.isMute) return;

      let voices = this.currentVoices;

      let voice = null;

      if (this.playMode === 'sequence') {
        let index = voices.findIndex(it => it.code === this.currentVoiceCode);
        voice = voices[(index + 1) % voices.length];
      } else if (this.playMode === 'random') {
        voice = voices[Math.floor(Math.random() * voices.length)];
      } else if (this.playMode === 'single') {
        voice = allVoicesMap[this.currentVoiceCode];
      }

      voice = voice ?? allVoicesMap[this.currentVoiceCode];
      voice =
        voice ??
        allVoicesMap[
          this.defaultInitVoiceCodes[
            Math.floor(Math.random() * this.defaultInitVoiceCodes.length)
          ]
        ];

      _playSingle(voice, this);
    },

    toggleMute() {
      this.isMute = !this.isMute;
      if (this.isMute && this.currentAudio) {
        this.currentAudio.pause();
        this.isPlaying = false;
      }
    },

    setPlayMode(mode) {
      this.playMode = mode;
    },

    togglePlayPause() {
      if (this.isPlaying && this.currentAudio) {
        this.currentAudio.pause();
        this.isPlaying = false;
      } else {
        this.playFromCurrentCollection();
      }
    },
  },
});
