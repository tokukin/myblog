<template>
  <div id="about-container">
    <ul class="list bg-base-100 rounded-box shadow-md">
      <li>
        <div class="list-top">
          <div class="list-top-left">
            <img class="size-10 rounded-box" src="../assets/auther.png" />
            <div>
              <div>关于作者</div>
              <div class="text-xs uppercase font-semibold opacity-60">
                {{ siteConfig.author }}
              </div>
            </div>
          </div>
          <div class="list-top-right">
            <button class="btn btn-square btn-ghost">
              <svg
                class="size-[1.2em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div class="list-bottom">
          <p>
            {{ siteConfig.auther_description }}
          </p>
        </div>
        <div class="divider">这是分割线</div>
      </li>

      <li>
        <article class="markdown-body md-content"><About /></article>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { siteConfig } from "../config/site";
import { ref } from "vue";

import About from "@/pages/about.md";
// 定义响应式变量：标记图片是否加载完成
const isImageLoaded = ref(false);

// 图片加载成功的回调
const handleImageLoad = () => {
  isImageLoaded.value = true;
};

// 图片加载失败的回调（可选：也可显示错误占位图/保持骨架屏）
const handleImageError = () => {
  // 方案1：加载失败也隐藏骨架屏（可替换为错误图片）
  //isImageLoaded.value = true;
  // 方案2：加载失败保持骨架屏
  isImageLoaded.value = false;
  console.error("图片加载失败");
};
</script>

<style scoped>
#about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.img-style {
  width: 60%;
}
.list-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin: 20px 10px;
}

.list-top-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.list-top-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.list-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 0 10px;
}
.md-content {
  padding: 20px;
}
</style>
