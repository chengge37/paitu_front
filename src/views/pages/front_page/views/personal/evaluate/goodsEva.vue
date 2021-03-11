<template>
  <div>
    <div class="atEva-title">商品评价</div>

    <div class="atEva-table">
      <!-- <div class="tab-box">
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
      </div> -->

      <div class="table-content">
        <el-row class="table">
          <el-col :span="2">评价</el-col>
          <el-col :span="8">评论内容</el-col>
          <el-col :span="4">被评价人</el-col>
          <el-col :span="8">商品信息</el-col>
          <el-col :span="2">操作</el-col>
        </el-row>

        <div v-if="goodsEvaList.length!=0">
          <el-row class="content" v-for="(item,index) in goodsEvaList" :key="index">
            <el-col :span="2">
              <p class="text3">
                <span  v-if="item.score == 1">极差</span>
                <span  v-if="item.score == 2">失望</span>
                <span  v-if="item.score == 3">一般</span>
                <span  v-if="item.score == 4">满意</span>
                <span  v-if="item.score == 5">非常满意</span>
              </p>
            </el-col>
            <el-col :span="8">
              <div style="display:flex;flex-direction: column;justify-content: center">
                <p class="text1" v-if="item.content">{{item.content}}</p>
                
                <p class="date" v-else>无评论内容</p>
                <p>
                  <el-image :src="$qiniuHost+i" alt="item.order_array.name" v-for="(i,idx) in item.pics" :key="idx" class="eva-img" fit="cover"></el-image>
                </p>
                <p class="text1" v-if="item.reply">追评：{{item.reply}}</p>
                <p class="date">{{item.create_time | format_time}}</p>
              </div>
              
            </el-col>
            <el-col :span="4">
              <p class="text2">{{item.to_user_nick}}</p>
            </el-col>
            <el-col :span="8">
              <div v-if="item.order_array">
                <p class="text1">{{item.order_array.name}}</p>
                <p class="price">￥{{item.order_array.price}}</p>
              </div>
              <div v-else>
                <p class="date">无设备信息</p>
              </div>
            </el-col>
            <el-col :span="2">
              <p class="btn" @click="add(item)" v-if="!item.reply&&item.score!=5">追加</p>
              <p class="btn" @click="edit(item)" v-if="item.is_edit=='0'">修改</p>
              
              <!-- <p class="btn">删除</p> -->
            </el-col>
          </el-row>
        </div>
        <div v-else class="nodata" style="margin-top:50px">暂无数据</div>
      </div>

      <!--分页模块-->
			<div class="page">
				<!-- <el-pagination background layout="prev, pager, next" @current-change="changePage" :current-page='param.page' :page-size="param.page_size" :total="total_count">
				</el-pagination> -->
        <Pagination v-if="goodsEvaList.length>param.page_size" :total="total_count" :page="param.page" :pagesize="param.page_size" @getPageNum="changePage"></Pagination>
			</div>
    </div>

    
  </div>
</template>

<script>
import {frontComment} from '@config/api.js'
import { format } from "date-fns";
import {storage} from '@util/storage.js'
import Pagination from 'FrontComponents/pagination'

  export default {
    data(){
      return{
        tabs: ["全部评价"],
        active: "0",
        param:{
          page:1,
          page_size:5,
          order:'desc',
          type:2,
          is_order:1,
          uid:'',
        },
        goodsEvaList:[],
        total_count:0
      }
    },
    components: {
			Pagination
		},
    filters: {
      format_time(data) {
        return format(data * 1000, "YYYY-MM-DD HH-mm");
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
      changePage(val){
        this.param.page = val;
        this.getGoodsEva();
      },
      getGoodsEva(){
      	this.param.uid=this.util.getUserInfo().id;
   			this.util.getCommentList(this.param).then(res=>{
          console.log('getCommentList--------------',res)
          this.goodsEvaList = res.rows;
          this.total_count = res.total_count;
          if(this.goodsEvaList.length>0){
            this.goodsEvaList.forEach(v => {
              v.pics = v.pic.split(',');
            })
          }
        })
      },
      add(data){
        let eva_data = {content:data.content,equit:'',to_user:data.to_user_nick,id:data.id,pics:data.pics};
        if(data.order_array){
          eva_data.equit = data.order_array.name
        }else{
          eva_data.equit = ''
        }
        storage.set('eva_data',eva_data)
        this.$router.push('/personal/evaluate/addEvaluate')
      },
      edit(data){
        console.log('data',data)
        let eva_data = {content:data.content,equit:'',to_user:data.to_user_nick,id:data.id};
        if(data.order_array){
          eva_data.equit = data.order_array.name
        }else{
          eva_data.equit = ''
        }
        storage.set('eva_data',eva_data)
        this.$router.push('/personal/evaluate/editEvaluate')
      }
    },
    mounted(){
      this.getGoodsEva();
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
.table-content{
  padding: 20px 0px;
    .table{
    margin:10px 20px 0px;
    padding:10px 20px;
    border: 1px solid #D9D9D9;
    background-color: #FAFAFA;
    color: #333333;
    font-weight: 400px;
    text-align: center;
  }
  .content{
    margin:0px 20px;
    padding:10px 20px;
    border: 1px solid #D9D9D9;
    border-top: 0px;
    
    p{
      line-height: 20px;
      color: #333333;
      font-weight: 400;
      font-size: 12px;
      margin: 0 auto;
      width: 80%;
    }
    .eva-img{
      width:40px;
      height:40px;
      margin-right:5px;
    }
    
    .text2{
      width:100%;
      text-align: center;
      color: #007DDD;
    }
    .text3{
      text-align: center;
      color: $Theme-color;
    }
    .date{
      color: #999999;
    }
    .price{
      color: #EA001F
    }
    .btn{
      width:100%;
      text-align: center;
    }
    .btn:hover{
      cursor: pointer;
      color: $Theme-color;
    }
  } 
}
.page{
    padding: 20px 0 30px 9px;
    background-color: #ffffff;
    width: 100%
  }

</style>