<template>
  <div>
    <van-list>
      <search-result-item
        v-for="(voice, i) in filteredList"
        :key="`${i}-${voice.code}`"
        :voice="voice"
        :keyword="keyword"
        @done="onCancel"
      />
      <van-empty
        v-if="keyword && filteredList.length === 0"
        description="无匹配结果"
      />
    </van-list>
  </div>
</template>

<script setup>
  import {
    searchVoices,
    voiceCollections,
  } from '@/assets/constants/Voice/index.js';
  import { ref, watch } from 'vue';
  import { searchItemsByKeyword } from '@/util/search.js';
  import Fuse from 'fuse.js';
  import { convertChineseToPinyin } from '@/util/pinYin.js';
  import SearchResultItem from '@/components/Voice/SearchResultItem.vue';
  import { Tags } from '@/assets/constants/Tags.js';

  const emits = defineEmits(['cancel']);

  const props = defineProps({
    keyword: String,
  });

  const filteredList = ref([]);
  let dataSource = [];

  const generateDataSource = () => {
    dataSource = searchVoices.map(it => {
      const searchKeyword = [
        voiceCollections[it.collectionKey]?.name,
        it.name === Tags.VoiceZhengWang ? '' : it.name,
        it.text,
      ].join('、');

      return {
        ...it,
        keyword: searchKeyword,
        ...convertChineseToPinyin(searchKeyword),
      };
    });
  };
  generateDataSource();

  const fuse = new Fuse(dataSource, {
    keys: ['keyword', 'pinyin', 'acronym'],
    threshold: 0.3, // 模糊匹配容忍度
    includeScore: true,
    useExtendedSearch: false,
  });

  const debouncedFilteredList = () => {
    if (!props.keyword.trim()) {
      return;
    }
    filteredList.value = searchItemsByKeyword(props.keyword, fuse);
  };
  debouncedFilteredList();

  watch(
    () => props.keyword,
    newValue => {
      debouncedFilteredList();
    }
  );

  const onCancel = () => {
    emits('cancel');
  };
</script>

<style lang="scss" scoped></style>
