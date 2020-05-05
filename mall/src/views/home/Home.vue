<template>
	<div id="home">
		<nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
	</div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue';
import {getHomeMultidata} from '../../network/home.js'
export default {
	name: 'Home',
	data(){
		return{
			banner:[]
		}
	},
	components: {
		NavBar
	},
	created() {
		getHomeMultidata().then(res=>{
			console.log(res)
			this.banner = res.data.banner.list;
			
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
