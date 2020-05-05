<template>
	<div id="home">
		<nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
		<home-swiper :banners="banners"></home-swiper>
	</div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue';
import HomeSwiper from './childComps/HomeSwiper.vue'
import {getHomeMultidata} from '../../network/home.js'
export default {
	name: 'Home',
	data(){
		return{
			banners:[]
		}
	},
	components: {
		NavBar,
		HomeSwiper
	},
	created() {
		getHomeMultidata().then(res=>{
			console.log(res)
			this.banners = res.data.banner.list;
			
		})
	}
};
</script>

<style scoped>
.nav-bar {
	background-color: var(--color-tint);
	color: #ffffff;
}
</style>
