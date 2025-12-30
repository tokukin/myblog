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

```bash
pnpm install
pnpm run dev
pnpm run build
```
