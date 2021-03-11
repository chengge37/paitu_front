/*
  该组件用于首页影棚，器材,服务之类的多个相似轮播模块
*/
<template>
  <div class="wrap" v-if="isShow">
    <div class="header">
      <div class="main-title">
        <span>{{mainTitle.slice(0,2)}}</span>
        <span>{{mainTitle.slice(2)}}</span>
      </div>
      <span class="dec">{{dec}}</span>
      <div class="category-more">
        <div class="category" v-for="(item,index) in category" :key="index">
          <span class="category-label word-hover" @click="selectCategory(item.name)">{{item.name}}</span>
          <span>/</span>
        </div>
        <div class="more" @click="getMore">
          <span class="orange-hover">查看更多</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="swiper-container" :class="[swiperClass]">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in dataArr" :key="index">
            <div class="slide-item card-hover" v-for="(each,j) in item" :key="j">
              <div class="item-img" @click="toDetail(each.id)">
                <img
                  v-if="contentType==6"
                  :onerror="util.errorPic"
                  :src="util.picExplode(each.header_pic,config.defaultEquipPic)"
                  alt
                />
                <img
                  v-else
                  :onerror="util.errorPic"
                  :src="util.picExplode(each.pic,config.defaultEquipPic)"
                  alt
                />
              </div>
              <div class="shop-type" v-if="false">
                <span class="group-shop">团</span>
                <span class="person-shop">个人私单</span>
              </div>
              <p class="name" :title="each.name" v-if="contentType==1||contentType==2">{{each.name}}</p>
              <p class="name" :title="each.name" v-if="contentType==3||contentType==4||contentType==5">{{each.title}}</p>
              <p class="name" :title="each.name" v-if="contentType==6">{{each.title}}</p>
              <p class="price">
                <span v-if="contentType==1">￥{{each.per_hour_price?each.per_hour_price:each.price_day_workday_in}}</span>
                <span v-if="contentType==2">￥{{each.priceWorkDayWorkTimePerHour}}</span>
                <span v-if="contentType==3||contentType==4||contentType==5">￥{{dealNorm(each.norms)}}</span>
                <span v-if="contentType==6">￥{{each.ppd}}</span>
              </p>
              <div class="shop" v-if="contentType==1||contentType==2">
                <div>{{each.nick}}</div>
              </div>
            </div>
          </div>
        </div>
      </div> 
      <!-- 分页器 -->
      <div class="swiper-pagination" :class="[pageClass]"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { getEquipArray } from "@/common/function/util.js";
import { studioType } from "@config/config.js";
  export default {
    data(){
      return{
        isShow:false,
        swiperClass:'',
        pageClass:''
      }
    },
    props:{
      contentType:{
        type:String,
        default:'0'
      },
      mainTitle:{
        type:String,
        default:''
      },
      dec:{
        type:String,
        default:''
      },
      category:{
        type:Array,
        default:[]
      },
      dataArr:{
        type:Array,
        default:[]
      }
    },
    created(){
      switch(this.contentType){
        // 器材
        case '1':
          this.swiperClass="equip-swiper";
          this.pageClass="equip-page";
          break;
        // 影棚
        case '2':
          this.swiperClass="studio-swiper";
          this.pageClass="studio-page";
          break;
        // 平面摄影
        case '3':
          this.swiperClass="pingmian-swiper";
          this.pageClass="pingmian-page";
          break;
        // 后期处理
        case '4':
          this.swiperClass="houqi-swiper";
          this.pageClass="houqi-page";
          break;
        // 视频拍摄
        case '5':
          this.swiperClass="shipin-swiper";
          this.pageClass="shipin-page";
          break;
        // 模特
        case '6':
          this.swiperClass="mote-swiper";
          this.pageClass="mote-page";
          break;
      }
    },
    mounted(){

    },
    watch:{
      dataArr(val){
        console.warn(val,'有数据啦')
        if(val[0].length!=0){
          this.isShow=true
        }
        // 超过1页才轮播
        if(val.length>1){
          this.$nextTick(()=>{
            this.initSwiper()
          })
        }
      }
    },
    methods:{
      dealNorm(val){
        return val.slice().sort(function(a,b){return b.priority-a.priority})[0].price
      },
      initSwiper() {
        let that = this;
        var mySwiper = new Swiper(`.swiper-container.${this.swiperClass}`, {
          loop: true,
          // autoplay: {
          //   delay: 3000,
          //   disableOnInteraction: false
          // },
          speed: 1000,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          onSlideChangeEnd: function(swiper) {
            swiper.update();
            mySwiper.startAutoplay();
            mySwiper.reLoop();
          },
          on: {
            //添加点击事件,点击后冒泡触发slide的点击事件
            click: function(e) {
              // 这里的代码解决swiper循环loop一轮后点击事件消失的bug
              const realIndex = this.realIndex;
              that.handleClickSlide(realIndex, e);
            }
          },
          // 如果需要分页器
          pagination: {
            el: `.swiper-pagination.${this.pageClass}`,
            clickable: true,
            bulletActiveClass: "bullet-active"
          }
        })
        // 设置鼠标hover小圆点的时候切换轮播,但必须等到mySwiper实例初始化完成，async,await解决异步
        // 有请求数据后失效，可以watch那个数据数组的变化再调用函数初始化轮播
        setTimeout(()=>{
          console.warn(mySwiper,'看看这个轮播的数据')
          if(mySwiper.pagination){
            for(let i=0;i<mySwiper.pagination.bullets.length;i++){
              mySwiper.pagination.bullets[i].onmouseover=function(){
                this.click();
              };
            } 
          }
        },100)
      },
      handleClickSlide(index, eve) {
        console.log('index----eve',index,eve);
      },
      selectCategory(val){
        console.log(val,'ppppppppp',this.category,this.contentType)
        switch(this.contentType){
          // 器材
          case '1':
            getEquipArray().forEach((item, index) => {
              if (item.name == val) {
                let params = {
                  equipType: item.id
                };
                this.util.toEquipList(params);
              }
            });
            break;
          // 影棚
          case '2':
            studioType.forEach((item, index) => {
              if (val == item.name) {
                let params = {
                  studioType: item.id
                };
                this.util.toStudioList(params);
              }
            });
            break;
          // 平面摄影
          case '3':
            this.category.forEach(item=>{
              if(item.name==val){
                this.util.toServiceList(1,item.id)
              }
            })
            break;
          // 后期处理
          case '4':
            this.category.forEach(item=>{
              if(item.name==val){
                this.util.toServiceList(3,item.id)
              }
            })
            break;
          // 视频拍摄
          case '5':
            this.category.forEach(item=>{
              if(item.name==val){
                this.util.toServiceList(2,item.id)
              }
            })
            break;
          // 模特
          case '6':
            this.category.forEach(item=>{
              if(item.name==val){
                this.util.toModelList(item.id)
              }
            })
            break;
        }
      },
      getMore(){
        switch(this.contentType){
          // 器材
          case '1':
            this.util.toEquipList()
            break;
          // 影棚
          case '2':
            this.util.toStudioList()
            break;
          // 平面摄影
          case '3':
            this.util.toServiceList(1)
            break;
          // 后期处理
          case '4':
            this.util.toServiceList(3)
            break;
          // 视频拍摄
          case '5':
            this.util.toServiceList(2)
            break;
          // 模特
          case '6':
            this.util.toModelList()
            break;
        }
      },
      toDetail(id){
        switch(this.contentType){
          // 器材
          case '1':
            this.util.toEquipDetail(id);
            break;
          // 影棚
          case '2':
            this.util.toStudioDetail(id)
            break;
          // 平面摄影
          case '3':
            this.util.toServiceDetail(id)
            break;
          // 后期处理
          case '4':
            this.util.toServiceDetail(id)
            break;
          // 视频拍摄
          case '5':
            this.util.toServiceDetail(id)
            break;
          // 模特
          case '6':
            this.util.toModelDetail(id)
            break;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
  margin: 60px 0;
  .header{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .main-title{
      font-size: 0;
      margin-right: 30px;
      span:first-child{
        font-size: 32px;
        color: #333;
        font-weight: 100;
        border-left: 4px solid #F9BE00;
        padding-left: 13px;
      }
      span:last-child{
        font-size: 32px;
        color: #333;
        font-weight: 600;
      }
    }
    .dec{
      font-size: 16px;
      color: #666;
      margin-right: auto;
    }
    .category-more{
      display: flex;
      .category{
        margin-right: 14px;
        .category-label{
          margin-right: 14px;
          color: #333;
          cursor: pointer;
        }
      }
      .more{
        color: #FF641F;
        font-weight: 600;
        cursor: pointer;
        i{
          font-weight: 900;
        }
      }
    }
  }
  .content{
    .swiper-container{
      /deep/{
        .swiper-slide{
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          .slide-item{
            width: calc((100% - 48px)/5);
            height: 325px;
            margin-right: 12px;
            margin-bottom: 12px;
            text-align: center;
            display: flex;
            flex-direction: column;
            cursor: pointer;
            background: #fff;
            .item-img{
              width: 230px;
              height: 230px;
              img{
                max-width: 100%;
                max-height: 100%;
              }
            }
            .name{
              font-weight: 600;
              color: #333;
              padding-top: 8px;
              margin-bottom: 5px;
            }
            .price{
              display: flex;
              justify-content: center;
              font-size: 16px;
              font-weight: 600;
              color: #D4282D;
              margin-bottom: auto;
            }
            .shop{
              width: calc(100% - 12px);
              margin: 0 auto;
              font-size: 12px;
              color: #999;
              height: 36px;
              line-height: 36px;
              border-top: 1px solid rgba(151,151,151,0.1);
            }
          }
        }
      }
    }
    .equip-swiper{
      max-height: 665px;
      /deep/{
        .swiper-slide{
          max-height: 665px;
          .slide-item{
            width: calc((100% - 48px)/5);
            height: 325px;
            .item-img{
              width: 230px;
              height: 230px;
              display: flex;
		    align-items: center;
		    justify-content: center;
            }
          }
          .slide-item:nth-child(5n){
            margin-right: 0;
          }
          .slide-item:nth-child(6),.slide-item:nth-child(6)~.slide-item{
            margin-bottom: 0;
          }
        }
      }
    }
    .studio-swiper{
      max-height: 645px;
      /deep/{
        .swiper-slide{
          max-height: 645px;
          .slide-item{
            width: calc((100% - 24px)/3);
            height: 315px;
            .item-img{
              width: 392px;
              height: 220px;
              display: flex;
			    align-items: center;
			    justify-content: center;
            }
          }
          .slide-item:nth-child(3n){
            margin-right: 0;
          }
          // 动态选择最后一行
          .slide-item:nth-child(3n+1):nth-last-child(-n+3),.slide-item:nth-child(3n+1):nth-last-child(-n+3)~.slide-item{
            margin-bottom: 0;
          }
        }
      }
    }
    .pingmian-swiper,.houqi-swiper,.shipin-swiper,.mote-swiper{
      max-height: 650px;
      /deep/{
        .swiper-slide{
          max-height: 650px;
          .slide-item{
            width: calc((100% - 48px)/5);
            height: 312px;
            margin-bottom: 24px;
            .item-img{
              width: 230px;
              height: 230px;
              display: flex;
		    align-items: center;
		    justify-content: center;
            }
            .shop-type{
              display: flex;
              justify-content: center;
              align-items: center;
              color: #fff;
              font-size: 11px;
              padding-top: 7px;
              span{
                padding: 2px 4px;
                border-radius: 2px;
              }
              span+span{
                margin-left: 3px;
              }
              .group-shop{
                background: #F35555;
              }
              .person-shop{
                background: #5588F3;
              }
            }
            .name{
              // padding-top: 6px;
              padding-top: 16px;
              margin-bottom: 8px;
            }
            .price{
              font-size: 14px;
            }
          }
          .slide-item:nth-child(5n){
            margin-right: 0;
          }
          // 动态选择最后一行
          .slide-item:nth-child(5n+1):nth-last-child(-n+5),.slide-item:nth-child(5n+1):nth-last-child(-n+5)~.slide-item{
            margin-bottom: 0;
          }
        }
      }
    }
    .mote-swiper{
      max-height: 995px;
      /deep/{
        .swiper-slide{
          max-height: 995px;
          .slide-item{
            height: 314px;
            margin-bottom: 24px;
          }
          .slide-item:nth-child(5n){
            margin-right: 0;
          }
        }
      }
    }
    /deep/ .swiper-pagination {
      margin: 0 auto;
      position: initial;
      line-height: 40px;
      .swiper-pagination-bullet {
        background: #d9d9d9;
        opacity: 1;
        margin-right: 10px;
        outline: none;
      }
      .bullet-active {
        background: #7C6AFF;
        opacity: 1;
      }
    }
  }
}
</style>