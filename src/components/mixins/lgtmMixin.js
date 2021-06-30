export default {
  async mounted() {
    this.watchLoadingLgtms();
    this.buildChart();
  },
  data() {
    return {
      chartOptions: {
        credits: {
          enabled: false,
        },
        chart: {
          type: "line",
          scrollablePlotArea: {
            scrollPositionX: 1,
          },
        },
        title: {
          text: "1日ごとのLGTM数",
        },
        legend: { enabled: false },
        xAxis: {
          type: "datetime",
          dateTimeLabelFormats: {
            day: "%m/%e",
            week: "%m/%e",
            month: "%Y/%m",
            year: "%Y",
          },
        },
        yAxis: {
          title: {
            text: null,
          },
        },
        tooltip: {
          dateTimeLabelFormats: {
            day: "%m/%e(%a)",
            week: "%m/%e",
            month: "%Y/%m",
            year: "%Y",
          },
        },
        series: [],
        time: {
          timezoneOffset: -9 * 60,
        },
      },
    };
  },
  methods: {
    watchLoadingLgtms() {
      this.$store.watch(
        (state) => state.loadingLgtms,
        (newValue) => {
          if (!newValue) {
            this.buildChart();
          }
        }
      );
    },
    buildChart() {
      const lgtmsAll = this.aggregateLgtms();
      const emptyLgtms = this.createEmptyLgtms(lgtmsAll);
      const chartData = this.createChartData(emptyLgtms, lgtmsAll);
      this.drawChart(chartData);
    },
    createEmptyLgtms(lgtmsAll) {
      const lgtmDays = Object.keys(lgtmsAll).sort();
      let firstDay = Number(lgtmDays.shift());
      const lastDay = Number(lgtmDays.pop());
      const emptyLgtms = {};
      while (firstDay <= lastDay) {
        emptyLgtms[firstDay] = 0;
        firstDay += 86400000;
      }

      return emptyLgtms;
    },
    createChartData(emptyLgtms, lgtmsAll) {
      // 空データと集計データをマージすることでlgtm0件の日もデータに入れる
      let chartData = Object.assign(emptyLgtms, lgtmsAll);
      chartData = Object.entries(chartData).map((item) => {
        return [Number(item[0]), item[1]];
      });

      return chartData;
    },
    drawChart(chartData) {
      const divWidth = document.getElementById(this.blockName).clientWidth;
      this.chartOptions.chart.scrollablePlotArea.minWidth = Math.max(
        divWidth,
        chartData.length * 10
      );
      this.chartOptions.series.splice(0, 1, {
        name: "LGTM",
        data: chartData,
      });
    },
  },
};
