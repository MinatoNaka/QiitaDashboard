export default {
  mounted() {
    this.chartOptions.chart.width = document.getElementById(
      "ranking"
    ).clientWidth;
    this.chartOptions.title.text = this.name;
    this.chartOptions.series[0].name = this.name;
    this.watchLoading();
    this.drawChart();
  },
  data() {
    return {
      chartOptions: {
        credits: {
          enabled: false,
        },
        chart: {
          type: "bar",
        },
        title: {
          text: "",
        },
        legend: { enabled: false },
        xAxis: {
          type: "category",
          labels: {
            formatter: function() {
              return this.value.length <= 20
                ? this.value
                : this.value.slice(0, 20) + "...";
            },
          },
        },
        yAxis: [
          {
            title: {
              enabled: false,
            },
          },
          {
            title: {
              enabled: false,
            },
            linkedTo: 0,
            opposite: true,
          },
        ],
        plotOptions: {
          series: {
            cursor: "pointer",
            point: {
              events: {
                click: (e) => {
                  this.$router.push({
                    name: "Item",
                    params: { itemId: e.point.options.id },
                  });
                },
              },
            },
          },
        },
        series: [
          {
            name: "",
            data: null,
          },
        ],
      },
    };
  },
  methods: {
    watchLoading() {
      this.$store.watch(
        (state) => state[this.watchState],
        (newValue) => {
          if (!newValue) {
            this.drawChart();
          }
        }
      );
    },
    drawChart() {
      let chartData = this.$store.getters.currentItems.map((item) => {
        return {
          id: item.id,
          name: item.title,
          y: item[this.property],
        };
      });

      chartData.sort(function(a, b) {
        if (a.y > b.y) {
          return -1;
        } else {
          return 1;
        }
      });

      this.chartOptions.chart.height = chartData.length * 40 + 100;
      this.chartOptions.series[0].data = chartData;
    },
  },
};
