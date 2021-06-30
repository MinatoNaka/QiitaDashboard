<template>
  <div id="ranking" class="shadow mb-5">
    <b-tabs content-class="mt-3" justified>
      <template #tabs-start>
        <li class="nav-item align-self-center">ランキング</li>
      </template>
      <b-tab v-for="ranking in rankings" :key="ranking.id">
        <template #title>
          <b-spinner
            v-show="$store.state[ranking.watchState]"
            type="border"
            small
          ></b-spinner>
          {{ ranking.name }}
        </template>
        <b-overlay :show="$store.state[ranking.watchState]" rounded="sm">
          <component :is="ranking.id"></component>
        </b-overlay>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import RankingLgtm from "./charts/RankingLgtm.vue";
import RankingStock from "./charts/RankingStock.vue";
import RankingPv from "./charts/RankingPv.vue";
import RankingLgtmRate from "./charts/RankingLgtmRate.vue";

export default {
  name: "Ranking",
  components: {
    RankingLgtm,
    RankingStock,
    RankingPv,
    RankingLgtmRate,
  },
  data() {
    return {
      rankings: [
        {
          id: "RankingLgtm",
          name: "LGTM数",
          watchState: "loadingItems",
        },
        {
          id: "RankingPv",
          name: "PV数",
          watchState: "loadingPvs",
        },
        {
          id: "RankingStock",
          name: "ストック数",
          watchState: "loadingStocks",
        },
        {
          id: "RankingLgtmRate",
          name: "LGTM率",
          watchState: "loadingPvs",
        },
      ],
    };
  },
};
</script>
