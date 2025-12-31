<template>
  <div class="article-filter">
    <!-- 可选：新增“最新6篇文章”标题 -->
    <div v-if="latestArticles.length > 0" class="latest-title">
      <h2>最新发布 ({{ latestArticles.length }})</h2>
    </div>

    <!-- 最新6篇文章列表 -->

    <div id="latest-article-list">
      <div
        class="card w-96 bg-base-100 card-sm shadow-sm"
        v-for="(article, index) in latestArticles"
        :key="index"
      >
        <div class="card-body">
          <h2 class="card-title">{{ article.meta.title }}</h2>
          <h3 class="card-title">{{ formatDate(article.meta.date) }}</h3>
          <p>
            {{ article.content }}
          </p>
          <div class="justify-end card-actions">
            <button
              class="btn btn-primary"
              @click="handleReadArticle(article.path)"
            >
              阅读全文
            </button>
          </div>
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

// 1. 导入所有 MD 文章（保留不变）
const mdModules = import.meta.glob("@/articles/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

// 2. 响应式数据（保留不变）
const articleList = ref<{ meta: ArticleMeta; path: string; content: string }[]>(
  []
);

// ========== 新增：最新4篇文章计算属性 ==========
const latestArticles = computed(() => {
  // 1. 深拷贝原列表，避免修改原数据
  const sortedList = [...articleList.value];

  // 2. 按时间降序排序（最新的在前）
  sortedList.sort((a, b) => {
    // 获取有效时间戳，无效时间排最后
    const getTimeStamp = (item: { meta: ArticleMeta }) => {
      try {
        const date = new Date(item.meta.date || "");
        return isNaN(date.getTime()) ? 0 : date.getTime();
      } catch {
        return 0;
      }
    };
    // 降序排序：b - a → 最新的在最前面
    return getTimeStamp(b) - getTimeStamp(a);
  });

  // 3. 切片只保留前6篇
  return sortedList.slice(0, 4);
});

// 5. 时间格式化函数（保留不变）
const formatDate = (dateInput: string | undefined): string => {
  if (!dateInput) return "未填写日期";
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "无效时间格式";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}年${month}月${day}日 `;
  } catch (error) {
    console.warn("时间格式化失败：", error, "原始值：", dateInput);
    return "时间解析失败";
  }
};

// 6. 初始化文章列表（保留不变）
const initArticleList = () => {
  const list: { meta: ArticleMeta; path: string; content: string }[] = [];
  for (const filePath in mdModules) {
    const mdContent = mdModules[filePath] as string;
    const { meta, content } = extractMdInfo(mdContent);
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
  // 原有排序逻辑（保留，不影响最新6篇的计算）
  list.sort((a, b) => {
    const getValidTime = (item: { meta: ArticleMeta }) => {
      try {
        const normalized = item.meta.date?.replace(/年|月|日|\//g, "-") || "";
        const date = new Date(normalized);
        return isNaN(date.getTime()) ? 0 : date.getTime();
      } catch {
        return 0;
      }
    };
    return getValidTime(b) - getValidTime(a);
  });
  articleList.value = list;
};

// 8. 跳转详情页（保留不变）
const handleReadArticle = (path: string) => {
  if (path && typeof path === "string") {
    router.push(path);
  } else {
    console.warn("无效的文章路径：", path);
  }
};

// 10. 初始化（保留不变）
onMounted(() => {
  initArticleList();
});
</script>

<style scoped>
/* 新增最新6篇文章样式（可选） */
.latest-title {
  margin: 20px 0;
  font-size: 20px;
  color: #2c3e50;
  font-weight: 600;
}
#latest-article-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

/* 原有样式（保留不变） */
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
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s;
}
.tag-btn.active {
  background: #42b983;
  color: #fff;
  border-color: #42b983;
}
.tag-btn:hover:not(.active) {
  border-color: #42b983;
  color: #42b983;
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
