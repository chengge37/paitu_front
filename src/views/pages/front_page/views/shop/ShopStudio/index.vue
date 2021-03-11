<template>
  <div class="studio-wrap" v-if="studioList.length!=0">


    <div class="mode1" v-if="mode==1">
      <div class="studio-item" v-for="(item,index) in studioList" :key="index">
        <div class="grey-line"></div>
        <div class="studio-detail">
          <div class="img-wrap">
            <img :onerror="util.errorPic" :src="$qiniuHost+dealPic(item.pic)[0]" alt="">
          </div>
          <div class="studio-info">
            <p>{{item.name}}</p>
            <p>
              <span>￥{{item.priceWorkDayWorkTimePerHour}}</span>
              <span>小时/起</span>
            </p>
            <p>
              <i class="el-icon-location-outline"></i>
              <span>{{item.address}}</span>
            </p>
            <div class="service">
              <i class="el-icon-price-tag"></i>
              <div>
                <span>{{item.square}}㎡</span>
                <span v-for="(each,j) in seviceDeal(item.serviceConditionArray)" :key="j">{{each}}</span>
              </div>
            </div>
            <p v-if="item.name!='此产品不存在'" class="rent-btn" @click="rent(item.id)">
              <span>立即租借</span>
              <i class="el-icon-arrow-right"></i>
            </p>
          </div>
        </div>
      </div>
      <p class="more">
        <span @click="toMore">更多影棚</span>
        <span></span>
      </p>
    </div>


    <div class="mode2" v-if="mode==2">
      <div class="title">
        <span>影棚租赁</span>
        <span class="more" @click="toMore">更多影棚>></span>
      </div>
      <div class="studio-row" v-for="(item,index) in studioList" :key="index">
        <div class="img-wrap">
          <img :onerror="util.errorPic" :src="$qiniuHost+dealPic(item.pic)[0]" alt="">
        </div>
        <div class="studio-info">
          <p class="name">{{item.name}}</p>
          <p class="address">
            <span>地址：</span>
            <span>{{item.address}}</span>
          </p>
          <p class="device">
            <span v-for="(each,j) in seviceDeal(item.serviceConditionArray)" :key="j">{{each}}</span>
          </p>
          <p class="price">
            <span>RMB</span>
            <span>￥{{item.priceWorkDayWorkTimePerHour}}/小时</span>
          </p>
          <div class="bottom">
            <span v-if="item.name!='此产品不存在'" class="rent-btn" @click="rent(item.id)">立即租借</span>
            <div class="index">
              <span></span>
              <span></span>
              <span></span>
              <span>{{'0'+(index+1)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mode3" v-if="mode==3">
      <div class="title">
        Studio Rental
      </div>
      <div class="studio-row" v-for="(item,index) in studioList" :key="index">
        <div class="img-wrap">
          <img :onerror="util.errorPic" :src="$qiniuHost+dealPic(item.pic)[0]" alt="">
        </div>
        <div class="info">
          <p class="name">{{item.name}}</p>
          <p class="address">
            <span>地址：</span>
            <span>{{item.address}}</span>
          </p>
          <p class="price">
            <span>RMB</span>
            <span>{{item.priceWorkDayWorkTimePerHour}}/小时</span>
          </p>
          <p class="bottom">
            <span  v-if="item.name!='此产品不存在'" class="rent-btn" @click="rent(item.id)">立即租借</span>
            <span class="row-line"></span>
            <span>{{'0'+(index+1)}}</span>
          </p>
        </div>
      </div>
      <p class="more" @click="toMore">
        <span>查看更多</span>
        <i class="el-icon-arrow-right"></i>
      </p>
    </div>

    <div class="mode4" v-if="mode==4">
      <div class="title">
        影/棚/租/赁
      </div>
      <div class="big-studio">
        <el-carousel :interval="5000" arrow="always" :autoplay="false" indicator-position="none">
          <el-carousel-item v-for="(item,index) in studioList[0].pic.indexOf(',')!=-1?studioList[0].pic.split(','):[studioList[0].pic]" :key="index">
            <img :src="$qiniuHost+item" alt="">
          </el-carousel-item>
        </el-carousel>
        <div class="info">
          <p class="device">
            <span v-for="(each,j) in seviceDeal(studioList[0].serviceConditionArray)" :key="j">{{each}}</span>
          </p>
          <div class="name-price">
            <span class="name">{{studioList[0].name}}</span>
            <div class="price">
              <span>￥{{studioList[0].priceWorkDayWorkTimePerHour}}</span>
              <span>/每小时</span>
            </div>
          </div>
          <div class="address-rent">
            <div class="address">
              <span>地址：</span>
              <span>{{studioList[0].address}}</span>
            </div>
            <div v-if="studioList[0].name!='此产品不存在'" class="rent-btn" @click="rent(studioList[0].id)">立即租借>></div>
          </div>
        </div>
      </div>
      <div class="studio-row" v-for="(item,index) in studioList.slice(1,3)" :key="index">
        <div class="img-wrap">
          <img :onerror="util.errorPic" :src="$qiniuHost+dealPic(item.pic)[0]" alt="">
        </div>
        <div class="info-wrap">
          <div class="info">
            <p class="name">{{item.name}}</p>
            <p class="address">
              <span>地址：</span>
              <span>{{item.address}}</span>
            </p>
            <div class="device">
              <span v-for="(each,j) in seviceDeal(item.serviceConditionArray)" :key="j">{{each}}</span>
            </div>
            <div class="price-rent">
              <span>￥{{item.priceWorkDayWorkTimePerHour}}/每小时</span>
              <span v-if="item.name!='此产品不存在'" @click="rent(item.id)">立即租借>></span>
            </div>
          </div>
        </div>
      </div>
      <p class="more" @click="toMore">
        <span>查看更多</span>
        <i class="el-icon-arrow-right"></i>
      </p>
    </div>
    <div class="mode5" v-if="mode==5">
      <div class="title-wrap">
        <div class="content">
          <div class="title">/ 影棚租赁 /</div>
          <div class="more" @click="toMore">查看更多 >></div>
        </div>
      </div>
      <div class="big-studio-wrap">
        <div class="big-studio">
          <el-carousel :interval="5000" arrow="always" :autoplay="false" indicator-position="none">
            <el-carousel-item v-for="(item,index) in studioList[0].pic.indexOf(',')!=-1?studioList[0].pic.split(','):[studioList[0].pic]" :key="index">
              <img :src="$qiniuHost+item" alt="">
            </el-carousel-item>
          </el-carousel>
          <div class="info">
            <div class="device-price">
              <span class="device" v-for="(each,j) in seviceDeal(studioList[0].serviceConditionArray)" :key="j">{{each}}</span>
              <div class="price">
                <span>￥{{studioList[0].priceWorkDayWorkTimePerHour}}</span>
                <span>/每小时</span>
              </div>
            </div>
            <div class="name-rent">
              <span>{{studioList[0].name}}</span>
              <span v-if="studioList[0].name!='此产品不存在'" @click="rent(studioList[0].id)">立即租借>></span>
            </div>
            <div class="address">
              <span>地址：</span>
              <span>{{studioList[0].address}}</span>
            </div>
          </div>
        </div>
        <div class="studio-item">
          <div class="item-wrap" v-for="(item,index) in studioList.slice(1,3)" :key="index">
            <div class="item">
              <div class="img-wrap">
                <img :onerror="util.errorPic" :src="$qiniuHost+dealPic(item.pic)[0]" alt="">
              </div>
              <p class="device">
                <span v-for="(each,j) in seviceDeal(item.serviceConditionArray)" :key="j">{{each}}</span>
              </p>
              <p class="name">{{item.name}}</p>
              <p class="address">
                <span>地址：</span>
                <span>{{item.address}}</span>
              </p>
            </div>
            <p class="price-rent">
              <span>￥{{item.priceWorkDayWorkTimePerHour}}/每小时</span>
              <span v-if="item.name!='此产品不存在'" @click="rent(item.id)">立即租借>></span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="mode6" v-if="mode==6">
      <div class="big-studio">
        <div class="big-wrap">
          <img :onerror="util.errorPic" :src="$qiniuHost+(studioList[0].pic.indexOf(',')!=-1?studioList[0].pic.split(',')[0]:studioList[0].pic)" alt="">
        </div>
        <div class="info-wrap">
          <p class="title">Studio Rental</p>
          <div class="info">
            <p class="name">{{studioList[0].name}}</p>
            <p class="address">
              <span>地址：</span>
              <span>{{studioList[0].address}}</span>
            </p>
            <p class="device">
              <span v-for="(each,j) in seviceDeal(studioList[0].serviceConditionArray)" :key="j">{{each}}</span>
            </p>
            <div class="price-rent">
              <div class="price">
                <span>￥{{studioList[0].priceWorkDayWorkTimePerHour}}</span>
                <span>/每小时</span>
              </div>
              <span v-if="studioList[0].name!='此产品不存在'" class="rent-btn" @click="rent(studioList[0].id)">立即租借</span>
            </div>
          </div>
        </div>
      </div>
      <div class="studio-row" v-for="(item,index) in studioList.slice(1,3)" :key="index">
        <div class="img-wrap">
          <img :onerror="util.errorPic" :src="$qiniuHost+dealPic(item.pic)[0]" alt="">
        </div>
        <div class="info">
          <p class="name">{{item.name}}</p>
          <p class="device">
            <span v-for="(each,j) in seviceDeal(item.serviceConditionArray)" :key="j">{{each}}</span>
          </p>
          <p class="price">
            <span>￥{{item.priceWorkDayWorkTimePerHour}}</span>
            <span>/每小时</span>
          </p>
          <span v-if="item.name!='此产品不存在'" class="rent-btn" @click="rent(item.id)">立即租借</span>
        </div>
      </div>
      <div class="more">
        <span @click="toMore">查看更多</span>
        <span></span>
      </div>
    </div>
    <div class="mode7" v-if="mode==7">
      <p class="title">我们的影棚</p>
      <div class="studio-list">
        <div class="studio-item" v-for="(item,index) in studioList" :key="index">
          <el-carousel :interval="5000" arrow="always" :autoplay="false" indicator-position="none">
            <el-carousel-item v-for="(each,j) in item.pic.indexOf(',')!=-1?item.pic.split(','):[item.pic]" :key="j">
              <img :onerror="util.errorPic" :src="$qiniuHost+each" alt="">
            </el-carousel-item>
          </el-carousel>
          <div class="layer">
            <p class="first-row">{{item.name}}</p>
            <div class="second-row">
              <span>￥{{item.priceWorkDayWorkTimePerHour}}</span>
              <span>小时起</span>
            </div>
            <div class="third-row">
              <i class="el-icon-location-outline"></i>
              <span>{{item.address}}</span>
            </div>
            <div class="fouth-row">
              <i class="el-icon-price-tag"></i>
              <span>{{item.square}}㎡</span>
              <span v-for="(one,m) in seviceDeal(item.serviceConditionArray)" :key="m">{{one}}</span>
            </div>
            <div class="pic-index" v-if="false">
              <span>10</span>
              <span>/</span>
              <span>12</span>
            </div>
            <div class="rent-btn" v-if="item.name!='此产品不存在'" @click="rent(item.id)">
              <span>立即租借</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
      <p class="more" @click="toMore">
        <span>更多影棚</span>
        <span></span>
      </p>
    </div>
  </div>
</template>

<script>
import {conditionArray} from "@config/config.js"
import { frontStudio } from "@config/api.js";


  export default {
    data(){
      return{
        studio7Arr:[
          {
            url:'http://img1.imgtn.bdimg.com/it/u=691205204,761740751&fm=26&gp=0.jpg',
          },
          {
            url:'http://img4.imgtn.bdimg.com/it/u=284995538,1671162800&fm=26&gp=0.jpg',
          },
          {
            url:'http://img0.imgtn.bdimg.com/it/u=1832857891,50659817&fm=26&gp=0.jpg',
          },
        ],
        studioList:[],
        nullList:[
          {
            address: "空",
            city: "珠海市",
            city_code: "0756",
            create_time: "0",
            del: "0",
            floor: "12",
            holidayOpenEndTime: "22:00",
            holidayOpenStartTime: "08:00",
            holidayWorkEndTime: "22:00",
            holidayWorkStartTime: "06:00",
            id: "66",
            intro: "<p>123456789789789</p>",
            isEquip: "0",
            is_start: 0,
            lat: "0.000000",
            lng: "0.000000",
            maxHour: "3",
            minHour: "3",
            name: "此产品不存在",
            nick: "派图租赁",
            normalOpenEndTime: "22:00",
            normalOpenStartTime: "08:00",
            normalWorkEndTime: "18:00",
            normalWorkStartTime: "08:00",
            pic: "",
            priceHolidayAllDay: "8",
            priceHolidayOverTimePerHour: "8",
            priceHolidayWorkTimePerHour: "8",
            priceWeekEndAllDay: "8",
            priceWeekEndOverTimePerHour: "8",
            priceWeekEndWorkTimePerHour: "8",
            priceWorkDayAllDay: "8",
            priceWorkDayOverTimePerHour: "8",
            priceWorkDayWorkTimePerHour: "0",
            province: "广东省",
            province_code: "44",
            score: "3.0",
            serviceConditionArray: [],
            sort: "0",
            square: "0",
            studio_valid: "1",
            total: "0",
            typeClassify: "0",
            uid: "3",
            video: "",
            vr_array: ""
          },
          {
            address: "空",
            city: "珠海市",
            city_code: "0756",
            create_time: "0",
            del: "0",
            floor: "12",
            holidayOpenEndTime: "22:00",
            holidayOpenStartTime: "08:00",
            holidayWorkEndTime: "22:00",
            holidayWorkStartTime: "06:00",
            id: "66",
            intro: "<p>123456789789789</p>",
            isEquip: "0",
            is_start: 0,
            lat: "0.000000",
            lng: "0.000000",
            maxHour: "3",
            minHour: "3",
            name: "此产品不存在",
            nick: "派图租赁",
            normalOpenEndTime: "22:00",
            normalOpenStartTime: "08:00",
            normalWorkEndTime: "18:00",
            normalWorkStartTime: "08:00",
            pic: "",
            priceHolidayAllDay: "8",
            priceHolidayOverTimePerHour: "8",
            priceHolidayWorkTimePerHour: "8",
            priceWeekEndAllDay: "8",
            priceWeekEndOverTimePerHour: "8",
            priceWeekEndWorkTimePerHour: "8",
            priceWorkDayAllDay: "8",
            priceWorkDayOverTimePerHour: "8",
            priceWorkDayWorkTimePerHour: "0",
            province: "广东省",
            province_code: "44",
            score: "3.0",
            serviceConditionArray: [],
            sort: "0",
            square: "0",
            studio_valid: "1",
            total: "0",
            typeClassify: "0",
            uid: "3",
            video: "",
            vr_array: ""
          },
          {
            address: "空",
            city: "珠海市",
            city_code: "0756",
            create_time: "0",
            del: "0",
            floor: "12",
            holidayOpenEndTime: "22:00",
            holidayOpenStartTime: "08:00",
            holidayWorkEndTime: "22:00",
            holidayWorkStartTime: "06:00",
            id: "66",
            intro: "<p>123456789789789</p>",
            isEquip: "0",
            is_start: 0,
            lat: "0.000000",
            lng: "0.000000",
            maxHour: "3",
            minHour: "3",
            name: "此产品不存在",
            nick: "派图租赁",
            normalOpenEndTime: "22:00",
            normalOpenStartTime: "08:00",
            normalWorkEndTime: "18:00",
            normalWorkStartTime: "08:00",
            pic: "",
            priceHolidayAllDay: "8",
            priceHolidayOverTimePerHour: "8",
            priceHolidayWorkTimePerHour: "8",
            priceWeekEndAllDay: "8",
            priceWeekEndOverTimePerHour: "8",
            priceWeekEndWorkTimePerHour: "8",
            priceWorkDayAllDay: "8",
            priceWorkDayOverTimePerHour: "8",
            priceWorkDayWorkTimePerHour: "0",
            province: "广东省",
            province_code: "44",
            score: "3.0",
            serviceConditionArray: [],
            sort: "0",
            square: "0",
            studio_valid: "1",
            total: "0",
            typeClassify: "0",
            uid: "3",
            video: "",
            vr_array: ""
          }
        ]
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
      this.getStudio({page:1,page_size:3,order_by:'total',studio_uid:this.uid})
    },
    methods:{
      // 图片pic字段逗号处理
      dealPic(pic){
        let arr=[]
        if(pic.indexOf(',')!=-1){
          arr=pic.split(',').filter(item=>{
            return item
          })
        }else{
          arr.push(pic)
        }
        console.warn(arr,'pic处理')
        return arr
      },
      getStudio(params){
        this.getRequest(frontStudio.getStudioList,{...params}).then(res=>{
          console.warn(res,'影棚列表')
          this.studioList=res.rows
          // if(this.studioList.length==0){
          //   this.studioList=this.nullList
          // }
          console.warn(this.studioList,this.mode,'hahahha')
        }).catch(err=>{
          console.error(err)
        })
      },
      seviceDeal(arr){
        let newArr=[]
        arr.forEach(item=>{
          conditionArray.forEach(each=>{
            if(item==each.id){
              newArr.push(each.name)
            }
          })
        })
        return newArr
      },
      toMore(){
        this.$emit('selectTab','/shop/studio')        
      },
      rent(studioId){
        this.$router.push({path:'/studio/detail',query:{
          id:studioId
        }})
      }
    },
  }
</script>

<style lang="scss" scoped>
.mode1{
  margin-bottom: 116px;
  .studio-item{
    width: 1200px;
    margin: 0 auto;
    .grey-line{
      height: 8px;
      background: #F0F4F8;
    }
    .studio-detail{
      height: 336px;
      display: flex;
      .img-wrap{
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          max-width: 100%;
          max-height: 100%;
          // height: 100%;
          width: auto;
          height: auto;
        }
      }
      .studio-info{
        width: 50%;
        padding: 50px 50px 20px;
        box-sizing: border-box;
        color: #7F8990;
        border: 1px solid #EEF2F6;
        display: flex;
        flex-direction: column;
        p:first-child{
          font-size: 26px;
          margin-bottom: 8px;
        }
        p:nth-child(2){
          margin-bottom: 12px;
          span:first-child{
            font-size: 26px;
            font-weight: bold;
          }
        }
        p:nth-child(3){
          margin-bottom: 12px;
          display: flex;
          i{
            font-size: 16px;
            margin-right: 8px;
            position: relative;
            top: 2px;
          }
        }
        .service{
          font-size: 12px;
          display: flex;
          margin-bottom: auto;
          i{
            font-size: 16px;
            margin-right: 8px;
            position: relative;
            top: 2px;
          }
          div{
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            span{
              width: 60px;
              height: 23px;
              // padding: 5px;
              background:rgb(255,255,255);
              border-radius:2px;
              border:1px solid rgb(238,242,246);
              // margin-bottom: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
              &:not(:last-child){
                margin-right: 5px;
              }
            }
            span:nth-child(7n){
              margin-bottom: 8px;
            }
          }

        }
        .rent-btn{
          width:122px;
          height:40px;
          background:rgba(25,43,57,1);
          border-radius:2px;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          span{
            margin-right: 5px;
          }
          i{
            position: relative;
            bottom: -2px;
          }

        }
      }
    }
    &:not(:last-child){
      margin-bottom: 42px;
    }
  }
  .studio-item:nth-child(2){
    .studio-detail{
      flex-direction: row-reverse;
    }
  }
  .studio-item:last-child{
    margin-bottom: 35px;
  }
  .more{
    color: #192B39;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span:first-child{
      font-size: 20px;
      margin-right: 6px;
    }
    span:last-child{
      width: 38px;
      height: 4px;
      background: #192B39;
      position: relative;
      &:after{
        content:'';
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(100%,calc((-50% + 2px)));
        width: 0;
        height: 12px;
        border: 8px solid transparent;
        border-left: 13px solid #192B39;
      }
    }
  }
}
.mode2{
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 98px;
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
    margin-bottom: 60px;
    span:first-child{
      font-size: 36px;
      font-weight: 500;
    }
    .more{
      cursor: pointer;
    }
  }
  .studio-row{
    width: 1200px;
    height: 395px;
    display: flex;
    border: 1px solid #D9D9D9;
    .img-wrap{
      width: 698px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
      }
    }
    .studio-info{
      flex: 1;
      padding: 50px 44px 42px 50px;
      box-sizing: border-box;
      color: #333;
      display: flex;
      flex-direction: column;
      .name{
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 29px;
      }
      .address{
        font-size: 16px;
        margin-bottom: 30px;
      }
      .device{
        display: flex;
        margin-bottom: auto;
        flex-wrap: wrap;
        span{
          width: 60px;
          height: 26px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #999;
          color: #999;
          margin-bottom: 5px;
          margin-right: 5px;
        }
        span:nth-child(6n){
          margin-right: 0;
        }
      }
      .price{
        margin-bottom: 19px;
        span:first-child{
          font-size: 16px;
        }
        span:last-child{
          font-size: 24px;
        }
      }
      .bottom{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .rent-btn{
          width: 118px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #7C6AFF;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
        }
        .index{
          display: flex;
          align-items: center;
          margin-left: auto;
          span:first-child{
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #ebebeb;
            margin-right: 14px;
          }
          span:nth-child(2){
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #ebebeb;
            margin-right: 14px;
          }
          span:nth-child(3){
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #ebebeb;
            margin-right: 14px;
          }
          span:last-child{
              font-size: 60px;
              color: #EBEBEB;
          }
        }
      }
    }
    &:not(:last-child){
      margin-bottom: 30px;
    }
  }
}
.mode3{
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 108px;
  .title{
    font-size:72px;
    font-family:Bahnschrift;
    color: #F8F8F8;
    text-align: center;
    padding-top: 67px;
    padding-bottom: 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #D9D9D9;
    margin-bottom: 124px;
    position: relative;
    &:after{
      // content:'影棚租赁';
      content:'\5f71\68da\79df\8d41';
      background: #fff;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%,50%);
      font-size: 36px;
      color: #333;
      padding:0 44px;
      box-sizing: border-box;
      letter-spacing: 3px;
    }
  }
  .studio-row{
    display: flex;
    // padding-top: 10px;
    box-sizing: border-box;
    .img-wrap{
      width: 640px;
      height: 360px;
      background: #7C6AFF;
      position: relative;
      top: 10px;
      right: 10px;
      img{
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        position: relative;
        bottom: 10px;
        left: 10px;
      }
    }
    .info{
      flex: 1;
      padding-left: 70px;
      padding-bottom: 10px;
      box-sizing: border-box;
      color: #333;
      display: flex;
      flex-direction: column;
      .name{
        font-size: 36px;
        font-weight: bold;
        margin-bottom: 33px;
      }
      .address{
        width: 424px;
        font-size: 18px;
        margin-bottom: auto;
      }
      .price{
        margin-bottom: 33px;
        span:first-child{
          font-size: 16px;
        }
        span:last-child{
          font-size: 26px;
          font-weight: bold;
        }
      }
      .bottom{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 48px;
        .rent-btn{
          width: 118px;
          height: 48px;
          border: 1px solid #7C6AFF;
          box-shadow:7px 7px 18px 0px rgba(133,85,240,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          color: #7C6AFF;
          cursor: pointer;
          &:hover{
            background: #7C6AFF;
            color: #fff;
          }
        }
        .row-line{
          width: 105px;
          height: 1px;
          background: #7C6AFF;
          margin-left: auto;
          margin-right: 20px;
        }
        span:last-child{
          font-size: 30px;
          color: #7C6AFF;
        }
      }
    }
    &:not(:last-child){
      margin-bottom: 90px;
    }
  }
  .more{
    width: 140px;
    height: 42px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #333;
    color: #333;
    cursor: pointer;
    i{
      position: relative;
      bottom: -1px;
      margin-left: 5px;
    }
    &:hover{
      border: 1px solid #7C6AFF;
      color: #7C6AFF;
    }
  }

}
.mode4{
  padding-top: 71px;
  padding-bottom: 92px;
  box-sizing: border-box;
  background: #F0F0F0;
  .title{
    width: 1200px;
    margin: 0 auto;
    font-size: 40px;
    font-weight: bold;
    color: #333333;
    letter-spacing: 10px;
    text-align: center;
    font-family:PingFang SC;
    position: relative;
    margin-bottom: 100px;
    &:after{
      content:'Studio Rental';
      position: absolute;
      color: #666;
      font-size: 30px;
      font-family:Bahnschrift;
      letter-spacing: 3px;
      left: 50%;
      bottom: 0;
      transform: translate(-50%,180%);
    }
  }
  .big-studio{
    position: relative;
    margin-bottom: 180px;
    .el-carousel{
      width: 100%;
      height: 900px;
      /deep/ {
        .el-carousel__container{
          width: 100%;
          height: 100%;
          .el-carousel__item{
            width: 100%;
            height: 100%;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .info{
      width: 1200px;
      height: 230px;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%,50%);
      background: #fff;
      z-index: 999;
      border-radius: 26px;
      padding: 0 55px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .device{
        display: flex;
        margin-bottom: 29px;
        span{
          width: 90px;
          height: 32px;
          border: 1px solid #03D4DB;
          color: #03D4DB;
          font-size: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 16px;
          margin-right: 14px;
        }
      }
      .name-price{
        margin-bottom: 29px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .name{
          font-size: 36px;
          font-weight: 500;
          color: #333;
        }
        .price{
          color: #F96B15;
          span:first-child{
            font-size: 32px;
            &::first-letter{
              font-size: 18px;
            }
          }
          span:last-child{
            font-size: 18px;
          }
        }
      }
      .address-rent{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .address{
          color: #333333;
          font-size: 20px;
        }
        .rent-btn{
          width: 138px;
          height: 40px;
          background: #03D4DB;
          color: #fff;
          font-weight: 500;
          font-size: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      }
    }
  }
  .studio-row{
    width: 1200px;
    height: 444px;
    background: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding-left: 20px;
    box-sizing: border-box;
    .img-wrap{
      width: 720px;
      height: 404px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
      }
    }
    .info-wrap{
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .info{
        width: 352px;
        height: 100%;
        padding: 50px 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .name{
          color: #333;
          font-size: 26px;
          font-weight: 500;
          margin-bottom: 27px;
        }
        .address{
          font-size: 18px;
          color: #999;
          margin-bottom: 36px;
        }
        .device{
          display: flex;
          flex-wrap: wrap;
          span{
            width: calc((100% - 36px)/4);
            height: 30px;
            border: 1px solid #03D4DB;
            color: #03D4DB;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 15px;
            margin-right: 12px;
            margin-bottom: 12px;
          }
          span:nth-child(4n){
            margin-right: 0;
          }
        }
        .price-rent{
          color: #F96B15;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span:first-child{
            font-size: 24px;
            font-weight: 800;
            &::first-letter{
              font-size: 16px;
            }
          }
          span:last-child{
            width: 118px;
            height: 40px;
            background: #03D4DB;
            color: #fff;
            font-size: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }
      }
    }
  }
  .studio-row + .studio-row{
    margin-top: 32px;
    margin-bottom: 50px;
  }
  .more{
    width: 140px;
    height: 42px;
    border: 1px solid #333;
    color: #333;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    cursor: pointer;
    &:hover{
      background: #03D4DB;
      color: #fff;
      border: 1px solid #03D4DB;
    }
  }
}
.mode5{
  .title-wrap{
    height: 240px;
    background: url('../ShopEquip/85512527945769402.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .content{
      width: 372px;
      height: 140px;
      background: url('../ShopEquip/542112639725554041.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      .title{
        color: #D9BA60;
        font-size: 40px;
        letter-spacing: 5px;
        padding-top: 15px;
        box-sizing: border-box;
        margin-bottom: 18px;
      }
      .more{
        letter-spacing: 1px;
        width: 148px;
        height: 34px;
        background: #E5C875;
        border-radius: 17px;
        color: #fff;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 0 auto;
      }
    }
  }
  .big-studio-wrap{
    background: #0F1C24;
    padding-top: 80px;
    box-sizing: border-box;
    .big-studio{
      width: 1200px;
      margin: 0 auto;
      height: 880px;
      background: #fff;
      border: 20px solid #EFD68E;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 10px;
      box-sizing: border-box;
      margin-bottom: 40px;
      .el-carousel{
        width: 1140px;
        height: 627px;
        /deep/ {
          .el-carousel__container{
            width: 100%;
            height: 100%;
            .el-carousel__item{
              width: 100%;
              height: 100%;
              img{
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
      .info{
        flex: 1;
        width: 1040px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .device-price{
          color: #EFD68E;
          display: flex;
          align-items: center;
          .device{
            width: 98px;
            height: 32px;
            border: 1px solid #EFD68E;
            color: #EFD68E;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            border-radius: 16px;
            &:last-child{
              margin-right: auto;
            }
          }
          .device + .device{
            margin-left: 12px;
          }
          .device + .price{
            margin-left: auto;
          }
          .price{
            span:first-child{
              font-size: 30px;
              &::first-letter{
                font-size: 18px;
              }
            }
            span:last-child{
              font-size: 18px;
            }
          }
        }
        .name-rent{
          display: flex;
          justify-content: space-between;
          span:first-child{
            font-size: 36px;
            font-weight: bold;
            color: #333;
          }
          span:last-child{
            width: 128px;
            height: 36px;
            background: #F51F45;
            color: #fff;
            font-size: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }
        .address{
          font-size: 18px;
        }
      }
    }
    .studio-item{
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 120px;
      .item-wrap{
        width: 580px;
        height: 548px;
        background: #E5C875;
        padding: 10px;
        box-sizing: border-box;
        .item{
          width: 100%;
          background: #fff;
          padding: 5px 5px 0 5px;
          box-sizing: border-box;
          .img-wrap{
            width: 100%;
            height: 306px;
            margin-bottom: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
              max-width: 100%;
              max-height: 100%;
              width: auto;
              height: auto;
            }
          }
          .device{
            display: flex;
            // flex-wrap: wrap;
            margin-bottom: 19px;
            padding-left: 25px;
            box-sizing: border-box;
            span{
              width: 78px;
              height: 28px;
              // padding: 3px 5px;
              border: 1px solid #EFD68E;
              color: #EFD68E;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 14px;
              margin-bottom: 10px;
            }
            span + span{
              margin-left: 12px;
            }
          }
          .name{
            font-size: 20px;
            color: #333;
            font-weight: bold;
            margin-bottom: 20px;
            padding-left: 25px;
            box-sizing: border-box;
          }
          .address{
            color: #333;
            padding-left: 25px;
            padding-bottom: 20px;
            box-sizing: border-box;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .price-rent{
          height: 60px;
          background: #E5C875;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 25px;
          span:first-child{
            color: #0F1C24;
            font-size: 24px;
          }
          span:last-child{
            font-size: 18px;
            color: #F51F45;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.mode6{
  position: relative;
  padding-bottom: 80px;
  box-sizing: border-box;
  .big-studio{
    height: 675px;
    display: flex;
    margin-bottom: 110px;
    .big-wrap{
      width: 1177px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
      }
    }
    .info-wrap{
      flex: 1;
      background: #3270ED;
      padding-top: 73px;
      box-sizing: border-box;
      .title{
        font-size:48px;
        font-family:Bahnschrift;
        color: rgba(255,255,255,0.2);
        position: relative;
        width: 500px;
        text-align: center;
        letter-spacing: 5px;
        margin-bottom: 132px;
        &:after{
          // content:'/影棚租赁/';
          content:'/\5f71\68da\79df\8d41/';
          font-size:44px;
          font-family:FZDaBiaoSong-B06S;
          color: #F0E428;
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translate(-50%,40%);
        }
      }
      .info{
        width: 552px;
        height: 340px;
        background: #fff;
        padding: 40px 40px 30px;
        box-sizing: border-box;
        color: #333;
        display: flex;
        flex-direction: column;
        position: relative;
        left: -150px;
        .name{
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 18px;
        }
        .address{
          font-size: 18px;
          margin-bottom: 18px;
        }
        .device{
          display: flex;
          flex-wrap: wrap;
          margin-bottom: auto;
          span{
            width: 84px;
            height: 32px;
            border: 1px solid #DBD020;
            color: #DBD020;
            border-radius: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 12px;
            margin-bottom: 10px;
            &:nth-child(5n){
              margin-right: 0;
            }
          }
        }
        .price-rent{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price{
            color: #333;
            span:first-child{
              font-size: 30px;
            }
            span:last-child{
              font-size: 16px;
            }
          }
          .rent-btn{
            width: 108px;
            height: 40px;
            background: #EE2E29;
            font-size: 18px;
            color: #fff;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }
      }
    }
  }
  .studio-row{
    width: 1200px;
    margin: 0 auto;
    height: 477px;
    display: flex;
    .img-wrap{
      width: 848px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
      }
    }
    .info{
      display: flex;
      flex-direction: column;
      padding: 47px 0 0 43px;
      box-sizing: border-box;
      .name{
        font-size: 30px;
        color: #333;
        font-weight: 500;
        margin-bottom: 30px;
        position: relative;
        &:before{
          content:'';
          width: 60px;
          height: 4px;
          background: #3270ED;
          position: absolute;
          top: 0;
          left: 0;
          transform: translateY(-40px);
        }
      }
      .device{
        display: flex;
        flex-wrap: wrap;
        margin-bottom: auto;
        span{
          width: 78px;
          height: 30px;
          border: 1px solid #DBD020;
          color: #DBD020;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
          margin-bottom: 13px;
          border-radius: 15px;
          &:nth-child(3n){
            margin-right: 0;
          }
        }
      }
      .price{
        color: #333;
        margin-bottom: 32px;
        span:first-child{
          font-size: 32px;
        }
        span:last-child{
          font-size: 18px;
        }
      }
      .rent-btn{
        width: 108px;
        height: 40px;
        background: #EE2E29;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
  .studio-row+.studio-row{
    margin-top: 120px;
    margin-bottom: 60px;
    flex-direction: row-reverse;
    .info{
      padding-left: 0;
    }
  }
  .more{
    // margin-top: 49px;
    color: #192B39;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
    left: 510px;
    span:first-child{
      font-size: 20px;
      margin-right: 6px;
      width: 128px;
      height: 42px;
      border: 1px solid #333;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    span:last-child{
      width: 58px;
      height: 2px;
      background: #192B39;
      position: relative;
      right: 20px;
      &:after{
        content:'';
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(100%,calc((-50% + 1px)));
        width: 0;
        height: 12px;
        border: 8px solid transparent;
        border-left: 13px solid #192B39;
      }
    }
  }
}
.mode7{
  width: 1200px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 140px;
  .title{
    font-size: 40px;
    font-weight: 600;
    color: #FF7817;
    margin-bottom: 35px;
  }
  .studio-list{
    margin-bottom: 35px;
    .studio-item{
      height: 675px;
      border-radius: 16px;
      overflow: hidden;
      position: relative;
      .el-carousel{
        height: 100%;
        /deep/ {
          .el-carousel__container{
            height: 100%;
            .el-carousel__item{
              img{
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
      &:not(:last-child){
        margin-bottom: 20px;
      }
      .layer{
        padding: 18px 20px 22px;
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 174px;
        background:rgba(0,0,0,0.41);
        z-index: 999;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        opacity: 0;
        transition: 0.3s;
        .first-row{
          font-size: 26px;
        }
        .second-row{
          span:first-child{
            font-size: 26px;
            font-weight: bold;
          } 
        }
        .third-row{
          margin-bottom: 5px;
          i{
            font-size: 16px;
            margin-right: 3px;
          }
        }
        .fouth-row{
          display: flex;
          align-items: center;
          i{
            font-size: 16px;
            margin-right: 5px;
          }
          span{
            padding: 5px;
            box-sizing: border-box;
            background: #fff;
            color: #333;
            border-radius: 13px;
            font-size: 12px;
            &:not(:last-child){
              margin-right: 5px;
            }
          }
        }
        .pic-index{
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        .rent-btn{
          position: absolute;
          right: 20px;
          bottom: 22px;
          width:122px;
          height:40px;
          background:linear-gradient(270deg,rgba(245,69,32,1) 0%,rgba(255,120,23,1) 100%);
          border-radius:20px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
          i{
            position: relative;
            bottom: -2px;
            margin-left: 5px;
          }
        }
      }
      &:hover{
        .layer{
          opacity: 1;
        }
      }
    }
  }
  .more{
    color: #FF7817;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span:first-child{
      font-size: 20px;
      margin-right: 6px;
    }
    span:last-child{
      width: 38px;
      height: 4px;
      background: #FF7817;
      position: relative;
      &:after{
        content:'';
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(100%,calc((-50% + 2px)));
        width: 0;
        height: 12px;
        border: 8px solid transparent;
        border-left: 13px solid #FF7817;
      }
    }
  }
}
</style>