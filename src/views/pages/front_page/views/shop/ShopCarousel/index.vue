<template>
  <div class="wrap">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in banner" :key="index">
          <img :src="$qiniuHost+item.key" alt="">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination" :class="{'mode1-page':mode==1,'mode4-page':mode==4,'mode5-page':mode==5,'mode6-page':mode==6}"></div>
    </div>
    <!-- 默认模板 -->
    <div class="mode1-card" v-if="mode==1">
      <el-switch
        :width="92"
        style="display: block"
        v-model="rentType"
        active-color="#192B39"
        inactive-color="#192B39"
        active-text="租器材"
        inactive-text="租影棚">
      </el-switch>
      <div class="select-time start">
        <span class="time-label">开始时间</span>
        <el-date-picker
          v-model="startTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择开始时间···">
        </el-date-picker>
      </div>
      <div class="select-time end">
        <span class="time-label">结束时间</span>
        <el-date-picker
          v-model="endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择结束时间···">
        </el-date-picker>
      </div>
      <div class="go-btn" @click="toRent({rentType,startTime,endTime})">
        <span>立刻前往</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>

    <!-- 第七套模板 -->
    <div class="mode7-card" v-if="mode==7">
      <div @click="selectTab(item)" :class="{'active-tab':item.check}" class="tab" v-for="(item,index) in tabArr" :key="index">
        <span>租</span>
        <span>{{item.text}}</span>
      </div>
      <el-date-picker
        class="start"
        v-model="startTime"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择开始日期">
      </el-date-picker>
      <el-date-picker
        class="end"
        v-model="endTime"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择结束日期">
      </el-date-picker>
      <div class="rent-btn" @click="toRent({tabArr,startTime,endTime})">立即租借</div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper"
import { frontHome } from "@config/api.js";

  export default {
    data(){
      return{
        realIndex:0,
        swiperArr:[
          {
            url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572524193010&di=e4dee6af249846ce5ded806f6bf38b26&imgtype=0&src=http%3A%2F%2Fimg1.windmsn.com%2Fa%2F0%2F54%2F5445%2F544528.jpg'
          },
          {
            url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572524193086&di=affb6d63a2af71d2d2544072ad066242&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F017181554be700000001bf72814f33.jpg%401280w_1l_2o_100sh.jpg'
          },
          {
            url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572524193084&di=748f99c77c679547d59291e6a3973ec2&imgtype=0&src=http%3A%2F%2Fimg3.qjy168.com%2Fprovide%2F2014%2F03%2F20%2F5553562_20140320164327.jpg'
          },
        ],
        rentType:false,
        startTime:'',
        endTime:'',
        tabArr:[
          {
            text:'影棚',
            check:true
          },
          {
            text:'器材',
            check:false
          }
        ],
        banner:[]
      }
    },
    props:{
      mode:{
        type:Number,
        default:1
      },
      uid:{
        type:String,
        default:''
      }
    },
    created(){
      this.getBanner()
    },
    mounted(){
      this.initSwiper()
    },
    methods:{
      getBanner(){
        this.getRequest(frontHome.getAd,{
          uid:this.uid
        }).then(res=>{
          console.warn(res,'店铺banner')
          this.banner=res
        }).catch(err=>{
          console.error(err)
        })
      },
      initSwiper() {
        let that=this
        let mySwiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            speed:1000, 
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            onSlideChangeEnd: function (swiper) {
                swiper.update();
                mySwiper.startAutoplay();
                mySwiper.reLoop();
            },
            on:{ //添加点击事件,立即入驻按钮点击后冒泡触发slide的点击事件
                click:function(e){
                    // if(e.target.className==="text-btn"){
                    //     this.toRent()
                    // }
                    // 这里的代码解决swiper循环loop一轮后点击事件消失的bug
                    const realIndex = this.realIndex;
                    that.handleClickSlide(realIndex,e); 
                }
            },
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                bulletActiveClass: 'bullet-active',
            },
        })
        
      },
      handleClickSlide(index,eve) {
          console.warn('handleClickSlide current index', index);
      },
      selectTab(item){
        this.tabArr.forEach(item=>{
          item.check=false
        })
        item.check=true
      },
      toRent(params){
        // params.rentType?'/shop/equip':'/shop/studio'
        if(params.rentType){
          this.$emit('selectTab',params.rentType?'/shop/equip':'/shop/studio',{...params})
        }else if(params.tabArr){
          this.$emit('selectTab',this.tabArr[1].check?'/shop/equip':'/shop/studio',{...params})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
  position: relative;
  .swiper-container{
    height: 500px;
    background: #eee;
    .swiper-wrapper{
      height: 100%;
      .swiper-slide{
        display: flex;
        justify-content: center;
        // height: 100%;
        height: 500px;
        img{
          height: 100%;
        }
      }
    }
    /deep/{
      .swiper-pagination {
        .swiper-pagination-bullet {
            background: #d9d9d9;
            opacity: 1;
        }

        .bullet-active {
            background: #7C6AFF;
            opacity: 1;
        }
      }
      .mode1-page{
        .swiper-pagination-bullet {
            background: #d9d9d9;
            // background: #fff;
        }

        .bullet-active {
            background: #192B39;
        }
      }
      .mode4-page {
        .swiper-pagination-bullet {
            background: #d9d9d9;
            // background: #fff;
        }

        .bullet-active {
            background: #03D4DB;
        }
      }
      .mode5-page {
        .swiper-pagination-bullet {
            background: #d9d9d9;
            // background: #fff;
        }

        .bullet-active {
            background: #E5C875;
        }
      }
      .mode6-page {
        .swiper-pagination-bullet {
            background: #d9d9d9;
            // background: #fff;
        }

        .bullet-active {
            background: #3270ED;
        }
      }
    } 
    // background: tomato;
  }
  .mode1-card{
    // width: 21%;
    // width: 21vw;
    // height: 74%;
    // height: 41vh;
    // width: 400px;
    // height: 380px;
    width: 20%;
    height: 80%;
    background: #fff;
    box-shadow:0px 0px 32px 0px rgba(0,0,0,0.05);
    border-radius:4px;
    position: absolute;
    left: 24%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 999;
    padding: 4.2vh 1vh;
    box-sizing: border-box;
    .el-switch{
      margin-bottom: 38px;
      margin-bottom: 4vh;
      text-align: center;
      /deep/ {
        .el-switch__core{
          height: 28px;
          &:after{
            width: 18px;
            height: 18px;
            top: 50%;
            transform: translateY(-50%);
            left: 5px;
            &:after{
              content:'\5f71\68da';
              background: #fff;
            }
          }
        }
        .el-switch__label{
          span{
            font-size: 1vw;
          }
        }
        .el-switch__label.is-active{
          // color: #7C6AFF;
          color: #303133;
        }
        .el-switch__label--left.is-active{
          position: relative;
          &:after{
            content:'\5f71\68da';
            position: absolute;
            color: #fff;
            right: 0;
            transform: translateX(250%);
            z-index: 999;
          }
        }
        .el-switch__label--right.is-active{
          position: relative;
          &:before{
            content:'\5668\6750';
            position: absolute;
            color: #fff;
            left: 0;
            transform: translateX(-250%);
            z-index: 999;
          }
        }
      }
    }
    .el-switch.is-checked{
      /deep/ {
        .el-switch__core::after{
          margin-left: 62px;
        }
      }
    } 
    .select-time{
      display: flex;
      flex-direction: column;
      .time-label{
        color: #7F8990;
        font-size: 12px;
        margin-bottom: 5px;
        text-indent: 1em;
      }
      .el-date-editor{
        width: 100%;
        height: 40px;
        border-radius: 4px;
        /deep/{
          .el-input__inner{
            height: 100%;
            background: #EEF2F6;
            // text-align: center;
            text-indent: 1em;
          }
        }
      }
    }
    .start{
      margin-bottom: 1.9vh;
    }
    .end{
      margin-bottom: 4.2vh;
    }
    .go-btn{
      background: #192B39;
      width: 122px;
      height: 40px;
      color: #fff;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin: 0 auto;
      font-size: 16px;
      font-weight: 600;
      i{
        margin-left: 5px;
        position: relative;
        bottom: -1px;
      }
    }

  }
  .mode7-card{
    width:1200px;
    height:64px;
    background: #fff;
    box-shadow:0px 8px 16px 0px rgba(0,0,0,0.22);
    border-radius:32px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%,50%);
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    color: #333;
    .tab{
      margin-right: 32px;
      display: flex;
      cursor: pointer;
    }
    .active-tab{
      span:first-child{
        position: relative;
        &:after{
          content:'';
          position: absolute;
          width:24px;
          height:8px;
          background: #F54520;
          border-radius: 4px;
          left: 0;
          bottom: -10px;
        }
      }
    }
    .el-date-editor{
      width: 160px;
      /deep/ {
        .el-input__inner{
          font-size: 20px;
          &::-webkit-input-placeholder{
            color:#333;
          }
        }
      }
    }
    .rent-btn{
      width:126px;
      height:46px;
      background:linear-gradient(270deg,rgba(245,69,32,1) 0%,rgba(255,120,23,1) 100%);
      border-radius:32px;
      color: #fff;
      font-size: 20px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 10px;
      cursor: pointer;
    }
  }

}
</style>