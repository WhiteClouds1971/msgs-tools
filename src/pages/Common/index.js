export default [
  {
    name: 'TiLiKa',
    path: '/TiLiKa',
    component: () => import('./TiLiKa/Index.vue'),
    meta: {
      title: '体力卡',
    },
  },
  {
    name: 'YouXiPai',
    path: '/YouXiPai',
    component: () => import('@/pages/Common/YouXiPai/Index.vue'),
    meta: {
      title: '游戏牌',
    },
  },
  {
    name: 'BiaoJi',
    path: '/BiaoJi',
    component: () => import('@/pages/Common/BiaoJi/Index.vue'),
    meta: {
      title: '标记',
    },
  },
  {
    name: 'YinYang',
    path: '/YinYang',
    component: () => import('@/pages/Common/YinYang/Index.vue'),
    meta: {
      title: '阴阳',
    },
  },
  {
    name: 'DaQi',
    path: '/DaQi',
    component: () => import('@/pages/Common/DaQi/Index.vue'),
    meta: {
      title: '大旗',
    },
  },
  {
    name: 'ShiLiKa',
    path: '/ShiLiKa',
    component: () => import('@/pages/Common/ShiLiKa/Index.vue'),
    meta: {
      title: '势力卡',
    },
  },
  {
    name: 'JiLuShuZi',
    path: '/JiLuShuZi',
    component: () => import('@/pages/Common/JiLuShuZi/Index.vue'),
    meta: {
      title: '记录数字/座次',
    },
  },
  {
    name: 'JiLuHuaSe',
    path: '/JiLuHuaSe',
    component: () => import('@/components/UI/JiLuHuaSe.vue'),
    meta: {
      title: '记录花色',
    },
  },
  {
    name: 'JiLuLeiXing',
    path: '/JiLuLeiXing',
    component: () => import('@/components/UI/JiLuLeiXing.vue'),
    meta: {
      title: '记录类型',
    },
  },
  {
    name: 'JiLuDianSu',
    path: '/JiLuDianSu',
    component: () => import('@/components/UI/JiLuDianSu.vue'),
    meta: {
      title: '记录点数',
    },
  },
  {
    name: 'MouYi',
    path: '/MouYi',
    component: () => import('@/pages/Common/MouYi/Index.vue'),
    meta: {
      title: '谋奕',
    },
  },
  {
    name: 'QA',
    path: '/QA',
    component: () => import('@/pages/Common/QA/Index.vue'),
    meta: {
      title: 'QA',
    },
  },
];
