<template>
	<div id="home">
		<nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
		<home-swiper :banners="banners"></home-swiper>
		<recommend-view :recommends="recommends"></recommend-view>
		<feature-view></feature-view>
	</div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue';
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'
import {getHomeMultidata} from '../../network/home.js'
export default {
	name: 'Home',
	data(){
		return{
			banners:[],
			recommends:[]
		}
	},
	components: {
		NavBar,
		HomeSwiper,
		RecommendView,
		FeatureView
		
	},
	created() {
		getHomeMultidata().then(res=>{
			console.log(res)
			this.banners = res.data.banner.list;
			this.recommends = res.data.recommend.list;
			
		})
	}
};
</script>

<style scoped>
	#home{
		padding-top: 44px;
		
		margin-bottom: 100px;
	}
.nav-bar {
	background-color: var(--color-tint);
	color: #ffffff;
}
</style>
