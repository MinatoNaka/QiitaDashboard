import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import moment from "moment";
import sampleProfile from "../assets/sampleProfile.json";
import sampleItems from "../assets/sampleItems.json";
import sampleLgtmsByItem from "../assets/sampleLgtmsByItem.json";

axios.defaults.baseURL =
  process.env.NODE_ENV == "production" ? "https://qiita.com" : "";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showSample: true,
    apiToken: "",
    lastLoadedAt: "",
    loadingProfile: false,
    loadingItems: false,
    loadingLgtms: false,
    loadingPvs: false,
    loadingStocks: false,
    userProfile: {},
    userItems: [],
    userLgtmsByItem: {},
  },
  getters: {
    currentProfile: (state) => {
      return state.showSample ? sampleProfile : state.userProfile;
    },
    currentItems: (state) => {
      return state.showSample ? sampleItems : state.userItems;
    },
    currentLgtmsByItem: (state) => {
      return state.showSample ? sampleLgtmsByItem : state.userLgtmsByItem;
    },
  },
  mutations: {
    updateShowSample: (state, payload) => {
      state.showSample = payload;
    },
    updateApiToken: (state, payload) => {
      state.apiToken = payload;
    },
    initializeUserData: (state) => {
      state.userProfile = {};
      state.userItems = [];
      state.userLgtmsByItem = {};
    },
    updateProfile: (state, payload) => {
      state.userProfile = payload;
    },
    updateItems: (state, payload) => {
      let requiredFields = [
        "id",
        "likes_count",
        "title",
        "url",
        "page_views_count",
        "created_at",
        "private",
        "updated_at",
      ];
      let filtered = payload.map((item) => {
        Object.keys(item).forEach((key) => {
          if (!requiredFields.includes(key)) {
            delete item[key];
          }
        });
        return item;
      });
      state.userItems.push(...filtered);
    },
    updateLgtmsByItem: (state, payload) => {
      let requiredFields = ["created_at"];
      let filtered = payload.data.map((item) => {
        Object.keys(item).forEach((key) => {
          if (!requiredFields.includes(key)) {
            delete item[key];
          }
        });
        return item;
      });
      let lgtms = state.userLgtmsByItem[payload.itemId];
      lgtms ??= [];
      lgtms.push(...filtered);
      Vue.set(state.userLgtmsByItem, payload.itemId, lgtms);
    },
    updatePvs: (state, payload) => {
      const itemIndex = state.userItems.findIndex(
        (item) => item.id === payload.itemId
      );
      const item = state.userItems[itemIndex];

      item.page_views_count = payload.page_views_count;
      item.lgtm_rate =
        Math.round((item.likes_count / item.page_views_count) * 100 * 100) /
        100;

      state.userItems.splice(itemIndex, 1, item);
    },
    updateStocks: (state, payload) => {
      const itemIndex = state.userItems.findIndex(
        (item) => item.id === payload.itemId
      );
      const item = state.userItems[itemIndex];

      item.stocks_count = Number(payload.stocks_count);
      state.userItems.splice(itemIndex, 1, item);
    },
    updateLastLoadedAt: (state, reset = false) => {
      state.lastLoadedAt = reset ? null : moment().format("YYYY-MM-DD");
    },
    startLoading: (state) => {
      state.loadingProfile = true;
      state.loadingItems = true;
      state.loadingLgtms = true;
      state.loadingPvs = true;
      state.loadingStocks = true;
    },
    finishLoading: (state) => {
      state.loadingProfile = false;
      state.loadingItems = false;
      state.loadingLgtms = false;
      state.loadingPvs = false;
      state.loadingStocks = false;
    },
    finishLoadingProfile: (state) => {
      state.loadingProfile = false;
    },
    finishLoadingItems: (state) => {
      state.loadingItems = false;
    },
    finishLoadingLgtms: (state) => {
      state.loadingLgtms = false;
    },
    finishLoadingPvs: (state) => {
      state.loadingPvs = false;
    },
    finishLoadingStocks: (state) => {
      state.loadingStocks = false;
    },
  },
  actions: {
    async loadData(context) {
      console.log("load data start");
      context.commit("startLoading");

      if (context.state.showSample) {
        console.log("load sample");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        context.commit("finishLoading");
        return;
      }

      if (context.state.lastLoadedAt == moment().format("YYYY-MM-DD")) {
        console.log("load skip");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        context.commit("finishLoading");
        return;
      }

      context.commit("initializeUserData");
      try {
        await context.dispatch("loadDataByApi");
      } catch (e) {
        console.log(e);
        let message =
          "データ取得でエラーが発生しました。\nサンプルデータを表示します。";
        if (e?.message) {
          message += "\nエラー：" + e.message;
        }
        alert(message);

        context.commit("updateShowSample", true);
        context.commit("finishLoading");
        return;
      }
      context.commit("updateLastLoadedAt");
      console.log("load data end");
    },
    async loadDataByApi(context) {
      await context.dispatch("loadProfile").then(() => {
        context.commit("finishLoadingProfile");
      });
      await context.dispatch("loadItems").then(() => {
        context.commit("finishLoadingItems");
      });
      await Promise.all([
        context.dispatch("loadLgtms").then(() => {
          context.commit("finishLoadingLgtms");
        }),
        context.dispatch("loadPvs").then(() => {
          context.commit("finishLoadingPvs");
        }),
        context.dispatch("loadStocks").then(() => {
          context.commit("finishLoadingStocks");
        }),
      ]);
    },
    async loadProfile(context) {
      await axios
        .get(
          // `/api/v2/users/minato-naka`,
          `/api/v2/authenticated_user`,
          {
            headers: {
              Authorization: "Bearer " + context.state.apiToken,
            },
          }
        )
        .then((res) => {
          context.commit("updateProfile", res.data);
        });
    },
    async loadItems(context, page = 1) {
      let per_page = 100;
      await axios
        .get(
          // `/api/v2/items?page=${page}&per_page=${per_page}&query=user:minato-naka`,
          `/api/v2/authenticated_user/items?page=${page}&per_page=${per_page}`,
          {
            headers: {
              Authorization: "Bearer " + context.state.apiToken,
            },
          }
        )
        .then(async (res) => {
          const results = res.data.filter((item) => !item.private);
          context.commit("updateItems", results);
          if (
            res.data.length &&
            res.headers["link"] &&
            res.headers["link"].indexOf('rel="next"') != -1
          ) {
            page++;
            await context.dispatch("loadItems", page);
          }
        });
    },
    async loadLgtms(context) {
      await Promise.all(
        context.state.userItems.map(async (item) => {
          await context.dispatch("loadLgtmsByItem", {
            itemId: item.id,
            page: 1,
          });
        })
      );
    },
    async loadLgtmsByItem(context, payload) {
      let per_page = 100;
      await axios
        .get(
          `/api/v2/items/${payload.itemId}/likes?page=${payload.page}&per_page=${per_page}`,
          {
            headers: {
              Authorization: "Bearer " + context.state.apiToken,
            },
          }
        )
        .then(async (res) => {
          context.commit("updateLgtmsByItem", {
            itemId: payload.itemId,
            data: res.data,
          });

          if (
            res.data.length &&
            res.headers["link"] &&
            res.headers["link"].indexOf('rel="next"') != -1
          ) {
            payload.page++;
            await context.dispatch("loadLgtmsByItem", {
              itemId: payload.itemId,
              page: payload.page,
            });
          }
        });
    },
    async loadPvs(context) {
      await Promise.all(
        context.state.userItems.map(async (item) => {
          await axios
            .get(`/api/v2/items/${item.id}`, {
              headers: {
                Authorization: "Bearer " + context.state.apiToken,
              },
            })
            .then(async (res) => {
              context.commit("updatePvs", {
                itemId: item.id,
                page_views_count: res.data.page_views_count,
              });
            });
        })
      );
    },
    async loadStocks(context) {
      await Promise.all(
        context.state.userItems.map(async (item) => {
          await axios
            .get(`/api/v2/items/${item.id}/stockers`, {
              headers: {
                Authorization: "Bearer " + context.state.apiToken,
              },
            })
            .then(async (res) => {
              context.commit("updateStocks", {
                itemId: item.id,
                stocks_count: res.headers["total-count"],
              });
            });
        })
      );
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      key: "qiita-dashboard",
      storage: localStorage,
    }),
  ],
});
