<template>
  <div class="text-center hero">
    <img class="mb-3 app-logo" src="/42_full.jpg" alt="Vue.js logo" width="120" />
    <h1 class="mb-4">This is the order page</h1>
    <p class="lead">Please login to order a slice of our famous pizza</p>
    <button @click="callApi">Call</button>
    <p>{{ apiMessage }}</p>
  </div>
</template>

<script>

export default {
  name: "Order",
  data() {
    return {
      apiMessage: ""
    }
  },
  methods: {
    async callApi() {
      const accessToken = await this.$auth.getTokenSilently( {
        "client_id":"KONoVylUyfZMiHq5rbxdI0sKA4DA8LY8"
      });
      alert("token "+accessToken)
      const result = await fetch('http://localhost:3001/api/external', {
        method: 'get',
        headers: { 
          authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ikp5ZzBaVUdWd2FCcEVjNmxSMnRuOCJ9.eyJpc3MiOiJodHRwczovL2Rldi0yaDUzaWFrZC5ldS5hdXRoMC5jb20vIiwic3ViIjoiS09Ob1Z5bFV5ZlpNaUhxNXJieGRJMHNLQTREQThMWThAY2xpZW50cyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9hcGkvZXh0ZXJuYWwiLCJpYXQiOjE2MTc5ODY4MTQsImV4cCI6MTYxODA3MzIxNCwiYXpwIjoiS09Ob1Z5bFV5ZlpNaUhxNXJieGRJMHNLQTREQThMWTgiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.d9s3ei4JnBZZw6EGDp4nxnTXfMKyDC_Dy_xyvoKGDCiog1lojJVpi06KtNT6p_V358RGfYjty4WOcRkWStd-qQRbBna-oa0d9mGFPW72bV9MNp2FfigEjA7kFjHBKhy9dyFiepKXFZNMqsyyTCmrD-sdm8RsRUPoDFw_R1y92PwX831I6_hRbQQcsI8s4n7n0Rg44ktybnDxbQhJkieztE35fKkrYE_3y8LYC_h5R-aOZ1LrOXbgbOrOHbobDrYN6HOyCdvvxSfBikOHWffb272c3X_vJKlF0-Q96h9MntNbWcxHB0o1CuiewZUvjTUzzVdLlwjtARGWwHR6J7NzgQ'
          } 
      });
      this.apiMessage = await JSON.stringify(result);
   }
  }
  /*
    async callApi() {
      // Get the access token from the auth wrapper
      const token = await this.$auth.getIdTokenClaims();
      // Use fetch to make a call to the API
      const response = await fetch("http://localhost:3001/api/external", {
        method: 'POST',
        mode: "no-cors",
        headers: {
          Authorization: "Bearer "+token
        },
        body: JSON.stringify({
          pizzaType: "Pizza"
        })
      });
      this.apiMessage = JSON.stringify(response);
    }
  }
  */
};


</script>
