<template>
  <div class="container">
    <div class="top_info">
      <div class="security">
        <div class="avatar">
          <img :src="util.qiniuAddress+userInfo.avatar" :onerror="util.maleAvatar" alt />
        </div>
        <div class="phone-level">
          <div class="phone">{{userInfo.mobile | toTel}}</div>
          <div class="level">
            <span>安全级别：</span>
            <div class="level-progress">
              <span class="low" :class="{'level':level>=0}"></span>
              <span class="medium" :class="{'level':level>1}"></span>
              <span class="high" :class="{'level':level>2}"></span>
            </div>
            <span class="level-value">{{levelList[level]}}</span>
            <span class="up" @click="secureUp">
              <el-button type="text">立刻提升</el-button>
            </span>
          </div>
        </div>
      </div>
      <div class="order">
        <div class="order-top">
          <div>我的订单</div>
          <div @click="toMyOrder(null)">
            全部订单
            <i class="el-icon-d-arrow-right"></i>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="order-bot">
          <div @click="toMyOrder(1)">
            <div>
              <ali-svg-icon icon-class="daifukuan"></ali-svg-icon>
              <ali-svg-icon icon-class="daifukuan-c"></ali-svg-icon>
            </div>
            <div>待付款({{waitPay||0}})</div>
          </div>
          <div @click="toMyOrder(2)">
            <div>
              <ali-svg-icon icon-class="yifukuan"></ali-svg-icon>
              <ali-svg-icon icon-class="yifukuan-c"></ali-svg-icon>
            </div>
            <div>已付款({{paid||0}})</div>
          </div>
          <div @click="toMyOrder(7)">
            <div>
              <ali-svg-icon icon-class="daipingjia"></ali-svg-icon>
              <ali-svg-icon icon-class="daipingjia-c"></ali-svg-icon>
            </div>
            <div>待评价({{waitComment||0}})</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="collect-container">
        <div>我的收藏</div>
        <div @click="toStudioCollect">
          查看全部
          <i class="el-icon-d-arrow-right"></i>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="display" v-if="studioCount>0">
        <div class="goods" v-for="(item,index) in studioList" :key="item.name+index" v-if="index<8">
          <div class="hover-btn">
            <div @click="findSame(item.category_id)">找相似</div>
            <div @click="unFollow(item.id)">取消收藏</div>
          </div>
          <div class="pic">
            <img :src="$qiniuHost+getPic(item.pic)" alt />
          </div>
          <div class="detail">
            <p>{{item.name}}</p>
            <p>￥{{item.price}}/每小时</p>
          </div>
          <div class="opt">
            <div @click="toShop(item.to_uid)">进入店铺</div>
            <div @click="toStudio(item.id)">立刻租借</div>
          </div>
        </div>
      </div>
      <div v-else class="nothing">
        <div class="toHome">
          <img src="https://pic.paitume.com/3-1573794931556.png" />
          <div>还没有任何收藏商品~</div>
          <div>
            推荐您去：
            <a @click="toHome">首页</a>逛逛~
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { frontPersonal } from "@config/api.js";
import { frontOrder } from "@config/api.js";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    //添加账号安全程度
    userInfo: {},
    level: 0,
    levelList: ["低", "低", "中", "高"],
    avatar: "",
    name: "",
    waitPay: 0,
    paid: 0,
    waitComment: 0,
    allOrder: 0,
    messageIndex: "0",
    stores: [],
    studios: [],
    equips: [],
    goodsTopArr: [
      {
        word: "新品12",
        isChecked: true
      },
      {
        word: "热销10",
        isChecked: false
      },
      {
        word: "优惠6",
        isChecked: false
      }
    ],
    headTextArr: [
      {
        word: "店铺收藏",
        type: 0,
        isActive: true
      },
      {
        word: "影棚收藏",
        type: 1,
        isActive: false
      },
      {
        word: "器材收藏",
        type: 2,
        isActive: false
      }
    ],

    storeBatch: false,
    goodsBatch: false,
    studioBatch: false,
    equipBatch: false,
    storeBatchText: "批量管理",
    studioBatchText: "批量管理",
    equipBatchText: "批量管理",
    storeCount: 0,
    studioCount: 0,
    equipCount: 0,
    searchStore: "",
    searchStudio: "",
    searchEquip: "",
    isStoreAll: false,
    isStudioAll: false,
    isEquipAll: false,
    storePage: 1,
    studioPage: 1,
    equipPage: 1,
    studioList: []
  }),

  computed: {
    ...mapGetters(["user_data"])
  },

  components: {},
  created() {
    this.userInfo = this.user_data;
    console.log("this.userInfo--------", this.userInfo);
    if (this.userInfo.pwd) {
      this.level++;
    }
    if (this.userInfo.mobile) {
      this.level++;
    }
    if (this.userInfo.email) {
      this.level++;
    }
  },

  mounted() {
    this.avatar = this.$qiniuHost + this.user_data.avatar;
    this.name = this.user_data.nick;
    this.getOrder();
    // this.getCollectList(1, 6, 1, 0, undefined, undefined);
    this.getStudioList();
  },

  watch: {
    goodsBatch(val) {
      this.list.forEach(item => {
        item.checked = false;
      });
    }
  },
  filters: {
    picDeal(val) {
      if (val.indexOf(",") > -1) {
        return val.slice(0, val.indexOf(","));
      } else {
        return val;
      }
    }
  },

  methods: {
    //立刻提升
    secureUp() {
      this.$router.push({
        path: "person/security"
      });
    },
    //查看全部
    toStudioCollect() {
      this.$router.push({
        path: "collection/collectstudio"
      });
    },
    //去首页
    toHome() {
      this.$router.push({
        path: "/"
      });
    },
    //去店铺
    toShop(id) {
      this.$router.push({
        path: "/shop/index",
        query: { uid: id }
      });
    },
    //处理图片
    getPic(pic) {
      if(pic){
        return pic.split(",")[0];
      }else{
        return ''
      }
    },
    //取消关注
    unFollow(id) {
      this.postRequest(frontPersonal.delSingleCollect, {
        type: 1,
        obj: 1,
        relation_id: id
      }).then(res => {
        this.getStudioList();
      });
    },
    //获取关注的影棚列表
    getStudioList() {
      this.getRequest(frontPersonal.getCollectList, {
        page: 1,
        page_size: 10,
        obj: 1,
        type: 1
      }).then(res => {
        if (res) {
          console.log(res, "auysdguyagaygs");
          this.studioList = res.result;
          this.studioCount = parseInt(res.count);
        }
      });
    },
    //跳转到我的订单页面
    toMyOrder(index) {
      let query = null;
      if (index) {
        query = { pay_status: index };
      }
      this.$router.push({ path: "/personal/order/myOrder", query: query });
    },
    // 获取我的订单，各种状态订单的数量
    getOrder() {
      this.getRequest(frontOrder.getUserOrderList)
        .then(res => {
          console.log(res, "个人中心首页接口");
          this.waitPay = res.OrderStatusWaitPay;
          this.paid = res.OrderStatusPaid;
          this.waitComment = res.OrderStatusWaitComment;
          this.allOrder = res.total_count;
        })
        .catch(err => {});
    },
    // 获取收藏的店铺，收藏的影棚或者收藏的器材
    getCollectList(page, page_size, obj, type, to_uid, search) {
      this.getRequest(frontPersonal.getCollectList, {
        page,
        page_size,
        obj,
        type,
        to_uid,
        search
      })
        .then(res => {
          switch(type){
            case 0:
              console.log("dfugsdhfhjksdhfsdhg");
            this.storeCount = parseInt(res.count);
            this.stores = res.result;
            break;
            case 1:
              this.studioCount = parseInt(res.count);
            this.studios = res.result;
            break;
            case 2:
              this.equipCount = parseInt(res.count);
            this.equips = res.result;
            break;
            case 3:
            case 4:
            case 5:
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectHead(item) {
      this.headTextArr.forEach(item => {
        item.isActive = false;
      });
      item.isActive = true;
      if (item.type == 0) {
        this.getCollectList(1, 6, 1, item.type, undefined, undefined);
      } else {
        this.getCollectList(1, 8, 1, item.type, undefined, undefined);
      }
      this.storeBatch = false;
      this.studioBatch = false;
      this.equipBatch = false;
      this.storeBatchText = "批量管理";
      this.studioBatchText = "批量管理";
      this.equipBatchText = "批量管理";
    },
    selectGoodsTop(i) {
      this.goodsTopArr.forEach(item => {
        item.isChecked = false;
      });
      i.isChecked = true;
    },
    batchManage(text) {
      if (text === "store") {
        this.storeBatch = !this.storeBatch;
        this.storeBatchText = this.storeBatch ? "取消批量" : "批量管理";
      } else if (text === "studio") {
        this.studioBatch = !this.studioBatch;
        this.studioBatchText = this.studioBatch ? "取消批量" : "批量管理";
      } else {
        this.equipBatch = !this.equipBatch;
        this.equipBatchText = this.equipBatch ? "取消批量" : "批量管理";
      }
    },
    changeStorePage(val) {
      this.getCollectList(val, 6, 1, 0, undefined, undefined);
    },
    changeStudioPage(val) {
      console.log(val, "8888888888");
      this.getCollectList(val, 8, 1, 1, undefined, undefined);
    },
    changeEquipPage(val) {
      this.getCollectList(val, 8, 1, 2, undefined, undefined);
    },
    // 置顶店铺
    setTop(uid, to_uid, type, obj, relation_id) {
      this.postRequest(frontPersonal.setTop, {
        uid,
        to_uid,
        type,
        obj,
        relation_id
      })
        .then(res => {
          console.log(res, "pppppppppppppp置顶的结果");
          this.getCollectList(1, 6, 1, 0, undefined, undefined);
        })
        .catch(err => {});
    },
    // 删除单个
    delSingle(type, obj, relation_id) {
      console.log(relation_id, "要删除的id");
      this.postRequest(frontPersonal.delSingleCollect, {
        type,
        obj,
        relation_id
      })
        .then(res => {
          console.log(res, "删除单个");
          if (type == 0) {
            this.getCollectList(this.storePage, 6, 1, 0, undefined, undefined);
            // this.storePage=1
          } else if (type == 1) {
            this.getCollectList(this.studioPage, 8, 1, 1, undefined, undefined);
            // this.studioPage=1
          } else if (type == 2) {
            this.getCollectList(this.equipPage, 8, 1, 2, undefined, undefined);
            // this.equipPage=1
          }
        })
        .catch(err => {});
    },
    // 批量删除
    batchDelStore(type) {
      let delArr = [];
      if (type == 0) {
        this.stores.forEach((item, index) => {
          if (item.checked) {
            delArr.push(item.id);
          }
        });
      } else if (type == 1) {
        this.studios.forEach((item, index) => {
          if (item.checked) {
            delArr.push(item.id);
          }
        });
      } else if (type == 2) {
        this.equips.forEach((item, index) => {
          if (item.checked) {
            delArr.push(item.id);
          }
        });
      }
      this.postRequest(frontPersonal.delBatchCollect, {
        type: type,
        obj: 1,
        relation_str: JSON.stringify(delArr)
      })
        .then(res => {
          if (type == 0) {
            this.getCollectList(1, 6, 1, 0, undefined, undefined);
          } else if (type == 1) {
            this.getCollectList(1, 8, 1, 1, undefined, undefined);
          } else if (type == 2) {
            this.getCollectList(1, 8, 1, 2, undefined, undefined);
          }
        })
        .catch(err => {});
    },
    checkAllStore() {
      if (this.isStoreAll) {
        this.stores.forEach((item, index) => {
          this.$set(this.stores[index], "checked", true);
        });
      } else {
        this.stores.forEach((item, index) => {
          this.$set(this.stores[index], "checked", false);
        });
      }
      console.log(this.stores, "888888888");
    },
    checkAllStudio() {
      if (this.isStudioAll) {
        this.studios.forEach((item, index) => {
          this.$set(this.studios[index], "checked", true);
        });
      } else {
        this.studios.forEach((item, index) => {
          this.$set(this.studios[index], "checked", false);
        });
      }
      console.log(this.studios, "888888888");
    },
    checkAllEquip() {
      if (this.isEquipAll) {
        this.equips.forEach((item, index) => {
          this.$set(this.equips[index], "checked", true);
        });
      } else {
        this.equips.forEach((item, index) => {
          this.$set(this.equips[index], "checked", false);
        });
      }
      console.log(this.equips, "888888888");
    },
    selectStore() {
      let isAll = this.stores.every((item, index) => {
        return item.checked;
      });
      this.isStoreAll = isAll;
      console.log(isAll, "是否全选");
    },
    selectStudio() {
      let isAll = this.studios.every((item, index) => {
        return item.checked;
      });
      this.isStudioAll = isAll;
      console.log(isAll, "是否全选");
    },
    selectEquip() {
      let isAll = this.equips.every((item, index) => {
        return item.checked;
      });
      this.isEquipAll = isAll;
      console.log(isAll, "是否全选");
    },
    // 影棚或者器材找同款
    // findSame(id) {
    //   if (this.headTextArr[1].isActive) {
    //     this.$router.push({ path: "/studio/index", query: { studioType: id } });
    //   } else if (this.headTextArr[2].isActive) {
    //     this.$router.push({ path: "/equip/index", query: { equipType: id } });
    //   }
    // },
    findSame(id) {
      this.$router.push({
        path: "/studio/index",
        query: { studioType: id }
      });
    },
    // 进入店铺
    toStore(storeId) {
      this.util.toShopPage(storeId);
      // this.$router.push({path:'/shop/index',query:{uid:storeId}})
    },
    // 进入影棚
    toStudio(studioId) {
      console.log("跳转影棚");
      this.util.toStudioDetail(studioId);
      // this.$router.push({path:'/studio/detail',query:{id:studioId}})
    },
    // 进入设备
    toEquip(equipId) {
      console.log("跳转设备");
      this.util.toEquipDetail(equipId);
      // this.$router.push({path:'/equip/detail',query:{id:equipId}})
    }
  }
};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
.container {
  .top_info {
    height: 180px;
    margin-bottom: 31px;
    display: flex;
    align-items: center;
    .security {
      height: 180px;
      background-color: #fff;
      flex: 5;
      margin-right: 20px;
      display: flex;
      align-items: center;
      padding: 20px;
      .avatar {
        margin-right: 5px;
        flex: 1;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 1px solid #eee
        }
      }
      .phone-level {
        flex: 6;
        .phone {
          margin-bottom: 8px;
        }
        .level {
          display: flex;
          height: 20px;
          align-items: center;
          span {
            flex: 2.2;
          }
          .level-progress {
            flex: 6;
            display: flex;
            width: 300px;
            height: 10px;
            background: #d9d9d9;
            span {
              // display: block;
              flex: 1;
              font-size: 16px;
              height: 10px;
            }
            .low.level {
              background:rgba(229,214,255,1);
            }
            .medium.level {
              background:rgba(184,146,247,1);
            }
            .high.level {
              background:#9013FE;
            }
          }
          .level-value {
            flex: 1;
            margin-left: 10px;
            margin-right: 15px;
            color: $Theme-color;
          }
        }
      }
    }
    .order {
      height: 180px;
      color: rgba(50, 51, 51, 1);
      background-color: #fff;
      flex: 4.3;
      .order-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px;
        height: 54px;
        div {
          width: 30%;
          height: 54px;
          padding-top: 5%;
          cursor: pointer;
          &:nth-child(1) {
            text-align-last: left;
            cursor: default;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(50, 51, 51, 1);
          }
          &:nth-child(2) {
            text-align: right;
            &:hover {
              color: $Theme-color;
            }
          }
        }
      }
      .order-bot {
        svg {
          width: 50px;
          height: 35px;
        }
        padding: 0 30px;
        display: flex;
        align-items: center;
        height: 70px;
        justify-content: space-between;
        margin-top: 30px;
        div {
          &:hover {
            div {
              &:nth-child(1) {
                svg {
                  &:nth-child(1) {
                    display: none;
                  }
                  &:nth-child(2) {
                    display: inline;
                  }
                }
              }
            }
          }
          // height: 126px;
          width: 30%;
          // flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          cursor: pointer;
          font-size: 14px;
          div {
            &:nth-child(1) {
              svg {
                &:nth-child(2) {
                  display: none;
                }
              }
            }
            height: 49%;
            width: 100%;
          }
        }
      }
    }
  }
  .content {
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
    background-color: #fff;
    padding: 0 30px;
    .collect-container {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      div {
        color: rgba(50, 51, 51, 1);
        text-align: left;
        width: 12%;
        height: 40px;
        padding-top: 15px;
        &:nth-child(2) {
          text-align: right;
          cursor: pointer;
        }
      }
      div {
        &:nth-child(2) {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          &:hover {
            color: $Theme-color;
          }
        }
      }
    }
    .display {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .goods {
        cursor: default;
        position: relative;
        margin-right: 10px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        width: calc(25% - 10px);
        // width: 20%;
        height: 290px;
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
            height: 165px;
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
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
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
    }
  }
}
/deep/ .el-divider--horizontal {
  margin: 10px 0;
}
</style>
