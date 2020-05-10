<template>
	<div id="home">
		<nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
		<tab-control :titles="['流行', '新款', '精选']" 
		class="fixed" 
		ref="tabControl1" 
		@itemClick="tabControlClick"
		v-show="isTabFixed"></tab-control>
		<scroll class="content" 
		ref="scroll" 
		:pullUpLoad="true" 
		@pullingUp="loadMore"
		:probeType="3"
		@scroll="contentScroll">
			<home-swiper :banners="banners" @swiperLoad="swiperLoad"></home-swiper>
			<recommend-view :recommends="recommends"></recommend-view>
			<tab-control :titles="['流行', '新款', '精选']" ref="tabControl" @itemClick="tabControlClick"></tab-control>
			<goods-list :goodsList="showGoodsList"></goods-list>
		</scroll>
		<back-top v-show="showBackTop" @click.native="scrollTop"></back-top>
	</div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue';
import HomeSwiper from './childComps/HomeSwiper.vue';
import RecommendView from './childComps/RecommendView.vue';
import FeatureView from './childComps/FeatureView.vue';
import TabControl from '../../components/content/tabControl/TabControl.vue';
import Scroll from '../../components/common/scroll/Scroll.vue';
import GoodsList from '../../components/content/GoodsList/GoodsList.vue';
import BackTop from '../../components/content/backTop/BackTop.vue'
import { getHomeMultidata, getHomeData } from '../../network/home.js';
import {debounce} from '../../commo/utils.js' 
export default {
	name: 'Home',
	data() {
		return {
			banners: [],
			recommends: [],
			goodsList: {
				pop: { page: 1, list: [] },
				new: { page: 1, list: [] },
				sell: { page: 1, list: [] }
			},
			currentType: 'pop',
			showBackTop:false,
			tabOffsetTop:0,
			isTabFixed:false,
			saveY:0
		};
	},
	components: {
		NavBar,
		HomeSwiper,
		RecommendView,
		FeatureView,
		TabControl,
		Scroll,
		GoodsList,
		BackTop
	},
	created() {
		this.getMultidata();
		this.getData('pop');
		this.getData('new');
		this.getData('sell');
	},
	mounted() {
		const refresh = debounce(this.$refs.scroll.refresh,500)
		this.$bus.$on('itemImageLoad', () => {
			refresh();
		});
	},
	methods: {
		getMultidata() {
			getHomeMultidata().then(res => {
				console.log(res);
				this.banners = res.data.banner.list;
				this.recommends = res.data.recommend.list;
			});
		},
		getData(type) {
			let page = this.goodsList[type].page;
			getHomeData(type, page).then(res => {
				this.goodsList[type].list.push(...res.data.list);
				this.goodsList[type].page += 1;
				console.log(this.goodsList[type].list[0]);
				
				this.$refs.scroll.finishPullUp();
			});
		},
		tabControlClick(index) {
			switch (index) {
				case 0:
					this.currentType = 'pop';
					break;
				case 1:
					this.currentType = 'new';
					break;
				case 2:
					this.currentType = 'sell';
					break;
			}
			this.$refs.tabControl1.currentIndex = index;
			this.$refs.tabControl.currentIndex = index;
		},
		loadMore(){
			this.getData(this.currentType);
		},
		contentScroll(position){
			this.showBackTop = -position.y > 1000
			this.isTabFixed = -position.y > this.tabOffsetTop;
		},
		scrollTop(){
			this.$refs.scroll.scrollTo();
		},
		swiperLoad(){
			this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
		}
	},
	computed: {
		showGoodsList() {
			return this.goodsList[this.currentType].list;
		}
	},
	activated() {
	  this.$refs.scroll.scrollTo(0,this.saveY,0)
	  this.$refs.scroll.refresh()
	},
	deactivated() {
	  this.saveY = this.$refs.scroll.getScrollY()
	}
	
};
</script>

<style scoped>
#home {
	/* padding-top: 44px; */
	/*position: relative;*/
	height: 100vh;
}
.nav-bar {
	background-color: var(--color-tint);
	color: #ffffff;
}
.fixed {
	/* position: sticky;
	top: 44px; */
	position: fixed;
	top: 44px;
	left: 0;
	right: 0;
	z-index: 10;
}

.content {
	background-color: #FFFFFF;
	/* overflow: hidden; */
	position: absolute;
	top: 44px;
	bottom: 49px;
	left: 0;
	right: 0;
}
</style>
