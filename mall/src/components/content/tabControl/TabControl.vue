<template>
	<div class="tab-control">
		<div v-for="(item, index) in titles" class="tab-control-item" 
		:class="{ active: currentIndex == index }" @click="itemClick(index)">
			<span>{{ item }}</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TabControl',
	data() {
		return {
			currentIndex: 0
		};
	},
	props: {
		titles: {
			type: Array,
			default: []
		}
	},
	methods:{
		itemClick(index){
			this.currentIndex = index;
		}
	}
};
</script>

<style>
.tab-control {
	display: flex;
	height: 44px;
	line-height: 44px;
	background-color: #ffffff;
}
.tab-control-item {
	flex: 1;
	text-align: center;
}
.tab-control-item span {
	padding: 5px;
}
.active {
	color: var(--color-high-text);
}
.active span {
	border-bottom: 3px solid var(--color-high-text);
}
</style>
