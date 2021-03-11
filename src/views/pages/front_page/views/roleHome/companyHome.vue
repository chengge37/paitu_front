<template>
  <div class="wrap">
    <div class="company-info">
      <div class="info-left">
        <el-image  fit="contain" :src="util.picExplode(companyInfo.avatar,config.male_pic)"
					:onerror="util.errorPic"/>
        <span class="company-name">{{companyInfo.nick}}</span>
        <div class="has-confirm">
          <ali-svg-icon icon-class="confirm" class-name="confirm"></ali-svg-icon>
          <span>已认证</span>
        </div>
        <div class="bottom-btn">
          <span @click="collect">{{isCollect?'取消收藏':'收藏'}}</span>
          <span @click="chatTo">联系我们</span>
        </div>
      </div>
      <div class="info-right">
        <div class="company-survey">
          <div class="purple-line-title">企业概况</div>
          <div class="dec">
            <span v-html="companyInfo.brief"></span>
          </div>
        </div>
        <div class="company-domain">
          <div class="purple-line-title">专业领域</div>
           <div class="profession">
             <div class="no-data" v-if="!companyInfo.remark">暂无</div>
	           <span v-else v-for="(item,index) in companyInfo.remark.indexOf(',')==-1?[companyInfo.remark]:companyInfo.remark.split(',')" :key="index">{{item}}</span> 
	          <!--<span>专业MCN服务</span>-->
         	</div>
        </div>
      </div>
    </div>
    <div class="tab-row">
      <span :class="{'active-tab':item.active}" v-for="(item,index) in tabs" :key="index" @click="changeTab(index)">{{item.label}}</span>
    </div>
    <div class="server-list" v-if="(companyType==2||companyType==4)&&tabs[0].active">
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
    <div class="model-list" v-if="companyType==3&&tabs[0].active">
      <div class="model-item" v-for="(item,index) in modelList" :key="index" @click="util.toModelDetail(item.id)">
        <el-image style="width:224px;height:224px;" fit="contain" :src="util.picExplode(item.photo,config.defaultEquipPic)"
					:onerror="util.errorPic"
					class="cursor"
        />
        <span>{{item.title}}</span>
      </div>
    </div>
    <div class="success-demo" v-if="tabs[1].active">
      <div v-html="companyInfo.extend"></div>
    </div>
    <Pagination v-if="tabs[0].active" class="page-wrap" :total="totalCount" :page="curPage" :pagesize="40" @getPageNum="changePage"></Pagination>
  </div>
</template>

<script>
import Pagination from 'FrontComponents/pagination'
import { model,service,serveInfo,frontFollowOrCollect } from '@config/api'
import miniLogin from "FrontComponents/minilogin";
import {getUserLsObj} from "@util/common.js";
  export default {
    data(){
      return{
        tabs:[
          {
            label:'服务列表',
            active:true
          },
          {
            label:'模特列表',
            active:true
          },
          {
            label:'成功案例',
            active:false
          },
        ],
        modelList:[],
        serverList:[],
        totalCount:0,
        curPage:1,
        companyType:0,
        companyInfo:{
          remark:''
        },
        isShowDialog:false,
        isCollect:false
      }
    },
    components:{
      Pagination,
      miniLogin
    },
    filters:{
      },
    created(){
      this.uid=this.$route.query.id
      this.companyType=this.$route.query.companyType
      console.warn(this.companyType,'companyType')
      this.getCompanyInfo()
      switch(this.companyType-0){
        case 2:
          this.tabs.splice(1,1)
          this.getServerList({uid:this.uid,page:this.curPage,page_size:40})
          break
        case 3:
          this.tabs.splice(0,1)
          this.getModelList({uid:this.uid,page:this.curPage,page_size:40})
          break
        case 4:
          break
      }
    },
    methods:{
      getCompanyInfo(){
        this.getRequest(serveInfo.GetUniversalInfo, { uid: this.$route.query.id }).then(res=>{
          console.warn(res,'公司的基本信息')
          this.companyInfo=res
          //判断该模特是否已经被收藏
					getUserLsObj(this.companyInfo.id, "0", "1").then(res => {
						if(res) {
							this.isCollect = true;
						}
					});
        }).catch(err=>{
          console.error(err)
        })
      },
      changeTab(i){
        console.warn(i,'切换tab')
        this.tabs.forEach(item=>{
          item.active=false
        })
        this.tabs[i].active=true
        if(this.tabs[1].active){
          return
        }
        switch(this.companyType){
          case 2:
            // 获取服务列表
            this.getServerList({uid:this.uid,page:this.curPage,page_size:40})
            break
          case 3:
            // 获取模特列表
            this.getModelList({uid:this.uid,page:this.curPage,page_size:40})
            break
        }
      },
      changePage(){
        console.warn(this.curPage,'换页')
        if(this.tabs[0].active){
          this.getServerList({uid:this.uid,page:this.curPage,page_size:40})
        }else if(this.tabs[1].active){
          this.getModelList({uid:this.uid,page:this.curPage,page_size:40})
        }
      },
      getModelList(params){
        this.getRequest(model.getModelList,params).then(res=>{
          console.warn(res,'模特列表')
          this.modelList=res.rows
          this.totalCount=res.total_count
        }).catch(err=>{
          console.error(err)
        })
      },
      getServerList(params){
        this.getRequest(service.getServiceList,params).then(res=>{
          console.warn(res,'服务列表')
          this.serverList=res.rows
          this.totalCount=res.total_count
        }).catch(err=>{
          console.error(err)
        })
      },
      collect(){
        //判断是否有登录
				if(!this.util.userIsLogin()){
					this.isShowDialog=true;
					return;
        }
        if(this.isCollect){
          this.postRequest(frontFollowOrCollect.unFollowOrUnCollect,{
            type:0,
            obj:1,
            relation_id:this.companyInfo.id
          }).then(res=>{
            this.isCollect=false
            this.$message.success('取消收藏成功')
          }).catch(err=>{
            console.error(err)
          })
        }else{
          this.postRequest(frontFollowOrCollect.followOrCollect,{
            to_uid:this.companyInfo.id,
            type:0,
            obj:1,
            relation_id:this.companyInfo.id
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
          id: this.companyInfo.id,
          name: this.companyInfo.nick,
          avatar:this.companyInfo.avatar?(this.companyInfo.avatar.indexOf(',')==-1?(this.$qiniuHost+this.companyInfo.avatar):this.$qiniuHost+this.companyInfo.avatar.split(',')[0]):"https://pic.paitume.com/images/male.png",
        }
        this.$parent.$parent.$refs.chat.chatTo(chatToObj)
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
  .company-info{
    display: flex;
    margin-bottom: 12px;
    .info-left{
      width: 392px;
      height: 392px;
      background: #fff;
      margin-right: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 78px 20px 20px;
      /deep/{
      	img{
	        width: 100px;
	        height: 100px;
	        border: 1px solid #E0E0E0;
	        margin-bottom: 8px;
	      }
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
        }
      }
    }
    .info-right{
      flex: 1;
      background: #fff;
      .company-survey{
        padding-top: 20px;
        padding-bottom: 23px;
        border-bottom: 1px solid #E0E0E0;
        height: 177px;
        .dec{
          padding: 0 20px;
          color: #666;
          line-height: 20px;
        }
      }
      .company-domain{
        padding-top: 20px;
        span{
          width: 137px;
          height: 40px;
          border: 1px solid #651FFF;
          color: #651fff;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 20px;
          margin-left: 20px;
        }
      }
    }
  }
  .tab-row{
    height: 38px;
    background: #fff;
    display: flex;
    margin-bottom: 12px;
    span{
      width: 104px;
      height: 38px;
      color: #192B39;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .active-tab{
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
      width: calc((100% - 40px) / 5);
      margin-right: 10px;
      height: 422px;
      margin-bottom: 10px;
      border: 1px solid #F0F0F0;
      cursor: pointer;
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
  .model-list{
    max-height: 1910px;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    background: #fff;
    .model-item{
      width: calc((100% - 40px) / 5);
      height: 224px;
      margin-right: 10px;
      margin-bottom: 10px;
      position: relative;
      cursor: pointer;
      span{
        width: 224px;
        height: 66px;
        background: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        position: absolute;
        bottom: 0;
        opacity: 0;
        transition: 0.5s;
      }
    }
    .model-item:hover{
      span{
        opacity: 1;
      }
    }
    .model-item:nth-child(5n){
      margin-right: 0;
    }
    .model-item:nth-child(5n+1):nth-last-child(-n+5),.model-item:nth-child(5n+1):nth-last-child(-n+5)~.model-item{
      margin-bottom: 0;
    }
  }
  .success-demo{
    background: #fff;
    padding: 20px;
    margin-bottom: 50px;
  }
  .page-wrap{
    margin: 50px 0;
    display: flex;
    /deep/{
      .page{
        margin-left: auto;
      }
    }
  }
}
.profession{
	display:flex;
	align-items:center;
  .no-data{
    padding-top: 10px;
    padding-left: 25px;
    font-size: 16px;
  }
}
</style>