<template>
  <div>
    <div class="wrap">

      <div class="bread">
        <span>首页</span>
        <span>&gt</span>
        <span>全部订单</span>
        <span>&gt</span>
        <span>订单详情</span>
      </div>

      <div class="studio-info">
        <div class="img">
          <!-- <img src="@images/c5.jpg" alt=""> -->
        </div>
        <div class="info">
          <div class="name">积田咏道沈阳大学影棚</div>
          <div class="adress">地址：朝阳区化工路5号垡头产业园泓彤体育院内 </div>
          <div class="square">
            <span>面积：</span>
            <span>516㎡/6楼</span>
          </div>
          <div class="condition">
            <span>设施：</span>
            <div v-for="item in 9" :key="item">
              <span>icon</span>
              <span>化妆间</span>
            </div>
          </div>
        </div>
      </div>

      <div class="rent">
        <div class="select">
          <div class="rent-option">
            <span>租赁方式：</span>
            <span>按天租赁</span>
            <!-- <el-select v-model="value" placeholder="请选择租赁方式">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
          </div>
          <div class="start-time">
            <span class="demonstration">开始时间：</span>
            <span>2019-07-02   08:00</span>
            <!-- <el-date-picker
              v-model="start"
              type="datetime"
              placeholder="选择开始日期时间">
            </el-date-picker> -->
          </div>
          <div class="end-time">
            <span class="demonstration">结束时间：</span>
            <span>2019-07-03   18:00</span>
            <!-- <el-date-picker
              v-model="end"
              type="datetime"
              placeholder="选择结束日期时间">
            </el-date-picker> -->
          </div>
        </div>
        <div class="statistic">
          <div class="hour">
            <span>共：</span>
            <span>2小时</span>
          </div>
          <div class="price">
            <span>价格：</span>
            <span>￥1600</span>
          </div>
        </div>
      </div>

      <div class="selected-equip">
        <div class="price-table">
          <div class="table-head">
            <!-- <div class="item">
              <el-checkbox v-model="allChecked"></el-checkbox>
              <span>全选</span>
            </div> -->
            <div class="item">
              <span>图片</span>
            </div>
            <span class="item">名称</span>
            <span class="item">品牌</span>
            <span class="item">型号</span>
            <span class="item">数量</span>
            <span class="item">时长</span>
            <span class="item">单价</span>
            <span class="item">操作</span>
          </div>
          <div class="charge">
            <div class="charge-item" v-for="item in 2" :key="item">
              <div class="each">
                <!-- <el-checkbox></el-checkbox> -->
                <!-- <img src="@images/c4.jpg" alt=""> -->
              </div>
              <span class="each">单反相机</span>
              <span class="each">佳能</span>
              <span class="each">Canon EOS 77D</span>
              <span class="each">1</span>
              <!-- <el-input-number class="each" v-model="num" @change="changeNum" :min="1" :max="10" label="描述文字"></el-input-number> -->
              <span class="each">2天</span>
              <span class="each price">￥599</span>
              <span class="each">删除</span>
            </div>
          </div>
          <div class="price-count">
            <div class="equip-num">
              <span>共：</span>
              <span>2件</span>
            </div>
            <div class="total-price">
              <span>合计：</span>
              <span>￥1600</span>
            </div>
          </div>
        </div>
      </div>

      <div class="all-wrap">
        <div class="all-count">
          <span>合计：3件（影棚1，器材2）</span>
        </div>
        <div class="all-price">
          <span>合计：</span>
          <span>￥2798</span>
        </div>
        <div class="submit-btn">
          去评价
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        options: [
        {
          value: '1',
          label: '按天租赁'
        }, 
        {
          value: '2',
          label: '按小时租赁'
        }],
        value: '1',
        start:'',
        end:'',
        allChecked:false,
        num:1
      }
    },
    methods:{
      changeNum(){

      }
    }
  }
</script>

<style lang="scss" scoped>
.wrap{
  padding:0 180px;
  box-sizing: border-box;
  .bread{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #eee;
    margin-bottom: 29px;
  }
  .studio-info{
    height: 278px;
    box-shadow:0px 0px 15px 0px rgba(4,0,0,0.1);
    margin-bottom: 40px;
    display: flex;
    .img{
      width: 394px;
      padding: 29px 0 30px 31px;
      box-sizing: border-box;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .info{
      flex: 1;
      padding: 39px 0 43px 21px;
      box-sizing: border-box;
      .name{
        font-size:30px;
        font-weight:400;
        color:#333;
        margin-bottom: 20px;
      }
      .adress{
        margin-bottom: 80px;
      }
      .square{
        margin-bottom: 18px;
        span:last-child{
          font-size: 16px;
        }
      }
      .condition{
        display: flex;
        div{
          margin-right: 35px;
        }
      }
    }
  }
  .rent{
    box-shadow:0px 0px 15px 0px rgba(4,0,0,0.1);
    margin-bottom: 39px;
    .select{
      height: 76px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background:rgb(249,249,249);
      padding: 0 30px;
      box-sizing: border-box;
      .rent-option{
      }
    }
    .statistic{
      height: 57px;
      line-height: 57px;
      padding: 0 30px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .price{
        span:last-child{
          color: #F93737;
        }
      }      
    }
  }
  .selected-equip{
    .price-table{
      box-shadow:0px 0px 15px 0px rgba(4,0,0,0.1);
      margin-bottom: 31px;
      padding: 0 33px;
      box-sizing: border-box;
      .table-head{
        height: 52px;
        display: flex;
        justify-content: center;
        align-items: center;
        .item{
          flex: 1;
          text-align: center;
          .el-checkbox{
            margin-right: 5px;
          }
        }
        .item:first-child{
          text-align: left;
          span{
            display: block;
            width: 110px;
            text-align: center;
          }
        }
      }
      .charge{
        background:rgb(249,249,249);
        border:1px solid rgb(204,204,204);
        border-radius:2px;
        min-height: 82px;
        .charge-item{
          display: flex;
          justify-content: center;
          align-items: center;
          height: 83px;
          border-bottom: 1px solid #ccc;
          .each{
            flex: 1;
            text-align: center;
          }
          .price{
            color: #F93737;
          }
          .each:first-child{
            text-align: left;
            height: 100%;
            position: relative;
            .el-checkbox{
              position: absolute;
            }
            img{
              width: 110px;
              height: 100%;
            }
          }
        }
        .charge-item:last-child{
          border-bottom: none;
        }
      }
      .price-count{
        height: 57px;
        line-height: 57px;
        padding: 0 30px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .total-price{
          span:last-child{
            color: #F93737;
          }
        }      
      }
    }
  }
  .all-wrap{
    height:71px;
    line-height: 71px;
    background:rgb(249,249,249);
    display: flex;
    padding-left: 32px;
    box-sizing: border-box;
    margin-bottom: 99px;
    .all-count{
      margin-right: auto;
    }
    .all-price{
      margin-right: 27px;
      span:last-child{
        color: #F93737;
        font-size: 16px;
      }
    }
    .submit-btn{
      padding: 0 66px;
      background:rgb(249,55,55);
      color: #fff;
    }
  }
}
</style>