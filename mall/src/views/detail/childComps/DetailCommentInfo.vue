<template>
    <div>评论{{commentInfo}}}</div>
</template>

<script>
    export default {
        name: "DetailCommentInfo",
        props:{
            commentInfo:{
                type:Object,
                default:{}
            }
        }
    }
</script>

<style scoped>

</style>