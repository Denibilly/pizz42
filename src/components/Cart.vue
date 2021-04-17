<template>
  <div class="text-center hero">
    <h2 class="mb-4">Cart ({{ $store.state.cartSize }})</h2>
    <div v-if="$store.state.cart.length > 0" class="navbar-dropdown">
      <hr class="navbar-divider">
      <b-container class="navbar-item">
        <b-row v-for="item in $store.state.cart" :key="item.id" >
          <b-col>
            <img :src="'/'+item.images[0]" :alt="item.name" class="card-img-top">
          </b-col>
          <b-col>
          {{ item.name }} x <b>{{ item.quantity }}</b>
          </b-col>
          <b-col>
            £{{ item.totalPrice }}
          </b-col>
          <b-col>
            <b-button variant="danger" title="Remove from cart" @click.prevent="removeFromCart(item)">X</b-button>
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
          <b-col>
            <b-button variant="success" @click="callApi($store.state.cart)">Checkout</b-button>
          </b-col>
        </b-row>
      </b-container>
      <hr class="navbar-divider">
    </div>
    <div v-else class="navbar-dropdown is-boxed is-right">
        <h5>
            Cart is empty
        </h5>
    </div>
    <p>{{ apiMessage }}</p>
    <p>Permissions --> {{ permissions }}</p>
    <p>Decoded token --> {{ token }}</p>
  </div>
</template>

<script>
import axios from "axios";
import Vue from 'vue';
import jwt_decode from "jwt-decode";

export default {
  name: "Order",
  data() {
    return {
      apiMessage: "",
      token: "",
      permissions: "",
    };
  },
  computed: {
    totalPrice() {
      return this.$store.getters.totalPrice;
    },
  },
  methods: {
    getDate(){
      let date_ob = new Date();
      // current date
      // adjust 0 before single digit date
      let date = ("0" + date_ob.getDate()).slice(-2);
      // current month
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      // current year
      let year = date_ob.getFullYear();
      // current hours
      let hours = date_ob.getHours();
      // current minutes
      let minutes = date_ob.getMinutes();
      // prints date in YYYY-MM-DD format
      return date + "-" + month + "-" + year + " " + hours + ":" + minutes;
    },
    removeFromCart(item) {
        this.$store.commit('removeFromCart', item);
    },
    async callApi(cart) {
      const accessToken = await this.$auth.getTokenSilently();
      this.token = jwt_decode(accessToken);
      this.permissions = this.token.permissions;
      if(this.$auth.user.email_verified && this.token.permissions.includes("order:pizza")){
        const { data } = await axios.post("https://api-pizz.herokuapp.com/api/external", {
          data: cart,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken
          }
        })
        this.apiMessage = "Order has been confirmed";
        let pizzas = data.map(item => ({"name":item.name, "quantity":item.quantity, "price":item.totalPrice, "images": item.images}));
        if(this.$auth.user.user_metadata){
          this.$auth.user.user_metadata.push({date:this.getDate(), pizzas});
        }
        else {
          Vue.set(this.$auth.user, 'user_metadata', [{date:this.getDate(), pizzas}]);
        }
      }
      else if(!this.token.permissions.includes("order:pizza2")){
        this.apiMessage = "Please check your user permissions to have access to 'order:pizza'.";
      }
      else {
        this.apiMessage = "Please verify your email before ordering with us. Thank you";
      }
    }
  }
}

</script>

<style scoped>
  .navbar-item {
    background-color: #00639128!important;
  }
  .row { 
    min-height: 100px;
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