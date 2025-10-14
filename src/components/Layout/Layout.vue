<script setup>
  import { ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import GlobalSearch from '@/components/GlobalSearch/Index.vue';
  import VoiceDashboard from '@/components/Voice/Index.vue';

  const route = useRoute();
  const router = useRouter();

  const tabs = ref([{ path: '/', title: '菜单', name: 'Menus' }]);

  const addTab = toRoute => {
    const { path, meta, name } = toRoute;
    const title = meta.title || name || path;

    if (!tabs.value.some(tab => tab.path === path)) {
      tabs.value.push({
        path,
        title,
        name: name || path,
      });
    }
  };

  const removeTab = path => {
    const index = tabs.value.findIndex(tab => tab.path === path);
    if (index !== -1) {
      tabs.value.splice(index, 1);

      if (route.path === path) {
        let newPath = '/';
        if (tabs.value.length > 0) {
          // 跳转到前一个（或最后一个）
          newPath =
            index > 0
              ? tabs.value[index - 1].path
              : tabs.value[tabs.value.length - 1].path;
        }
        nextTick(() => {
          router.push(newPath);
        });
      }
    }
  };

  watch(
    () => route.path,
    newPath => {
      if (!tabs.value.some(tab => tab.path === newPath)) {
        addTab(route);
      }
    },
    { immediate: true }
  );

  const onClickLeft = () => {
    router.push('/');
  };

  const onClickRight = () => {
    router.push('/QA');
  };
</script>

<template>
  <van-nav-bar
    :title="route.meta.title || route.name"
    @click-left="onClickLeft"
    @click-right="onClickRight"
    fixed
    placeholder
  >
    <template #left>
      <van-icon name="home-o" size="24" />
    </template>

    <template #title>
      <GlobalSearch></GlobalSearch>
    </template>
    <template #right>
      <van-icon name="info-o" size="24" />
    </template>
  </van-nav-bar>

  <van-tabs
    :active="route.path"
    :swipeable="true"
    :ellipsis="false"
    @click-tab="({ name }) => router.push(name)"
  >
    <van-tab
      v-for="tab in tabs"
      :key="tab.path"
      :title="tab.title"
      :name="tab.path"
    >
      <template #title>
        <span>{{ tab.title }}</span>
        <van-icon
          v-if="tab.name !== 'Menus'"
          name="cross"
          size="12"
          style="vertical-align: middle"
          class="margin-left-xs"
          @click.stop="removeTab(tab.path)"
        />
      </template>
    </van-tab>
  </van-tabs>

  <div class="main">
    <router-view v-slot="{ Component }">
      <transition name="tab-fade" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>

  <voice-dashboard></voice-dashboard>
</template>

<style lang="less" scoped>
  .main {
    background-color: #f7f8fa;
    height: calc(100vh - 46px - 44px - 50px);
    padding: 14px 10px;
    box-sizing: border-box;
    overflow: auto;
  }
  .tab-fade-enter-active,
  .tab-fade-leave-active {
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  .tab-fade-enter-from {
    opacity: 0;
    transform: translateX(20px);
  }

  .tab-fade-leave-to {
    opacity: 0;
    transform: translateX(-20px);
  }

  :deep(.van-tabs__line) {
    z-index: 0;
  }
</style>
