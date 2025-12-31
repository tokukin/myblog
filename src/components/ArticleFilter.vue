<template>
  <div class="article-filter">
    <!-- 分类标签组 -->
    <div class="filter-tags">
      <button
        v-for="category in allCategories"
        :key="category"
        :class="['btn tag-btn', { active: currentCategory === category }]"
        @click="handleCategoryChange(category)"
      >
        {{ category === "all" ? "全部分类" : category }}
      </button>
    </div>

    <!-- 筛选后的文章列表 -->
    <div class="overflow-x-auto">
      <div v-if="filteredArticles.length === 0" class="empty-tip">
        该分类下暂无文章 😢
      </div>
      <div v-else>
        <div id="article-list-title">文章列表</div>
      </div>

      <div class="article-list">
        <div
          v-for="(article, index) in filteredArticles"
          :key="index"
          class="list-item"
        >
          <div class="article-info">
            <a class="article-titles" :href="`${article.path}`"
              >标题：{{ article.meta.title }}</a
            >
            <a class="article-date" :href="`${article.path}`">
              发布时间：{{ formatDate(article.meta.date) }}
            </a>
          </div>
          <a class="article-content" :href="`${article.path}`">
            摘要：{{ article.content }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { extractMdInfo, type ArticleMeta } from "@/utils/mdHelper";

const router = useRouter();

// 1. 导入所有 MD 文章
const mdModules = import.meta.glob("@/articles/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

console.log(mdModules);

// 2. 响应式数据
const articleList = ref<{ meta: ArticleMeta; path: string; content: string }[]>(
  []
);
const currentCategory = ref<string>("all");

// 3. 计算属性：提取所有分类
const allCategories = computed(() => {
  const categories = articleList.value
    .map((item) => item.meta.category)
    .filter((category): category is string => !!category);
  return ["all", ...Array.from(new Set(categories))];
});

// 4. 计算属性：筛选后的文章列表
const filteredArticles = computed(() => {
  if (currentCategory.value === "all") {
    return articleList.value;
  }
  return articleList.value.filter(
    (item) => item.meta.category === currentCategory.value
  );
});

// 5. 核心修改：兼容多格式的日期格式化函数（实现时间格式化需求）
const formatDate = (dateInput: string | undefined): string => {
  // 处理空值
  if (!dateInput) return "未填写日期";

  try {
    // 将任意合法时间字符串转为Date对象
    const date = new Date(dateInput);
    // 校验时间有效性
    if (isNaN(date.getTime())) return "无效时间格式";

    // 提取年、月、日、时、分（补零确保两位数）
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // 格式化为目标样式：2025年12月30日 14:00
    return `${year}年${month}月${day}日`;
  } catch (error) {
    console.warn("时间格式化失败：", error, "原始值：", dateInput);
    return "时间解析失败";
  }
};

// 6. 初始化文章列表
const initArticleList = () => {
  const list: { meta: ArticleMeta; path: string; content: string }[] = [];

  for (const filePath in mdModules) {
    const mdContent = mdModules[filePath] as string;
    const { meta, content } = extractMdInfo(mdContent);
    console.log("meta::", meta);
    console.log("content::", content.slice(0, 55));
    // 字段兜底
    const safeMeta: ArticleMeta = {
      title: meta.title || "未命名文章",
      date: meta.date || "",
      category: meta.category || "未分类",
      tags: meta.tags || [],
      description: meta.description || "",
    };

    const routePath = filePath
      .replace(/^@\/articles/, "/article")
      .replace(/\.md$/, "")
      .replace(/\\/g, "/")
      .replace("src/", "") as string;

    list.push({
      meta: safeMeta,
      path: routePath,
      content: content.slice(0, 50) + "..." || "",
    });
  }

  // 核心优化：排序逻辑（确保最新的在最上面）
  list.sort((a, b) => {
    // 获取有效时间戳，无效时间戳设为0（排最后）
    const getTimeStamp = (item: { meta: ArticleMeta }) => {
      try {
        const date = new Date(item.meta.date || "");
        return isNaN(date.getTime()) ? 0 : date.getTime();
      } catch {
        return 0;
      }
    };

    // 降序排序：b - a 实现最新的在最顶部
    return getTimeStamp(b) - getTimeStamp(a);
  });

  articleList.value = list;
};

// 7. 方法：切换分类
const handleCategoryChange = (category: string) => {
  currentCategory.value = category;
};

// 8. 方法：跳转详情页
const handleReadArticle = (path: string) => {
  if (path && typeof path === "string") {
    router.push(path);
  } else {
    console.warn("无效的文章路径：", path);
  }
};

// 9. 初始化
onMounted(() => {
  initArticleList();
});
</script>

<style scoped>
#article-list-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-base-content);
  margin-bottom: 20px;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.article-content {
  display: flex;
  flex-direction: column;

  gap: 10px;
}

.list-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
  color: var(--color-base-content);
  border-bottom: 1px solid var(--color-primary);
  padding-bottom: 10px;
}

.article-info {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

:deep(.article-titles) {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
}

.article-date {
  font-size: 14px;
  font-style: italic;
  color: var(--color-base-content);
}

/* 样式保持不变 */
.article-filter {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.filter-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.tag-btn {
  background: #fff;

  transition: all 0.2s;
  color: var(--color-base-content);
}

.tag-btn.active {
  background: var(--color-primary);
  color: var(--color-base-content);
  border-color: var(--color-primary);
}

.tag-btn:hover:not(.active) {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.article-list {
  display: grid;
  gap: 20px;
}

.article-item {
  padding: 20px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  transition: box-shadow 0.2s;
}

.article-item:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.article-title {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #333;
}

.article-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #999;
}

.read-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: #42b983;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
}

.read-btn:hover {
  background: #359469;
}

.empty-tip {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 16px;
}
</style>
