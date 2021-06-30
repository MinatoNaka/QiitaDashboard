<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script>
import { Chart } from "highcharts-vue";
import rankingMixin from "../mixins/rankingMixin";

export default {
  name: "RankingStock",
  components: {
    highcharts: Chart,
  },
  mixins: [rankingMixin],
  data() {
    return {
      name: "ストック数",
      property: "stocks_count",
      watchState: "loadingStocks",
    };
  },
};
</script>
