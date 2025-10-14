<template>
  <van-dialog
    v-model:show="visible"
    v-bind="state.view.modal"
    @confirm="ok"
    @cancel="cancel"
    :before-close="beforeClose"
  >
    <component
      ref="componentRef"
      v-if="state.view.component"
      :is="state.view.component"
      v-bind="state.view.props"
      :style="state.view.style"
    ></component>
  </van-dialog>
</template>

<script setup>
  import _assign from 'lodash/merge';
  import emitter from '@/util/emitter.js';
  import { ref, reactive, onMounted, onBeforeUnmount, watch } from 'vue';
  import { useRoute } from 'vue-router';

  const visible = ref(false);
  const route = useRoute();
  const componentRef = ref(null);
  const state = reactive({
    view: {
      modal: {},
      component: null,
      props: null,
    },
  });

  const ok = () => {
    const ok = state.view.ok || componentRef.value.ok;
    if (ok) {
      ok();
    }
  };

  const cancel = () => {
    const cancel = state.view.cancel || componentRef.value.cancel;
    if (cancel) {
      cancel();
    }
  };

  const beforeClose = () => {
    const beforeClose =
      state.view.beforeClose || componentRef.value.beforeClose;
    if (beforeClose) {
      return beforeClose();
    }
    return true;
  };

  const init = () => {
    state.view = {
      modal: {
        width: '320px',
      },
      component: null,
      props: null,
    };
  };

  const openModal = view => {
    init();
    state.view = _assign({}, state.view, view);
    visible.value = view.visible || true;
  };
  const updateModal = viewOpt => {
    visible.value =
      viewOpt.visible === undefined || viewOpt.visible === null
        ? true
        : viewOpt.visible;
    state.view = _assign({}, state.view, viewOpt);
  };
  const closeModal = () => {
    visible.value = false;
  };

  onMounted(() => {
    emitter.on('bus_openModal', openModal);
    emitter.on('bus_updateModal', updateModal);
    emitter.on('bus_closeModal', closeModal);

    console.log('SModal Ready!', JSON.parse(JSON.stringify(emitter)));
  });
  onBeforeUnmount(() => {
    emitter.off('bus_openModal', openModal);
    emitter.off('bus_updateModal', updateModal);
    emitter.off('bus_closeModal', closeModal);
  });
  watch(
    () => route.name,
    () => {
      closeModal();
    }
  );
</script>

<style lang="less"></style>
