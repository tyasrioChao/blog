module.exports = {
  title: 'Tyasrio\'s blog',
  description: '摸鱼，给我狠狠的摸',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], 
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  base: '/', 
  theme: 'reco',
  markdown: {
    lineNumbers: true 
  },
  themeConfig: {
    type: 'blog',
    author: 'Tyasrio Bii',
    subSidebar: 'auto',
    authorAvatar: '/avatar.png',
    sidebarDepth: 2, 
    lastUpdated: 'Last Updated',
    noFoundPageByTencent: false,
    nav:[
      { text: 'Home', link: '/', icon: 'reco-home' },
      // { text: 'Pages', link: '', icon: 'reco-menu', items:[
      //   { text: 'Note', link: '/note/', icon: 'reco-blog' },
      //   { text: 'Algorithm', link: '/algorithm/', icon: 'reco-api' },
      //   { text: 'Problem', link: '/problem/', icon: 'reco-other' },
      // ]},
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
      { text: 'GitHub', link: 'https://github.com/tyasriochao' },     
    ],
    sidebar: {
      '/note/': [
        { title:"笔记", collapsable: false, path: "" }, 
        '/note/dfs', 
        '/note/introduce-of-mail-server',
        '/note/ip-network-segement'
      ],
      '/algorithm/': [
        { title:"算法", collapsable: false, path: "" }, 
        '/algorithm/leetcode-4', 
        '/algorithm/leetcode-22', 
        '/algorithm/leetcode-70', 
        '/algorithm/leetcode-100', 
        '/algorithm/leetcode-205', 
        '/algorithm/leetcode-235', 
        '/algorithm/leetcode-258', 
        '/algorithm/leetcode-365', 
        '/algorithm/leetcode-451', 
        '/algorithm/leetcode-473', 
        '/algorithm/leetcode-830', 
        '/algorithm/leetcode-899', 
        '/algorithm/leetcode-957'
      ],
      '/problem/': [
        { title:"问题", collapsable: false, path: "" }, 

      ],
    },
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认文案 “分类”
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: 'Tag'      // 默认文案 “标签”
      },
      socialLinks: [     // 信息栏展示社交信息
        { icon: 'reco-github', link: 'https://github.com/tyasriochao' },
        { icon: 'reco-qq', text: '724387539' }
      ]
    },

    keyPage: {
      keys: ['e10adc3949ba59abbe56e057f20f883e'], // 1.3.0 版本后需要设置为密文
      color: '#42b983', // 登录页动画球的颜色
      lineColor: '#42b983' // 登录页动画线的颜色
    },
    // 备案
    //  record: 'ICP 备案文案',
    //  recordLink: 'ICP 备案指向链接',
    //  cyberSecurityRecord: '公安部备案文案',
    //  cyberSecurityLink: '公安部备案指向链接',
    // 项目开始时间，只填写年份
    startYear: '2019'
  }
}