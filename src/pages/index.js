import common from '@/pages/Common/index.js';
import heroes from '@/pages/Heroes/index.js';

export default [
  {
    name: 'Menus',
    path: '',
    component: () => import('./Menus/Index.vue'),
    meta: {
      title: '菜单',
    },
  },
  {
    name: 'Demo',
    path: '/demo',
    component: () => import('./Demo.vue'),
    meta: {
      title: 'Demo',
    },
  },
]
  .concat(common)
  .concat(heroes);
