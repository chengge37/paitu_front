<template>
  <div class="container">
    <div class="menu">
      <div class="top-nav">
        <div class="nav menu-hover" :class="{'nav-active':item.isActive}" v-for="(item,index) in navArr" :key="index" @click="selectNav(item)">
          <span v-text="item.word[0]"></span>
          <span v-text="item.word.slice(1)"></span>
        </div>
      </div>

      <BaseInfo v-if="navArr[0].isActive"></BaseInfo>
      <Address v-if="navArr[1].isActive"></Address>
      <Security v-if="navArr[2].isActive"></Security>
      <Certificate v-if="navArr[3].isActive"></Certificate>
      <Binding v-if="navArr[4].isActive"></Binding>
    </div>
  </div>
</template>

<script>
import BaseInfo from './baseInfo'
import Address from './address'
import Security from './security'
import Certificate from './certificate'
import Binding from './binding'

  export default {
    data(){
      return{
        navArr:[
          {
            word:'基本信息',
            path:'/personal/person/base',
            isActive:true
          },
          {
            word:'地址管理',
            path:'/personal/person/address',
            isActive:false
          },
          {
            word:'安全设置',
            path:'/personal/person/security',
            isActive:false
          },
          {
            word:'实名认证',
            path:'/personal/person/certificate',
            isActive:false
          },
          {
            word:'账号绑定',
            path:'/personal/person/binding',
            isActive:false
          }
        ]
      }
    },
    components:{
      BaseInfo,
      Address,
      Security,
      Certificate,
      Binding
    },
    created(){
      this.showPageByRoute()
    },
    methods:{
      selectNav(nav){
        // this.navArr.forEach(item=>{
        //   item.isActive=false
        // })
        // nav.isActive=true
        this.$router.push(nav.path)
      },
      //根据路由判断显示那个模块方法
			showPageByRoute(){
        this.navArr.forEach(item=>{
          item.isActive=false
        })
				//获取路由地址
				let path=this.$route.name;
				switch(path){
					case 'BaseInfo':
            this.navArr[0].isActive=true;
						break;
					case 'Address':
            this.navArr[1].isActive=true;
						break;
					case 'Security':
            this.navArr[2].isActive=true;
            break;
          case 'Certificate':
            this.navArr[3].isActive=true;
            break;
          case 'Binding':
            this.navArr[4].isActive=true;
            break;
				}
      }
    },
    watch:{
    '$route': function (to, from) {
  　　　　this.showPageByRoute();
  　　}
    }
  }
</script>

<style lang="scss" scoped>
.container{
  .menu{
    .top-nav{
      padding: 0 20px;
      box-sizing: border-box;
      height: 60px;
      background: #fff;
      margin-bottom: 29px;
      .nav{
        font-size: 0;
        box-sizing: border-box;
        margin-right: 30px;
        cursor: pointer;
        span{
          // background: #987;
          font-size: 16px;
          padding: 8px 0;
          box-sizing: border-box;
        }
        &:last-child{
          margin-right: auto;
        }
      }
      .nav-active{
        color: #7C6AFF;
        span:first-child{
          border-bottom: 2px solid #7C6AFF; 
        }
      }
      
    }
  }
}

.menu-hover{
  &:hover{
    color: #7C6AFF!important;
    span:first-child{
      border-bottom: 2px solid #734ae2;
    }
  }
}
</style>