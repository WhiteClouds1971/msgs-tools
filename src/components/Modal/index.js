import emitter from '@/util/emitter.js';
import { defineAsyncComponent, shallowRef } from 'vue';

export const useModal = () => {
  return {
    open: view => {
      // 预处理
      view.component = shallowRef(defineAsyncComponent(view.component));
      emitter.emit('bus_openModal', view);
    },
    update: view => {
      emitter.emit('bus_updateModal', view);
    },
    close: () => {
      emitter.emit('bus_closeModal');
    },
  };
};
