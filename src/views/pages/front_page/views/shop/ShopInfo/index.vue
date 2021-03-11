<template>
  <div class="wrap">
    <div class="center">
    	<div class="storeLogo">
	      <!--<el-image style="width:100%;height:100%;" :src="$qiniuHost+shopInfo.logo" fit='scale-down'>-->
	      <el-image style="width:100%;height:100%;" :src="util.picExplode(shopInfo.logo,config.male_pic)" fit='scale-down'>
	      </el-image>
      </div>
      <div class="text-info">
        <p>
          <span>{{shopInfo.nick}}</span>
          <el-rate
            v-model="rate"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </p>
        <p>
          <span>地址：</span>
          <span>{{shopInfo.address}}</span>
        </p>
        <p>
          <ali-svg-icon icon-class="confirm" class-name="confirm"></ali-svg-icon>
          <span>已认证</span>
        </p>
      </div>
      <span @click="handleCollect" :class="{'mode2-collect-btn':mode==2,'mode3-collect-btn':mode==3,'mode4-collect-btn':mode==4,'mode5-collect-btn':mode==5,'mode6-collect-btn':mode==6,'mode7-collect-btn':mode==7}">{{isCollect?'取消收藏':'收藏 '}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        rate: 3.5,
        storeInfo:null
      }
    },
    props:{
      mode:{
        type:Number,
        default:0
      },
      shopInfo:{
        type:Object,
        default:null
      },
      isCollect:{
        type:Boolean,
        default:false
      }
    },
    created(){
      this.rate=this.shopInfo.score-0
    },
    methods:{
      handleCollect(){
        this.$emit('handleCollect')
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
  .center{
    height: 114px;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .storeLogo{
    	 width:78px;
    	 height:78px;
    	 display:flex;
    	 align-items:center;
    	 border:1px solid #f0f0f0;
    	 margin-right:20px;
    }
    .text-info{
      margin-right: auto;
      p:first-child{
        display: flex;
        margin-bottom: 14px;
        & > span{
          font-size: 16px;
          color: #333;
          font-weight: bold;
          margin-right: 35px;
        }
      }
      p:nth-child(2){
        color:#666;
        margin-bottom: 7px;
      }
      P:last-child{
        color:#666;
        .confirm{
          width: 16px;
          height: 16px;
        }
      }
    }
    & > span{
      width:96px;
      height:34px;
      background: #192B39;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .mode2-collect-btn{
      border:1px solid rgb(101,31,255);
      background: #fff;
      color: #7C6AFF;
    }
    .mode3-collect-btn{
      background: #7C6AFF;
      color: #fff;
    }
    .mode4-collect-btn{
      background: #03D4DB;
      color: #fff;
      border: none;
    }
    .mode5-collect-btn{
      background: #E5C875;
      color: #fff;
      border: none;
    }
    .mode6-collect-btn{
      background: #3270ED;
      color: #fff;
      border: none;
    }
    .mode7-collect-btn{
      background: #FF7817;
      color: #fff;
      border: none;
    }
  }
}
</style>