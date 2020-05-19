<template>
    <scroll class="content">
        <cart-list-item v-for="(item,index) in cartList" :item-info="item"></cart-list-item>
    </scroll>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Scroll from "../../../components/common/scroll/Scroll";
    import CartListItem from "./CartListItem";

    export default {
        name: "CartList",
        components:{
            Scroll,
            CartListItem
        },
        computed:{
            ...mapGetters(['cartList'])
        }
    }
</script>

<style scoped>

    .content {
        position: absolute;
        top: 44px;
        bottom: 60px;
        left: 0;
        right: 0;
    }

</style>