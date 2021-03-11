<template>
  <div>
    <div class="atEva-title">商品评价 > 修改评价</div>

    <div class="edit-content">
      <div class="edit-tips">
        <h3>修改评价须知</h3>
        <p>1.修改评价的机会只有1次且无法恢复</p>
        <p>2.只有在期限内的一般、不满意、非常不满意才有修改的机会</p>
      </div>

      <div class="edit-info">
        <p>
          <span class="info-title">被评价人：</span>
          <span style="color:#007AD9" class="info-content">{{eva_info.to_user}}</span>
        </p>
        <p>
          <span class="info-title">商品名称：</span>
          <span class="info-content">{{eva_info.equit}}</span>
        </p>
        <p class="info-radio">
          <span class="info-title">评价：</span>
          <span class="info-content">
            <el-radio v-model="score" label="4">满意</el-radio>
            <el-radio v-model="score" label="5">非常满意</el-radio>
          </span>
        </p>
        <p>
          <span class="info-title">评论：</span>
          <span class="info-content">别忘记修改</span>
        </p>
        <el-input type="textarea" :rows="3" placeholder="请输入评论修改内容" v-model="eva_info.content" class="info-content" style="margin-left:60px;"></el-input>
        <div class="info-content info-btn">
          <p style="background-color:#7C6AFF;color:#FFFFFF;padding:5px 15px;" @click="updateEva">确认修改</p>
          <p style="background-color:#D9D9D9;padding:5px 15px;" @click="returnlist">取消修改</p>
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
        eva_info:{content:'',equit:'',to_user:'',id:''}
      }
    },
    methods:{
      updateEva(){
        if(!this.score){
          this.$message({message: "请评价“满意”或“非常满意”！",type: 'warning'});
        }else{
          this.$confirm('修改评价的机会只有1次且无法恢复, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let param = {content:this.eva_info.content,score:this.score,id:this.eva_info.id}
              this.postRequest(frontComment.updateComment,param).then(res => {
              this.$message({message: "修改成功！",type: 'success'});
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