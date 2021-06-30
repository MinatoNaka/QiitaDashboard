<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script>
import { Chart } from "highcharts-vue";
import lgtmMixin from "../mixins/lgtmMixin";

export default {
  name: "LgtmsAll",
  components: {
    highcharts: Chart,
  },
  mixins: [lgtmMixin],
  data() {
    return {
      blockName: "lgtms-all",
    };
  },
  methods: {
    aggregateLgtms() {
      const lgtmsByItem = this.$store.getters.currentLgtmsByItem;
      const lgtmsAll = {};
      for (const itemId of Object.keys(lgtmsByItem)) {
        const lgtms = lgtmsByItem[itemId];
        lgtms.forEach((lgtm) => {
          const lgtmDate = this.$moment(
            lgtm.created_at.substr(0, 10)
          ).valueOf();
          lgtmsAll[lgtmDate] = lgtmsAll[lgtmDate] ?? 0;
          lgtmsAll[lgtmDate]++;
        });
      }

      return lgtmsAll;
    },
  },
};
</script>
