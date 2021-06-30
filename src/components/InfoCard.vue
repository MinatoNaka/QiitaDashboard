<template>
  <b-overlay :show="$store.state[watchState]" rounded="sm" class="h-100">
    <b-card no-body class="shadow border-0 h-100">
      <b-card-body class="p-1">
        <b-row class="h-100">
          <b-col cols="4" class="h-100">
            <b-icon
              class="bg-primary p-2 h-100"
              :icon="icon"
              variant="light"
              font-scale="4"
            ></b-icon>
          </b-col>
          <b-col cols="8">
            <div class="mr-2">
              <h5 class="text-right mt-2">
                {{ title }}
              </h5>
              <h3 class="text-right mt-3">
                {{ formatData }}
              </h3>
              <h3 class="text-right mt-3" v-if="ranking">
                {{ ranking }}<small>位/{{ itemsCount }}</small>
              </h3>
              <hr class="my-1" />
            </div>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </b-overlay>
</template>

<script>
export default {
  name: "InfoCard",
  props: {
    title: String,
    data: Number,
    icon: String,
    watchState: String,
    ranking: Number,
  },
  computed: {
    formatData() {
      return this.data ? this.data.toLocaleString() : 0;
    },
    itemsCount() {
      return this.$store.getters.currentItems.length;
    },
  },
};
</script>
