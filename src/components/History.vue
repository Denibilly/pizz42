<template>
  <div class="text-center hero">
    <h3 class="mb-4">History</h3>
    <div v-if="historyLength > 0" class="navbar-dropdown">
      <hr class="navbar-divider">
      <b-container class="navbar-item">
        <b-row v-for="item in history" :key="item.id" >
          <b-col>
            <a href="" @click="historyClick">{{ item.date }} </a>
          </b-col>
        </b-row>
      </b-container>
      <hr class="navbar-divider">
    </div>
    <div v-else class="navbar-dropdown is-boxed is-right">
        <h5>
            History is empty
        </h5>
    </div>
  </div>
</template>

<script>

export default {
  name: "History",
  methods: {
      historyClick: (e) => {
          e.preventDefault();
      }
  },
  computed: {
    history() {
        return this.$auth.user.user_metadata
    },
    historyLength() {
      if(this.$auth.user.user_metadata){
        return this.$auth.user.user_metadata.length;
      }
      else {
          return 0;
      }
    }
  }
}

</script>

<style scoped>
  .navbar-item {
    background-color: #00639128!important;
  }
  .col {
    margin: auto;
  }
  .hero {
    max-width: none;
  }
  .card-img-top {
    width: 100px!important;
    margin: 5px;
  }
</style>