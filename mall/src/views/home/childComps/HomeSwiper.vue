<template>
	<swiper>
		<swiper-item v-for="item in banners">
			<a :href="item.link">
				<img :src="item.image"/>
			</a>
		</swiper-item>
	</swiper>
</template>

<script>
	import {Swiper, SwiperItem} from '../../../components/common/swiper/index.js'
	export default{
		name:'HomeSwiper',
		props:{
			banners:{
				default:[],
				type:Array
			}
		},
		components:{
			Swiper,
			SwiperItem
			
		}
	}
</script>

<style>
</style>
