<template>
    <nav-bar class="detail-nav">
        <img class="back" slot="left" src="../../../assets/img/common/back.svg" @click="back">
        <div slot="center" class="title">
            <span v-for="(item,index) in titles"
                  class="title-item"
                  :class="{'active':index===currentIndex}"
                  @click="itemClick(index)"
                  >{{item}}</span>
        </div>
    </nav-bar>
</template>

<script>
    import NavBar from '../../../components/common/navbar/NavBar'
    export default {
        name: "DetailNavBar",
        data(){
            return{
                titles:['商品','参数','评论','推荐']
            }
        },
        props:{
            currentIndex:{
                type: Number,
                default:0
            }
        },
        components:{
            NavBar
        },
        methods:{
            itemClick(index){
                // this.currentIndex = index
                this.$emit('itemClick',index)
            },
            back(){
                this.$router.back();
            }
        }
    }
</script>

<style scoped>
    .detail-nav{
        background-color: #FFFFFF;
        font-weight: normal;
    }
    .back{
        margin-top: 12px;
    }
    .title{
        display: flex;
        font-size: 14px;
    }
    .title-item{
        flex: 1;
    }
    .active{
        color: var(--color-high-text);
    }

</style>