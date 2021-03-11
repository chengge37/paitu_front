<template>
  <div class="container">
    <el-divider></el-divider>
    <div class="storeList" v-if="storeList.length>0">
      <div class="store" v-for="(item,index) in storeList" :key="index">
        <div class="del" @click="unFollow(item.to_uid)">
          <i class="el-icon-delete"></i>
        </div>
        <div class="images">
          <img :src="$qiniuHost+item.logo" :onerror="util.storePic" />
        </div>
        <div class="name">{{item.nick}}</div>
        <div class="rate">
          店铺评分 <i class="el-icon-star-on" :class="getRate(item.score,1)"></i>
          <i class="el-icon-star-on" :class="getRate(item.score,2)"></i>
          <i class="el-icon-star-on" :class="getRate(item.score,3)"></i>
          <i class="el-icon-star-on" :class="getRate(item.score,4)"></i>
          <i class="el-icon-star-on" :class="getRate(item.score,5)"></i>
        </div>
        <div class="nav" @click="toShop(item.to_uid)">
          <i class="el-icon-s-shop"></i>进入店铺
        </div>
        <el-checkbox-group
          v-model="checkedStores"
          @change="handleCheckedStoresChange(item)"
          v-if="storeBatch"
        >
          <el-checkbox :label="item.id"></el-checkbox>
        </el-checkbox-group>
        <div class="shadow" v-show="storeBatch"></div>
      </div>
    </div>
    <div v-else class="nothing">
        <div class="toHome">
          <img src="https://pic.paitume.com/3-1573794931556.png" />
          <div>还没有任何收藏店铺~</div>
          <div>
            推荐您去：
            <a @click="toHome">首页</a>逛逛~
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { frontPersonal } from "@config/api.js";
export default {
  props: ["storeList", "storeBatch", "isAll"],
  data() {
    return {
      checkedStores: []
    };
  },
  methods: {
    toHome() {
      this.$router.push({
        path: "/"
      });
    },
    getRate(score,index) {
      //获取评分
      if (score) {
        let rate = parseFloat(score);
        if(score>=index){
          return {score:true}
        }
      }else{
        return{}
      }
    },
    toShop(storeId) {
      this.util.toShopPage(storeId);
    },
    handleCheckedStoresChange() {
      console.log(this.checkedStores);
    },
    unFollow(id) {
      this.postRequest(frontPersonal.delSingleCollect, {
        type: 0,
        obj: 1,
        relation_id: id
      }).then(res => {
        this.$emit("timeToGet", "店铺");
      });
    }
  },
  watch: {
    isAll(newVal) {
      this.checkedStores = [];
      if (newVal) {
        for (let i = 0; i < this.storeList.length; i++) {
          this.checkedStores.push(this.storeList[i].id);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  background-color: #fff;
}
.nothing {
      width: 100%;
      height: 590px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .toHome {
        img {
          width: 210px;
          height: 155px;
        }
        div {
          &:nth-child(2) {
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 500;
            margin-top: 15px;
            margin-bottom: 10px;
          }
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          text-align: center;
          a {
            display: inline-block;
            background: rgba(101, 31, 255, 1);
            color: #fff;
            width: 45px;
            margin-right: 0.5rem;
          }
        }
      }
    }
.storeList {
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 20px 30px;
  .store {
    /deep/ .el-checkbox-group {
      z-index: 30;
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      height: 40px;
      //隐藏右边的文字
      .el-checkbox__label {
        display: none;
      }
      .el-checkbox {
        width: 100%;
        height: 100%;
        background-color: #333333;
        .el-checkbox__input {
          width: 100%;
          height: 100%;
          .el-checkbox__inner {
            background-color: #333333;
            width: 100%;
            height: 100%;
            border: none;
            &::after {
              top: 6px;
              left: 15px;
              height: 20px;
              width: 9px;
              transition: none;
            }
          }
        }
      }
      .is-checked {
        background-color: $Theme-color;
        .el-checkbox__input {
          .el-checkbox__inner {
            &::after {
              top: 6px;
              left: 15px;
              height: 20px;
              width: 9px;
              transition: none;
            }
            background-color: $Theme-color;
          }
        }
      }
    }
    //蒙版样式
    .shadow {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 20;
      background-color: rgba(0, 0, 0, 0.3);
      transition: 2s;
      // -webkit-transition:width 2s;
    }
    width: 30%;
    margin: 0 10px;
    height: 290px;
    border: 1px solid rgba(235, 235, 235, 1);
    position: relative;
    margin-bottom: 20px;
    .del {
      position: absolute;
      top: 14px;
      right: 14px;
      width: 24px;
      height: 24px;
      cursor: pointer;
      margin: 0;
      font-size: 21px;
      &:hover {
        color: $Theme-color;
      }
    }
    .images {
      width: 78px;
      height: 78px;
      margin: 0 auto;
      margin-top: 36px;
      border: none;
      margin-bottom: 18px;
      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid #eee
      }
    }
    .name {
      margin: 0 auto;
      width: auto;
      height: 36px;
      text-align: center;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(50, 51, 51, 1);
      border: none;
    }
    .rate {
      margin: 0 auto;
      width: auto;
      height: 18px;
      text-align: center;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(50, 51, 51, 1);
      border: none;
      i{
        color: rgb(239, 242, 247);
      }
      .score {
        color: rgb(255, 86, 0);
      }
    }
    .nav {
      background: rgba(240, 240, 240, 1);
      margin: 0;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 40px;
      width: 100%;
      line-height: 40px;
      text-align: center;
      font-weight: 400;
      color: rgba(153, 152, 153, 1);
      cursor: pointer;
      font-size: 16px;
      &:hover {
        color: $Theme-color;
      }
    }
  }
  .isBatch:hover {
    box-shadow: none;
  }
}
</style>