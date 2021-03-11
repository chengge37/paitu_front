<template>
  <div>
    <el-divider></el-divider>
    <div class="display" v-if="equipList.length>0">
      <div
        class="goods"
        v-for="(item,index) in equipList"
        :key="item.name+index"
        :class="{isBatch:equipBatch}"
      >
        <div class="hover-btn" v-if="!equipBatch">
          <div @click="findSame(item.category_id)">找相似</div>
          <div @click="unFollow(item.id)">取消收藏</div>
        </div>
        <div class="pic" @click="toEquip(item.id)">
          <img :src="util.picExplode(item.pic,config.defaultEquipPic)" object-fit="contain" :onerror="util.errorPic" alt />
          <!-- <el-image style="width:214px;height:165px;z-index:-1;" fit="contain" :src="util.picExplode(item.pic,config.defaultEquipPic)" -->
					<!-- :onerror="util.errorPic" class="cursor"/> -->
        </div>
        <div class="detail">
          <p>{{item.name}}</p>
          <p>￥{{item.price}}/每小时</p>
        </div>
        <div class="opt">
          <div @click="toShop(item.to_uid)">进入店铺</div>
          <div @click="toEquip(item.id)">立刻租借</div>
        </div>
        <el-checkbox-group
          v-model="checkedEquips"
          @change="handleCheckedEquipsChange(item)"
          v-if="equipBatch"
        >
          <el-checkbox :label="item.id"></el-checkbox>
        </el-checkbox-group>
        <transition name='fade'>
        
        <div class="shadow" v-if="equipBatch"></div>
        </transition>
      </div>
    </div>
    <div v-else class="nothing">
        <div class="toHome">
          <img src="https://pic.paitume.com/3-1573794931556.png" />
          <div>还没有任何收藏器材~</div>
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
  props: ["equipList", "equipBatch", "isAll"],
  data() {
    return {
      checkedEquips: []
    };
  },
  created(){
    this.unFollow=this.util.throttle(this.unFollow)
  },
  methods: {
    toHome() {
      this.$router.push({
        path: "/"
      });
    },
    handleCheckedEquipsChange() {},
    getPic(pic) {
      if(pic){
        return pic.split(",")[0];
      }else{
        return pic
      }
    },
    toShop(storeId) {
      this.util.toShopPage(storeId);
      // this.$router.push({path:'/shop/index',query:{uid:storeId}})
    },
    toEquip(storeId) {
      this.util.toEquipDetail(storeId);
      // this.$router.push({path:'/shop/index',query:{uid:storeId}})
    },
    findSame(id) {
      this.$router.push({
        path: "/studio/index",
        query: { studioType: id }
      });
    },
    unFollow(id) {
      this.postRequest(frontPersonal.delSingleCollect, {
        type: 2,
        obj: 1,
        relation_id: id
      }).then(res => {
        // this.getStudioList();
        this.$emit("timeToGet","设备")
      });
    }
  },
  //监听全选
  watch: {
    isAll(newVal) {
      this.checkedCities = [];
      if (newVal) {
        for (let i = 0; i < this.equipList.length; i++) {
          this.checkedEquips.push(this.equipList[i].id);
        }
      }
    }
  }
};
</script>
<style lang="scss">
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
.display {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  background-color: #fff;
  padding: 0 31px;
  padding-top: 20px;
  .goods {
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
    }
    cursor: default;
    position: relative;
    margin-right: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: calc(25% - 10px);
    // width: 20%;
    height: 340px;
    // box-shadow: 0px 0px 18px 0px rgba(5, 5, 5, 0.3);
    margin-bottom: 10px;
    .hover-btn {
      cursor: pointer;
      display: none;
      position: absolute;
      width: 100%;
      display: flex;
      color: #fff;
      opacity: 0.6;
      background-color: rgba(0, 0, 0, 1);
      div {
        flex: 1;
        display: none;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid rgba(235, 235, 235, 1);
      }
    }
    .pic {
      img {
        display: inline-block;
        width: 100%;
        max-height: 214px;
        border-bottom: 1px solid #eee;
      }
    }
    .detail {
      padding: 20px 0;
      p {
        text-align: center;
        &:nth-child(1) {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: bold;
          margin-bottom: 5px;
          padding: 0 10px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &:nth-child(2) {
          font-weight: 400;
          color: rgba(234, 0, 30, 1);
        }
      }
    }
    .opt {
      z-index: 2001;
      width: 100%;
      position: absolute;
      z-index: 15;
      bottom: 0;
      left: 0;
      // border: 1px solid rgba(0, 0, 0, .2);
      display: flex;
      div {
        &:hover {
          color: $Theme-color;
        }
        cursor: pointer;
        height: 36px;
        line-height: 36px;
        text-align: center;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        &:nth-child(1) {
          border-right: 1px solid rgba(0, 0, 0, 0.2);
        }
        flex: 1;
      }
    }
  }
  .goods:hover {
    box-shadow: 0px 0px 18px 0px rgba(5, 5, 5, 0.3);
    .hover-btn {
      display: block;
      display: flex;
      div {
        display: block;
        flex: 1;
      }
    }
  }
  .isBatch:hover {
    box-shadow: none;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>