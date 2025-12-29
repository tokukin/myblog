# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
注意: 1.需补充配置文件
/src/config/site.ts

```js
export const siteConfig = {
  title: "网站名称",
  subtitle: "副标题",
  description_hans: "开心快乐每一天",
  description_zang: "XXX",
  author: "XXX",
  url: "XXX",
  miit_beian: "XXX",
  mps_beian: "XXX",
  mps_beian_number: "XXX",

  auther_description: "一个简单的自我介绍",

  // 导航栏配置
  nav: [
    { label: "首页", href: "/" },
    { label: "文章", href: "/content" },
    { label: "标签", href: "/tags" },
    { label: "友链", href: "/links" },
    { label: "关于", href: "/about" },
  ],
  socials: {
    github: "XXX",
    email: "XXX",
  },
};
```

2.由于主题配置中 md 解析文件 css，github-markdown-light.css 和 github-markdown-dark.css 背景颜色相同，导致在 dark 模式下 md 解析文件背景颜色与页面背景颜色不相同相同，影响阅读体验，我自己做了修改。
