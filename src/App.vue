<template>
  <div id="app" class="d-flex flex-column h-100">
    <nav-bar />
    <div class="container flex-grow-1">
      <error />
      <div class="mt-5">
        <router-view />
      </div>
    </div>
    <footer class="bg-light text-center p-3 footer">
      <p>
        © 1988-2021, Pizza 42, Inc.
      </p>
    </footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Error from "./components/Error";

export default {
  components: {
    NavBar,
    Error
  }
};
</script>

<style scoped>
  .mt-5 {
    margin-top: 10px!important;
  }

  .footer {
    background-color: #006491!important;
  }

</style>