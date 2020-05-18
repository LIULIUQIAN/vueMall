<template>
    <div class="base-info" v-if="Object.keys(goods).length !== 0">
        <div>{{goods.title}}</div>
        <div class="info-price">
            <span class="n-price">{{goods.newPrice}}</span>
            <span class="o-price">{{goods.oldPrice}}</span>
            <span class="discount">{{goods.discount}}</span>
        </div>
        <div class="info-other">
            <span v-for="item in goods.columns">{{item}}</span>
        </div>
        <div class="info-service">
            <span class="info-service-item" v-for="item in goods.services">
                <img :src="item.icon">
                <span>{{item.name}}</span>
            </span>
        </div>

    </div>
</template>

<script>
    export default {
        name: "DetailBaseInfo",
        props: {
            goods: {
                type: Object,
                default: {}
            }
        }
    }
</script>

<style scoped>

    .base-info {
        margin-top: 15px;
        padding: 0 15px;
        color: #333333;
        border-bottom: 5px solid #f2f5f8;
    }

    .info-price {
        margin-top: 10px;
    }

    .n-price {
        font-size: 24px;
        color: var(--color-high-text);
    }

    .o-price {
        font-size: 13px;
        margin-left: 5px;
        text-decoration: line-through;
    }

    .discount {
        font-size: 12px;
        padding: 2px 5px;
        color: #FFFFFF;
        background-color: var(--color-high-text);
        border-radius: 8px;
        margin-left: 5px;

        position: relative;
        top: -8px;
    }

    .info-other {
        margin-top: 15px;
        line-height: 30px;
        display: flex;
        font-size: 13px;
        border-bottom: 1px solid rgba(100, 100, 100, .1);
        justify-content: space-between;
    }

    .info-service{
        display: flex;
        justify-content: space-between;
        line-height: 60px;
    }
    .info-service-item{
        font-size: 12px;
        color: #333333;
    }
    .info-service-item img{
        width: 14px;
        height: 14px;
        position: relative;
        top: 3px;
        margin-right: 2px;
    }

</style>