export const backTopMixin = {
    data: function () {
        return {
            showBackTop:false
        }
    },
    methods:{
        scrollTop(){
            this.$refs.scroll.scrollTo();
        },
        changePosition(position){
            this.showBackTop = -position.y > 1000
        }
    }
}