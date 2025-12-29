// src/env.d.ts
/// <reference types="vite/client" />

// 声明md文件模块，让TS识别
declare module "*.md" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
