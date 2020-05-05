<template>
	<div id="home">
		<nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
		<home-swiper :banners="banners"></home-swiper>
		<recommend-view :recommends="recommends"></recommend-view>
		<feature-view></feature-view>
		<tab-control :titles="['流行', '新款', '精选']" class="tab-control"></tab-control>
		
		<div style="height: 500px;background-color: #666666;"></div>
		<div style="height: 500px;background-color: #333333;"></div>
	</div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue';
import HomeSwiper from './childComps/HomeSwiper.vue';
import RecommendView from './childComps/RecommendView.vue';
import FeatureView from './childComps/FeatureView.vue';
import TabControl from '../../components/content/tabControl/TabControl.vue';
import { getHomeMultidata } from '../../network/home.js';
export default {
	name: 'Home',
	data() {
		return {
			banners: [],
			recommends: []
		};
	},
	components: {
		NavBar,
		HomeSwiper,
		RecommendView,
		FeatureView,
		TabControl
	},
	created() {
		getHomeMultidata().then(res => {
			console.log(res);
			this.banners = res.data.banner.list;
			this.recommends = res.data.recommend.list;
		});
	}
};
</script>

<style scoped>
#home {
	padding-top: 44px;
}
.nav-bar {
	background-color: var(--color-tint);
	color: #ffffff;
}
.tab-control {
	position: sticky;
	top: 44px;
}
</style>
