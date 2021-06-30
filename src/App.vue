<template>
  <div id="app">
    <b-container fluid class="p-0">
      <b-navbar type="dark" variant="dark">
        <b-navbar-brand href="#">Qiita Dashboard</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
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
  methods: {
    async loadData() {
      if (!this.$store.state.apiToken) {
        this.$store.commit("updateShowSample", true);
        return;
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
