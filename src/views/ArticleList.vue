<template>
  <div class="article-list">
    <div v-for="(item, index) in articleList" :key="index" class="article-item">
      <h3>{{ item.meta.title }}</h3>
      <p>{{ item.meta.date }} | {{ item.meta.category }}</p>
    </div>
  </div>
</template>

<script setup>
import { extractMdInfo } from "@/utils/mdHelper";

// Vite 特有的 Glob 导入，匹配所有 articles 下的 MD 文件
const mdModules = import.meta.glob("@/articles/**/*.md", {
  eager: true,

  query: "?raw", // 替代 as: 'raw'
  import: "default", // 明确导入默认导出
});

// 遍历生成文章列表
const articleList = [];
for (const path in mdModules) {
  const mdContent = mdModules[path];
  const { meta } = extractMdInfo(mdContent);
  articleList.push({ meta, path });
}
</script>
