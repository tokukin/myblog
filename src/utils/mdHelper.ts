// src/utils/mdHelper.ts
import fm from "front-matter";

// 1. 定义 MD 元信息的类型接口（根据你的实际字段调整）
export interface ArticleMeta {
  title: string;
  date: string;
  category?: string; // 可选字段加 ?
  tags?: string[];
  description?: string;
}

// 2. 给 extractMdInfo 添加类型注解
export const extractMdInfo = (mdContent: string) => {
  const { attributes: meta, body: content } = fm<ArticleMeta>(mdContent); // 泛型指定 meta 类型
  return {
    meta: meta as ArticleMeta, // 显式类型断言
    content,
  };
};
