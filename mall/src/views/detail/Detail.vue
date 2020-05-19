<template>
    <div id="detail">
        <detail-nav-bar></detail-nav-bar>
        <scroll class="content"
                ref="scroll">
            <detail-swiper :images="topImages" ref="base"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
<!--            <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>-->
            <detail-param-info :param-info="paramInfo"></detail-param-info>
            <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
        </scroll>
    </div>
</template>

<script>
    import {getDetail,Goods,Shop,GoodsParam} from '../../network/detail'
    import DetailNavBar from "./childComps/DetailNavBar";
    import Scroll from "../../components/common/scroll/Scroll";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";

    export default {
        name: "Detail",
        data() {
            return {
                iid: '',
                topImages: [],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo: {},
                commentInfo:{},
                themeTops:[]
            }
        },
        components: {
            DetailNavBar,
            Scroll,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo

        },
        methods: {
            getDetailData() {
                getDetail(this.iid).then(res => {
                    const data = res.result;
                    console.log(res)
                    this.topImages = data.itemInfo.topImages;
                    this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
                    this.shop = new Shop(data.shopInfo)
                    this.detailInfo = data.detailInfo
                    this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
                    if (data.rate.list.length){
                        this.commentInfo = data.rate.list[0];
                    }

                })
            },
            detailImageLoad(){
                this.$refs.scroll.refresh()
            }
        },

        created() {
            this.iid = this.$route.params.id
            this.getDetailData()
        }
    }
</script>

<style scoped>
    #detail {
        height: 100vh;
        background-color: #FFFFFF;
        z-index: 1;
        position: relative;
    }

    .content {
        position: absolute;
        top: 44px;
        bottom: 60px;
    }

</style>