// src/data/articlePaths.ts
// 预编译所有 MD 文章的路径映射（纯浏览器端，无 Node 依赖）
const mdFiles = import.meta.glob("@/articles/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

// 生成「路由路径 → MD 文件路径」的映射表（统一用 @/ 格式）
export const articlePathMap = new Map<string, string>();

// 生成「路由路径 → MD 组件导入函数」的映射表（用于渲染正文）
export const articleComponentMap = new Map<string, () => Promise<any>>();

// 工具函数：标准化路径（移除 src 前缀，转为 @/ 格式）
const normalizeFilePath = (rawPath: string): string => {
  let filePath = rawPath;
  // 处理 Vite 解析别名后生成的 /src/ 开头路径（如 /src/articles/starry/Orion.md）
  if (filePath.startsWith("/src/")) {
    filePath = filePath.replace(/^\/src\//, "@/");
  }
  // 处理 Windows 环境下的 src/ 开头路径（如 src/articles/starry/Orion.md）
  else if (filePath.startsWith("src/")) {
    filePath = filePath.replace(/^src\//, "@/");
  }
  // 处理绝对路径中的反斜杠（Windows）
  filePath = filePath.replace(/\\/g, "/");
  return filePath;
};

// 遍历所有 MD 文件，构建映射表
for (const rawFilePath in mdFiles) {
  // 步骤1：标准化文件路径（移除 src 前缀，转为 @/ 格式）
  const filePath = normalizeFilePath(rawFilePath);

  // 步骤2：MD 文件路径转路由路径：@/articles/starry/Orion.md → /article/starry/Orion
  const routePath = filePath
    .replace(/^@\/articles/, "/articles") // 替换 @/articles 为 /article
    .replace(/\.md$/, "") // 去掉 .md 后缀
    .replace(/\\/g, "/"); // 兼容 Windows 路径

  // 步骤3：存入路径映射（路由路径 → 统一为 @/ 格式的 MD 文件路径）
  articlePathMap.set(routePath, filePath);

  // 步骤4：存入组件导入函数映射（用于动态导入 MD 组件）
  articleComponentMap.set(
    routePath,
    // 使用标准化后的 @/ 路径，Vite 能解析别名
    () => import(`${filePath}`)
  );

  // 步骤5：存入 MD 原始文本导入函数映射（用于提取元信息）
  articleComponentMap.set(`${routePath}?raw`, () => import(`${filePath}?raw`));
}

// 导出所有文章的路由路径列表（供分类筛选组件使用）
export const articleRoutes = Array.from(articlePathMap.keys());

// 调试用：打印路径映射（可选）
console.log("标准化后的路径映射：", Array.from(articlePathMap.entries()));
