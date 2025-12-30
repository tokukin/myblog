<template>
  <div class="article-detail-page">
    <!-- 顶部导航返回按钮 -->
    <div class="back-nav">
      <button class="btn btn-primary" @click="handleBack">
        ← 返回文章列表
      </button>
    </div>

    <!-- 文章元信息头部 -->
    <div class="article-header" v-if="meta">
      <h1 class="article-title">{{ meta.title }}</h1>
      <div class="article-meta-info">
        <span class="meta-date">{{ formatDate(meta.date) }}</span>
        <span class="meta-category">{{ meta.category }}</span>
        <span class="meta-tags" v-if="meta.tags">
          <span v-for="tag in meta.tags" :key="tag" class="tag">{{ tag }}</span>
        </span>
      </div>
    </div>

    <!-- MD 文章内容渲染 -->
    <div class="article-content" v-if="!hasError && meta && ArticleContent">
      <component :is="ArticleContent" />
    </div>

    <!-- 加载/错误状态提示 -->
    <div v-if="!meta && !hasError" class="loading-tip">文章加载中... 📝</div>
    <div v-if="hasError" class="error-tip">抱歉，文章不存在或加载失败 😞</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onErrorCaptured, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { extractMdInfo, type ArticleMeta } from "@/utils/mdHelper";
// 导入预编译的文章路径映射
import { articlePathMap, articleComponentMap } from "@/data/articlePaths";

console.log("articlePathMap:", articlePathMap);
// 1. 路由和工具实例
const router = useRouter();
const route = useRoute();

// 2. 响应式数据（带类型注解）
const meta = ref<ArticleMeta | null>(null); // 文章元信息
const hasError = ref(false); // 加载错误状态
const ArticleContent = ref<any>(null); // MD 组件容器

// 3. 加载文章（使用预编译的路径映射）
const loadArticle = async () => {
  try {
    hasError.value = false;
    meta.value = null;
    ArticleContent.value = null;

    // 从预编译映射表中获取当前路由对应的 MD 文件路径
    const currentRoutePath = route.path;
    const mdFilePath = articlePathMap.get(currentRoutePath);

    console.log("currentRoutePath:", currentRoutePath);

    console.log("mdFilePath:", mdFilePath);

    // 检查文章是否存在
    if (!mdFilePath) {
      throw new Error("文章不存在");
    }

    // const mdRawModules = import.meta.glob(mdFilePath, {
    //   eager: false,
    //   import: "default",
    //   query: "?raw", // 统一配置 raw，无需拼接
    // });

    const mdRawModules = import.meta.glob("@/articles/**/*.md", {
      eager: false,
      import: "default",
      query: "?raw", // 统一配置 raw，无需拼接
    });
    console.log("mdRawModules:", mdRawModules);
    const mdCompModules = import.meta.glob("@/articles/**/*.md", {
      eager: false,
      import: "default", // 加载编译后的组件
    });
    console.log("mdCompModules:", mdCompModules);

    const targetKey = mdFilePath.replace(/\\/g, "/").replace(/^@\//, "/src/");
    console.log("targetKey:", targetKey);
    const rawLoader = mdRawModules[targetKey];
    const compLoader = mdCompModules[targetKey];

    if (!rawLoader || !compLoader) {
      throw new Error(`找不到预加载的 MD 文件：${targetKey}`);
    }
    const articleContent = await rawLoader(); // 加载原始文本
    const { meta: articleMeta } = extractMdInfo(articleContent as string); // 类型断言确保是字符串
    meta.value = articleMeta as ArticleMeta;

    ArticleContent.value = await compLoader();
    console.log("ArticleContent.value:", ArticleContent.value);
  } catch (err) {
    console.error("文章加载失败：", err);
    hasError.value = true;
    meta.value = null;
    ArticleContent.value = null;
  }
};

// 4. 辅助方法：格式化日期
const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (err) {
    return dateStr; // 格式错误时返回原始字符串
  }
};

// 修复后：先判断是否有历史记录，再执行跳转，避免 void 类型判断
const handleBack = () => {
  // 方式1：兼容所有场景（推荐）
  if (window.history.length > 1) {
    // 有历史记录，返回上一页
    router.go(-1);
  } else {
    // 无历史记录，跳转到首页
    router.push("/");
  }

  // 方式2（简洁版）：用可选链+条件判断替代 ||
  // window.history.length > 1 ? router.go(-1) : router.push("/");
};

// 6. 错误捕获
onErrorCaptured((err) => {
  console.error("文章渲染错误：", err);
  hasError.value = true;
  return false;
});

// 7. 初始化 + 路由监听
onMounted(() => loadArticle());
watch(
  () => route.path,
  () => loadArticle(),
  { immediate: true, deep: true }
);
</script>

<style scoped>
/* 样式部分保持不变，无需修改 */
.article-detail-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 16px;
  min-height: 100vh;
  background-color: var(--color-base-100);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.back-nav {
  margin-bottom: 30px;
}

.back-btn {
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.back-btn:hover {
  border-color: #42b983;
  color: #42b983;
}

.article-header {
  margin-bottom: 40px;
  text-align: center;
}

.article-title {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 20px 0;
  line-height: 1.4;
}

.article-meta-info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 14px;
  color: #7f8c8d;
}

.meta-tags {
  display: flex;
  gap: 8px;
}

.tag {
  padding: 2px 8px;
  border-radius: 12px;
  background-color: #f5f5f5;
  color: #42b983;
  font-size: 12px;
}

.article-content {
  line-height: 1.8;
  font-size: 16px;
  color: #34495e;
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3) {
  color: #2c3e50;
  margin: 24px 0 16px 0;
  font-weight: 600;
}

.article-content :deep(p) {
  margin: 12px 0;
}

.article-content :deep(code) {
  background-color: #f8f8f8;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "Consolas", "Monaco", monospace;
}

.article-content :deep(pre) {
  background-color: #f8f8f8;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 16px 0;
}

.article-content :deep(pre code) {
  padding: 0;
  background: none;
}

.article-content :deep(a) {
  color: #42b983;
  text-decoration: none;
}

.article-content :deep(a:hover) {
  text-decoration: underline;
}

.article-content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 16px 0;
}

.loading-tip,
.error-tip {
  text-align: center;
  padding: 80px 0;
  font-size: 18px;
  color: #999;
}

.error-tip {
  color: #e74c3c;
}

@media (max-width: 768px) {
  .article-title {
    font-size: 24px;
  }

  .article-content {
    font-size: 15px;
  }
}
</style>
