<template>
	<div class="nav-bar">
		<div class="left"><slot name="left"></slot></div>
		<div class="center"><slot name="center"></slot></div>
		<div class="right"><slot name="right"></slot></div>
	</div>
</template>

<script></script>

<style>
.nav-bar {
	height: 44px;
	line-height: 44px;
	display: flex;
	text-align: center;

	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10;
}
.left {
	width: 60px;
}
.center {
	flex: 1;
}
.right {
	width: 60px;
}
</style>
