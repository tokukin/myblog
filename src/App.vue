<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

import { siteConfig } from "./config/site";
import { ref } from "vue";
</script>

<template>
  <div class="min-h-screen flex flex-col w-full overflow-x-hidden">
    <!-- 页面主体内容：占据剩余所有空间（关键！） -->
    <Navbar />

    <main id="page-container">
      <div id="content-container" class="pt-5 pl-5 pr-5 w-full lg:w-[60%]">
        <RouterView />
      </div>
    </main>

    <!-- 底部组件 -->
    <Footer />
  </div>
</template>

<style scoped>
#page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  flex: 1;
  width: 100%;
}
</style>
