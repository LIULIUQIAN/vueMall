<template>
	<div id="home">
		<nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
		<scroll class="content">
			<home-swiper :banners="banners"></home-swiper>
			<recommend-view :recommends="recommends"></recommend-view>
			<feature-view></feature-view>
			<tab-control :titles="['流行', '新款', '精选']" class="tab-control" @itemClick="tabControlClick"></tab-control>
			<goods-list :goodsList="showGoodsList"></goods-list>
		</scroll>
	</div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue';
import HomeSwiper from './childComps/HomeSwiper.vue';
import RecommendView from './childComps/RecommendView.vue';
import FeatureView from './childComps/FeatureView.vue';
import TabControl from '../../components/content/tabControl/TabControl.vue';
import Scroll from '../../components/common/scroll/Scroll.vue'
import GoodsList from '../../components/content/GoodsList/GoodsList.vue'
import { getHomeMultidata ,getHomeData} from '../../network/home.js';
export default {
	name: 'Home',
	data() {
		return {
			banners: [],
			recommends: [],
			goodsList: {
			  'pop': {page: 1, list: []},
			  'new': {page: 1, list: []},
			  'sell': {page: 1, list: []}
			},
			currentType:'pop'
		};
	},
	components: {
		NavBar,
		HomeSwiper,
		RecommendView,
		FeatureView,
		TabControl,
		Scroll,
		GoodsList
	},
	created() {
		this.getMultidata();
		this.getData('pop');
		this.getData('new');
		this.getData('sell');
	},
	methods:{
		getMultidata(){
			getHomeMultidata().then(res => {
				console.log(res);
				this.banners = res.data.banner.list;
				this.recommends = res.data.recommend.list;
			});
		},
		getData(type){
			let page = this.goodsList[type].page;
			getHomeData(type,page).then(res =>{
				this.goodsList[type].list.push(...res.data.list)
				this.goodsList[type].page += 1;
				console.log(this.goodsList[type].list[0])
			})
		},
		tabControlClick(index){
			switch (index) {
			  case 0:
			    this.currentType = 'pop'
			    break
			  case 1:
			    this.currentType = 'new'
			    break
			  case 2:
			    this.currentType = 'sell'
			    break
			}
		}
	},
	computed:{
		showGoodsList(){
			return this.goodsList[this.currentType].list
		}
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
.tab-control {
	position: sticky;
	top: 44px;
}

.content{
	position: absolute;
	top: 44px;
	bottom: 49px;
	left: 0;
	right: 0;
}
</style>
