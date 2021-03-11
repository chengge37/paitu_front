<template>
  <div class="wrap">
    <div class="search-area">
      <span>筛选结果：</span>
      <div class="home-search" v-if="nick">
        <span>{{nick}}</span>
        <i class="el-icon-close" @click="cancelSearch"></i>
      </div>
      <div class="search-input">
        <el-input v-model="searchText" placeholder="请输入店铺名称" @keyup.enter.native="searchStore"></el-input>
        <div class="search-icon" @click="searchStore">
          <ali-svg-icon icon-class="search-border-copy" class-name="search-border-copy"></ali-svg-icon>
        </div>
      </div>
    </div>
    <div class="main-part">
      <div class="left-display">
      	
        <!--<div class="header">精选器材</div>
        <ul class="nice-stores" v-if="sideArr.length>0 &&  !loading">
          <li v-for="(item,index) in sideArr" :key="index" @click="toEquipDetail(item.adv.id,item.id,item.rel_id,item.type)">
            <div class="img-wrap">
              <img :src="$qiniuHost+dealPic(item.pic)" alt="">
            </div>
            <div class="info">
              <div class="name">{{item.adv.custom_desc||item.adv.name}}</div>
              <div class="price-sale">
                <div class="price">
                  <span>¥{{item.adv.price_day_workday_in}}</span>
                  <span>/1小时</span>
                </div>
                <div class="sale">
                  <span>销量：</span>
                  <span>{{item.adv.total}}次</span>
                </div>
              </div>
              <div class="address">{{item.adv.address}}</div>
            </div>
          </li>
        </ul>
        <ul class="noData" v-if="sideArr.length==0 && !loading">
			暂无推荐
		</ul>-->
		
		<recommend-good type="1"></recommend-good>
      </div>
      <div class="right-list">
        <div class="header">
          <span :class="{active:curIndex==1}" @click="changeSort(1)">默认</span>
          <span class="sort" :class="{active:curIndex==2,up:curIndex==2&&order=='asc',down:curIndex==2&&order=='desc'}" @click="changeSort(2)">热度</span>
          <span class="sort" :class="{active:curIndex==3,up:curIndex==3&&order=='asc',down:curIndex==3&&order=='desc'}" @click="changeSort(3)">评分</span>
          <div class="count">
            <span>共</span>
            <span>{{storeCount}}个</span>
            <span>商家</span>
          </div>
          <div class="page">
            <span>{{page}}</span>
            <span>/</span>
            <span>{{Math.ceil(storeCount/page_size)}}</span>
          </div>
          <i class="el-icon-arrow-left" @click="changePage('-')"></i>
          <i class="el-icon-arrow-right" @click="changePage('+')"></i>
        </div>
        <ul class="store-list">
          <li v-for="(item,index) in storeList" :key="index" @click="toShop(item.id)">
            <div class="img-wrap">
              <img :src="item.logo?$qiniuHost+item.logo:config.defaultStorePic" alt="">
            </div>
            <div class="content">
              <div class="name-confirm">
                <span>{{item.nick}}</span>
                <ali-svg-icon icon-class="confirm" class-name="confirm"></ali-svg-icon>
                <span>已认证</span>
              </div>
              <div class="equip-studio">
                <div class="equip">
                  <span>器材</span>
                  <span>{{item.equipNum}}</span>
                </div>
                <div class="studio">
                  <span>影棚</span>
                  <span>{{item.studioNum}}</span>
                </div>
              </div>
              <div class="address">
                <i class="el-icon-location-outline"></i>
                <span>{{item.address}}</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="noData" v-if="noData">
           暂无店铺
        </div>
      </div>
      
      
      <!--分页模块-->
			<!--<pagination :total="parseInt(storeCount)" :page="parseInt(page)" :pagesize="parseInt(listParams.page_size)" @getPageNum="changePage" class="pagination">
			</pagination>-->
      
    </div>
  </div>
</template>

<script>
import {allStore,ad} from '@config/api.js';
import pagination from "FrontComponents/pagination";
import recommendGood from "FrontComponents/recommendGood";
  export default {
    data(){
      return{
        order:'asc',
        orderBy:'total',
        sideArr:[],
        storeList:[],
        page:1,
        page_size:10,
        curIndex:1,
        nick:'',
        searchText:'',
        storeCount:0,
        noData:false,
        loading:true,
      }
    },
    created(){
      if(this.$route.query.searchText){
        this.nick=this.$route.query.searchText
        this.searchText=this.nick
      }
      this.getSideAd()
      this.getAllStore(this.nick,this.page,this.page_size,undefined,undefined)
    },
    components:{
    	recommendGood
    },
    methods:{
      // 获取左侧广告
      getSideAd(){
      	this.loading=false;
        this.getRequest(ad.getAd,{
          type:2,
          model:0,
          position:0,
          page_size:5
        }).then(res=>{
          console.warn(res,'获取到店铺广告')
          this.sideArr=res.rows
          this.loading=false;
        }).catch(err=>{
          console.error(err)
        })
      },
      // 获取右侧所有店铺
      getAllStore(nick,page,page_size,orderBy,order){
        this.getRequest(allStore.getStore,{
          nick,
          page,
          page_size,
          orderBy,
          order
        }).then(res=>{
          console.warn(res,'获取所有店铺')
          this.storeList=res.rows
          this.storeCount=res.total_count
          this.nick=nick
          this.noData=this.storeList.length==0
        }).catch(err=>{
          console.error(err)
        })
      },
      // 切换页码，获取店铺
      changePage(val){
        if(val=='+'){
          if(this.page==Math.ceil(this.storeCount/this.page_size)){
            return
          }
          this.page++
          this.getAllStore(undefined,this.page,this.page_size,this.orderBy,this.order)
        }else{
          if(this.page==1){
            return
          }
          this.page--
          this.getAllStore(undefined,this.page,this.page_size,this.orderBy,this.order)
        }
      },
      // 点击左侧推荐器材
      toEquipDetail(equipId,id,rel_id,type){
        this.getRequest(ad.clickAd,{
          id,
          rel_id,
          type
        }).then(res=>{
          if(res){
            }
        }).catch(err=>{
          console.error(err)
        })
        this.util.toEquipDetail(equipId);
      },
      //点击某一的店铺
      toShop(id){
        this.util.toShopPage(id)
      },
      // 图片处理
      dealPic(val){
        if(val){
          let arr=val.split(',').filter(item=>{
            return item
          })
          return arr[0]
        }
      },
      // 点击默认，热度或者评分
      changeSort(val){
        if(val==1){
          // 默认
          this.curIndex=1
          this.order="asc"
          this.orderBy="create_time"
          this.getAllStore(undefined,this.page,this.page_size,this.orderBy,this.order)
        }else if(val==2){
          // 热度
          this.orderBy="total"
          if(this.curIndex==2){
            this.order=this.order=="asc"?"desc":"asc"
            this.getAllStore(undefined,this.page,this.page_size,this.orderBy,this.order)
          }else{
            this.curIndex=2
            this.order="asc"
            this.getAllStore(undefined,this.page,this.page_size,this.orderBy,this.order)
          }
        }else{
          // 评分
          this.orderBy="score"
          if(this.curIndex==3){
            this.order=this.order=="asc"?"desc":"asc"
            this.getAllStore(undefined,this.page,this.page_size,this.orderBy,this.order)
          }else{
            this.curIndex=3
            this.order="asc"
            this.getAllStore(undefined,this.page,this.page_size,this.orderBy,this.order)
          }
        }
      },
      // 取消搜索结果
      cancelSearch(){
        this.nick="";
        this.searchText='';
        this.page=1;
        this.getAllStore(this.nick,this.page,this.page_size,this.orderBy,this.order)
      },
      // 在本页搜索店铺
      searchStore(){
//      if(!this.searchText){
//        this.$message.warning('内容不能为空')
//        return
//      }
		this.page=1;
        this.getAllStore(this.searchText,this.page,this.page_size,this.orderBy,this.order)
      }
    },
    
  }
</script>

<style lang="scss" scoped>
.wrap{
  .search-area{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .home-search{
      background: #651fff;
      color: #fff;
      min-width: 50px;
      height: 30px;
      display: flex;
      align-items: center;
      padding-left: 8px;
      margin-left: 20px;
      span{
        margin-right: 12px;
      }
      i{
        padding-top: 3px;
        align-self: flex-start;
        cursor: pointer;
      }
    }
    .search-input{
      display: flex;
      align-items: center;
      height: 38px;
      margin-left: auto;
      background: #fff;
      border: 1px solid #ddd;
      /deep/{
        .el-input{
          height: 38px;
          box-sizing: content-box;
          line-height: 38px;
          .el-input__inner{
            height: 34px;
            border: none;
            outline: none;
          }
        }
      }
      .search-icon{
        width: 38px;
        height: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #ddd;
        cursor: pointer;
        .search-border-copy{
          width: 20px;
          height: 20px;
          color: #fff;
        }
      }
    }
  }
  .main-part{
    display: flex;
    min-height: 1000px;
    .left-display{
      width: 244px;
      margin-right: 10px;
      .header{
        height: 40px;
        background: #651FFF;
        color: #fff;
        font-weight: 600;
        letter-spacing: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .nice-stores{
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 0;
        li{
          background: #fff;
          width: 224px;
          height: 330px;
          box-sizing: content-box;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          .img-wrap{
            width: 224px;
            height: 224px;
            img{
              width: 224px;
              height: 224px;
            }
          }
          .info{
            flex: 1;
            padding: 8px 10px 0;
            display: flex;
            flex-direction: column;
            .name{
              font-weight: 600;
              color: #333;
              margin-bottom: 10px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .price-sale{
              display: flex;
              margin-bottom: auto;
              justify-content: space-between;
              font-size: 10px;
              color: #999;
              .price{
                span:first-child{
                  font-size: 16px;
                  font-weight: bold;
                  color: #D4282D;
                }
              }
            }
            .address{
              height: 37px;
              line-height: 37px;
              font-size: 12px;
              color: #666;
              border-top: 1px solid #D8D8D8;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
        li:hover{
          img{
            opacity: 0.5;
          }
        }
        li+li{
          margin-top: 10px;
        }
      }
    }
    .right-list{
      flex: 1;
      background: #fff;
      padding: 0 10px;
      .header{
        height: 40px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #F0F0F0;
        &>span:first-child{
          color: #999;
          margin-right: 20px;
          cursor: pointer;
          &:hover{
            color: #651fff;
          }
        }
        &>span.sort{
          color: #999;
          margin-right: 40px;
          position: relative;
          cursor: pointer;
          &:before{
            content:'';
            border-bottom:6px solid #D8D8D8;
            border-left:4px solid transparent;
            border-right:4px solid transparent;
            position: absolute;
            right: -14px;
            top: 4px;
          }
          &:after{
            content:'';
            border-top:6px solid #D8D8D8;
            border-left:4px solid transparent;
            border-right:4px solid transparent;
            position: absolute;
            right: -14px;
            top: 12px;
          }
          &:hover{
            color: #651fff;
          }
        }
        &>span:nth-child(2){
          color: #999;
          margin-right: 40px;
        }
        &>span:nth-child(3){
          color: #999;
          margin-right: auto;
        }
        span.active{
          font-weight: 600;
          color: #651FFF;
        }
        .sort.up{
          &:before{
            border-bottom-color:#651fff;
            border-bottom:6px solid #651fff;
          }
        }
        .sort.down{
          &:after{
            border-top-color:#651fff;
            border-top:6px solid #651fff;
          }
        }
        .count{
          margin-right: 10px;
          span:nth-child(2){
            color: #FF641F;
          }
        }
        .page{
          margin-right: 14px;
          span:first-child{
            color: #FF641F;
          }
        }
        i{
          border: 1px solid #D9D9D9;
          color: #D9D9D9;
          cursor: pointer;
          &:hover{
            background: #651fff;
            color: #fff;
          }
        }
        i+i{
          margin-left: 1px;
        }
      }
      .store-list{
        padding: 20px 0;
        li{
          height: 112px;
          border-bottom: 1px solid #F0F0F0;
          display: flex;
          padding-top: 10px;
          padding-bottom: 30px;
          cursor: pointer;
          .img-wrap{
            margin-right: 21px;
            width: 72px;
            height: 72px;
            img{
              width: 72px;
              height: 72px;
            }
          }
          .content{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .name-confirm{
              display: flex;
              align-items: center;
              span:first-child{
                font-weight: 600;
                color: #333;
                margin-right: auto;
              }
              .confirm{
                margin-right: 3px;
              }
              span:last-child{
                font-size: 12px;
                color: #651FFF;
              }
            }
            .equip-studio{
              color: #333;
              display: flex;
              .equip,.studio{
                padding-right: 32px;
                border-right: 1px solid #F0F0F0;
                span:first-child{
                  color: #999;
                }
              }
              .equip{
                margin-right: 32px;
              }
            }
            .address{
              i{
                color: #999;
              }
            }
          }
        }
        li:hover{
          background: rgba(200,200,200,.1);
        }
      }
      .nodata2{
        padding-top: 300px;
      }
      
    }
  }
}
.noData{
	display:flex;
	justify-content:center;
	padding:30px 0px;
	background:#fff;
  }
</style>