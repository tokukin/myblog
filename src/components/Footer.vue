<template>
  <footer id="footer">
    <div id="footer-left">
      <div id="footer-allright">
        <p>
          © {{ currentYear }} {{ siteConfig.author || "开发者" }}. All Rights
          Reserved.
        </p>
      </div>
    </div>

    <div id="footer-middle">
      <a href="https://beian.miit.gov.cn/" target="_blank"
        >备案号：{{ siteConfig.miit_beian || "工信部备案号" }} |
      </a>
      <a
        :href="`https://beian.mps.gov.cn/#/query/webSearch?code=${siteConfig.mps_beian_number}`"
        rel="noreferrer"
        target="_blank"
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: left;
        "
        ><img
          style="width: 15px; height: 15px"
          src="@/assets/batb.png"
          :alt="`${siteConfig.mps_beian}`"
        />{{ siteConfig.mps_beian || "公网安备号" }}</a
      >
    </div>
    <div id="footer-right">
      <div id="footer-right-top"></div>
      <div id="footer-right-bottom">
        <a href="/contact" class="hover:text-primary transition-colors"
          >联系我</a
        >
        <a
          :href="siteConfig.socials.github"
          target="_blank"
          class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary transition-colors"
        >
          <i class="fa-brands fa-github text-lg"></i>
        </a>
        <a
          href="#"
          class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary transition-colors"
        >
          <i class="fa-brands fa-weixin text-lg"></i>
        </a>
        <a
          :href="siteConfig.socials.email"
          class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary transition-colors"
        >
          <i class="fa-regular fa-envelope text-lg"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 自动获取当前年份（避免手动更新）
const currentYear = ref(new Date().getFullYear());
import { siteConfig } from "@/config/site";
</script>

<style scoped>
#footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 6vh;
  background-color: var(--color-base-200);
}

#footer-left {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  font-size: small;
  margin-left: 20px;
}
#footer-middle {
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: left;
  font-size: small;
}

#footer-right {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  font-size: small;
  margin-right: 20px;
}

#footer-right-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 20px;
}

#footer-right-bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 20px;
}

a:hover {
  color: var(--color-accent);
}
</style>
