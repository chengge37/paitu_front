<template>
  <div class="wrap">
    <p>签约入驻</p>
    <p></p>
    <div class="content">
      <p>请选择您的入驻类型</p>
      <div class="join-category">
        <div class="category-item" v-for="(item,index) in categorys" :key="index" @click="selectCategory(index,item)">
          <ali-svg-icon :icon-class="item.icon" :class-name="item.icon"></ali-svg-icon>
          <span>{{item.label}}</span>
        </div>
      </div>
    </div>
    <div class="btn-wrap">
      <span class="back-btn color-area" @click="back">返回</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

  export default {
    data(){
      return{
        categorys:[
          {
            label:'公司',
            icon:'gongsi',
            value:1
          },
          {
            label:'个人',
            icon:'geren',
            value:2
          },
        ],
      }
    },
    computed: {
			...mapGetters(["user_data"])
    },
    created(){
      console.log(this.user_data,'个人信息')
    },
    methods:{
      selectCategory(i,item){
        this.$router.push({path:'/sign/secondCategory',query:{select:item.value}})
      },
      back(){
        this.$router.back()
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
  color: #333;
  padding-bottom: 50px;
  p:first-child{
    text-align: center;
    font-size: 64px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  p:nth-child(2){
    width: 74px;
    height: 6px;
    background: #333;
    margin: 0 auto;
    margin-bottom: 58px;
  }
  .content{
    height: 360px;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p{
      font-size: 18px;
      font-weight: 500;
      color: #999;
      margin-bottom: 50px;
    }
    .join-category{
      display: flex;
      justify-content: center;
      .category-item{
        width: 320px;
        height: 100px;
        border: 1px solid #E8E8E8;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          font-size: 20px;
          font-weight: 500;
        }
        span:last-child{
          margin-left: 10px;
        }
        .gongsi{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #4592FE;
          padding: 5px;
        }
        .geren{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #9245FE;
          padding: 5px;
        }
      }
      .category-item:first-child{
        margin-right: 20px;
      }
      .category-item{
      	&:hover{
      		border-color:$Theme-color;
      	}
      }
    }
  }
  .btn-wrap{
    display: flex;
    justify-content: flex-end;
    .back-btn{
      width: 100px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #651fff;
      color: #fff;
      margin-top: 50px;
      cursor: pointer;
    }
  }
}
</style>