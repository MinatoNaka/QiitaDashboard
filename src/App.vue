<template>
  <div id="app">
    <b-container fluid class="p-0">
      <b-navbar type="dark" variant="dark">
        <b-navbar-brand href="#">Qiita Dashboard</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <div v-if="isProduction">
            <b-badge variant="danger">サンプルデータ表示中</b-badge>
          </div>
          <!-- productionでは表示切替不可 -->
          <template v-if="!isProduction">
            <b-button
              v-if="!this.$store.state.showSample"
              @click="showSample"
              variant="primary"
            >
              サンプルデータ表示
            </b-button>
            <b-button
              v-if="this.$store.state.showSample"
              variant="primary"
              v-b-modal.change-user
            >
              自分のデータ表示
            </b-button>
          </template>
        </b-navbar-nav>
      </b-navbar>
    </b-container>
    <router-view />
    <change-user></change-user>
  </div>
</template>

<script>
import ChangeUser from "./components/ChangeUser.vue";

export default {
  components: {
    ChangeUser,
  },
  async mounted() {
    await this.loadData();
  },
  computed: {
    isProduction() {
      return process.env.NODE_ENV == "production";
    },
  },
  methods: {
    async loadData() {
      // productionでは強制的にサンプル表示
      if (!this.$store.state.apiToken || this.isProduction) {
        this.$store.commit("updateShowSample", true);
      }

      this.$store.dispatch("loadData");
    },
    showSample() {
      this.$store.commit("updateShowSample", true);
      this.$store.dispatch("loadData");
    },
  },
};
</script>
