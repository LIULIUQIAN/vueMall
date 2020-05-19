<template>
    <div class="bottom-menu">
        <check-button class="select-all" @checkBtnClick="checkBtnClick" v-model="isSelectAll"></check-button>
        <span>全选</span>
        <span class="total-price">合计: ¥{{totalPrice}}</span>
        <span class="buy-product">去计算({{isSelectCount}})</span>
    </div>
</template>

<script>
    import CheckButton from "./CheckButton";
    export default {
        name: "BottomBar",
        components:{
            CheckButton
        },
        computed:{
            totalPrice(){
                const cartList = this.$store.getters.cartList
              return cartList.filter(item =>{
                    return item.checked
                }).reduce((preValue,item)=>{
                    return preValue + item.count *item.newPrice
                },0).toFixed(2)
            },
            isSelectAll(){
                if (this.$store.getters.cartList.length === 0) return false;
                return this.$store.getters.cartList.find(item => item.checked === false) === undefined;
            },
            isSelectCount(){
                const cartList = this.$store.getters.cartList
                return cartList.filter(item =>{
                    return item.checked
                }).length
            }
        }
    }
</script>

<style scoped>
    .bottom-menu{
        width: 100%;
        height: 44px;
        background-color: #eeeeee;
        position: fixed;
        bottom: 50px;
        left: 0;
        box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
        font-size: 14px;
        color: #888;
        padding-left: 35px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
    }

    .total-price {
        margin-left: 15px;
        font-size: 16px;
        color: #666;
        flex: 1;
    }

    .buy-product {
        background-color: orangered;
        color: #fff;
        width: 100px;
        height: 44px;
        text-align: center;
        line-height: 44px;
    }

</style>