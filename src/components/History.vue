<template>
  <div class="text-center hero">
    <h3 class="mb-4">History</h3>
    <div v-if="historyLength > 0" class="navbar-dropdown">
      <hr class="navbar-divider">
      <b-container class="navbar-item">
        <b-row v-for="order in history" :key="order.index">
          <b-col>
            <a href="" v-b-toggle="'order'+order.index" @click="historyClick">{{ order.date }} </a>
            <b-collapse :id="'order'+order.index">
              <b-container class="history-item">
                <b-row v-for="pizza in order.cart" :key="pizza.id" >
                  <b-col>
                    <img :src="'/'+pizza.images[0]" :alt="pizza.name" class="card-img-top">
                  </b-col>
                  <b-col>
                  {{ pizza.name }} x <b>{{ pizza.quantity }}</b>
                  </b-col>
                  <b-col>
                    £{{ pizza.price }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                  </b-col>
                  <b-col>
                  </b-col>
                  <b-col>
                    <div>Total: £{{ totalPrice }}</div>
                  </b-col>
                </b-row>
              </b-container>
            </b-collapse>
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
  data(){
    return {
      showSection: false
    }
  },
  methods: {
      historyClick(e) {
          e.preventDefault();
          this.showSection = !this.showSection;         
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
    },
    totalPrice() {
      return this.$store.getters.totalPrice;
    },
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
    width: 50px!important;
    margin: 5px;
  }
</style>