<template>
  <div class="progress-wrap">
    <div :class="{'active-step':item.active}" class="progress-item" v-for="(item,index) in steps" :key="index">
      <span>{{item.num}}</span>
      <span>{{item.text}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        steps:[
          {
            num:'01',
            text:'签署协议',
            active:true
          },
          {
            num:'02',
            text:'上传资料',
            active:false
          },
          {
            num:'03',
            text:'缴纳保证金',
            active:false
          },
          {
            num:'04',
            text:'平台审核',
            active:false
          },
          {
            num:'05',
            text:'申请成功',
            active:false
          }
        ]
      }
    },
    props:{
      curStep:{
        type:Number,
        default:1
      }
    },
    created(){
      this.steps.forEach((item,index)=>{
        item.active=false
        if(index<=this.curStep-1){
          item.active=true
        }
      })
    },
    watch:{
      curStep(val){
        console.log('zengjial')
        this.$nextTick(()=>{
          this.steps.forEach((item,index)=>{
            item.active=false
            if(index<=val-1){
              item.active=true
            }
          })
        })
        console.log(this.steps,'999999999999999999')
      }
    }
  }
</script>

<style lang="scss" scoped>
.progress-wrap{
  display: flex;
  justify-content: space-between;
  .progress-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid #999;
      color: #999;
      margin-bottom: 12px;
      font-size: 18px;
      font-weight: 500;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    span:last-child{
      font-size: 16px;
      color: #333;
    }
  }
  .active-step{
    span:first-child{
      border-color: #651fff;
      color: #651fff;
    }
  }
  .progress-item+.progress-item{
    span:first-child:before{
      content:'';
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(-125%,-50%);
      width: 170px;
      border:1px dashed #979797;
    }
  }
}
</style>