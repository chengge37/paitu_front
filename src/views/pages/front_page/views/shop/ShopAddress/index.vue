<template>
  <div class="wrap">
    <div v-if="mode==1||mode==7" :class="{mode1:mode==1,mode7:mode==7}">
      <div class="center">
        <div class="grey-line" v-if="mode==1"></div>
        <div class="address-detail">
          <div class="info">
            <p>联系我们</p>
            <p>
              <span>电话：</span>
              <span>{{shopInfo.mobile||'暂无'}}</span>
            </p>
            <p>
              <span>邮箱：</span>
              <span>{{shopInfo.email||'暂无'}}</span>
            </p>
            <p v-if="false">
              <span>微信：</span>
              <span>paituexample</span>
            </p>
            <p>
              <span>地址：</span>
              <span>{{shopInfo.address||'暂无'}}</span>
            </p>
            <p v-show="false">您的二维码区</p>
          </div>
          <div class="map">
            <my-map height="534px" :lat="shopInfo.lat" :lng="shopInfo.lng" :address="shopInfo.address"></my-map>
          </div>
        </div>
      </div>
    </div>
    <div :class="{mode2:mode==2,mode3:mode==3,mode4:mode==4,mode5:mode==5,mode6:mode==6}" v-if="mode!=1&&mode!=7">
      <div class="title" v-if="mode==2">关于我们</div>
      <div class="title" v-if="mode==3||mode==6">
        About Us
      </div>
      <div class="title" v-if="mode==4">
        关/于/我/们
      </div>
      <div class="title" v-if="mode==5">/ 关于我们 /</div>
      <div class="content" v-if="mode==6">
        <div class="content-left">
          <p class="intro">
            {{shopInfo.brief}}
          </p>
          <div class="phone-email">
            <div class="phone">
              <span>电话：</span>
              <span>{{shopInfo.mobile||'暂无'}}</span>
            </div>
            <div class="email">
              <span>邮箱：</span>
              <span>{{shopInfo.email||'暂无'}}</span>
            </div>
          </div>
          <div class="address">
            <span>地址：</span>
            <span>{{shopInfo.address||'暂无'}}</span>
          </div>
          <div class="qr-wrap" v-show="false">
            <div class="qr"></div>
            <span>微信小程序</span>
          </div>
        </div>
        <div class="img-wrap">
          <img :src="$qiniuHost+shopInfo.logo" alt="">
        </div>
      </div>
      <div class="content" v-if="mode!=6">
        <div class="dec">{{shopInfo.brief}}</div>
        <div class="img-wrap">
          <img :src="$qiniuHost+shopInfo.logo" alt="">
        </div>
      </div>
      <div class="map" v-if="mode!=6">
        <my-map height="400px" :lat="shopInfo.lat" :lng="shopInfo.lng" :address="shopInfo.address"></my-map>
        <div class="detail">
          <p class="phone">
            <span>{{shopInfo.mobile||'暂无'}}</span>
          </p>
          <p class="email">
            <span>{{shopInfo.email||'暂无'}}</span>
          </p>
          <p class="address">
            <span>{{shopInfo.address||'暂无'}}</span>
          </p>
          <div class="qr" v-show="false"></div>
          <p class="bottom" v-show="false">
            <span>微信小程序</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myMap from 'ServeComponents/Amap';
  export default {
    data(){
      return{

      }
    },
    created(){
      console.warn(this.shopInfo,'反对JFK大数据开发技术的开发就是')
    },
    props:{
      mode:{
        type:Number,
        default:1
      },
      shopInfo:{
        type:Object,
        default:null
      }
    },
    components:{
      myMap
    }
  }
</script>

<style lang="scss" scoped>
.mode1{
  margin-bottom: 50px;
  .center{
    width: 1200px;
    margin: 0 auto;
    .grey-line{
      width:1200px;
      height:8px;
      background:rgb(240,244,248);
    }
    .address-detail{
      height: 534px;
      display: flex;
      .info{
        width: 400px;
        padding: 50px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        color: #7F8990;
        border: 1px solid #EEF2F6;
        p{
          margin-bottom: 10px;
        }
        p:first-child{
          font-size: 26px;
          margin-bottom: 14px;
        }
        p:nth-child(5){
          margin-bottom: auto;
        }
        p:last-child{
          width: 223px;
          height: 223px;
          background: #F0F4F8;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 22px;
          margin-top: auto;
        }
      }
      .map{
        width: 800px;
        height: 100%;
        div{
          div.amap-container{
            height: 534px!important;
          }
        }
      }

    }
  }
}
.mode7{
  margin-bottom: 50px;
  .center{
    width: 1200px;
    margin: 0 auto;
    .address-detail{
      height: 534px;
      display: flex;
      .info{
        flex: 1;
        padding: 50px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        background: #FF7817;
        border-radius:8px;
        border:1px solid rgba(255,120,23,1);
        color: #FFF;
        margin-right: 10px;
        p{
          margin-bottom: 10px;
        }
        p:first-child{
          font-size: 26px;
          margin-bottom: 14px;
        }
        p:nth-child(5){
          margin-bottom: auto;
        }
        p:last-child{
          width: 223px;
          height: 223px;
          background: #fff;
          color: #FF7817;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 22px;
        }
      }
      .map{
        width: 800px;
        height: 100%;
        div{
          div.amap-container{
            height: 534px!important;
          }
        }
      }

    }
  }
}
.mode2{
  width: 1200px;
  margin: 0 auto;
  color: #333;
  margin-bottom: 139px;
  .title{
    margin-bottom: 46px;
    font-size: 32px;
  }
  .content{
    display: flex;
    margin-bottom: 60px;
    .dec{
      flex: 1;
      padding: 18px 58px 0 0;
      box-sizing: border-box;
      text-indent: 2em;
    }
    .img-wrap{
      width: 480px;
      height: 360px;
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
  }
  .map{
    width: 1200px;
    height: 400px;
    position: relative;
    .detail{
      position: absolute;
      right: 95px;
      top: 50%;
      transform: translateY(-50%);
      width: 340px;
      height: 320px;
      border-radius: 14px;
      background: #fff;
      padding: 40px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      .phone{
        margin-bottom: 20px;
      }
      .email{
        margin-bottom: 20px;
      }
      .qr{
        width: 87px;
        height: 87px;
        border: 1px solid #ebebeb;
        margin-left: 42px;
      }
    }
  }
}
.mode3{
  width: 1200px;
  margin: 0 auto;
  color: #333;
  margin-bottom: 139px;
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
      // content:'关于我们';
      content:'\5173\4e8e\6211\4eec';
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
  .content{
    display: flex;
    margin-bottom: 60px;
    .dec{
      flex: 1;
      text-indent: 2em;
      line-height: 2;
      padding: 18px 58px 0 0;
      box-sizing: border-box;
    }
    .img-wrap{
      width: 480px;
      height: 360px;
      background: #7C6AFF;
      img{
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        transform: translate(-10px,-10px);
      }
    }
  }
  .map{
    width: 1200px;
    height: 400px;
    position: relative;
    .detail{
      position: absolute;
      right: 95px;
      top: 50%;
      transform: translateY(-50%);
      width: 340px;
      height: 320px;
      border-radius: 14px;
      background: #fff;
      padding: 40px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      .phone{
        margin-bottom: 20px;
      }
      .email{
        margin-bottom: 20px;
      }
      .qr{
        width: 87px;
        height: 87px;
        border: 1px solid #ebebeb;
        margin-left: 42px;
      }
    }
  }
}
.mode4{
  background: #F0F0F0;
  padding: 87px 0 145px;
  box-sizing: border-box;
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
      content:'About Us';
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
  .content{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    margin-bottom: 60px;
    background: #fff;
    .dec{
      width: 680px;
      text-indent: 2em;
      line-height: 2;
      padding: 49px 50px;
      box-sizing: border-box;
    }
    .img-wrap{
      width: 520px;
      height: 400px;
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
  }
  .map{
    width: 1200px;
    margin: 0 auto;
    height: 400px;
    position: relative;
    .detail{
      position: absolute;
      right: 95px;
      top: 50%;
      transform: translateY(-50%);
      width: 340px;
      height: 320px;
      border-radius: 14px;
      background: #fff;
      padding: 40px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      .phone{
        margin-bottom: 20px;
      }
      .email{
        margin-bottom: 20px;
      }
      .qr{
        width: 87px;
        height: 87px;
        border: 1px solid #ebebeb;
        margin-left: 42px;
      }
    }
  }
}
.mode5{
  background: #0F1C24;
  padding-bottom: 142px;
  .title{
    text-align: center;
    font-size: 40px;
    color: #fff;
    font-weight: bold;
    letter-spacing: 3px;
    margin-bottom: 80px;
  }
  .content{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    margin-bottom: 60px;
    background: #0F1C24;
    .dec{
      width: 680px;
      text-indent: 2em;
      line-height: 2;
      padding: 49px 50px 49px 0;
      // box-sizing: border-box;
      color: #fff;
    }
    .img-wrap{
      width: 520px;
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      img{
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
      }
    }
  }
  .map{
    width: 1200px;
    margin: 0 auto;
    height: 400px;
    position: relative;
    .detail{
      position: absolute;
      right: 95px;
      top: 50%;
      transform: translateY(-50%);
      width: 340px;
      height: 320px;
      border-radius: 14px;
      background: #fff;
      padding: 40px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      .phone{
        margin-bottom: 20px;
      }
      .email{
        margin-bottom: 20px;
      }
      .qr{
        width: 87px;
        height: 87px;
        border: 1px solid #ebebeb;
        margin-left: 42px;
      }
    }
  }
}
.mode6{
  height: 675px;
  padding-top: 40px;
  background: #E8ECF4;
  .title{
    width: 1200px;
    margin: 0 auto;
    color:rgba(50,112,237,0.2);
    font-size: 48px;
    position: relative;
    letter-spacing: 5px;
    margin-bottom: 78px;
    &:after{
      // content:'/关于我们/';
      content:'\5173\4e8e\6211\4eec';
      position: absolute;
      bottom: 0;
      left: 0;
      transform: translateY(50%);
      font-size: 44px;
      color: #333;
    }
  }
  .content{
    width: 1200px;
    height: 380px;
    margin: 0 auto;
    display: flex;
    .content-left{
      width: 740px;
      height: 100%;
      background: #3270ED;
      padding: 30px 45px 0;
      position: relative;
      .intro{
        text-indent: 2em;
        line-height: 1.7;
        font-size: 18px;
        color: #FEFEFE;
        margin-bottom: 50px;
      }
      .phone-email{
        font-size: 16px;
        color: #F5EE2F;
        display: flex;
        margin-bottom: 23px;
        .phone{
          margin-right: 66px;
        }
      }
      .address{
        font-size: 16px;
        color: #F5EE2F;
      }
      .qr-wrap{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        bottom: 20px;
        right: 80px;
        .qr{
          width: 100px;
          height: 100px;
          background: #fff;
          margin-bottom: 10px;
        }
        span{
          color: #fff;
        }
      }

    }
    
    .img-wrap{
      width: 460px;
      height: 345px;
      position: relative;
      top: 120px;
      img{
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
      }
    }
    .qr-wrap{
      position: absolute;
    }
  }
}
</style>