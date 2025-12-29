<template>
  <div id="introduction">
    <h1 class="heading">{{ siteConfig.title }}</h1>
    <div class="paragraph">
      <p>{{ siteConfig.subtitle }}</p>
      <p>欢迎翻阅最新文章，或者直接所有文章检索历史内容。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { siteConfig } from "../config/site";
// console.log(siteConfig);
</script>

<style scoped>
.heading {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-primary-content);
}
.paragraph {
  font-size: 1.2rem;
  color: var(--color-secondary-content);
}
#introduction {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  gap: 1rem;
}
</style>
