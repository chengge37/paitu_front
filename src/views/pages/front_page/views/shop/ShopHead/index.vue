<template>
  <div class="wrap">
    <div class="center">
      <!-- <img @click="toHome" src="./logo_color.png" alt=""> -->
      <div @click="toHome" class="company-logo">
        <ali-svg-icon icon-class="logo" class-name="logotext"></ali-svg-icon>
        <span>派图</span>
      </div>
      <div class="search" v-if="false">
        <input placeholder="请输入店铺名称" type="text">
        <span>搜本站</span>
      </div>
      <div class="cart" @click="toCart">
        <span>购物车</span>
        <ali-svg-icon icon-class="cart_gray" class-name="cart_gray"></ali-svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
      }
    },
    props:{
      
    },
    methods:{
      // 回到首页
      toHome(){
        this.$emit('toHome')
      },
      // 去购物车
      toCart(){
        this.$emit('toCart')
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
  box-shadow:1px 1px 0px 0px rgba(235,227,255,0.42);
  height: 60px;
  .center{
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .company-logo {
      display: flex;
      align-items: center;
      font-size: 25px;
      cursor: pointer;
      .logotext {
        height: 54px;
        width: 56px;
      }
    }
    .search{
      width: 240px;
      height: 40px;
      display: flex;
      margin-right: 50px;
      input{
        outline: none;
        text-indent: 9px;
        color: #999;
        border: none;
        border: 1px solid #D9D9D9;
      }
      span{
        width: 74px;
        height: 40px;
        background: #7C6AFF;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
    .cart{
      width:130px;
      height:40px;
      border:1px solid rgb(217,217,217);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      & > span{
        margin-right: 5px;
        color: #333;
      }
    }
  }
}
</style>