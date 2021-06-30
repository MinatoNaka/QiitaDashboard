<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script>
import { Chart } from "highcharts-vue";
import rankingMixin from "../mixins/rankingMixin";

export default {
  name: "RankingPv",
  components: {
    highcharts: Chart,
  },
  mixins: [rankingMixin],
  data() {
    return {
      name: "PV数",
      property: "page_views_count",
      watchState: "loadingPvs",
    };
  },
};
</script>
