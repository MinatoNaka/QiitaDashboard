<template>
  <b-modal
    id="change-user"
    ref="modal"
    title="自分のデータ表示"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        label="APIトークン"
        label-for="api-token"
        invalid-feedback="ApiToken is required"
        :state="apiTokenState"
      >
        <b-form-input
          id="api-token"
          ref="apiToken"
          v-model="apiToken"
          :state="apiTokenState"
          required
        ></b-form-input>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
export default {
  name: "ChangeUser",
  data() {
    return {
      apiToken: "",
      apiTokenState: null,
    };
  },
  methods: {
    checkFormValidity() {
      return this.$refs.apiToken.checkValidity();
    },
    resetModal() {
      this.apiToken = "";
      this.apiTokenState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }

      if (this.$store.state.apiToken !== this.apiToken) {
        this.$store.commit("updateLastLoadedAt", true);
      }

      this.$store.commit("updateApiToken", this.apiToken);
      this.$store.commit("updateShowSample", false);
      this.$store.dispatch("loadData");

      this.$nextTick(() => {
        this.$bvModal.hide("change-user");
      });
    },
  },
};
</script>
