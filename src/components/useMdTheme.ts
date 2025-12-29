// 1. 拆分导入：运行时API用普通import，类型用import type
import { ref, watch, onMounted } from "vue";
import type { Ref } from "vue"; // ✅ 纯类型导入必须加 import type

// 定义主题类型枚举（规范取值范围）
export type MdThemeType = "auto" | "light" | "dark";

// 导入主题 CSS 路径（Vite 专用，?url 后缀返回解析后的路径字符串）
import autoThemeCss from "github-markdown-css/github-markdown.css?url";
import lightThemeCss from "github-markdown-css/github-markdown-light.css?url";
import darkThemeCss from "github-markdown-css/github-markdown-dark.css?url";

/**
 * Markdown 主题切换组合式函数
 * @returns 主题状态和切换方法
 */
export const useMdTheme = () => {
  // 为 ref 添加明确的类型注解（Ref 来自 import type）
  const mdTheme: Ref<MdThemeType> = ref(
    (localStorage.getItem("md-theme") as MdThemeType) || "auto"
  );

  // 动态加载对应的 CSS 文件（参数添加类型注解）
  const loadThemeCss = (theme: MdThemeType): void => {
    // 移除已存在的 markdown 主题样式链接（添加元素类型断言）
    const oldLink = document.querySelector<HTMLLinkElement>(
      'link[rel="stylesheet"][data-md-theme]'
    );
    if (oldLink) oldLink.remove();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.dataset.mdTheme = "true"; // 标记为 markdown 主题样式

    // 根据主题类型加载对应的 CSS 文件
    switch (theme) {
      case "light":
        link.href = lightThemeCss;
        break;
      case "dark":
        link.href = darkThemeCss;
        break;
      default: // auto
        link.href = autoThemeCss;
    }
    document.head.appendChild(link);
  };

  // 监听主题变化（回调参数添加类型注解）
  watch(
    mdTheme,
    (newTheme: MdThemeType) => {
      console.log("当前切换的主题：", newTheme);
      loadThemeCss(newTheme);
      localStorage.setItem("md-theme", newTheme);
    },
    { immediate: true } // 初始化时立即执行
  );

  // 初始化时加载样式（组件挂载后执行）
  onMounted(() => {
    loadThemeCss(mdTheme.value);
  });

  // 切换主题的方法（参数添加类型校验）
  const switchMdTheme = (theme: MdThemeType): void => {
    mdTheme.value = theme;
  };

  return {
    mdTheme, // 当前主题状态（Ref<MdThemeType>）
    switchMdTheme, // 切换主题方法 ((theme: MdThemeType) => void)
  };
};
