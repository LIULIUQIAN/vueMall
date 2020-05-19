<template>
    <div id="detail">
        <detail-nav-bar @itemClick="itemClick" :current-index="currentIndex"></detail-nav-bar>
        <scroll class="content"
                ref="scroll"
                @scroll="contentScroll"
                :probe-type="3">
            <detail-swiper :images="topImages" ref="base"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
            <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
            <detail-recommend-info :recommend-list="recommendList" ref="recommend"></detail-recommend-info>
        </scroll>
        <back-top v-show="showBackTop" @click.native="scrollTop"></back-top>
        <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    </div>
</template>

<script>
    import {backTopMixin} from "../../commo/mixin";
    import {getDetail, getRecommend, Goods, Shop, GoodsParam} from '../../network/detail'
    import DetailNavBar from "./childComps/DetailNavBar";
    import Scroll from "../../components/common/scroll/Scroll";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
    import BackTop from '../../components/content/backTop/BackTop'
    import DetailBottomBar from "./childComps/DetailBottomBar";
    import {debounce} from "../../commo/utils";

    export default {
        name: "Detail",
        mixins: [backTopMixin],
        data() {
            return {
                iid: '',
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommendList: [],
                themeTops: [],
                currentIndex: 0
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
            DetailRecommendInfo,
            BackTop,
            DetailBottomBar

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
                    if (data.rate.list.length) {
                        this.commentInfo = data.rate.list[0];
                    }

                })
            },
            getRecommendData() {
                getRecommend().then((res, error) => {
                    if (error) return
                    this.recommendList = res.data.list
                })
            },
            detailImageLoad() {
                this.$refs.scroll.refresh()
            },
            contentScroll(position) {
                this.changePosition(position)

                let length = this.themeTops.length - 1;
                for (let i = 0; i < length; i++) {
                    let iPos = this.themeTops[i];
                    if (this.currentIndex !== i && (-position.y >= iPos && -position.y < this.themeTops[i+1])) {
                        this.currentIndex = i;
                        break;
                    }
                }

            },
            getOffsetTops(){
                this.themeTops = []
                this.themeTops.push(this.$refs.base.$el.offsetTop)
                this.themeTops.push(this.$refs.param.$el.offsetTop)
                this.themeTops.push(this.$refs.comment.$el.offsetTop)
                this.themeTops.push(this.$refs.recommend.$el.offsetTop)
                this.themeTops.push(Number.MAX_VALUE)
            },
            itemClick(index){
                this.$refs.scroll.scrollTo(0,-this.themeTops[index])
                this.$refs.scroll.refresh()
            },
            addToCart(){
                const obj = {}
                obj.iid = this.iid;
                obj.imgURL = this.topImages[0]
                obj.title = this.goods.title
                obj.desc = this.goods.desc;
                obj.newPrice = this.goods.nowPrice;
                this.$store.commit('addCart',obj)
            }

        },
        created() {
            this.iid = this.$route.params.id
            this.getDetailData()
            this.getRecommendData()
        },
        mounted() {
            const refresh = debounce(this.$refs.scroll.refresh,500)
            this.$bus.$on('itemImageLoad', () => {
                refresh()
            });
        },
        updated() {
            this.getOffsetTops()
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