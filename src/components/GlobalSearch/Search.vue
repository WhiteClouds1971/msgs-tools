<template>
  <div>
    <van-sticky>
      <div class="padding-x-m" style="background-color: white">
        <van-search
          class="flex-full"
          ref="searchRef"
          v-model="keyword"
          placeholder="请输入汉字、拼音或拼音首字母"
          shape="round"
          @search="onSearch"
          @cancel="onCancel"
          show-action
        />
      </div>
    </van-sticky>

    <van-list>
      <search-item-display
        v-for="(item, i) in filteredList"
        :key="`${i}-${item.type}-${item.code}`"
        :displayItem="item"
        :keyword="keyword"
        @done="onCancelClick"
      />
      <van-empty
        v-if="keyword && filteredList.length === 0"
        description="无匹配结果"
      />
    </van-list>
  </div>
</template>

<script setup>
  import { ref, nextTick, watch } from 'vue';
  import BiaoJi from '@/assets/constants/BiaoJi.js';
  import SearchItemDisplay from '@/components/GlobalSearch/SearchItemDisplay.vue';
  import { Common, Heroes } from '@/assets/constants/Menus.js';
  import DaQi from '@/assets/constants/DaQi.js';
  import YinYang from '@/assets/constants/YinYang.js';
  import { convertChineseToPinyin } from '@/util/pinYin.js';
  import { searchItemsByKeyword } from '@/util/search.js';
  import Fuse from 'fuse.js';
  import cunGuiText from '/Doc/CunGui.md?url&raw';
  import douDiZhuText from '/Doc/DouDiZhu.md?url&raw';
  import paiWeiText from '/Doc/PaiWei.md?url&raw';
  import qaText from '/Doc/QA.md?url&raw';
  import { v4 } from 'uuid';
  import { mdToHtml } from '@/plugins/marked.js';
  import { shuffleWithSeed } from '@/util/random.js';
  import { useVoiceStore } from '@/stores/voiceStore.js';

  const voiceStore = useVoiceStore();
  const emits = defineEmits(['cancel']);
  const props = defineProps({
    showSearch: false,
  });

  const keyword = ref('');
  const searchRef = ref(null);
  const filteredList = ref([]);
  let dataSource = [];

  const onCancelClick = e => {
    emits('cancel');
  };

  const shuffled = (array, seed) => {
    const result = [...array];

    // 分离 QA 和非 QA
    const normal = [];
    const qa = [];
    for (const item of result) {
      if (item.type === 'QA') {
        qa.push(item);
      } else {
        normal.push(item);
      }
    }

    // 合并：非 QA 在前，QA 在后
    return [...shuffleWithSeed(normal, seed), ...qa];
  };

  const generateDataSource = () => {
    const tempData = [];
    // 组装标记
    tempData.push(
      ...BiaoJi.filter(it => !it.hidden).map(it => {
        const searchKeyword =
          it.searchKeyword || [it.name, ...(it.tags || [])].join('、');
        return {
          code: it.code,
          name: it.name,
          keyword: searchKeyword,
          tags: it.tags,
          type: 'BJ',
          typeName: '标记',
          sourceData: it,
          ...convertChineseToPinyin(searchKeyword),
        };
      })
    );
    // 组装辅助工具
    tempData.push(
      ...Common.filter(it => !it.hidden).map(it => {
        const searchKeyword =
          it.searchKeyword || [it.name, ...(it.tags || [])].join('、');
        return {
          code: it.code,
          name: it.name,
          keyword: searchKeyword,
          tags: it.tags,
          type: 'GJ',
          typeName: '工具',
          sourceData: it,
          ...convertChineseToPinyin(searchKeyword),
        };
      })
    );
    // 组装武将
    tempData.push(
      ...Heroes.filter(it => !it.hidden).map(it => {
        const searchKeyword =
          it.searchKeyword || [it.name, ...(it.tags || [])].join('、');
        return {
          code: it.code,
          name: it.name,
          keyword: searchKeyword,
          tags: it.tags,
          type: 'WJ',
          typeName: '武将',
          sourceData: it,
          ...convertChineseToPinyin(searchKeyword),
        };
      })
    );
    // 组装大旗
    tempData.push(
      ...DaQi.filter(it => !it.hidden).map(it => {
        const searchKeyword =
          it.searchKeyword || [it.name, ...(it.tags || [])].join('、');
        return {
          code: it.code,
          name: it.name,
          keyword: searchKeyword,
          tags: it.tags,
          type: 'DQ',
          typeName: '大旗',
          sourceData: it,
          ...convertChineseToPinyin(searchKeyword),
        };
      })
    );
    // 组装转换技
    tempData.push(
      ...YinYang.filter(it => !it.hidden).map(it => {
        const searchKeyword =
          it.searchKeyword || [it.name, ...(it.tags || [])].join('、');
        return {
          code: it.code,
          name: it.name,
          keyword: searchKeyword,
          tags: it.tags,
          type: 'ZH',
          typeName: '阴阳',
          sourceData: it,
          ...convertChineseToPinyin(searchKeyword),
        };
      })
    );
    // 组装村规
    const cunGuiParagraphs = cunGuiText
      .split('\r\n')
      .map(
        p =>
          mdToHtml(p.trim() || '')
            ?.replace(/<[^>]*>/g, '')
            ?.trim() || ''
      )
      .filter(p => p.length > 0)
      .map(p => {
        return (
          mdToHtml(p || '')
            ?.replace(/<[^>]*>/g, '')
            ?.trim() || ''
        );
      });
    tempData.push(
      ...cunGuiParagraphs.map(it => ({
        hidden: true,
        code: v4(),
        name: null,
        keyword: it,
        tags: null,
        type: 'QA',
        typeName: '村规',
        sourceData: it,
        ...convertChineseToPinyin(it),
      }))
    );
    // 组装斗地主
    const douDiZhuParagraphs = douDiZhuText
      .split('\r\n')
      .map(
        p =>
          mdToHtml(p.trim() || '')
            ?.replace(/<[^>]*>/g, '')
            ?.trim() || ''
      )
      .filter(p => p.length > 0);
    tempData.push(
      ...douDiZhuParagraphs.map(it => ({
        hidden: true,
        code: v4(),
        name: null,
        keyword: it,
        tags: null,
        type: 'QA',
        typeName: '地主',
        sourceData: it,
        ...convertChineseToPinyin(it),
      }))
    );
    // 组装团战
    const paiWeiParagraphs = paiWeiText
      .split('\r\n')
      .map(
        p =>
          mdToHtml(p.trim() || '')
            ?.replace(/<[^>]*>/g, '')
            ?.trim() || ''
      )
      .filter(p => p.length > 0);
    tempData.push(
      ...paiWeiParagraphs.map(it => ({
        hidden: true,
        code: v4(),
        name: null,
        keyword: it,
        tags: null,
        type: 'QA',
        typeName: '团战',
        sourceData: it,
        ...convertChineseToPinyin(it),
      }))
    );
    // 组装QA
    const qaParagraphs = qaText
      .split('\r\n')
      .map(
        p =>
          mdToHtml(p.trim() || '')
            ?.replace(/<[^>]*>/g, '')
            ?.trim() || ''
      )
      .filter(p => p.length > 0);
    tempData.push(
      ...qaParagraphs.map(it => ({
        hidden: true,
        code: v4(),
        name: null,
        keyword: it,
        tags: null,
        type: 'QA',
        typeName: '问答',
        sourceData: it,
        ...convertChineseToPinyin(it),
      }))
    );
    dataSource.push(...shuffled(tempData, 12345));
  };
  generateDataSource();

  // Fuse.js 配置：同时搜索 text / pinyin / acronym
  const fuse = new Fuse(dataSource, {
    keys: ['keyword', 'pinyin', 'acronym'],
    threshold: 0.3, // 模糊匹配容忍度
    includeScore: true,
    useExtendedSearch: false,
  });

  const debouncedFilteredList = () => {
    if (!keyword.value.trim()) {
      filteredList.value = dataSource.filter(it => !it?.hidden);
      return;
    }
    filteredList.value = searchItemsByKeyword(keyword.value, fuse);
  };

  debouncedFilteredList();

  watch(
    () => keyword.value,
    newValue => {
      debouncedFilteredList();
    }
  );

  const onSearch = () => {};

  const onCancel = () => {
    voiceStore.playFromSystem(['$#click']);
    onCancelClick();
  };

  watch(
    () => props.showSearch,
    newValue => {
      if (newValue) {
        // 自动聚焦
        nextTick(() => {
          const input = searchRef.value?.$el.querySelector('input');

          if (input) {
            input.focus();
            keyword.value = '';
          }
        });
      }
    }
  );
  onMounted(() => {
    nextTick(() => {
      const input = searchRef.value?.$el.querySelector('input');

      if (input) {
        input.focus();
        keyword.value = '';
      }
    });
  });
</script>

<style lang="less" scoped></style>
