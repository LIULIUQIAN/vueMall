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
            <detail-recommend-info :recommend-list="recommendList"></detail-recommend-info>
        </scroll>
    </div>
</template>

<script>
    import {getDetail,getRecommend,Goods,Shop,GoodsParam} from '../../network/detail'
    import DetailNavBar from "./childComps/DetailNavBar";
    import Scroll from "../../components/common/scroll/Scroll";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import DetailRecommendInfo from "./childComps/DetailRecommendInfo";

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
                recommendList:[],
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
            DetailCommentInfo,
            DetailRecommendInfo

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
            getRecommendData(){
                getRecommend().then((res, error) =>{
                    if (error) return
                    this.recommendList = res.data.list
                })
            },
            detailImageLoad(){
                this.$refs.scroll.refresh()
            }
        },

        created() {
            this.iid = this.$route.params.id
            this.getDetailData()
            this.getRecommendData()
        },
        mounted() {
            this.$bus.$on('itemImageLoad', () => {
                this.$refs.scroll.refresh()
            });
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