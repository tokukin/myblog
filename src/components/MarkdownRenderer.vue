<template>
  <div class="md-container">
    <!-- 主题切换按钮 -->
    <div class="theme-switcher">
      <button
        :class="{ active: mdTheme === 'auto' }"
        @click="switchMdTheme('auto')"
      >
        跟随系统
      </button>
      <button
        :class="{ active: mdTheme === 'light' }"
        @click="switchMdTheme('light')"
      >
        浅色
      </button>
      <button
        :class="{ active: mdTheme === 'dark' }"
        @click="switchMdTheme('dark')"
      >
        深色
      </button>
    </div>

    <!-- MD 渲染容器：必须加 markdown-body 类名 -->
    <div
      class="markdown-body"
      v-html="renderedHtml"
      :style="{ maxWidth: '980px', margin: '0 auto', padding: '20px' }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { marked } from "marked";
import { useMdTheme } from "./useMdTheme";

// 引入主题逻辑
const { mdTheme, switchMdTheme } = useMdTheme();

// 接收父组件传入的 MD 文本
const props = defineProps({
  mdText: {
    type: String,
    required: true,
    default: "",
  },
});

// 解析 MD 为 HTML
const renderedHtml = computed(() => {
  if (!props.mdText) return "";
  marked.setOptions({
    breaks: true,
    gfm: true,
  });
  return marked.parse(props.mdText);
});
</script>

<style scoped>
/* 主题切换按钮样式 */
.theme-switcher {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
.theme-switcher button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}
.theme-switcher button.active {
  background: #007bff;
  color: #fff;
  border-color: #007bff;
}

/* 自定义 MD 样式（补充 github-markdown-css） */
.markdown-body {
  font-size: 16px;
  line-height: 1.8;
  transition: background-color 0.3s ease; /* 主题切换过渡 */
}
</style>
