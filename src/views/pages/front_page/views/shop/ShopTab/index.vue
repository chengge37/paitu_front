<template>
  <div class="wrap" :class="{'mode2-tab':mode==2,'mode3-tab':mode==3,'mode4-tab':mode==4,'mode5-tab':mode==5,'mode6-tab':mode==6,'mode7-tab':mode==7}">
    <div class="center">
      <span :class="{'active':$route.path==item.path}" @click="selectTab(item)" v-for="(item,index) in textArr" :key="index">{{item.text}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        textArr:[
          {
            text:'首页',
            path:'/shop/index',
            check:true
          },
          {
            text:'影棚',
            path:'/shop/studio',
            check:false
          },
          {
            text:'器材',
            path:'/shop/equip',
            check:false
          },
          {
            text:'活动',
            path:'/shop/activity',
            check:false
          },
        ]
      }
    },
    props:{
      mode:{
        type:Number,
        default:1
      },
    },
    methods:{
      selectTab(data){
        this.textArr.forEach(item=>{
          item.check=false
        })
        data.check=true
        this.$emit('selectTab',data.path)
      }
    },
    watch:{
      // $route(to,from){
      //   console.warn('路由变化',to);
      //   this.textArr.forEach(item=>{
      //     item.check=false
      //   })
      //   if(to=='/shop/studio'){
      //     this.textArr[1].check=true
      //   }else if(to=='/shop/equip'){
      //     this.textArr[2].check=true
      //   }else if(to=='/shop/activity'){
      //     this.textArr[3].check=true
      //   }else if(to=='/shop/index'){
      //     this.textArr[0].check=true
      //   }
      // }
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
  background: #FFFFFF;
  .center{
    height: 40px;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    & > span{
      width: 76px;
      height: 100%;
      cursor: pointer;
      color: #192B39;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .active{
      background: #192B39;
      color: #fff;
    }
  }
}
.mode2-tab{
  background: #2C2836;
  .center{
    & > span{
      color: #fff;
    }
    .active{
      background: #F8F8F8;
      color: #2C2836;
    }
  }
}
.mode3-tab{
  background: #7C6AFF;
  .center{
    & > span{
      color: #fff;
    }
    .active{
      background: #F8F8F8;
      color: #7C6AFF;
    }
  }
}
.mode4-tab{
  background: #03D4DB;
  .center{
    & > span{
      color: #fff;
    }
    .active{
      background: #F8F8F8;
      color: #03D4DB;
    }
  }
}
.mode5-tab{
  background: #E5C875;
  .center{
    & > span{
      color: #333;
    }
    .active{
      background: #0F1C24;
      color:#E5C875;
    }
  }
}
.mode6-tab{
  background: #3270ED;
  .center{
    & > span{
      color: #fff;
    }
    .active{
      background: #F0F0F0;
      color: #3270ED;
    }
  }
}
.mode7-tab{
  background: #fff;
  .center{
    & > span{
      color: #333;
    }
    .active{
      background: #F54520;
      color: #fff;
    }
  }
}

</style>