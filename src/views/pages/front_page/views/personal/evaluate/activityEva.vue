<template>
  <div>
    <div class="atEva-title">活动评价</div>

    <div class="atEva-table">
      <div class="tab-box">
        <div
          class="item"
          v-for="(item,index) in tabs"
          :key="index"
          :class="{activebox:index == active}"
          @click="chageclick(index)"
        >
          <span :class="{activeitem:index == active}">{{item[0]}}</span>
          <span>{{item.slice(1)}}</span>
        </div>
      </div>

      <div class="table-content">
        <el-row class="table">
          <el-col :span="11">留言内容</el-col>
          <el-col :span="11">活动信息</el-col>
          <el-col :span="2">操作</el-col>
        </el-row>

        <el-row class="content">
          <el-col :span="11">
            <p class="text1">相机使用感很好，影棚设备也齐全一次不错的体验，这次的活动对我的帮助很大，让我对摄影知识有了更深刻的理解，活动氛围很好</p>
            <p class="date">2019-07-26  10:32:20</p>
          </el-col>
          <el-col :span="11">
            <p class="text2">neirongneirong</p>
            <p class="date">2019-07-26  10:32:20</p>
          </el-col>
          <el-col :span="2">
            <p class="btn">追加</p>
            <p class="btn">删除</p>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {frontComment} from '@config/api.js'
  export default {
    data(){
      return{
        tabs: ["发出留言", "收到留言"],
        active: "0",
        param:{
          page:1,
          page_size:10,
          order:'desc',
          type:1
        },
        activitysEvaList:[]
      }
    },
    methods:{
      chageclick(data) {
        console.log(data);
        this.active = data;
        switch (data) {
          case 0:
            // this.$router.push("/");
            break;
          case 1:
            // this.$router.push("/studio/index");
            break;
          default:
            break;
        }
      },
      getActEva(){
        this.getRequest(frontComment.getCommentList,this.param).then(res=>{
          console.log('res',res)
          this.activitysEvaList = res.rows;
        })
      },
    },
    mounted(){
      this.getActEva()
    }
  }
</script>

<style lang="scss" scoped>
@import "@css/color.scss";
.atEva-title{
  padding: 20px;
  background-color: #ffffff
}
.atEva-table{
  background-color: #ffffff;
  margin-top: 20px;
  .tab-box {
      display: flex;
      padding:10px 0px;
      color: #33333381;
      .item {
        display: flex;
        padding: 0 20px;
        cursor: pointer;
        span {
          padding: 8px 0;
          box-sizing: border-box;
        }
      }
      .activebox {
        color: $Theme-color;
      }
      .activeitem {
        border-bottom: 2px solid $Theme-color;
      }
    }
}
.table{
  margin:10px 20px 0px;
  padding:10px 20px;
  border: 1px solid #D9D9D9;
  background-color: #FAFAFA;
  color: #333333;
  font-weight: 400px;
}
.content{
  margin:0px 20px;
  padding:10px 20px;
  border: 1px solid #D9D9D9;
  border-top: 0px;
  p{
    width: 80%;
    line-height: 25px;
    color: #333333;
    font-weight: 400;
    font-size: 12px;
  }
  .text2{
    color: #007DDD;
  }
  .date{
    color: #999999;
  }
  .btn:hover{
    cursor: pointer;
    color: $Theme-color;
  }
} 
</style>