<template>
  <div>
    <div class="atEva-title">商品评价 > 修改评价</div>

    <div class="edit-content">
      <div class="edit-info">
        <p>
          <span class="info-title">被评价人：</span>
          <span style="color:#007AD9" class="info-content">{{eva_info.to_user}}</span>
        </p>
        <p>
          <span class="info-title">商品名称：</span>
          <span class="info-content">{{eva_info.equit}}</span>
        </p>
        <p>
          <span class="info-title">评论：</span>
          <span class="info-content">{{eva_info.content}}</span>
        </p>
        <p style="margin-left:60px">
            <el-image :src="$qiniuHost+item" v-for="(item,index) in eva_info.pics" :key="index" fit="cover" class="info-img"></el-image>
        </p>
        <p class="textarea">
          <span class="info-title" style="height:85px">追评：</span>
          <el-input type="textarea" :rows="3" placeholder="请输入追评内容" v-model="reply" class="info-content" ></el-input>
        </p>
        
        <div class="info-content info-btn">
          <p style="background-color:#7C6AFF;color:#FFFFFF;padding:8px 0px;width:80px;text-align:center" @click="commit">提交</p>
          <p style="background-color:#D9D9D9;padding:8px 0px;text-align:center;width:80px" @click="returnlist">返回</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {frontComment} from '@config/api.js'
import {storage} from '@util/storage.js'

  export default {
    data(){
      return{
        score:'',
        textarea:'',
        eva_info:{content:'',equit:'',to_user:'',id:''},
        reply:''
      }
    },
    methods:{
      commit(){
          if(!this.reply){
          this.$message({message: "评论内容不能为空！",type: 'warning'});
        }else{
          this.$confirm('追评的机会只有1次且无法恢复, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let param = {reply:this.reply,id:this.eva_info.id}
                this.postRequest(frontComment.review,param).then(res => {
                this.$message({message: "追评成功！",type: 'success'});
                this.$router.push('/personal/evaluate/goodsEvaluate');
            })
          }).catch(() => {
                     
          });
          
        }
        
      },
      returnlist(){
        this.$router.push('/personal/evaluate/goodsEvaluate');
      }
      
    },
    mounted(){
      this.eva_info = storage.get('eva_data');
    }
  }
</script>

<style lang="scss" scoped>
@import "@css/color.scss";
.atEva-title{
  padding: 20px;
  background-color: #ffffff
}
 .edit-content{
   padding: 40px;
   background-color: #ffffff;
   margin-top: 20px;
   .edit-tips{
     h3{
       color: #333333;
       font-weight: 400;
       font-size: 18px;
     }
     p{
       margin-left: 20px;
       font-size: 12px;
       color: #999999
       
     }
     
   }
   .edit-info{
     margin-top: 20px;
     span{
       font-size: 12px;
       color: #333333;
       display: inline-block;
     }
     .info-title{
       width: 60px;
       text-align: right;
       line-height: 40px;
     }
     .info-content{
       width: 500px;

     }
     .info-img{
         width: 40px;
         height: 40px;
         border: 1px dashed #999999;
         margin-right: 5px;
     }
     .info-btn{
       margin-left:60px;
       display: flex;
       justify-content: space-between;
       margin-top: 40px;
       font-size: 12px;
       font-weight: 400;
     }
     .info-btn:hover{
       cursor: pointer;
     }
     .textarea{
       margin-top: 20px;
       display: flex;
       align-items: flex-start;
     }
   }
 }
 
.info-radio /deep/ .el-radio__input.is-checked .el-radio__inner{
  background-color: $Theme-color;
  border-color:$Theme-color;
  background: $Theme-color;
  
}
.info-radio /deep/ .el-radio__label{
  font-size: 12px;
}
.info-radio /deep/ .el-radio{
  margin-right:10px
}
.info-radio /deep/ .el-radio__input.is-checked + .el-radio__label{
  color: $Theme-color;
  
}
</style>