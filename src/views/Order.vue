<template>
  <div class="text-center hero">
    <h2 class="mb-4">Cart ({{ $store.state.cartSize }})</h2>
    <div v-if="$store.state.cart.length > 0" class="navbar-dropdown">
      <b-container>
        <b-row v-for="item in $store.state.cart" :key="item.id" class="navbar-item">
          <b-col>
            <img :src="'/'+item.images[0]" :alt="item.name" class="card-img-top">
          </b-col>
          <b-col class="textCol">
          {{ item.name }} x <b>{{ item.quantity }}</b>
          </b-col>
          <b-col class="textCol">
            £{{ item.totalPrice }}
          </b-col>
          <b-col class="textCol">
            <b-button variant="danger" title="Remove from cart" @click.prevent="removeFromCart(item)">X</b-button>
          </b-col>
        </b-row>
      </b-container>
      <hr class="navbar-divider">
      <div>Total: ${{ totalPrice }}</div>
      <hr class="navbar-divider">
      <b-button variant="success" @click="callApi($store.state.cart)">Checkout</b-button>
    </div>
    <div v-else class="navbar-dropdown is-boxed is-right">
        <h5>
            Cart is empty
        </h5>
    </div>
    <p>{{ apiMessage[0] }}</p>
    <p>{{ apiMessage[1] }}</p>
    <p>{{ apiMessage[2] }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Order",
  data() {
    return {
      apiMessage: ""
    };
  },
  computed: {
    totalPrice() {
      return this.$store.getters.totalPrice;
    },
  },
  methods: {
    removeFromCart(item) {
        this.$store.commit('removeFromCart', item);
    },
    async callApi(cart) {
      const accessToken = await this.$auth.getTokenSilently();
      const { data } = await axios.post("http://localhost:3001/api/external", {
        data: cart,
      },
      {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      })
      this.apiMessage = data;
    }
  }
}

</script>

<style scoped>
  .navbar-item {
    background-color: #00639128!important;
;
  }
  .hero {
    max-width: none;
  }
  .textCol {
    margin: auto;
  }
  .card-img-top {
    width: 150px!important;
    margin: 5px;
  }
</style>