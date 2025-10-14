import { Tags } from '@/assets/constants/Tags.js';
import { Tag } from 'vant';

export default [
  {
    code: 'TongYong',
    name: '通用',
    qty: 0,
  },
  {
    code: 'LunCi',
    name: '轮次',
    qty: 1,
  },
  {
    code: 'XuLi',
    name: '蓄力',
    qty: 0,
    tags: [Tags.M, '蓄力点'],
  },
  {
    code: 'ShouPai',
    name: '手牌',
    qty: 0,
    tags: ['手牌上限', '手牌上限+'],
  },
  {
    code: 'FanWei',
    name: '范围',
    qty: 0,
    tags: ['攻击范围'],
  },
  {
    code: 'Ren',
    name: '忍',
    qty: 0,
    tags: [Tags.M, '神司马'],
    hidden: true,
  },
  {
    code: 'HuoJi',
    name: '火计',
    qty: 0,
    tags: [Tags.M, '谋诸葛亮'],
    hidden: true,
  },
  {
    code: 'SongWei',
    name: '颂威',
    qty: 0,
    qtyMax: 9,
    tags: [Tags.M, '谋曹丕'],
    hidden: true,
  },
  {
    code: 'ZhuZhao',
    name: '铸造',
    qty: 0,
    tags: [Tags.M, '张奋'],
    hidden: true,
  },
];
