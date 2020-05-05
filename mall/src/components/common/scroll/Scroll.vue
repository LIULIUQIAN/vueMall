<template>
	<div ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default{
		data(){
			return {
				scroll:null
			}
		},
		props:{
			probeType:0,
			pullUpLoad:false,
		},
		mounted() {
			this.scroll = new BScroll(this.$refs.wrapper,{
				click:true,
				probeType:this.probeType,
				pullUpLoad:this.pullUpLoad
			})
			// 监听上拉到底部
			if(this.pullUpLoad){
				this.scroll.on('pullingUp',()=>{
					this.$emit('pullingUp')
				})
			}
			//监听滚动
			if(this.probeType == 2 || this.probeType == 3){
				this.scroll.on('scroll',(pos)=>{
					this.$emit('scroll',pos)
				})
			}
		},
		methods:{
			refresh(){
				console.log('=============refresh')
				this.scroll && this.scroll.refresh();
			},
			finishPullUp(){
				this.scroll && this.scroll.finishPullUp()
			},
			scrollTo(x=0,y=0,time=300){
				this.scroll && this.scroll.scrollTo(x,y,time)
			}
			
		}
	}
</script>

<style>
</style>
