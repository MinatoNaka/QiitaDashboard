<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script>
import { Chart } from "highcharts-vue";
import rankingMixin from "../mixins/rankingMixin";

export default {
  name: "RankingLgtm",
  components: {
    highcharts: Chart,
  },
  mixins: [rankingMixin],
  data() {
    return {
      name: "LGTM数",
      property: "likes_count",
      watchState: "loadingItems",
    };
  },
};
</script>
