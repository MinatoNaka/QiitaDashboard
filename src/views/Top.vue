<template>
  <div>
    <b-container fluid>
      <profile></profile>
      <b-row class="my-5">
        <b-col sm="12" id="lgtms-all">
          <b-overlay :show="this.$store.state.loadingLgtms" rounded="sm">
            <lgtms-all class="shadow"></lgtms-all>
          </b-overlay>
        </b-col>
      </b-row>
      <ranking></ranking>
    </b-container>
  </div>
</template>

<script>
import Profile from "../components/Profile.vue";
import LgtmsAll from "../components/charts/LgtmsAll.vue";
import Ranking from "../components/Ranking.vue";

export default {
  name: "Top",
  components: {
    Profile,
    LgtmsAll,
    Ranking,
  },
};
</script>
