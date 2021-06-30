<template>
  <b-row class="my-3">
    <b-col sm="4" class="mb-3 mb-sm-0">
      <b-overlay :show="this.$store.state.loadingProfile" rounded="sm">
        <b-card no-body class="shadow border-0">
          <b-card-body class="p-1">
            <b-container>
              <b-row>
                <b-img
                  center
                  thumbnail
                  rounded="circle"
                  width="100"
                  height="100"
                  :src="currentProfile.profile_image_url"
                  alt="user-icon"
                  class="shadow"
                ></b-img>
              </b-row>
              <h3 class="text-center">
                {{ currentProfile.name }}
              </h3>
              <p class="text-center">
                <b-link :href="profileUrl" target="_blank">
                  @{{ currentProfile.id }}
                  <b-icon icon="box-arrow-up-right"></b-icon>
                </b-link>
              </p>
              <p class="text-center">
                {{ currentProfile.description }}
              </p>
              <p class="text-center text-muted small">
                <b-icon
                  icon="building"
                  v-if="currentProfile.organization"
                ></b-icon>
                {{ currentProfile.organization }}
              </p>
            </b-container>
            <b-card-text> </b-card-text>
          </b-card-body>
        </b-card>
      </b-overlay>
    </b-col>
    <b-col sm="8">
      <b-row class="h-50 pb-2">
        <b-col sm="4">
          <info-card
            title="投稿"
            :data="currentProfile.items_count"
            icon="card-heading"
          ></info-card>
        </b-col>
        <b-col sm="4">
          <info-card
            title="フォロワー"
            :data="currentProfile.followers_count"
            icon="people-fill"
          ></info-card>
        </b-col>
        <b-col sm="4">
          <info-card
            title="LGTM数"
            :data="likesCount"
            icon="hand-thumbs-up"
            watchState="loadingLgtms"
          ></info-card>
        </b-col>
      </b-row>
      <b-row class="h-50 pt-2">
        <b-col sm="4">
          <info-card
            title="PV数"
            :data="pageViewsCount"
            icon="eye-fill"
            watchState="loadingPvs"
          ></info-card>
        </b-col>
        <b-col sm="4">
          <info-card
            title="ストック数"
            :data="stocksCount"
            icon="bookmark-check-fill"
            watchState="loadingStocks"
          ></info-card>
        </b-col>
        <b-col sm="4">
          <info-card
            title="LGTM率(%)"
            :data="lgtmRate"
            icon="graph-up"
            watchState="loadingPvs"
          ></info-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import InfoCard from "./InfoCard.vue";

export default {
  name: "Profile",
  components: {
    InfoCard,
  },
  computed: {
    currentProfile() {
      return this.$store.getters.currentProfile;
    },
    profileUrl() {
      return "https://qiita.com/" + this.$store.getters.currentProfile.id;
    },
    likesCount() {
      return this.getSum("likes_count");
    },
    pageViewsCount() {
      return this.getSum("page_views_count");
    },
    stocksCount() {
      return this.getSum("stocks_count");
    },
    lgtmRate() {
      const lgtmRateSum = this.getSum("lgtm_rate");

      return (
        Math.round(
          (lgtmRateSum / this.$store.getters.currentProfile.items_count) * 100
        ) / 100
      );
    },
  },
  methods: {
    getSum(field) {
      return this.$store.getters.currentItems.reduce((sum, item) => {
        return sum + item[field];
      }, 0);
    },
  },
};
</script>
