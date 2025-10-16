import { Tags } from '@/assets/constants/Tags.js';

const YIN_COVER = '/YinYang/Yin.jpeg';
const YANG_COVER = '/YinYang/Yang.jpeg';
const PING_COVER = '/YinYang/Ping.png';
const ZE_COVER = '/YinYang/Ze.png';
const QI_COVER = '/YinYang/Qi.jpeg';
const ZHENG_COVER = '/YinYang/Zheng.jpeg';

export default [
  {
    code: 'TongYong',
    name: '通用',
    text: '转换技，阳：这是阳效果。阴：这是阴效果。',
    skills: [
      {
        cover: YANG_COVER,
        code: '通用-阳',
        keywords: ['阳：这是阳效果。'],
      },
      {
        cover: YIN_COVER,
        code: '通用-阴',
        keywords: ['阴：这是阴效果。'],
      },
    ],
    tags: ['转换技'],
  },
  {
    code: 'QiZheng',
    name: '奇正',
    text: '出牌阶段，对一名其他角色使用。你为其指定正兵或奇兵，然后其可以打出一张【杀】或【闪】。若奇兵目标没有打出【杀】，你对其造成1点伤害；若正兵目标没有打出【闪】，你获得其一张牌。',
    skills: [
      {
        cover: QI_COVER,
        code: '奇',
        keywords: ['若奇兵目标没有打出【杀】，你对其造成1点伤害；'],
      },
      {
        cover: ZHENG_COVER,
        code: '正',
        keywords: ['若正兵目标没有打出【闪】，你获得其一张牌。'],
      },
    ],
    tags: [Tags.M, '神荀彧', '必胜客'],
  },
  {
    code: 'ChengLue',
    name: '成略',
    text: '转换技，出牌阶段限一次，阳：你可以摸一张牌，然后弃置两张手牌。阴：你可以摸两张牌，然后弃置一张手牌。若如此做，直到本回合结束，你使用与弃置牌相同花色的牌无距离和次数限制。',
    skills: [
      {
        cover: YANG_COVER,
        code: '阳',
        keywords: ['阳：你可以摸一张牌，然后弃置两张手牌。'],
      },
      {
        cover: YIN_COVER,
        code: '阴',
        keywords: ['阴：你可以摸两张牌，然后弃置一张手牌。'],
      },
    ],
    tags: ['许攸'],
  },
  {
    code: 'JuQi',
    name: '举棋',
    text: '转换技，阳：准备阶段，你摸三张牌/其他角色的准备阶段，其可以展示并交给你一张黑色手牌；阴：准备阶段，你本回合使用牌无次数限制且伤害+1/其他角色的准备阶段，其可以展示并交给你一张红色手牌。',
    skills: [
      {
        cover: YANG_COVER,
        code: '阳',
        keywords: [
          '阳：准备阶段，你摸三张牌/其他角色的准备阶段，其可以展示并交给你一张黑色手牌；',
        ],
      },
      {
        cover: YIN_COVER,
        code: '阴',
        keywords: [
          '阴：准备阶段，你本回合使用牌无次数限制且伤害+1/其他角色的准备阶段，其可以展示并交给你一张红色手牌。',
        ],
      },
    ],
    tags: [Tags.JiuDing, '司马炎'],
  },
  {
    code: 'YouLong',
    name: '游龙',
    text: '转换技，阳：每轮限一次，你可以废除你装备区里的一个装备栏，视为使用一张未以此法使用过的普通锦囊牌；阴：每轮限一次，你可以废除你装备区里的一个装备栏，视为使用一张未以此法使用过的基本牌。',
    skills: [
      {
        cover: YANG_COVER,
        code: '阳',
        keywords: [
          '阳：每轮限一次，你可以废除你装备区里的一个装备栏，视为使用一张未以此法使用过的普通锦囊牌；',
        ],
      },
      {
        cover: YIN_COVER,
        code: '阴',
        keywords: [
          '阴：每轮限一次，你可以废除你装备区里的一个装备栏，视为使用一张未以此法使用过的基本牌。',
        ],
      },
    ],
    tags: [Tags.O, '龙凤'],
  },
  {
    code: 'ZiRuo',
    name: '自若',
    text: '转换技，锁定技，阳：当你使用最左侧的手牌时，你摸一张牌。阴：当你使用最右侧的手牌时，你摸一张牌。若如此做，你本回合不能整理手牌。',
    skills: [
      {
        cover: YANG_COVER,
        code: '阳',
        keywords: ['阳：当你使用最左侧的手牌时，你摸一张牌。'],
      },
      {
        cover: YIN_COVER,
        code: '阴',
        keywords: ['阴：当你使用最右侧的手牌时，你摸一张牌。'],
      },
    ],
    tags: [Tags.O, '蒋琬'],
  },
  {
    code: 'DongDao',
    name: '东道',
    text: '转换技，农民回合结束后，阳：你可以令地主执行一个额外回合。阴：其可以执行一个额外回合。',
    skills: [
      {
        cover: YANG_COVER,
        code: '阳',
        keywords: ['阳：你可以令地主执行一个额外回合。'],
      },
      {
        cover: YIN_COVER,
        code: '阴',
        keywords: ['阴：其可以执行一个额外回合。'],
      },
    ],
    tags: [Tags.O, '吕伯奢', '抓猪'],
  },
  {
    code: 'GuanGu',
    name: '观骨',
    text: '转换技，出牌阶段限一次，阳：你可以观看牌堆顶至多四张牌；阴：你可以观看一名角色至多四张手牌。然后你可以使用其中一张牌。',
    skills: [
      {
        cover: YANG_COVER,
        code: '阳',
        keywords: ['阳：你可以观看牌堆顶至多四张牌；'],
      },
      {
        cover: YIN_COVER,
        code: '阴',
        keywords: ['阴：你可以观看一名角色至多四张手牌。'],
      },
    ],
    tags: [Tags.O, '族钟琰'],
  },
  {
    code: 'BeiJia',
    name: '悲笳',
    info: '<b>韵律技</b>,一种特殊的转换技，分为"平"和"仄"两种状态。游戏开始时，韵律技处于"平"状态；满足"转韵"条件后，韵律技会转换到另一个状态，且重置技能发动次数',
    text: '韵律技，每回合限一次，平：你可以将一张点数大于X的牌当任意普通锦囊牌使用；仄：你可以将一张点数小于X的牌当任意基本牌使用；转韵：出牌阶段，使用一张点数等于X的牌（X为你使用的上一张牌的点数）。',
    skills: [
      {
        cover: PING_COVER,
        code: '平',
        keywords: ['平：你可以将一张点数大于X的牌当任意普通锦囊牌使用；'],
      },
      {
        cover: ZE_COVER,
        code: '仄',
        keywords: ['仄：你可以将一张点数小于X的牌当任意基本牌使用；'],
      },
    ],
    tags: [Tags.XiaoChengXun, '极蔡文姬'],
  },
  {
    code: 'LiYong',
    name: '历勇',
    text: '转换技，出牌阶段，阳：你可以将一张你本回合未使用过的花色的牌当【决斗】使用；阴：你可以获得一张你本回合使用过的花色的牌，令一名角色视为对你使用一张【决斗】。',
    skills: [
      {
        cover: YANG_COVER,
        code: '阳',
        keywords: [
          '阳：你可以将一张你本回合未使用过的花色的牌当【决斗】使用；',
        ],
      },
      {
        cover: YIN_COVER,
        code: '阴',
        keywords: [
          '阴：你可以获得一张你本回合使用过的花色的牌，令一名角色视为对你使用一张【决斗】。',
        ],
      },
    ],
    tags: [Tags.O, '武安国'],
  },
  {
    code: 'MiuYan',
    name: '谬焰',
    text: '转换技，阳：你可以将一张黑色牌当【火攻】使用，若此牌造成伤害，你获得本阶段展示过的所有手牌；阴：你可以将一张黑色牌当【火攻】使用，若此牌未造成伤害，此技能本轮失效。',
    skills: [
      {
        cover: YANG_COVER,
        code: '阳',
        keywords: [
          '阳：你可以将一张黑色牌当【火攻】使用，若此牌造成伤害，你获得本阶段展示过的所有手牌；',
        ],
      },
      {
        cover: YIN_COVER,
        code: '阴',
        keywords: [
          '阴：你可以将一张黑色牌当【火攻】使用，若此牌未造成伤害，此技能本轮失效。',
        ],
      },
    ],
    tags: [Tags.O, '王瓘'],
  },
  {
    code: 'ShiDi',
    name: '势敌',
    text: '转换技，锁定技，准备阶段，转换为阳；结束阶段，转换为阴。阳：你计算与其他角色的距离-1，你使用的黑色【杀】不能被响应。阴：其他角色计算与你的距离+1，你不能响应其他角色对你使用的红色【杀】。',
    skills: [
      {
        cover: YANG_COVER,
        code: '阳',
        keywords: [
          '阳：你计算与其他角色的距离-1，你使用的黑色【杀】不能被响应。',
        ],
      },
      {
        cover: YIN_COVER,
        code: '阴',
        keywords: [
          '阴：其他角色计算与你的距离+1，你不能响应其他角色对你使用的红色【杀】。',
        ],
      },
    ],
    tags: [Tags.M, '星黄忠'],
  },
];
