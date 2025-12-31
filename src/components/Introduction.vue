<template>
  <div id="introduction">
    <h1 class="heading">
      {{ siteConfig.title }}
    </h1>
    <span class="text-rotate text-2xl">
      <span class="justify-items-start">
        <span class="text-primary">开心快乐每一天!</span>
        <span class="text-neutral">扎西德勒!</span>
        <span class="text-secondary">身体健康!</span>
        <span class="text-primary">1376!</span>
        <span class="text-accent">热爱每一天!</span>
        <span class="text-primary">😊😊😊😊😊</span>
      </span>
    </span>
    <div class="paragraph">
      <p>{{ siteConfig.subtitle }}</p>
      <p>欢迎翻阅最新文章，或者直接所有文章检索历史内容。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { siteConfig } from "@/config/site";
// console.log(siteConfig);
</script>

<style scoped>
.heading {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-base-content);
}
.paragraph {
  font-size: 1.2rem;
  color: var(--color-base-content);
}
#introduction {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  gap: 1rem;
}
</style>
