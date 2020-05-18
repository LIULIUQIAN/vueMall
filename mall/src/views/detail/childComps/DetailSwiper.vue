<template>
    <swiper v-if="images.length" class="detail-swiper">
        <swiper-item v-for="item in images">
            <img :src="item">
        </swiper-item>
    </swiper>
</template>

<script>
    import Swiper from "../../../components/common/swiper/Swiper";
    import SwiperItem from "../../../components/common/swiper/SwiperItem";

    export default {
        name: "DetailSwiper",
        props: {
            images: {
                type: Array,
                default: []
            }
        },
        components: {
            Swiper,
            SwiperItem
        }
    }
</script>

<style scoped>
    .detail-swiper{
        height: 300px;
    }

</style>