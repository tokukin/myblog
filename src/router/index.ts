// src/router/index.ts
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
// 导入页面组件（TS会自动校验文件路径和组件类型）
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import NotFound from "../views/NotFound.vue";

// 第一步：扩展路由元信息的TypeScript类型（核心！解决meta类型提示）
declare module "vue-router" {
  interface RouteMeta {
    // 页面标题（必选）
    title: string;
    // 是否需要登录（可选，默认false）
    requiresAuth?: boolean;
  }
}

// 第二步：定义路由规则，使用RouteRecordRaw类型约束
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: "首页 | 星宿海",
      requiresAuth: false,
    },
    // 嵌套路由（TS同样约束）
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "关于 | 星宿海",
      requiresAuth: false,
    },
  },
  // 动态路由参数（TS会校验params类型）

  // 404页面
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "页面不存在",
    },
  },
];

// 第三步：创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 第四步：路由守卫（TS会校验to/from/next的类型）
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  // 登录验证示例（TS约束isLogin类型）
  const isLogin: boolean = !!localStorage.getItem("token");
  if (to.meta.requiresAuth && !isLogin) {
    next("/login");
  } else {
    next();
  }
});

export default router;
