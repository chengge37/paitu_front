<template>
  <div class="wrap">
    <div class="info">
      <div class="info-left">
        <img :src="$qiniuHost+info.avatar" alt="" v-if="info && info.avatar">
        <img :src="malePicImgUrl" class="headimg" v-else />
        <span class="company-name">{{info.nick}}</span>
        <div class="has-confirm">
          <ali-svg-icon icon-class="confirm" class-name="confirm"></ali-svg-icon>
          <span>已认证</span>
        </div>
        <div class="bottom-btn">
          <span @click="collect" class="default-hover">{{isCollect?'取消收藏':'收藏'}}</span>
          <span @click="chatTo" class="default-hover">联系我们</span>
        </div>
      </div>
      <div class="info-right">
        <div class="introduction-domain">
          <div class="introduction">
            <div class="purple-line-title">个人介绍</div>
            <div class="dec">{{info.brief}}</div>
          </div>
          <div class="domain">
            <div class="purple-line-title">专业领域</div>
            <div class="wrap">
            <div class="no-data" v-if="!info.remark">暂无</div>
            <span v-else v-for="(item,index) in info.remark.indexOf(',')==-1?[info.remark]:info.remark.split(',')" :key="index">{{item}}</span>
            </div>
          </div>
        </div>
        <div class="tab-line">
          <span :class="{active:item.active}" v-for="(item,index) in tabs" :key="index" @click="changeTab(index)">{{item.label}}</span>
        </div>

        <div class="server-list" v-if="tabs[0].active">
          <div class="server-item card-hover" v-for="(item,index) in serverList" :key="index" @click="util.toServiceDetail(item.id);">
            <el-image style="width:224px;height:298px;" fit="contain" :src="util.picExplode(item.pic,config.defaultEquipPic)"
              :onerror="util.errorPic"
              class="cursor"
            />
            <div class="detail">
              <div class="server-name">{{item.title}}</div>
              <div class="price">¥{{item.norms.length>1?item.norms.slice().sort(function(a,b){return a.priority-b.priority})[1].price:item.norms[0].price}}</div>
              <div class="cooperate-time">
                <span>合作次数：</span>
                <span>{{item.user.deal_count}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="collection" v-if="tabs[1].active">
          <div class="title">作品集</div>
          <div class="collection-list">
            <div class="collection-item" v-for="item in 12"></div>
          </div>
        </div>
        <Pagination v-if="totalCount!=0" class="page-wrap" :total="totalCount" :page="curPage" :pagesize="12" @getPageNum="changePage"></Pagination>
      </div>
    </div>
    <!--登录弹窗模块-->
    <mini-login :openlogin.sync="isShowDialog" @closed="closeLogin"></mini-login>
  </div>
</template>

<script>
import Pagination from 'FrontComponents/pagination'
import { serveInfo } from "@config/api";
import { model,frontFollowOrCollect } from "@config/api"
import miniLogin from "FrontComponents/minilogin";
import {getUserLsObj} from "@util/common.js";
import { male_pic} from "@config/config.js";
import { mapGetters } from "vuex";
  export default {
    data(){
      return{
        malePicImgUrl: male_pic,
        info:{
          remark:''
        },
        isShowDialog:false,
        isCollect:false,
        tabs:[
          {
            label:'服务列表',
            active:true
          },
          {
            label:'作品集',
            active:false
          },
        ],
        totalCount:0,
        curPage:1,
        serverList:[],
        uid:-1,
      }
    },
    components:{
      miniLogin,
      Pagination
    },
    computed: {
			...mapGetters(["user_data"])
		},
    created(){
      this.uid=this.$route.query.id
      this.getInfo()
      this.getServerList()
    },
    methods:{
      //获取服务列表
      getServerList(){
        this.getRequest('service/ajaxGet',{uid:this.uid}).then(res=>{
          this.serverList=res.rows;
          console.log(res,'服务列表');
        })
      },
      changeTab(i){
        this.tabs.forEach(item=>{
          item.active=false
        })
        this.tabs[i].active=true
      },
      getInfo(){
        this.getRequest(serveInfo.GetUniversalInfo, { uid: this.uid }).then(res=>{
          console.warn(res,'摄影师个人信息')
          this.info=res
        }).catch(err=>{
          console.error(err)
        })
      },
       collect(){
         return
        //判断是否有登录
				if(!this.util.userIsLogin()){
					this.isShowDialog=true;
					return;
        }
        if(this.isCollect){
          this.postRequest(frontFollowOrCollect.unFollowOrUnCollect,{
            type:4,
            obj:1,
            relation_id:this.modelInfo.id
          }).then(res=>{
            this.isCollect=false
            this.$message.success('取消收藏成功')
          }).catch(err=>{
            console.error(err)
          })
        }else{
          this.postRequest(frontFollowOrCollect.followOrCollect,{
            to_uid:this.modelInfo.uid,
            type:4,
            obj:1,
            relation_id:this.modelInfo.id
          }).then(res=>{
            this.isCollect=true
            this.$message.success('收藏成功')
          }).catch(err=>{
            console.error(err)
          })
        }
      },
      closeLogin(){
        this.isShowDialog=false
      },
      chatTo(){
        //判断是否有登录
				if(!this.util.userIsLogin()){
					this.isShowDialog=true;
					return;
        }
        let chatToObj = {
          id: this.info.id,
          name: this.info.real_name,
          avatar:this.info.photo?(this.info.photo.indexOf(',')==-1?(this.$qiniuHost+this.info.photo):this.$qiniuHost+this.info.photo.split(',')[0]):"https://pic.paitume.com/images/male.png",
        }
        this.$parent.$parent.$refs.chat.chatTo(chatToObj)
      },
      changePage(){

      }
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
  .info{
    display: flex;
    margin-bottom: 12px;
    .info-left{
      width: 392px;
      height: 392px;
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 78px 20px 20px;
      margin-right: 12px;
      img{
        width: 100px;
        height: 100px;
        border: 1px solid #E0E0E0;
        margin-bottom: 8px;
      }
      .company-name{
        font-size: 18px;
        color: #333;
        margin-bottom: 5px;
      }
      .has-confirm{
        margin-bottom: auto;
        span{
          color: #666;
        }
      }
      .bottom-btn{
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #666;
        span{
          width: 104px;
          height: 40px;
          border: 1px solid #E0E0E0;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          margin-left: 20px;
        }
      }
    }
    .info-right{
      flex:1;
      .introduction-domain{
        background: #fff;
        margin-bottom: 12px;
        height: 392px;
        .introduction{
          height: 178px;
          border-bottom: 1px solid #E0E0E0;
          padding-top: 20px;
          .dec{
            padding: 0 20px;
            line-height: 20px;
          }
        }
        .domain{
          padding-top: 20px;
          div.wrap{
            display: flex;
            .no-data{
              padding-top: 10px;
              padding-left: 25px;
              font-size: 16px;
            }
            span{
              width: 132px;
            height: 40px;
            border: 1px solid #651fff;
            border-radius: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #651fff;
            margin-left: 25px;
            }
          }
        }
      }
      .tab-line{
        background: #fff;
        margin-bottom: 12px;
        height: 38px;
        display: flex;
        align-items: center;
        span{
          width: 104px;
          height: 38px;
          color: #192B39;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .active{
          background: #192B39;
          color: #fff;
        }
      }
      .server-list{
        background: #fff;
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        max-height: 3100px;
        .server-item{
          width: calc((100% - 40px) / 3);
          margin-right: 10px;
          height: 422px;
          margin-bottom: 10px;
          border: 1px solid #F0F0F0;
          cursor: pointer;
          // img{
          //   margin: 0 auto;
          // }
          // img{
          //   width: 100%;
          //   height: 298px;
          // }
          .detail{
            padding: 10px 10px 20px;
            .server-name{
              color: #333;
              margin-bottom: 10px;
            }
            .price{
              font-weight: 600;
              color: #FF0000;
              margin-bottom: auto;
              margin-bottom: 4px;
            }
            .cooperate-time{
              color: #999;
            }
          }
        }
        .server-item:nth-child(5n){
          margin-right: 0;
        }
        .server-item:nth-child(5n+1):nth-last-child(-n+5),.server-item:nth-child(5n+1):nth-last-child(-n+5)~.server-item{
          margin-bottom: 0;
        }
      }
      .collection{
        background: #fff;
        padding: 0 20px 20px;
        margin-bottom: 30px;
        .title{
          height: 62px;
          line-height: 62px;
          font-size: 16px;
          color: #333;
          border-bottom: 1px solid #F0F0F0;
          margin-bottom: 20px;
        }
        .collection-list{
          display: flex;
          flex-wrap: wrap;
          .collection-item{
            width: calc((100% - 36px) / 3);
            height: 240px;
            background: #D8D8D8;
            margin-right: 18px;
            margin-bottom: 18px;
          }
          .collection-item:nth-child(3n){
            margin-right: 0;
          }
          .collection-item:nth-child(3n+1):nth-last-child(-n+3),.collection-item:nth-child(3n+1):nth-last-child(-n+3)~.collection-item{
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>