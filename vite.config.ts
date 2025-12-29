import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import Markdown from "vite-plugin-md";
import hljs from "highlight.js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    Markdown({
      // 配置 markdown-it 解析器
      markdownItOptions: {
        html: true, // 允许 md 中包含 HTML 标签
        linkify: true, // 自动识别链接
        typographer: true, // 美化排版（比如替换引号为中文引号）
        highlight: function (str, lang) {
          // 代码块高亮配置
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(str, { language: lang }).value;
            } catch (__) {}
          }
          // 无指定语言时，默认高亮
          return hljs.highlightAuto(str).value;
        },
      },
    }),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
  ],
});
