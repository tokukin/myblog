<template>
  <div id="links">
    <h1 class="title">友链</h1>
    <p class="paragraph">这里是我的一些链接，欢迎访问和联系。</p>
    <hr />

    <div id="links-container">
      <div
        class="card bg-info text-base-content w-96"
        v-for="(link, index) in friendLinks"
        :key="index"
      >
        <div class="card-body">
          <h2 class="card-title">{{ link.name }}</h2>
          <p>{{ link.description }}</p>
          <div class="card-actions justify-end">
            <button class="btn" @click="openLink(link.url)">访问</button>
          </div>
        </div>
      </div>

      <div class="card bg-secondary text-base-content w-96">
        <div class="card-body">
          <h2 class="card-title">虚位以待</h2>
          <p>期待加入</p>
          <div class="card-actions justify-end">
            <button class="btn" disabled="true">访问</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 自动获取当前年份（避免手动更新）
const currentYear = ref(new Date().getFullYear());
import { friendLinks } from "@/config/site";
console.log(friendLinks);

function openLink(url: string) {
  // 验证URL合法性（可选，增强健壮性）
  if (url && /^https?:\/\//.test(url)) {
    window.open(url, "_blank"); // _blank表示新标签页打开
  } else {
    alert("链接格式不正确！");
  }
}
</script>

<style scoped>
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
.paragraph {
  font-size: 16px;
  margin-bottom: 20px;
}
#links-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
  flex-wrap: wrap;
}
</style>
