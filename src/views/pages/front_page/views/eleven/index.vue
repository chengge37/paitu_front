<template>
  <div class="wrap">
    <div class="content">
      <div class="back-btn btn" @click="back" v-if="false">返回</div>
      <img :src="$qiniuHost+'/images/pc_activity.png'" alt="">
      <div class="rent-btn1 btn" @click="toRent">立即入驻 > ></div>
      <div class="more-btn btn" @click="toMore">查看更多 > ></div>
      <div class="rent-btn2 btn" @click="toRent">立即入驻 > ></div>
    </div>
  </div>
</template>

<script>
import {
    applyHire,
    apply
} from '@config/api.js'
import { mapGetters } from "vuex";

  export default {
    data(){
      return{
        // showDialog:false
      }
    },
    created(){
      // if(this.$route.path=='/'){
      //   this.showDialog=true
      // }
    },
    computed: {
      ...mapGetters(["user_data"])
    },
    methods:{
      toRent(){
        if(!this.user_data){
          this.$router.push('/hire/index')
        }else{
          this.getRequest(apply.rule,{
             type:1
          }).then(res=>{
             console.warn(res,'获取审核状态')
             if(!res.status){
               this.$router.push('/hire/index')
               return
             }
             if(res.status==0){
                this.$alert('您的申请正在审核中，请勿重复申请', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    // this.$router.push('/')
                  }
                });
                //  this.$message.warning('您之前的申请正在审核中请耐心等待')
                 return
             }else if(res.status==1){
                 this.$message.warning('您已经是租赁商')
                 this.$router.push('/serve/day_set/index')
                 return
             }else if(res.status==2){
                 this.$message.warning('抱歉，审核未通过，请重新申请')
                 this.$router.push('/hire/index')
                 return
             }
         }).catch(err=>{
             console.error(err)
         })
        }
      },
      toMore(){
        this.$router.push('/publicity/index')
      },
      back(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
  padding: 50px 0;
  background: rgb(240,240,240);
  .content{
    width: 100%;
    position: relative;
    color:rgb(51,51,51);
    img{
      width: 100%;
    }
    .btn{
      width: 11.5%;
      height: 2%;
      line-height: 3em;
      font-size: 1vw;
      border-radius: 18px;
      background: #fff;
      background: url('https://pic.paitume.com/images/pc_activity_btn.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      cursor: pointer;
      display: flex;
      justify-content: center;
      // align-items: center;
      font-weight: bold;
    }
    .back-btn{
      width: 8vw;
      height: 7vh;
      font-size: 1.3vw;
      // width: 120px;
      // height: 50px;
      position: fixed;
      left: 50px;
      align-items: center;
    }
    .rent-btn1{
      top: 36.5%;
      left: 50%;
      transform: translateX(-100%);
    }
    .more-btn{
      top: 74%;
      left: 50%;
      transform: translateX(-50%);
    }
    .rent-btn2{
      top: 77%;
      left: 50%;
      transform: translateX(-50%);
    }

  }
}
</style>