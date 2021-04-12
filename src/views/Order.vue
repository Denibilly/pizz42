<template>
  <div>
    <cart />
    <history />
  </div>
</template>

<script>
import Cart from "../components/Cart";
import History from "../components/History";

export default {
  name: "Order",
  components: {
    Cart,
    History
  },  
}

</script>