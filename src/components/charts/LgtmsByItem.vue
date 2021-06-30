<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script>
import { Chart } from "highcharts-vue";
import lgtmMixin from "../mixins/lgtmMixin";

export default {
  name: "LgtmsByItem",
  components: {
    highcharts: Chart,
  },
  props: {
    itemId: String,
  },
  mixins: [lgtmMixin],
  data() {
    return {
      blockName: "lgtms-by-item",
    };
  },
  methods: {
    aggregateLgtms() {
      const lgtms = this.$store.getters.currentLgtmsByItem[this.itemId];
      const lgtmsByItem = {};
      lgtms.forEach((lgtm) => {
        const lgtmDate = this.$moment(lgtm.created_at.substr(0, 10)).valueOf();
        lgtmsByItem[lgtmDate] = lgtmsByItem[lgtmDate] ?? 0;
        lgtmsByItem[lgtmDate]++;
      });

      return lgtmsByItem;
    },
  },
};
</script>
