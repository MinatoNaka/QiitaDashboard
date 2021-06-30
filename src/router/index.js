import Vue from "vue";
import VueRouter from "vue-router";
import Top from "../views/Top.vue";
import Item from "../views/Item.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Top",
    component: Top,
  },
  {
    path: "/items/:itemId",
    name: "Item",
    component: Item,
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
