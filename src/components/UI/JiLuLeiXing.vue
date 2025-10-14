<template>
  <div>
    <ji-lu :data-source="data.dataSource"></ji-lu>
  </div>
</template>

<script setup>
  import JiLu from '@/components/UI/JiLu/JiLu.vue';

  const data = reactive({
    dataSource: [
      {
        fixedColumns: 3,
        names: [
          {
            code: 'JiBenPai',
            label: '基本牌',
          },
          {
            code: 'JinNangPai',
            label: '锦囊牌',
          },
          {
            code: 'ZhuangBeiPai',
            label: '装备牌',
          },
        ],
      },
      {
        fixedColumns: 2,
        names: [
          {
            code: 'ShangHaiPai',
            label: '伤害牌',
          },
          {
            code: 'PuTongJinNangPai',
            label: '普通锦囊牌',
          },
          {
            code: 'YanShiJinNangPai',
            label: '延时锦囊牌',
          },
          {
            code: 'ShangHaiJinNangPai',
            label: '伤害锦囊牌',
          },
          {
            code: 'WuQiPai',
            label: '武器牌',
          },
          {
            code: 'FangJuPai',
            label: '防具牌',
          },
          {
            code: 'ZuoQiPai',
            label: '坐骑牌',
          },
          {
            code: 'BaoWuPai',
            label: '宝物牌',
          },
        ],
        collapse: {
          title: '扩展分类',
          use: true, // 使用折叠
          defaultCollapse: null, // 默认不展开
        },
      },
    ],
  });
</script>

<style lang="scss" scoped></style>
