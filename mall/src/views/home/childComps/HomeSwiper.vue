<template>
	<swiper>
		<swiper-item v-for="item in banners">
			<a :href="item.link"><img :src="item.image" @load="imageLoad" /></a>
		</swiper-item>
	</swiper>
</template>

<script>
import { Swiper, SwiperItem } from '../../../components/common/swiper/index.js';
export default {
	name: 'HomeSwiper',
	data() {
		return {
			isLoad: false
		};
	},
	props: {
		banners: {
			default: [],
			type: Array
		}
	},
	components: {
		Swiper,
		SwiperItem
	},
	methods: {
		imageLoad() {
			if (!this.isLoad) {
				this.$emit('swiperLoad');
				this.isLoad = true;
			}
		}
	}
};
</script>

<style></style>
