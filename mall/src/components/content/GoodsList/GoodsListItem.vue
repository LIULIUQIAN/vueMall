<template>
	<div class="goods" @click="goToDetail">
		<img :src="getImg" @load="imgLoaded" />
		<div class="goods-info">
			<p>{{goods.title}}</p>
			<span class="price">¥{{goods.price}}</span>
			<span class="collect">{{goods.cfav}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			goods:{
				type: Object,
				default: {}
			}
		},
		methods:{
			imgLoaded(){
				this.$bus.$emit('itemImageLoad')
			},
			goToDetail(){
				this.$router.push('/detail/'+this.goods.iid)
			}
		},
		computed: {
			getImg() {
				return this.goods.img || this.goods.image || this.goods.show.img
			}
		}
	}
</script>

<style scoped>
	.goods{
		padding-bottom: 50px;
		position: relative;
		width: 46%;
	}
	.goods img{
		width: 100%;
	}
	.goods-info{
		font-size: 12px;
		position: absolute;
		bottom: 15px;
		left: 0;
		right: 0;
		overflow: hidden;
		text-align: match-parent;
	}
	.goods-info p{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 3px;

	}
	
	.goods-info .price {
	  color: var(--color-high-text);
	  margin-right: 20px;
	}
	
	.goods-info .collect {
	  position: relative;
	}
	
	.goods-info .collect::before {
	  content: '';
	  position: absolute;
	  left: -15px;
	  top: 0;
	  width: 14px;
	  height: 14px;
	  background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
	}
</style>
