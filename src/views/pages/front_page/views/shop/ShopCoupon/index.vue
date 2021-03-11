<template>
    <div :class="{mode1:mode==1,mode2:mode==2,mode3:mode==3,mode4:mode==4,mode5:mode==5,mode6:mode==6,mode7:mode==7}">
      <div class="center">
        <p class="sub-title" v-if="mode==3">Get Coupons</p>
        <p class="main-title" v-if="mode==2||mode==3||mode==4||mode==5">领取优惠券</p>
        <p class="sub-title" v-if="mode==4||mode==6">Get Coupons</p>
        <div class="get-arrow" v-if="mode==3">
          <span>领取优惠</span>
          <span class="white-line"></span>
        </div>
        <el-carousel v-if="couponList.length!=0" :interval="5000" arrow="always" :autoplay="false" indicator-position="none">
          <el-carousel-item v-for="(item,index) in couponList" :key="index">
            <div :class="{'has-pick':is_login_in&&each.user_get==each.limit_count,'not-login':!is_login_in}" class="coupon-item" v-for="(each,j) in item" :key="j">

              <!-- 模板1或7 -->
              <p v-if="mode==1||mode==7">
                <span>{{each.money}}</span>
              </p>
              <p v-if="mode==1||mode==7">{{each.content}}</p>
              <div v-if="mode==1||mode==7" class="layer" @click="pickCoupon(each.id)">领取</div>   

              <!-- 模板3 -->
              <p v-if="mode==3">
                <span>￥</span>
                <span v-if="each.money!=0">{{each.money.slice(0,each.money.indexOf('.'))}}</span>
                <span v-else>{{each.money}}</span>
              </p>
              <p v-if="mode==3">{{each.content}}</p>
              <p v-if="mode==3">{{each.title}}</p>
              <p  @click="pickCoupon(each.id)" v-if="mode==3&&each.money!=0" :class="{'bg-btn':each.user_get!=each.limit_count}">{{each.user_get==each.limit_count?'已领取':'立即领取'}}</p>
              <span v-if="mode==3" class="top-left arrow"></span>
              <span v-if="mode==3" class="top-right arrow"></span>
              <span v-if="mode==3" class="bottom-left arrow"></span>
              <span v-if="mode==3" class="bottom-right arrow"></span>

              <!-- 模板1,3,6,7 -->
              <div class="coupon-left" v-if="!(mode==1||mode==3||mode==6||mode==7)">
                <p>
                  <span>￥</span>
                  <span v-if="each.money!=0">{{each.money.slice(0,each.money.indexOf('.'))}}</span>
                  <span v-else>{{each.money}}</span>
                </p>
                <span>{{each.title}}</span>
              </div>
              <div class="coupon-right" v-if="!(mode==1||mode==3||mode==6||mode==7)">
                <p>
                  <span>>></span>
                  <span>店铺券</span>
                  <span><<</span>
                </p>
                <p>{{each.content}}</p>
                <p v-show="is_login_in&&each.money!=0" @click="pickCoupon(each.id)">{{each.user_get==each.limit_count?'已领完':'立即领取'}}</p>
              </div>

              <!-- 模板6 -->
              <p v-if="mode==6" class="unit">RMB</p>
              <p v-if="mode==6&&each.money!=0" class="value">{{each.money.slice(0,each.money.indexOf('.'))}}</p>
              <p v-if="mode==6&&each.money==0" class="value">{{each.money}}</p>
              <p v-if="mode==6" class="rule">/</p>
              <p v-if="mode==6&&each.money!=0" class="btn" @click="pickCoupon(each.id)">{{each.user_get==each.limit_count?'已领完':'立即领取'}}</p>

            </div>
          </el-carousel-item>
        </el-carousel>
        <div v-else class="nodata"></div>
      </div>
    </div>
    <!-- <div class="wrap" :class="{mode2:mode==2,mode3:mode==3,mode4:mode==4}">
      <div class="center">
        <p class="sub-title" v-if="mode==2">Get Coupons</p>
        <p class="main-title">领取优惠券</p>
        <p class="sub-title" v-if="mode==3">Get Coupons</p>
        <div class="get-arrow" v-if="mode==2">
          <span>领取优惠</span>
          <span class="white-line"></span>
        </div>
        <div v-if="mode!=2" class="coupon-list">
          <div class="coupon" v-for="item in 3" :key="item">
            <div class="coupon-left">
              <p>
                <span>￥</span>
                <span>20</span>
              </p>
              <span>满200可使用</span>
            </div>
            <div class="coupon-right">
              <p>
                <span>>></span>
                <span>店铺券</span>
                <span><<</span>
              </p>
              <p>使用规则文案使用规则文案规则文案文案文案</p>
              <p>立即领取</p>
            </div>
          </div>
        </div>
        <el-carousel v-if="mode==2" :interval="5000" arrow="always" :autoplay="false" indicator-position="none">
          <el-carousel-item v-for="(item,index) in couponArr" :key="index">
            <div class="coupon-item" v-for="(each,j) in item" :key="j">
              <p>
                <span>￥</span>
                <span>{{each.value}}</span>
              </p>
              <p>{{each.intro}}</p>
              <p>{{each.rule}}</p>
              <p :class="{'bg-btn':true}">{{each.btnText}}</p>
              <span class="top-left arrow"></span>
              <span class="top-right arrow"></span>
              <span class="bottom-left arrow"></span>
              <span class="bottom-right arrow"></span>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div> -->
</template>

<script>
import {coupon} from "@config/api.js"
import { mapGetters } from "vuex";

  export default {
    data(){
      return{
        couponList:[],
        nodataList:[
          {
            content: "空",
            count: "100",
            coupon_type: "1",
            create_time: "1572924252",
            del: "0",
            end_time: "2019-12-18 00:00:00",
            id: "36",
            is_all: "1",
            is_use: "1",
            limit_count: "1",
            limit_money: "5",
            money: "0",
            obj_id: "0",
            pic: null,
            recommend: "1",
            st_time: "2019-11-04 00:00:00",
            status: "1",
            title: "满0可使用",
            to_uid_avatar: "1-1564726913251.jpg",
            to_uid_logo: "3-1573107054357.jpg",
            to_uid_name: "派图租赁",
            type: "0",
            uid: "3",
            user_count: "2",
            user_get: 1
          },
          {
            content: "空",
            count: "100",
            coupon_type: "1",
            create_time: "1572924252",
            del: "0",
            end_time: "2019-12-18 00:00:00",
            id: "36",
            is_all: "1",
            is_use: "1",
            limit_count: "1",
            limit_money: "5",
            money: "0",
            obj_id: "0",
            pic: null,
            recommend: "1",
            st_time: "2019-11-04 00:00:00",
            status: "1",
            title: "满0可使用",
            to_uid_avatar: "1-1564726913251.jpg",
            to_uid_logo: "3-1573107054357.jpg",
            to_uid_name: "派图租赁",
            type: "0",
            uid: "3",
            user_count: "2",
            user_get: 1
          },
          {
            content: "空",
            count: "100",
            coupon_type: "1",
            create_time: "1572924252",
            del: "0",
            end_time: "2019-12-18 00:00:00",
            id: "36",
            is_all: "1",
            is_use: "1",
            limit_count: "1",
            limit_money: "5",
            money: "0",
            obj_id: "0",
            pic: null,
            recommend: "1",
            st_time: "2019-11-04 00:00:00",
            status: "1",
            title: "满0可使用",
            to_uid_avatar: "1-1564726913251.jpg",
            to_uid_logo: "3-1573107054357.jpg",
            to_uid_name: "派图租赁",
            type: "0",
            uid: "3",
            user_count: "2",
            user_get: 1
          },
          {
            content: "空",
            count: "100",
            coupon_type: "1",
            create_time: "1572924252",
            del: "0",
            end_time: "2019-12-18 00:00:00",
            id: "36",
            is_all: "1",
            is_use: "1",
            limit_count: "1",
            limit_money: "5",
            money: "0",
            obj_id: "0",
            pic: null,
            recommend: "1",
            st_time: "2019-11-04 00:00:00",
            status: "1",
            title: "满0可使用",
            to_uid_avatar: "1-1564726913251.jpg",
            to_uid_logo: "3-1573107054357.jpg",
            to_uid_name: "派图租赁",
            type: "0",
            uid: "3",
            user_count: "2",
            user_get: 1
          },
          {
            content: "空",
            count: "100",
            coupon_type: "1",
            create_time: "1572924252",
            del: "0",
            end_time: "2019-12-18 00:00:00",
            id: "36",
            is_all: "1",
            is_use: "1",
            limit_count: "1",
            limit_money: "5",
            money: "0",
            obj_id: "0",
            pic: null,
            recommend: "1",
            st_time: "2019-11-04 00:00:00",
            status: "1",
            title: "满0可使用",
            to_uid_avatar: "1-1564726913251.jpg",
            to_uid_logo: "3-1573107054357.jpg",
            to_uid_name: "派图租赁",
            type: "0",
            uid: "3",
            user_count: "2",
            user_get: 1
          }
        ] 
      }
    },
    created(){
      console.warn(this.user_data,this.is_login_in,'8888')
      this.getCoupon()
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
    methods:{
      getCoupon(){
        if(this.is_login_in){
          this.getRequest(coupon.getList,{
          page:1,
          page_size:1000,
          uid:this.uid,
        }).then(res=>{
          this.couponList=res.rows
          // if(this.couponList.length==0){
          //   this.couponList=this.nodataList
          // }
          switch (this.mode){
            case 1:
              this.arrSlice(5)
              break;
            case 2:
            case 3:
              case 4:
            case 5:
              case 6:
            case 7:
              this.arrSlice(3);
              break;
          }
          console.warn(this.couponList,'++++++优惠券李彪')
          }).catch(err=>{
            console.error(err)
          })
        }else{
          this.getRequest(coupon.ajaxGet,{
          page:1,
          page_size:1000,
          uid:this.uid,
        }).then(res=>{
          this.couponList=res.rows
          // if(this.couponList.length==0){
          //   this.couponList=this.nodataList
          // }
          switch (this.mode){
            case 1:
              this.arrSlice(5)
              break;
            case 2:
            case 3:
              case 4:
            case 5:
              case 6:
            case 7:
              this.arrSlice(3);
              break;
          }
          console.warn(this.couponList,'++++++优惠券李彪')
          }).catch(err=>{
            console.error(err)
          })
        }
      },
      arrSlice(n){
        let arr=[]
        let num=Math.ceil(this.couponList.length/n)
        for(let i=0;i<num;i++){
          arr.push(this.couponList.slice(n*i,n*i+n))
        }
        this.couponList=arr
      },
      pickCoupon(id){
        this.getRequest(coupon.userAdd,{id}).then(res=>{
          this.getCoupon()
        }).catch(err=>{
          console.error(err)
        })
      }
    },
    computed: {
			...mapGetters(["is_login_in"])
		},
    watch:{
      is_login_in(val){
        console.warn(val,'是否登录')
      }
    }
    
  }
</script>

<style lang="scss" scoped>
.mode1{
  .center{
    width: 1200px;
    margin: 0 auto;
    .el-carousel{
      height: 162px;
      /deep/{
        .el-carousel__container{
          height: 100%;
        }
        // .el-carousel__item h3 {
        //   color: #475669;
        //   font-size: 18px;
        //   opacity: 0.75;
        //   // line-height: 300px;
        //   margin: 0;
        // }
        .el-carousel__arrow{
          background: #fff;
          opacity: .6;
          .el-icon-arrow-left,.el-icon-arrow-right{
            color: #192B39;
            font-size: 20px;
            font-weight: bold;
          }
        }
        .el-carousel__item{
          display: flex;
          justify-content: center;
          align-items: center;
          .coupon-item{
            width: 200px;
            height: 82px;
            background: #fff;
            position: relative;
            padding: 8px 12px;
            box-sizing: border-box;
            color: #192B39;
            background: url('./Group 17.png') no-repeat;
            background-size: 100% 100%;
            &:not(:last-child){
              margin-right: 15px;
            }
            p:first-child{
              font-size: 24px;
              font-weight: bold;
            }
            p:nth-child(2){
              width: 75%;
              font-size: 12px;
            }
            .layer{
              width: 200px;
              height: 82px;
              background: rgba(0,0,0,0.8);
              color: #FB8200;
              font-size: 24px;
              font-weight: 600;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 999;
              display: none;
              cursor: pointer;
            }
            &:hover{
              .layer{
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
          .not-login{
            &:hover{
              .layer{
                display: none;
              }
            }
          }
          .has-pick{
            background: url('./pick.png') no-repeat;
            background-size: 100% 100%;
            &:hover{
              .layer{
                display: none;
              }
            }
          }
        }
      }
    }
    .nodata{
      height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: lightblue;
      font-size: 30px;
      font-weight: bold;
    }
  }
}
.mode2{
  height: 400px;
  width: 1200px;
  // height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .main-title{
    font-size: 32px;
    color: #333;
    font-weight: 500;
    margin-bottom: 42px;
  }
  .el-carousel{
    height: 162px;
    /deep/{
      .el-carousel__container{
        height: 100%;
      }
      .el-carousel__arrow{
        width:40px;
        height:40px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(217,217,217,1);
        border-radius:20px;
        .el-icon-arrow-left,.el-icon-arrow-right{
          color: #D9D9D9;
          font-size: 20px;
          font-weight: bold;
        }
        &:hover{
          border-color:#FD5055;
          .el-icon-arrow-left,.el-icon-arrow-right{
            color: #FD5055;
          }
        }
      }
      .el-carousel__item{
        display: flex;
        justify-content: center;
        align-items: center;
        .coupon-item{
          width:calc((88% - 32px)/3);
          height:160px;
          display: flex;
          // border: 1px solid #789987;
          background: url('https://pic.paitume.com/96-1569482636721.png') no-repeat;
          background-size: contain;
          &:not(:last-child){
            margin-right: 15px;
          }
          p:first-child{
            font-size: 24px;
            font-weight: bold;
          }
          p:nth-child(2){
            width: 75%;
            font-size: 12px;
          }
          .coupon-left{
            width: 130px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #FD5055;
            padding: 0 20px;
            box-sizing: border-box;
            & > p{
              margin-bottom: 28px;
              span:first-child{
                font-size: 18px;
              }
              span:last-child{
                font-size: 42px;
              }
            }
            & > p{
              font-size: 12px;
            }
            // background: pink;
          }
          .coupon-right{
            flex: 1;
            display: flex;
            flex-direction: column;
            // justify-content: space-between;
            font-size: 12px;
            padding: 24px 22px;
            box-sizing: border-box;
            p:first-child{
              color: #FD5055;
              font-weight: bold;
              margin-bottom: 8px;
            }
            p:nth-child(2){
              color: #333;
              overflow:hidden; 
              text-overflow:ellipsis;
              display:-webkit-box;  //将对象作为弹性伸缩盒子模型显示。
              -webkit-box-orient:vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
              -webkit-line-clamp:2; //这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。此处为2行
              word-wrap: break-word;//允许单词内断句，首先会尝试挪到下一行，看看下一行的宽度够不够，不够的话就进行单词内的断句
              margin-bottom: auto;
            }
            p:last-child{
              height: 26px;
              background:rgb(255,251,243);
              border:1px solid rgb(253,80,85);
              color: #F9393E;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
.mode3{
  background: #7C6AFF;
  margin-bottom: 99px;
  .center{
    width: 1200px;
    margin: 0 auto;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 73px;
    padding-bottom: 41px;
    box-sizing: border-box;
    .sub-title{
      font-size: 60px;
      font-family:Bahnschrift;
      color: #fff;
      margin-bottom: 25px;
    }
    .main-title{
      font-size: 36px;
      font-weight: bold;
      color: #fff;
      margin-bottom: 66px;
    }
    .get-arrow{
      width: 140px;
      height: 48px;
      line-height: 48px;
      border: 1px solid #fff;
      padding-left: 17px;
      box-sizing: border-box;
      position: relative;
      span:first-child{
        font-size: 16px;
        color: #f0f0f0;
      }
      .white-line{
        position: absolute;
        width: 60px;
        height: 24px;
        border-bottom: 1px solid #fff;
        transform: translateX(40%);
        &:after{
          content:'';
          position: absolute;
          right: 0;
          bottom: 0;
          width: 0;
          height: 20px;
          border: 10px solid transparent;
          border-left: 20px solid #fff;
          transform: translate(100%,50%);
        }
      }
    }
    .el-carousel{
      width: 912px;
      height: 269px;
      // border: 1px dashed saddlebrown;
      align-self: flex-end;
      margin-top: -120px;
      overflow: hidden;
      /deep/{
        .el-carousel__container{
          height: 100%;
        }
        .el-carousel__item h3 {
          color: #475669;
          font-size: 18px;
          opacity: 0.75;
          // line-height: 300px;
          margin: 0;
        }
        .el-carousel__arrow{
          background: #fff;
          opacity: .6;
          .el-icon-arrow-left,.el-icon-arrow-right{
            color: #7C6AFF;
            font-size: 20px;
            font-weight: bold;
          }
        }
        .el-carousel__item{
          display: flex;
          justify-content: center;
          .coupon-item{
            width: 200px;
            height: 245px;
            background: #fff;
            position: relative;
            padding: 10px 25px 0;
            box-sizing: border-box;
            text-align: center;
            &:not(:last-child){
              margin-right: 31px;
            }
            p:first-child{
              color: #FF00A2;
              font-weight: bold;
              span:first-child{
                font-size: 18px;
              }
              span:last-child{
                font-size: 60px;
              }
            }
            p:nth-child(2){
              color: #FF00A2;
              font-size: 20px;
              margin-bottom: 20px;
            }
            p:nth-child(3){
              color: #333;
              margin-bottom: 20px;
            }
            p:nth-child(4){
              width: 128px;
              margin: 0 auto;
              height: 40px;
              line-height: 40px;
              text-align: center;
              background: #fff;
              color: #FF00A2;
              font-size: 18px;
              cursor: pointer;
            }
            p.bg-btn{
              background: #FF00A2;
              color: #fff;
            }
            .arrow{
              position: absolute;
              width: 30px;
              height: 30px;
              background: #7C6AFF;
            }
            .top-left{
              top: 0;
              left: 0;
              transform: translate(-50%,-50%);
              border-bottom-right-radius:50%; 
            }
            .top-right{
              top: 0;
              right: 0;
              transform: translate(50%,-50%);
              border-bottom-left-radius:50%; 
            }
            .bottom-left{
              bottom: 0;
              left: 0;
              transform: translate(-50%,50%);
              border-top-right-radius:50%;
            }
            .bottom-right{
              bottom: 0;
              right: 0;
              transform: translate(50%,50%);
              border-top-left-radius:50%;
            }
          }
        }
      }
    }
  }
}
.mode4{
  height: 500px;
  background: #03D4DB;
  display: flex;
  justify-content: center;
  align-items: center;
  .center{
    width: 1200px;
    height: 400px;
    background: #fff;
    padding: 49px 44px 65px;
    box-sizing: border-box;
    justify-content: flex-start;
    .main-title{
      margin-bottom: 24px;
      font-size: 36px;
      color: #333;
      font-weight: bold;
    }
    .sub-title{
      margin-bottom: 58px;
      color: #999;
      font-size: 29px;
    }
    .el-carousel{
      height: 144px;
      /deep/{
        .el-carousel__container{
          height: 100%;
        }
        .el-carousel__arrow{
          width:40px;
          height:40px;
          background:rgba(255,255,255,1);
          border:1px solid #03D4DB;
          border-radius:20px;
          .el-icon-arrow-left,.el-icon-arrow-right{
            color: #03D4DB;
            font-size: 20px;
            font-weight: bold;
          }
          &:hover{
            background: #03D4DB;
            .el-icon-arrow-left,.el-icon-arrow-right{
              color: #fff;
            }
          }
        }
        .el-carousel__item{
          display: flex;
          justify-content: center;
          align-items: center;
          .coupon-item{
            width: calc((85% - 48px)/3);
            height: 144px;
            background: url('./blue_bg.png') no-repeat;
            background-size: 100% 100%;
            display: flex;
            align-self: center;
            &:not(:last-child){
              margin-right: 15px;
            }
            .coupon-left{
              width: 35%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              color: #03D4DB;
              & > p{
                margin-bottom: 22px;
                span:first-child{
                  font-size: 18px;
                }
                span:last-child{
                  font-size: 42px;
                }
              }
              & > p{
                font-size: 12px;
              }
              & > span{
                padding: 0 20px;
                box-sizing: border-box;
              }
            }
            .coupon-right{
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              font-size: 12px;
              padding: 18px 22px;
              box-sizing: border-box;
              // padding: 20px 26px;
              p:first-child{
                color: #03D4DB;
                font-weight: bold;
              }
              p:nth-child(2){
                color: #333;
                overflow:hidden; 
                text-overflow:ellipsis;
                display:-webkit-box;  //将对象作为弹性伸缩盒子模型显示。
                -webkit-box-orient:vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
                -webkit-line-clamp:2; //这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。此处为2行
                word-wrap: break-word;//允许单词内断句，首先会尝试挪到下一行，看看下一行的宽度够不够，不够的话就进行单词内的断句
              }
              p:last-child{
                height: 26px;
                background:rgb(255,251,243);
                border:1px solid #03D4DB;
                color: #03D4DB;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
.mode5{
  height: 580px;
  background: #0F1C24;
  .center{
    width: 1200px;
    margin: 0 auto;
    padding-top: 67px;
    box-sizing: border-box;
    justify-content: flex-start;
    .main-title{
      font-size: 40px;
      text-align: center;
      margin-bottom: 84px;
      color: #EFD68E;
      letter-spacing: 3px;
      &:before{
        content:'/';
        margin-right: 10px;
      }
      &:after{
        content:'/';
        margin-left: 10px;
      }
    }
    .el-carousel{
      background: #fff;
      height: 280px;
      border: 20px solid #E5C875;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;
      /deep/{
        .el-carousel__container{
          height: 100%;
        }
        .el-carousel__arrow{
          width:40px;
          height:40px;
          background:rgba(255,255,255,1);
          border:1px solid #E5C875;
          border-radius:20px;
          .el-icon-arrow-left,.el-icon-arrow-right{
            color: #E5C875;
            font-size: 20px;
            font-weight: bold;
          }
          &:hover{
            background: #E5C875;
            .el-icon-arrow-left,.el-icon-arrow-right{
              color: #fff;
            }
          }
        }
        .el-carousel__item{
          display: flex;
          justify-content: center;
          align-items: center;

          .coupon-item{
            height: 147px;
            width: calc((992px - 62px)/3);
            background: url('./red_bg.png') no-repeat;
            background-size: 100% 100%;
            display: flex;
            align-self: center;
            &:not(:last-child){
              margin-right: 31px;
            }
            .coupon-left{
              width: 35%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              color: #F51F45;
              & > p{
                margin-bottom: 22px;
                span:first-child{
                  font-size: 18px;
                }
                span:last-child{
                  font-size: 42px;
                }
              }
              & > p{
                font-size: 12px;
              }
              p + span{
                padding: 0 10px;
                box-sizing: border-box;
              }
            }
            .coupon-right{
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              font-size: 12px;
              padding: 18px 22px;
              box-sizing: border-box;
              // padding: 20px 26px;
              p:first-child{
                color: #F51F45;
                font-weight: bold;
              }
              p:nth-child(2){
                color: #333;
                overflow:hidden; 
                text-overflow:ellipsis;
                display:-webkit-box;  //将对象作为弹性伸缩盒子模型显示。
                -webkit-box-orient:vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
                -webkit-line-clamp:2; //这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。此处为2行
                word-wrap: break-word;//允许单词内断句，首先会尝试挪到下一行，看看下一行的宽度够不够，不够的话就进行单词内的断句
              }
              p:last-child{
                height: 26px;
                background:rgb(255,251,243);
                border:1px solid #F51F45;
                color: #F51F45;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    .nodata{
      color: #fff;
      font-size: 30px;
      letter-spacing: 5px;
    }
  }
}
.mode6{
  height: 220px;
  background: #3270ED;
  .center{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    .sub-title{
      text-align: center;
      align-self: flex-start;
      padding-top: 32px;
      box-sizing: border-box;
      flex: 1;
      font-size: 48px;
      color: rgba(255,255,255,0.2);
      position: relative;
      letter-spacing: 5px;
      &:after{
        // content:'/ 领取优惠券 /';
        content:'/ \9886\53d6\4f18\60e0\5238 /';
        letter-spacing: 2px;
        width: 300px;
        font-size: 44px;
        color: #F5EE2F;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%,50%);
      }
    }
    .el-carousel{
      height: 220px;
      width: 800px;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;
      /deep/{
        .el-carousel__container{
          height: 100%;
        }
        .el-carousel__arrow{
          width:40px;
          height:40px;
          // background:rgba(255,255,255,1);
          border:1px solid #E5C875;
          border-radius:20px;
          background: #F0E428;
          opacity: 0.6;
          .el-icon-arrow-left,.el-icon-arrow-right{
            color: #3270ED;
            font-size: 20px;
            font-weight: bold;
          }
          &:hover{
            opacity: 1;
          }
        }
        .el-carousel__item{
          display: flex;
          justify-content: center;
          align-items: center;
          .coupon-item{
            height: 180px;
            width: 230px;
            display: flex;
            align-self: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            color: #F5EE2F;
            .unit{
              font-size: 20px;
              font-weight: 500;
              // margin-bottom: 20px;
            }
            .value{
              font-size: 50px;
              font-weight: 800;
              // margin-bottom: 10px;
            }
            .rule{
              font-size: 24px;
              // margin-bottom: 18px;
            }
            .btn{
              width:118px;
              height:36px;
              background:rgba(240,228,40,1);
              border-radius:18px;
              color: #3270ED;
              font-size: 16px;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }
          }
          .coupon-item + .coupon-item{
            position: relative;
            &:before{
              content:'';
              width: 1px;
              height: 100px;
              background: #F0E428;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translate(0,-50%);
            }
          }
        }
      }
    }
    .nodata{
      margin-top: 80px;
      color: #fff;
      font-size: 30px;
    }
  }
}
.mode7{
  .center{
    width: 800px;
    margin: 0 auto;
    .el-carousel{
      height: 274px;
      /deep/{
        .el-carousel__container{
          height: 100%;
        }
        .el-carousel__arrow{
          background: #FD6B1A;
          width: 24px;
          height: 24px;
          // opacity: .6;
          .el-icon-arrow-left,.el-icon-arrow-right{
            // color: #192B39;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
          }
        }
        .el-carousel__item{
          display: flex;
          justify-content: center;
          align-items: center;
          .coupon-item{
            width: 200px;
            height: 82px;
            background: #fff;
            position: relative;
            padding: 8px 12px;
            box-sizing: border-box;
            color: #fff;
            background: url('./mode7.png') no-repeat;
            background-size: 100% 100%;
            &:not(:last-child){
              margin-right: 15px;
            }
            p:first-child{
              font-size: 24px;
              font-weight: bold;
            }
            p:nth-child(2){
              width: 75%;
              font-size: 12px;
            }
            .layer{
              width: 200px;
              height: 82px;
              background: rgba(0,0,0,0.8);
              color: #FB8200;
              font-size: 24px;
              font-weight: 600;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 999;
              display: none;
              cursor: pointer;
            }
            &:hover{
              .layer{
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
          .not-login{
            &:hover{
              .layer{
                display: none;
              }
            }
          }
          .has-pick{
            background: url('./orange_pick.png') no-repeat;
            background-size: 100% 100%;
            &:hover{
              .layer{
                display: none;
              }
            }
          }
          // .coupon-item{
          //   width: 220px;
          //   height: 82px;
          //   background: #fff;
          //   position: relative;
          //   padding: 8px 12px;
          //   box-sizing: border-box;
          //   color: #fff;
          //   background: url('./mode7.png') no-repeat;
          //   background-size: 100% 100%;
          //   &:not(:last-child){
          //     margin-right: 15px;
          //   }
          //   p:first-child{
          //     font-size: 24px;
          //     font-weight: bold;
          //   }
          //   p:nth-child(2){
          //     width: 73%;
          //     font-size: 12px;
          //   }
          // }
        }
      }
    }
    .nodata{
      margin-top: 100px;
      color: #FF7817;
      font-size: 30px;
      margin-bottom: 100px;
    }
  }
}
// .wrap{
//   height: 400px;
//   .center{
//     max-width: 1100px;
//     height: 100%;
//     margin: 0 auto;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     .main-title{
//       font-size: 32px;
//       color: #333;
//       font-weight: 500;
//       margin-bottom: 42px;
//     }
//     .coupon-list{
//       display: flex;
//       .coupon{
//         width:calc((100% - 32px)/3);
//         height:160px;
//         display: flex;
//         // border: 1px solid #789987;
//         background: url('https://pic.paitume.com/96-1569482636721.png') no-repeat;
//         background-size: contain;
//         &:not(:last-child){
//           margin-right: 16px;
//         }
//         .coupon-left{
//           width: 130px;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           color: #FD5055;
//           & > p{
//             margin-bottom: 28px;
//             span:first-child{
//               font-size: 18px;
//             }
//             span:last-child{
//               font-size: 42px;
//             }
//           }
//           & > p{
//             font-size: 12px;
//           }
//           // background: pink;
//         }
//         .coupon-right{
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           font-size: 12px;
//           padding: 24px 22px;
//           box-sizing: border-box;
//           p:first-child{
//             color: #FD5055;
//             font-weight: bold;
//           }
//           p:nth-child(2){
//             color: #333;
//             overflow:hidden; 
//             text-overflow:ellipsis;
//             display:-webkit-box;  //将对象作为弹性伸缩盒子模型显示。
//             -webkit-box-orient:vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
//             -webkit-line-clamp:2; //这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。此处为2行
//             word-wrap: break-word;//允许单词内断句，首先会尝试挪到下一行，看看下一行的宽度够不够，不够的话就进行单词内的断句
//           }
//           p:last-child{
//             height: 26px;
//             background:rgb(255,251,243);
//             border:1px solid rgb(253,80,85);
//             color: #F9393E;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             cursor: pointer;
//           }
//         }
//       }
//     }
//   }
// }



</style>