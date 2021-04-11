<template>
  <div>
    <h3 class="page_title">Menu</h3>
    <b-card-group>        
      <div class="col-md-3" v-for="product in store.products" :key="product.id">
        <div class="card">
          <router-link :to="{ name: 'product', params: { id: product.id } }">
          <img :src="'/'+product.images[0]" :alt="product.name" class="card-img-top">
          </router-link>
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <div class="card-text">£{{ product.price }}</div>
            <div class="row justify-content-end">
              <button class="btn btn-primary" @click="addToCart(product)">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </b-card-group>
  </div>
</template>

<script>
  export default {
    name: "HomeContent",
    methods: {
      addToCart(item) {
          this.$store.commit('addToCart', item)
      },
    },
    computed: {
      store() {
        return this.$store.state;
      },
    },
  };

</script>

<style>
  .card-title {
    height: 50px;
  }

  .page_title {
    margin-bottom: 30px;
    margin-top: 30px;
  }

</style>


