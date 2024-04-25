import { createWebHistory, createRouter } from "vue-router";

import Home from "../views/Home.vue";
import PageNotFound from "../views/PageNotFound.vue";

const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "Page Not Found",
        component: PageNotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;