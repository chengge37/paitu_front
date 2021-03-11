<template>
  <div class="headModule" :class="{mode2:mode==2,mode3:mode==3,mode4:mode==4,mode5:mode==5,mode6:mode==6}" v-if="loadShopInfo">
    <Header class="shop-header" @toHome="toHome" @toCart="toCart"></Header>
    <Info class="shop-info" @handleCollect="handleCollect" :mode="mode" :shopInfo="shopInfo" :isCollect="isCollect"></Info>
    <Tab class="shop-tab" @selectTab="selectTab" :mode="mode"></Tab>
    <Carousel class="shop-carousel" v-if="$route.path=='/shop/index'" :mode="mode" :uid="uid" @selectTab="selectTab"></Carousel>
    <Coupon class="shop-coupon" v-if="$route.path=='/shop/index'" :mode="mode" :uid="uid"></Coupon>
    <ShopStudio class="shop-studio" v-if="$route.path=='/shop/index'" :mode="mode" :uid="uid" @selectTab="selectTab"></ShopStudio>
    <ShopEquip class="shop-equip" v-if="$route.path=='/shop/index'" :mode="mode" :uid="uid" @selectTab="selectTab"></ShopEquip>
    <ShopActivity class="shop-activity" v-if="$route.path=='/shop/index'" :mode="mode" :uid="uid" @selectTab="selectTab"></ShopActivity>
    <ShopAddress class="shop-address" v-if="$route.path=='/shop/index'" :mode="mode" :shopInfo="shopInfo"></ShopAddress>
    <!--登录弹窗模块-->
		<mini-login :openlogin.sync="isShowDialog" @closed="closeLogin"></mini-login>

    
    <!--头部店铺信息模块-->
    <!-- <div class="top">
      <div class="storeInfo" v-if="shopInfo">
        <el-image fit="contain" style="width:80px;height:80px;" :src="shopInfo.logo?util.qiniuAddress+shopInfo.logo:config.defaultStorePic" />
        <div class="detail">
          <p>{{shopInfo.nick}}</p>
          <p class="address">
            <span>地址：</span>
            {{shopInfo.address}}
          </p>
          <p class="identify">
            <ali-svg-icon icon-class="confirm" class="confirmIcon"></ali-svg-icon>
            <span>已认证</span>
          </p>
        </div>
      </div>
      <el-button class="collectBtn" :class="{'collect':isCollect}" @click="collect()">{{isCollect?'已收藏':'收藏店铺'}}</el-button>
    </div> -->

    <!--导航条模块-->
    <!-- <div class="menuBar">
      <div class="mainInfo">
        <ul>
          <li
            v-for="(item,index) in menuList"
            :key="index"
            :class="{'active':menuIndex==index}"
            @click="changeMenu(index)"
          >{{item}}</li>
        </ul>
      </div>
    </div> -->

    <!--导航的其他模块-->
	    <!-- <home v-if="$route.path=='/shop/index'"></home> -->
	    <studio v-if="$route.path=='/shop/studio'"></studio>
	    <equip v-if="$route.path=='/shop/equip'"></equip>
	    <activity v-if="$route.path=='/shop/activity'"></activity>
    
  </div>
</template>

<script>
import { frontHome, frontShop,frontFollowOrCollect,coupon,frontStudio } from "@config/api.js";
import { collectStore, getUserLsObj } from "@util/common.js";
import {conditionArray} from "@config/config.js"
import home from "./home.vue";
import studio from "./studio.vue";
import equip from "./equip.vue";
import activity from "./activity.vue";
import Header from './ShopHead/index'
import Info from './ShopInfo/index'
import Tab from './ShopTab/index'
import Carousel from './ShopCarousel/index'
import Coupon from './ShopCoupon/index'
import ShopStudio from './ShopStudio/index'
import ShopEquip from './ShopEquip/index'
import ShopActivity from './ShopActivity/index'
import ShopAddress from './ShopAddress/index'
import miniLogin from "FrontComponents/minilogin";



export default {
  data() {
    return {
      shopInfo: null, //店铺详细信息
      loadShopInfo:false,  //加载完店铺信息
      // menuIndex: 0,
      // menuList: ["首页", "影棚", "器材", "活动"],
      hotMenuList: ["全部", "影棚", "器材"],
      hotMenuIndex: 0,
      uid: 0, //店家ID
      isCollect: false, //店铺是否已经收藏
      mode: 1,
      isShowDialog:false
    };
  },
  components: {
    home,
    studio,
    equip,
    activity,
    Header,
    Info,
    Tab,
    Carousel,
    Coupon,
    ShopStudio,
    ShopEquip,
    ShopActivity,
    ShopAddress,
    miniLogin
  },
  created() {
		
    console.log("shop------index---------------------");
    let query = this.$route.query;
    if (JSON.stringify(query) != "{}") {
      if (query.uid) {
        this.uid = query.uid;
      }
    }
		
    //获取店铺信息
    if(this.uid!=0){
    	this.getShopById(this.uid);
    }else{
    	let	path='/studio/index';
			this.$router.push({ path: path});
			return;
    }

    //如果用户已经登录，判断该店家是否已经收藏
    if (this.util.userIsLogin()) {
      console.warn(this.uid)
      getUserLsObj(this.uid, "0", "1").then(res => {
        this.isCollect=(res==1)
      }).catch(err=>{
        console.error(err)
      });
    }
  },
  mounted() {
  	
  },
  methods: {
    //切换菜单模块，跳到相应的路由
    // changeMenu(val) {
    //   console.log("changeMenu----------", val);
    //   this.menuIndex = val;
    //   let url;
    //   let params = {
    //     uid: this.uid
    //   };
    //   url = this.pathList[val];
    //   this.$router.push({
    //     path: url,
    //     query: params
    //   });
    // },
    closeLogin(){
      this.isShowDialog=false
    },
    //根据店家id获取店家基本信息
    getShopById(id) {
      let params = {
        uid: id
      };
      // 头像接口问题
//    this.getRequest(frontShop.getShopById, params)
//      .then(res => {
	  this.util.getShopInfo(id).then(res=>{
          if (JSON.stringify(res) == "[]" || JSON.stringify(res) == "{}" || res.data_lock==2) {
            this.$message.warning("店铺不存在!");
            this.$router.push({ path: "*", query: { title: "店铺" } });
          } else {
            this.shopInfo = res;
            console.warn(res,'所有店铺信息')
            if(res.select_tpl){
            	this.mode=parseInt(res.select_tpl)-0
            }else{
            	this.mode=0;
            }
            
            console.log("getShopById------", res);
          }
          this.loadShopInfo=true;
        })
        .catch(err => {});
    },
    
    // 获取店铺影棚
    getStudio(params){
      this.getRequest(frontStudio.getStudioList,{...params}).then(res=>{
        console.warn(res,'影棚列表')
        this.studioList=res.rows
      }).catch(err=>{
        console.error(err)
      })
    },
    // 获取店铺器材
    getEquip(){

    },
    // 获取店铺活动
    getActivity(){

    },
    // 回到首页
    toHome(){
      this.$router.push('/')
    },
    // 去购物车
    toCart(){
      console.warn('跳转到购物车')
      this.$router.push('/cart/index')
    },
    // 操作收藏
    handleCollect(){
      if(!this.util.userIsLogin()){
        this.isShowDialog=true
        return
      }
      if(this.isCollect){
        this.postRequest(frontFollowOrCollect.unFollowOrUnCollect,{
          type:'0',
          obj:'1',
          relation_id:this.shopInfo.id
        }).then(res=>{
          this.isCollect=false
          this.$message.success({message:'已取消收藏',duration:500})
        }).catch(err=>{
          console.error(error)
        })
      }else{
        this.postRequest(frontFollowOrCollect.followOrCollect,{
          to_uid:this.shopInfo.id,
          type:'0',
          obj:'1',
          relation_id:'0'
        }).then(res=>{
          this.$message.success({message:'收藏成功',duration:500})
          this.isCollect=true
        }).catch(err=>{
          console.error(err)
        })
      }
    },
    // 选择tab
    selectTab(path,data){
      console.warn(path,'999',data)
      this.$router.push({path,query:{
        uid:this.uid,
        ...data
      }})
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@front/common/common.scss";

.headModule {
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  .top {
    width: 1200px;
    margin: 0px auto;
    padding: 20px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .storeInfo {
      display: flex;
      div:first-child {
        border: 1px solid #f0f0f0;
        margin-right: 22px;
      }
      .detail {
        .address {
          margin: 9px 0px;
        }

        p {
          color: #333;
        }

        p:first-child {
          font-size: 16px;
          font-weight: 600;
        }
      }

      img {
        margin-right: 20px;
        max-width: 20%;
      }
    }

    .collectBtn {
      border-radius: 0px;

      &.collect {
        background: #7C6AFF;
        color: #fff;
      }
    }
  }

  /*顶部导航条样式*/
  .menuBar {
    height: 40px;
    background: #333;

    .mainInfo {
      display: flex;
      width: 1200px;
      margin: 0px auto;
      justify-content: space-between;
      align-items: center;

      ul {
        display: flex;

        li {
          color: #fff;
          line-height: 40px;
          padding: 0px 30px;
          cursor: pointer;

          &.active,
          &:hover {
            background: #b5b5b5;
          }
        }
      }

      .search-box {
        display: flex;
        height: 30px;

        .search {
          input {
            height: 100%;
            text-indent: 10px;
          }
        }

        .search-button {
          width: 75px;
          height: 100%;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #d9d9d9;

          .bg-mirror_gray {
            width: 40px;
            height: 40px;
          }
        }
        .mirrorIcon {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
.mode2{
  .shop-studio{
    order: 2;
  }
  .shop-equip{
    order: 1;
  }
  .shop-activity{
    order: 3;
  }
  .shop-address{
    order: 4;
  } 
}
.mode3{
  .shop-coupon{
    order: 2;
  }
  .shop-studio{
    order: 3;
  }
  .shop-equip{
    order: 1;
  }
  .shop-activity{
    order: 4;
  }
  .shop-address{
    order: 5;
  } 
}
.mode4{
  .shop-studio{
    order: 2;
  }
  .shop-equip{
    order: 1;
  }
  .shop-activity{
    order: 3;
  }
  .shop-address{
    order: 4;
  } 
}
.mode5{
  .shop-studio{
    order: 2;
  }
  .shop-equip{
    order: 1;
  }
  .shop-activity{
    order: 3;
  }
  .shop-address{
    order: 4;
  } 
}
.mode6{
  .shop-studio{
    order: 2;
  }
  .shop-equip{
    order: 1;
  }
  .shop-activity{
    order: 4;
  }
  .shop-address{
    order: 3;
  } 
}
</style>
