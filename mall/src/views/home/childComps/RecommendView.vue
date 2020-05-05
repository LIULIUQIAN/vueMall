<template>
	<div class="recommends">
		<div class="recommends-item" v-for="item in recommends">
			<a :href="item.link">
				<img :src="item.image"/>
				<div>{{item.title}}</div>
			</a>
		</div>
	</div>
</template>

<script>
	
	export default{
		name:'RecommendView',
		props:{
			recommends:{
				default:[],
				type:Array
			}
		},
		components:{
			
		}
	}
</script>

<style>
	.recommends{
		display: flex;
		border-bottom: 10px solid #eee;
		font-size: 14px;
		margin-top: 10px;
		padding-bottom: 20px;
	}
	.recommends-item{
		flex: 1;
		text-align: center;
	}
	.recommends img{
		width: 70px;
		height: 70px;
		margin-bottom: 10px;
	}
</style>
