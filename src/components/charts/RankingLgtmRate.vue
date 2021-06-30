<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script>
import { Chart } from "highcharts-vue";
import rankingMixin from "../mixins/rankingMixin";

export default {
  name: "RankingLgtmRate",
  components: {
    highcharts: Chart,
  },
  mixins: [rankingMixin],
  data() {
    return {
      name: "LGTM率(%)",
      property: "lgtm_rate",
      watchState: "loadingPvs",
    };
  },
};
</script>
