<template>
  <div>
    <Header @toHome="toHome" @click="toCart"></Header>
    <Info @handleCollect="handleCollect" :mode="0"></Info>
    <Tab @selectTab="selectTab" :mode="0"></Tab>
    <Carousel :mode="5"></Carousel>
    <Coupon :mode="5"></Coupon>
  </div>
</template>

<script>
import Header from './ShopHead/index'
import Info from './ShopInfo/index'
import Tab from './ShopTab/index'
import Carousel from './ShopCarousel/index'
import Coupon from './ShopCoupon/index'
  export default {
    data(){
      return{}
    },
    components:{
      Header,
      Info,
      Tab,
      Carousel,
      Coupon
    },
    methods:{
      // 回到首页
      toHome(){
        console.warn('回到首页')
      },
      // 去购物车
      toCart(){

      },
      // 操作收藏
      handleCollect(){

      },
      // 选择tab
      selectTab(path){
        console.warn(path,'999')
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>