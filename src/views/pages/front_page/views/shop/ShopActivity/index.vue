<template>
  <div class="wrap" v-if="activityList.length!=0">
    <div v-if="mode==1||mode==7" :class="{mode1:mode==1,mode7:mode==7}">
      <div class="center">
        <div class="title" v-if="mode==7">我们的活动</div>
        <div class="grey-line" v-if="mode==1"></div>
        <div class="activity-detail">
          <div class="img-wrap">
            <img :onerror="util.errorPic" :src="$qiniuHost+(activityList[0].pic.indexOf(',')!=-1?activityList[0].pic.split(',')[0]:activityList[0].pic)" alt="">
          </div>
          <div class="info">
            <p class="name">{{activityList[0].name}}</p>
            <p class="intro">{{activityList[0].brief}}</p>
            <p class="price">
              <span>{{activityList[0].fee}}</span>
              <span>小时/起</span>
            </p>
            <p v-if="activityList[0].fee!=0" class="join-btn" @click="join(activityList[0].id)">
              <span>立即参加</span>
              <i class="el-icon-arrow-right"></i>
            </p>
          </div>
        </div>
      </div>
      <div @click="toMore" class="more">
        <span>更多活动</span>
        <span></span>
      </div>
    </div>
    <div class="mode2" v-if="mode==2">
      <div class="title">
        <span>热门活动</span>
        <span class="more" @click="toMore">更多活动 >></span>
      </div>
      <div class="activity-wrap">
        <div class="activity-item" v-for="(item,index) in activityList" :key="index">
          <div class="img-wrap">
            <img :onerror="util.errorPic" :src="$qiniuHost+(item.pic.indexOf(',')!=-1?item.pic.split(',')[0]:item.pic)" alt="">
          </div>
          <div class="info">
            <p class="name">{{item.name}}</p>
            <p class="time">
              <span>时间：</span>
              <span>{{item.start_time.split(' ')[0]}}~{{item.end_time.split(' ')[0]}}</span>
            </p>
            <div class="fee-join">
              <div class="fee">
                <span>费用：</span>
                <span>￥{{item.fee}}/人</span>
              </div>
              <span v-if="item.fee!=0" class="join-btn" @click="join(item.id)">立即报名>></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mode3" v-if="mode==3">
      <div class="title">
        Popular Activities
      </div>
      <div class="activity-row" v-for="(item,index) in activityList" :key="index">
        <div class="img-wrap">
          <img :onerror="util.errorPic" :src="$qiniuHost+(item.pic.indexOf(',')!=-1?item.pic.split(',')[0]:item.pic)" alt="">
        </div>
        <div class="info">
          <p class="name">{{item.name}}</p>
          <p class="intro">
            {{item.brief}}
          </p>
          <p class="fee">
            <span>费用：</span>
            <span>￥{{item.fee}}/人</span>
          </p>
          <p class="time">
            <span>时间：</span>
            <span>{{item.start_time.split(' ')[0]}}~{{item.end_time.split(' ')[0]}}</span>
          </p>
          <p class="address">
            <span>地址：</span>
            <span>{{item.address}}</span>
          </p>
          <p v-if="item.fee!=0" class="join-btn" @click="join(item.id)">立即报名>></p>
        </div>
      </div>
      <p class="more" @click="toMore">
        <span>查看更多</span>
        <i class="el-icon-arrow-right"></i>
      </p>
    </div>
    <div class="mode4" v-if="mode==4">
      <div class="title">
        热/门/活/动
      </div>
      <div class="activity-row">
        <div class="img-wrap">
          <img :onerror="util.errorPic" :src="$qiniuHost+(activityList[0].pic.indexOf(',')!=-1?activityList[0].pic.split(',')[0]:activityList[0].pic)" alt="">
        </div>
        <div class="info">
          <p class="name">{{activityList[0].name}}</p>
          <p class="time">
            <span>时间：</span>
            <span>{{activityList[0].start_time.split(' ')[0]}}~{{activityList[0].end_time.split(' ')[0]}}</span>
          </p>
          <p class="address">
            <span>地址：</span>
            <span>{{activityList[0].address}}</span>
          </p>
          <p class="intro">
            {{activityList[0].brief}}
          </p>
          <div class="price-join">
            <div class="price">
              <span>费用：</span>
              <span>￥{{activityList[0].fee}}/每人</span>
            </div>
            <span v-if="activityList[0].fee!=0" class="join" @click="join(activityList[0].id)">立即报名>></span>
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
          <div class="title">/ 热门活动 /</div>
          <div class="more" @click="toMore">查看更多 >></div>
        </div>
      </div>
      <div class="activity-item">
        <div class="item-wrap"  v-for="(item,index) in activityList" :key="index">
          <div class="item">
            <div class="img-wrap">
              <img :onerror="util.errorPic" :src="$qiniuHost+(item.pic.indexOf(',')!=-1?item.pic.split(',')[0]:item.pic)" alt="">
            </div>
            <p class="name">{{item.name}}</p>
            <p class="time">
              <span>时间：</span>
              <span>{{item.start_time.split(' ')[0]}}~{{item.end_time.split(' ')[0]}}</span>
            </p>
          </div>
          <p class="price-join">
            <span>￥{{item.fee}}/每人</span>
            <span v-if="item.fee!=0" @click="join(item.id)">立即报名>></span>
          </p>
        </div>
      </div>
    </div>
    <div class="mode6" v-if="mode==6">
      <div class="title">Popular Activities</div>
      <div class="activity-row">
        <div class="img-wrap">
          <img  :onerror="util.errorPic" :src="$qiniuHost+(activityList[0].pic.indexOf(',')!=-1?activityList[0].pic.split(',')[0]:activityList[0].pic)" alt="">
        </div>
        <div class="info">
          <p class="name">{{activityList[0].name}}</p>
          <p class="time">
            <span>时间：</span>
            <span>{{activityList[0].start_time.split(' ')[0]}}~{{activityList[0].end_time.split(' ')[0]}}</span>
          </p>
          <p class="address">
            <span>地点：</span>
            <span>{{activityList[0].address}}</span>
          </p>
          <p class="intro">
            {{activityList[0].brief}}
          </p>
          <div class="price-join">
            <div class="price">
              <span>￥{{activityList[0].fee}}</span>
              <span>/每小时</span>
            </div>
            <span v-if="activityList[0].fee!=0" class="join-btn" @click="join(activityList[0].id)">立即报名>></span>
          </div>
        </div>
      </div>
      <div class="more" @click="toMore">
        <span>查看更多</span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
import { activity } from "@config/api.js";

  export default {
    data(){
      return{
        activityList:[],
        nullList:[
          {
            address: "空",
            brief: "",
            city: "云浮市",
            city_code: "0766",
            create_time: "1569203519",
            current_person: "20",
            end_time: "",
            fee: "0",
            id: "4",
            info: "",
            is_deleted: "0",
            is_start: "0",
            is_update: "",
            is_valid: "1",
            lat: "22.733636",
            lng: "112.136656",
            max_person: "100",
            min_person: "0",
            name: "此产品不存在",
            pic: "",
            province: "广东省",
            province_code: "44",
            score: "0.0",
            sort: "0",
            start_time: "",
            total: "0",
            type: "1",
            uid: "3",
            user_detail: {nick: "派图租赁", avatar: "1-1564726913251.jpg", id: "3"},
            user_order: [],
            user_sign_up: 2
          },
          {
            address: "空",
            brief: "",
            city: "云浮市",
            city_code: "0766",
            create_time: "1569203519",
            current_person: "20",
            end_time: "",
            fee: "0",
            id: "4",
            info: "",
            is_deleted: "0",
            is_start: "0",
            is_update: "",
            is_valid: "1",
            lat: "22.733636",
            lng: "112.136656",
            max_person: "100",
            min_person: "0",
            name: "此产品不存在",
            pic: "",
            province: "广东省",
            province_code: "44",
            score: "0.0",
            sort: "0",
            start_time: "",
            total: "0",
            type: "1",
            uid: "3",
            user_detail: {nick: "派图租赁", avatar: "1-1564726913251.jpg", id: "3"},
            user_order: [],
            user_sign_up: 2
          },
          {
            address: "空",
            brief: "",
            city: "云浮市",
            city_code: "0766",
            create_time: "1569203519",
            current_person: "20",
            end_time: "",
            fee: "0",
            id: "4",
            info: "",
            is_deleted: "0",
            is_start: "0",
            is_update: "",
            is_valid: "1",
            lat: "22.733636",
            lng: "112.136656",
            max_person: "100",
            min_person: "0",
            name: "此产品不存在",
            pic: "",
            province: "广东省",
            province_code: "44",
            score: "0.0",
            sort: "0",
            start_time: "",
            total: "0",
            type: "1",
            uid: "3",
            user_detail: {nick: "派图租赁", avatar: "1-1564726913251.jpg", id: "3"},
            user_order: [],
            user_sign_up: 2
          },
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
      if(this.mode==1||this.mode==4||this.mode==6||this.mode==7){
        this.getActivity({page:1,page_size:1,uid:this.uid,order_by:1})
      }else if(this.mode==2){
        this.getActivity({page:1,page_size:3,uid:this.uid,order_by:1})
      }else if(this.mode==3||this.mode==5){
        this.getActivity({page:1,page_size:2,uid:this.uid,order_by:1})
      }
    },
    methods:{
      getActivity(params){
        this.getRequest(activity.get_activity_list,{...params}).then(res=>{
          console.warn(res,'活动')
          this.activityList=res.rows
          // if(this.activityList.length==0){
          //   if(this.mode==1||this.mode==4||this.mode==6||this.mode==7){
          //     this.activityList=this.nullList.slice(0,1)
          //   }else if(this.mode==2){
          //     this.activityList=this.nullList.slice(0,3)
          //   }else if(this.mode==3||this.mode==5){
          //     this.activityList=this.nullList.slice(0,2)
          //   }
          // }
        }).catch(err=>{
          console.error(err)
        })
      },
      toMore(){
        this.$emit('selectTab','/shop/activity')        
      },
      join(activityId){
        this.$router.push({path:'/activity/active_details',query:{
          id:activityId
        }})
      }
    }
  }
</script>

<style lang="scss" scoped>
.mode1{
  margin-bottom: 96px;
  .center{
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 35px;
    .grey-line{
      width:1200px;
      height:8px;
      background:rgb(240,244,248);
    }
    .activity-detail{
      height: 534px;
      display: flex;
      .img-wrap{
        width: 800px;
        height: 534px;
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
        padding: 20px;
        box-sizing: border-box;
        width: 400px;
        color: #7F8990;
        display: flex;
        flex-direction: column;
        box-shadow:0px 8px 16px 0px rgba(0,0,0,0.22);
        .name{
          font-size: 26px;
          margin-bottom: 8px;
        }
        .intro{
          font-size: 16px;
          margin-bottom: auto;
        }
        .price{
          margin-bottom: 15px;
          span:first-child{
            font-size: 26px;
            font-weight: bold;
          }
        }
        .join-btn{
          width:122px;
          height:40px;
          background:rgb(25,43,57);
          border-radius:2px;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          i{
            position: relative;
            bottom: -2px;
            margin-left: 5px;
          }
        }
      }
    }
  }
  .more{
    margin-top: 49px;
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
.mode7{
  margin-bottom: 140px;
  .center{
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 35px;
    .title{
      color: #FF7817;
      font-size: 40px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 80px;
    }
    .activity-detail{
      display: flex;
      flex-direction: column;
      .img-wrap{
        width: 1200px;
        height: 800px;
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
        padding-top: 20px;
        box-sizing: border-box;
        color: #333;
        display: flex;
        flex-direction: column;
        .name{
          font-size: 26px;
          margin-bottom: 8px;
        }
        .intro{
          font-size: 16px;
          margin-bottom: 20px;
        }
        .price{
          color: #FF7817;
          margin-bottom: 35px;
          text-align: right;
          span:first-child{
            font-size: 26px;
            font-weight: bold;
          }
        }
        .join-btn{
          align-self: flex-end;
          width:122px;
          height:40px;
          background:linear-gradient(270deg,rgba(245,69,32,1) 0%,rgba(255,120,23,1) 100%);
          border-radius:20px;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          i{
            position: relative;
            bottom: -2px;
            margin-left: 5px;
          }
        }
      }
    }
  }
  .more{
    margin-top: 49px;
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
      font-size: 32px;
      font-weight: 500;
    }
    .more{
      cursor: pointer;
    }
  }
  .activity-wrap{
    display: flex;
    // justify-content: space-between;
    .activity-item{
      // width: 380px;
      width: (calc(100% - 60px)/3);
      height: 420px;
      display: flex;
      flex-direction: column;
      border: 1px solid #D9D9D9;
      margin-right: 30px;
      &:last-child{
        margin-right: 0;
      }
      .img-wrap{
        width: 380px;
        height: 286px;
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
        flex: 1;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .name{
          font-size: 18px;
          color: #333;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .time{
          margin-bottom: auto;
          color: #999;
        }
        .fee-join{
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          .fee{
            span:first-child{
              color: #999;
            }
            span:last-child{
              color:#333;
              font-weight: bold;
            }
          }
          .join-btn{
            color: #7C6AFF;
            font-weight: bold;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.mode3{
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 96px;
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
      // content:'热门活动';
      content:'\70ed\95e8\6d3b\52a8';
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
  .activity-row{
    display: flex;
    margin-bottom: 60px;
    .img-wrap{
      position: relative;
      top: 10px;
      right: 10px;
      width: 360px;
      height: 270px;
      background: #7C6AFF;
      img{
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        position: absolute;
        bottom: 10px;
        left: 10px;
      }
    }
    .info{
      flex: 1;
      padding: 21px 0 25px 30px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      color: #333;
      position: relative;
      .name{
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 25px;
      }
      .intro{
        font-size: 18px;
        margin-bottom: auto;
      }
      .fee{
        margin-bottom: 19px;
        span:first-child{
          font-size: 16px;
          color: #999;
        }
        span:last-child{
          font-size: 22px;
          font-weight: bold;
        }
      }
      .time{
        font-size: 16px;
        color: #999;
        margin-bottom: 15px;
      }
      .address{
        font-size: 16px;
      }
      .join-btn{
        width: 118px;
        height: 44px;
        border: 1px solid #7C6AFF;
        color: #7C6AFF;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0;
        bottom: 25px;
        cursor: pointer;
        &:hover{
          background: #7C6AFF;
          color: #fff;
        }
      }
    }
  }
  .activity-row + .activity-row{
    margin-top: 60px;
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
  height: 870px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
      content:'Popular Activities';
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
  .activity-row{
    width: 1200px;
    height: 475px;
    margin: 0 auto;
    margin-bottom: 50px;
    background: #F0F0F0;
    padding: 20px;
    box-sizing: border-box;
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
        width: auto;
        height: auto;
      }
    }
    .info{
      flex: 1;
      background: #fff;
      padding: 0 45px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .name{
        font-size: 26px;
        color: #333;
        font-weight: 500;
        margin-bottom: 40px;
      }
      .time{
        font-size: 18px;
        color: #999;
        margin-bottom: 12px;
      }
      .address{
        font-size: 18px;
        color: #999;
        margin-bottom: 39px;
      }
      .intro{
        font-size: 16px;
        color: #333;
        margin-bottom: 78px;
      }
      .price-join{
        display: flex;
        justify-content: space-between;
        .price{
          color: #F96B15;
          span:first-child{
            font-size: 18px;
          }
          span:last-child{
            font-size: 24px;
          }
        }
        .join{
          font-size: 20px;
          font-weight: 500;
          color: #03D4DB;
          cursor: pointer;
        }
      }
    }
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
  background: #0F1C24;
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
  .activity-item{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 85px;
    padding-bottom: 120px;
    .item-wrap{
      width: 580px;
      height: 600px;
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
          height: 412px;
          margin-bottom: 20px;
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
        .name{
          font-size: 20px;
          color: #333;
          font-weight: bold;
          margin-bottom: 20px;
          padding-left: 25px;
          box-sizing: border-box;
        }
        .time{
          color: #666;
          padding-left: 25px;
          padding-bottom: 20px;
          box-sizing: border-box;
        }
      }
      .price-join{
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
.mode6{
  padding-top: 100px;
  padding-bottom: 100px;
  background: #F8F8F8;
  .title{
    width: 1200px;
    margin: 0 auto;
    color:rgba(50,112,237,0.2);
    font-size: 48px;
    position: relative;
    letter-spacing: 5px;
    margin-bottom: 77px;
    &:after{
      // content:'/热门活动/';
      content:'\70ed\95e8\6d3b\52a8';
      font-size: 44px;
      color: #333;
      position: absolute;
      left: 8%;
      bottom: 0;
      transform: translateY(40%);
      width: 250px;
    }
  }
  .activity-row{
    width: 1200px;
    height: 410px;
    margin: 0 auto;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    background: #fff;
    margin-bottom: 50px;
    .img-wrap{
      width: 520px;
      height: 390px;
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
      flex: 1;
      padding: 30px 50px 20px;
      box-sizing: border-box;
      color: #333;
      font-size: 18px;
      display: flex;
      flex-direction: column;
      .name{
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 25px;
      }
      .time{
        margin-bottom: 14px;
      }
      .address{
        margin-bottom: 29px;
      }
      .intro{
        margin-bottom: auto;
      }
      .price-join{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price{
          font-size: 14px;
          span:first-child{
            font-size: 20px;
          }
        }
        .join-btn{
          width: 128px;
          height: 40px;
          background: #3270ED;
          color: #fff;
          font-size: 18px;
          font-weight: 500;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      }
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
</style>