<template>
  <div class="wrap">
    <div class="info">
      <div class="basic">
        <div class="basic-top">
          <div class="info-row">
            <span>姓名：</span>
            <span>{{modelInfo.real_name}}</span>
          </div>
          <div class="info-row">
            <span>性别：</span>
            <span>{{modelInfo.sex==1?'男':'女'}}</span>
          </div>
          <div class="info-row red-tip">
            <span>常驻城市：</span>
            <span>{{modelInfo.city}}</span>
            <span>!</span>
            <span>接单范围只限{{modelInfo.city}}</span>
          </div>
          <div class="info-row">
            <span>身高：</span>
            <span>{{modelInfo.height}}cm</span>
          </div>
          <div class="info-row">
            <span>体重：</span>
            <span>{{modelInfo.weight}}kg</span>
          </div>
          <div class="info-row">
            <span>三围：</span>
            <span>{{modelInfo.bust}} / {{modelInfo.waist}} / {{modelInfo.hips}}</span>
          </div>
          <div class="info-row">
            <span>鞋码：</span>
            <span>{{modelInfo.shoes}}</span>
          </div>
          <div class="info-row">
            <span>国籍：</span>
            <span>{{modelInfo.nationality}}</span>
          </div>
        </div>
        <div class="middle-btn">
          <span @click="collect">{{isCollect?'取消收藏':'收藏'}}</span>
          <span @click="chatTo">联系我们</span>
        </div>
        <div class="basic-bottom">
          <div class="info-row">
            <span>当前发型：</span>
            <span>{{modelInfo.hair==1?'长直发':'短发'}}</span>
          </div>
          <div class="info-row">
            <span>肤色：</span>
            <span>{{modelInfo.skin|dealSkin}}</span>
          </div>
          <div class="info-row">
            <span>脸型：</span>
            <span>{{modelInfo.face|dealFace}}</span>
          </div>
          <div class="info-row">
            <span>臂展：</span>
            <span>{{modelInfo.wingspan}}cm</span>
          </div>
          <div class="info-row">
            <span>腿长：</span>
            <span>{{modelInfo.leg}}cm</span>
          </div>
          <div class="info-row">
            <span>肩宽：</span>
            <span>{{modelInfo.shoulder}}cm</span>
          </div>
          <div class="info-row">
            <span>是否双眼皮：</span>
            <span>{{modelInfo.eyelid==1?'否':'是'}}</span>
          </div>
          <div class="info-row">
            <span>第一语言：</span>
            <span>{{modelInfo.lan_one|dealLan}}</span>
          </div>
          <div class="info-row">
            <span>第二语言：</span>
            <span>{{modelInfo.lan_two|dealLan}}</span>
          </div>
        </div>
      </div>
      <div class="schedule">
        <div class="purple-line-title">ta的档期</div>
        <div class="dec">2019.02.02 蒂芬妮女装模特</div>
      </div>
      <div class="server">
        <div class="purple-line-title">ta的服务</div>
        <span @click="util.toModelDetail(modelInfo.id)">立即查看 ></span>
      </div>
      <div class="share-wrap">
        <div class="purple-line-title">分享到</div>
        <div class="share-list">
          <ali-svg-icon icon-class="weibo1" class-name="weibo1 share-item"></ali-svg-icon>
          <ali-svg-icon icon-class="weixin1" class-name="weixin1 share-item"></ali-svg-icon>
          <ali-svg-icon icon-class="Q-Zoon" class-name="Q-Zoon share-item"></ali-svg-icon>
        </div>
      </div>
    </div>
    <div class="collection-wrap">
      <div class="collection">
        <div class="title">
          <span>作品集</span>
          <span>></span>
          <span>照片</span>
        </div>
        <div class="collection-list" v-if="1">
          <div class="collection-item" v-for="item in 12">{{item}}</div>
        </div>
        <div class="collection-photo" v-if="0">
          <div class="title">标题显示在这里</div>
          <div class="img-wrap"></div>
        </div>
        <div class="collection-video" v-if="0">
          <div class="title">标题</div>
          <div class="video"></div>
          <div class="dec"></div>
          <div class="share-video"></div>
        </div>
      </div>
      <div class="other">
        <div class="title">ta其他作品</div>
        <div class="other-list">
          <div class="other-item" v-for="item in 3"></div>
        </div>
      </div>
      <Pagination class="page-wrap" :total="totalCount" :page="curPage" :pagesize="40" @getPageNum="changePage"></Pagination>
    </div>
    <!--登录弹窗模块-->
    <mini-login :openlogin.sync="isShowDialog" @closed="closeLogin"></mini-login>
  </div>
</template>

<script>
import Pagination from 'FrontComponents/pagination'
import { model,frontFollowOrCollect } from "@config/api"
import {getUserLsObj} from "@util/common.js";
import miniLogin from "FrontComponents/minilogin";
  export default {
    data(){
      return{
        modelInfo:{},
        isShowDialog:false,
        isCollect:false
      }
    },
    components:{
      miniLogin,
      Pagination
    },
    created(){
      this.getDetail(this.$route.query.id)
    },
    filters:{
      dealSkin(val){
        switch (val) {
          case '1':
            return '白色'
            break
          case '2':
            return '黄色'
            break
          case '3':
            return '黑色'
            break
        }
      },
      dealFace(val){
        switch (val) {
          case '1':
            return '圆脸'
            break
          case '2':
            return '长脸'
            break
          case '3':
            return '瓜子脸'
            break
        }
      },
      dealLan(val){
        switch (val) {
          case '1':
            return '普通话'
            break
          case '2':
            return '粤语'
            break
          case '3':
            return '英语'
            break
          case '4':
            return '西班牙语'
            break
          case '9':
            return '其他'
            break
        }
      }
    },
    methods:{
      getDetail(id){
        this.getRequest(model.getModelList,{id}).then(res=>{
          console.warn(res,'模特详情')
          this.modelInfo=res
          //判断该模特是否已经被收藏
					getUserLsObj(this.modelInfo.id, "4", "1").then(res => {
						if(res) {
							this.isCollect = true;
						}
					});
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
          id: this.modelInfo.id,
          name: this.modelInfo.real_name,
          avatar:this.modelInfo.photo?(this.modelInfo.photo.indexOf(',')==-1?(this.$qiniuHost+this.modelInfo.photo):this.$qiniuHost+this.modelInfo.photo.split(',')[0]):"https://pic.paitume.com/images/male.png",
        }
        this.$parent.$parent.$refs.chat.chatTo(chatToObj)
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  .info{
    width: 392px;
    .basic{
      height: 556px;
      background: #fff;
      padding: 20px;
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      .basic-top{
        height: 235px;
        border-bottom:1px solid #F0F0F0;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .middle-btn{
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        span{
          width: 104px;
          height: 40px;
          border: 2px solid #E0E0E0;
          color: #666;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      }
      .basic-bottom{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .info-row{
        span:first-child{
          color: #999;
        }
        span:nth-child(2){
          color: #666;
        }
      }
      .red-tip{
        display: flex;
        align-items: center;
        span:nth-child(3){
          width: 14px;
          height: 14px;
          border-radius: 6px;
          background: #FF0000;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 18px;
          margin-right: 5px;
        }
      }
    }
    .schedule{
      height: 294px;
      margin-bottom: 12px;
      padding-top: 18px;
      background: #fff;
      .dec{
        padding: 0 20px;
        color: #999;
      }
    }
    .server{
      height: 294px;
      padding-top: 18px;
      background: #fff;
      span{
        width: 88px;
        height: 32px;
        border-radius: 2px;
        background: #651fff;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        margin-left: 29px;
        cursor: pointer;
      }
    }
    .share-wrap{
      padding-top: 18px;
      height: 109px;
      background: #fff;
      margin-top: 12px;
      .share-list{
        padding-left: 20px;
        margin-top: 15px;
        .share-item{
          width: 38px;
          height: 38px;
          margin-right: 10px;
        }
      }
    }
  }
  .collection-wrap{
    height: fit-content;
    .collection{
      width: 796px;
      background: #fff;
      padding: 0 20px 20px;
      margin-bottom: 25px;
      &>.title{
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
          width: calc((100% - 36px)/3);
          height: 240px;
          margin-right: 18px;
          margin-bottom: 18px;
          background: #D8D8D8;
        }
        .collection-item:nth-child(3n){
          margin-right: 0;
        }
        .collection-item:nth-child(3n+1):nth-last-child(-n+3),.collection-item:nth-child(3n+1):nth-last-child(-n+3)~.collection-item{
          margin-bottom: 0;
        }
      }
    }
    .other{
      height: 343px;
      background: #fff;
      padding: 0 20px 20px;
      margin-top: 20px;
      .title{
        height: 62px;
        line-height: 62px;
        border-bottom: 1px solid #F0F0F0;
        margin-bottom: 20px;
      }
      .other-list{
        display: flex;
        flex-wrap: wrap;
        .other-item{
          width: calc((100% - 36px) / 3);
          height: 240px;
          background: #D8D8D8;
        }
        .other-item+.other-item{
          margin-left: 18px;
        }
      }
    }
    .page-wrap{
      /deep/{
        .page{
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>