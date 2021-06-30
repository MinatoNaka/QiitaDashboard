<template>
  <b-container fluid>
    <b-row class="my-3" align-v="center">
      <b-col sm="1" class="text-center">
        <b-link :to="{ name: 'Top' }">
          <b-icon icon="arrow-left-circle-fill" class="h2 my-auto"></b-icon>
        </b-link>
      </b-col>
      <b-col sm="11">
        <h1>
          {{ item.title }}
          <b-link :href="item.url" target="blank">
            <b-icon icon="box-arrow-up-right" class="h3"></b-icon>
          </b-link>
        </h1>
      </b-col>
    </b-row>
    <hr />
    <b-row class="my-5">
      <b-col sm="3" v-for="ranking in rankings" :key="ranking.id">
        <info-card
          :title="ranking.name"
          :data="item[ranking.property]"
          :icon="ranking.icon"
          :watchState="ranking.watchState"
          :ranking="getRank(ranking.property)"
        ></info-card>
      </b-col>
    </b-row>
    <b-row class="my-5">
      <b-col sm="12" id="lgtms-by-item">
        <b-overlay :show="this.$store.state.loadingLgtms" rounded="sm">
          <lgtms-by-item class="shadow" v-bind:itemId="itemId"></lgtms-by-item>
        </b-overlay>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import LgtmsByItem from "../components/charts/LgtmsByItem";
import InfoCard from "../components/InfoCard";

export default {
  name: "Item",
  components: {
    LgtmsByItem,
    InfoCard,
  },
  props: {
    itemId: String,
  },
  data() {
    return {
      rankings: [
        {
          name: "LGTM数",
          property: "likes_count",
          watchState: "loadingItems",
          icon: "hand-thumbs-up",
        },
        {
          name: "PV数",
          property: "page_views_count",
          watchState: "loadingPvs",
          icon: "eye-fill",
        },
        {
          name: "ストック数",
          property: "stocks_count",
          watchState: "loadingStocks",
          icon: "bookmark-check-fill",
        },
        {
          name: "LGTM率(%)",
          property: "lgtm_rate",
          watchState: "loadingPvs",
          icon: "graph-up",
        },
      ],
    };
  },
  computed: {
    item() {
      return this.$store.getters.currentItems.find(
        (item) => item.id == this.itemId
      );
    },
    itemsCount() {
      return this.$store.getters.currentItems.length;
    },
    getRank() {
      return (field) => {
        const data = this.$store.getters.currentItems.concat();
        data.sort((a, b) => {
          if (a[field] > b[field]) {
            return -1;
          } else {
            return 1;
          }
        });

        return data.findIndex((item) => item.id == this.itemId) + 1;
      };
    },
  },
};
</script>
