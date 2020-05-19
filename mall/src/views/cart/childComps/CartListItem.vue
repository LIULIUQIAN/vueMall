<template>
    <div class="shop-item">
        <img :src="itemInfo.imgURL" class="item-img">
        <div class="item-info">
            <div class="item-title">{{itemInfo.title}}</div>
            <div class="item-desc">商品描述：{{itemInfo.desc}}</div>
            <div class="info-bottom">
                <div class="item-price">¥{{itemInfo.newPrice}}</div>
                <div>x{{itemInfo.count}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CartListItem",
        props: {
            itemInfo: {
                type: Object,
                default: {}
            }
        }
    }
</script>

<style scoped>

    .shop-item{
        width: 100%;
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }
    .item-img{
        width: 80px;
        height: 100px;
        border-radius: 5px;
    }
    .item-info{
        font-size: 17px;
        color: #333333;
        padding: 2px 10px;
    }
    .item-title, .item-desc {

        overflow: hidden;
        text-overflow: ellipsis;
        -ms-text-overflow: ellipsis;
        display: -webkit-box;
        line-clamp: 1;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
    .item-desc {
        font-size: 14px;
        color: #666;
        margin-top: 15px;
    }

    .info-bottom{
        display: flex;
        justify-content: space-between;
        margin-top: 23px;
    }
    .item-price{
        color: orangered;
    }

</style>