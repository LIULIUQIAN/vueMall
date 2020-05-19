<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartCount}})</div>
    </nav-bar>
    <cart-list></cart-list>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import NavBar from '../../components/common/navbar/NavBar'
  import CartList from "./childComps/CartList";

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList
    },
    computed:{
      ...mapGetters(['cartCount'])

    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
    background-color: #FFFFFF;
    position: relative;
  }
  .nav-bar{
    background-color: var(--color-high-text);
    color: #FFFFFF;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }


</style>
