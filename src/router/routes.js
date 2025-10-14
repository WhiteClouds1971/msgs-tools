import Layout from '@/components/Layout/Layout.vue';
import index from '@/pages/index.js';

const constantRoutes = [
  {
    name: 'root',
    path: '/',
    component: Layout,
    children: index,
  },
];

export default constantRoutes;
