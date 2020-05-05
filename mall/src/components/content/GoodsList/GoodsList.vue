<template>
	<div class="goods-list">
		<goods-list-item v-for="(item,index) in goodsList" :goods="item"></goods-list-item>
	</div>
</template>

<script>
	import GoodsListItem from './GoodsListItem.vue'
	export default{
		components:{
			GoodsListItem
		},
		data(){
			return{
				
			}
		},
		props:{
			goodsList:{
				type:Array,
				default:[]
			}
		}
	}
</script>

<style>
	.goods-list {
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-around;
	  padding: 0px 5px;
	}
</style>
