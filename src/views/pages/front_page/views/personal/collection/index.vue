<template>
  <div class="container">
    <div class="top-nav">
      <div
        v-for="item in navArr"
        :key="item.word"
        :class="{active:item.isActive}"
        @click="mySelectNav(item)"
      >
        <span v-text="item.word[0]"></span>
        <span v-text="item.word.slice(1)"></span>
      </div>
    </div>
    <div class="subMenu">
      <div class="subStudio" v-if="activeType==0">
        <div :class="{active:subFlag}" @click="clickStudio">影棚({{studioCount}})</div>
        <div :class="{active:!subFlag}" @click="clickEquip">器材({{equipCount}})</div>
      </div>
      <div class="subStore" v-if="activeType==1">
        <div class="subLeft">全部店铺</div>
      </div>
      <div class="subActivity" v-if="activeType==2">
        <div>全部活动</div>
        <!-- <div>进行中</div>
        <div>即将开始</div>
        <div>已结束</div> -->
      </div>
      <div class="subStore" v-if="activeType==3">
        <div class="subLeft">全部模特</div>
      </div>
      <div class="subStore" v-if="activeType==4">
        <div class="subLeft">全部服务</div>
      </div>
      <!-- <div class="subCourse" v-if="activeType==3">课程收藏</div> -->
      <div class="subRight">
        <el-checkbox v-model="isAll" @change="handleCheckAllChange" v-if="isBatch">全选</el-checkbox>
        <div class="del" @click="unFollowBatch" v-if="isBatch">
          <i class="el-icon-delete"></i>删除
        </div>
        <div class="batch" @click="showShadow" v-if="totalCount>0">{{isBatch?"取消批量":"批量管理"}}</div>
        <div class="search">
          <input type="text" v-model="searchText" :placeholder="placeword" />
          <div @click="search">
            <i class="el-icon-search"></i>
          </div>
        </div>
      </div>
    </div>

    <CollectStudio
      ref="studio"
      v-if="navArr[0].isActive&&subFlag"
      :isAll="isAll"
      :studioList="studioList"
      :studioBatch="isBatch"
      :totalCount="studioCount"
      @timeToGet="timeToGet"
    ></CollectStudio>
    <CollectEquip
      ref="equip"
      v-if="navArr[0].isActive&&!subFlag"
      :isAll="isAll"
      :equipList="equipList"
      :equipBatch="isBatch"
      :totalCount="equipCount"
      @timeToGet="timeToGet"
    ></CollectEquip>
    <CollectStore
      ref="store"
      v-if="navArr[1].isActive"
      :isAll="isAll"
      :storeList="storeList"
      :storeBatch="isBatch"
      :totalCount="storeCount"
      @timeToGet="timeToGet"
    ></CollectStore>
    <CollectActivity
      ref="activity"
      v-if="navArr[2].isActive"
      :isAll="isAll"
      :activityList="activityList"
      :activityBatch="isBatch"
      :totalCount="activityCount"
      @timeToGet="timeToGet"
    ></CollectActivity>
    <CollectModel
      ref="model"
      v-if="navArr[3].isActive"
      :isAll="isAll"
      :modelList="modelList"
      :modelBatch="isBatch"
      :totalCount="modelCount"
      @timeToGet="timeToGet"
    ></CollectModel>
    <CollectServer
      ref="server"
      v-if="navArr[4].isActive"
      :isAll="isAll"
      :serverList="serverList"
      :serverBatch="isBatch"
      :totalCount="serverCount"
      @timeToGet="timeToGet"
    ></CollectServer>
    <page :totalCount="totalCount" @handleCurrentChange="handleCurrentChange"></page>
  </div>
</template>

<script>
import page from "./page";
import CollectStore from "./store";
import CollectStudio from "./studio";
import CollectEquip from "./equip";
import CollectActivity from "./activity";
import CollectModel from "./model";
import CollectServer from "./server";
import CollectCourse from "./course";
import { frontPersonal } from "@config/api.js";
export default {
  data() {
    return {
      page_size: 10,
      page: 1,
      totalCount: 0,
      navArr: [
        {
          word: "商品收藏",
          path: "/personal/collection/collectstudio",
          isActive: false,
          type: 0
        },
        {
          word: "店铺收藏",
          path: "/personal/collection/collectstore",
          isActive: false,
          type: 1
        },
        {
          word: "活动收藏",
          path: "/personal/collection/collectactivity",
          isActive: false,
          type: 2
        },
        {
          word: "模特收藏",
          path: "/personal/collection/collectmodel",
          isActive: false,
          type: 3
        },
        {
          word: "服务收藏",
          path: "/personal/collection/collectserver",
          isActive: false,
          type: 4
        },
        // {
        //   word: "课程收藏",
        //   path: "/personal/collection/collectcourse",
        //   isActive: false,
        //   type: 3
        // }
      ],
      placeword: "影棚",
      storeList: [],
      studioList: [],
      equipList: [],
      activityList: [],
      modelList: [],
      serverList: [],
      searchText: "",
      isAll: false,
      studioCount: 0,
      equipCount: 0,
      storeCount: 0,
      activityCount: 0,
      modelCount: 0,
      serverCount: 0,
      //定义一个变量控制子菜单切换
      subFlag: true,
      //是否处于批量管理状态
      isBatch: false
    };
  },
  components: {
    CollectStore,
    CollectStudio,
    CollectEquip,
    page,
    CollectActivity,
    CollectModel,
    CollectServer,
    // CollectCourse
  },
  created() {
    this.unFollowBatch=this.util.throttle(this.unFollowBatch)
    this.showPageByRoute();
    // this.getStudioList()
  },
  mounted() {
    this.getCollect(1, 8, 1, 1, null, null);
    this.getCollect(1, 8, 1, 2, null, null);
  },
  methods: {
    //搜索
    search() {
      this.showPageByRoute();
    },
    // 批量取消收藏
    unFollowBatch() {
      if (this.navArr[1].isActive) {
        //店铺
        if(this.$refs.store.checkedStores.length==0){
          return this.$message.warning('当前没有选中项')
        }
        this.postRequest(frontPersonal.delCollect, {
          type: 0,
          obj: 1,
          relation_str: JSON.stringify(this.$refs.store.checkedStores)
        }).then(res => {
          this.isBatch = false;
          this.$refs.store.checkedStores=[];
          this.getCollect(1, 9, 1, 0, null, null,true);
        });
      } else if (this.navArr[0].isActive && this.subFlag) {
        //影棚
        if(this.$refs.studio.checkedStudios.length==0){
          return this.$message.warning('当前没有选中项')
        }
        this.postRequest(frontPersonal.delCollect, {
          type: 1,
          obj: 1,
          relation_str: JSON.stringify(this.$refs.studio.checkedStudios)
        }).then(res => {
          this.isBatch = false;
          this.$refs.studio.checkedStudios=[];
          this.getCollect(1, 8, 1, 1, null, null,true);
        });
      } else if (this.navArr[0].isActive && !this.subFlag) {
        //器材
        if(this.$refs.equip.checkedEquips.length==0){
          return this.$message.warning('当前没有选中项')
        }
        this.postRequest(frontPersonal.delCollect, {
          type: 2,
          obj: 1,
          relation_str: JSON.stringify(this.$refs.equip.checkedEquips)
        }).then(res => {
          this.isBatch = false;
          this.$refs.equip.checkedEquips=[];
          this.getCollect(1, 8, 1, 2, null, null,true);
          this.totalCount=this.equipCount;
        });
      } else if (this.navArr[2].isActive) {
        //活动
        if(this.$refs.activity.checkedActivitys.length==0){
          return this.$message.warning('当前没有选中项')
        }
        this.postRequest(frontPersonal.delCollect, {
          type: 3,
          obj: 1,
          relation_str: JSON.stringify(this.$refs.activity.checkedActivitys)
        }).then(res => {
          this.isBatch = false;
          this.$refs.activity.checkedActivitys=[];
          this.getCollect(1, 3, 1, 3, null, null,true);
        });
      }else if(this.navArr[3].isActive){
        //模特
        if(this.$refs.model.checkedModels.length==0){
          return this.$message.warning('当前没有选中项')
        }
        this.postRequest(frontPersonal.delCollect, {
          type: 4,
          obj: 1,
          relation_str: JSON.stringify(this.$refs.model.checkedModels)
        }).then(res => {
          this.isBatch = false;
          this.$refs.model.checkedModels=[];
          this.getCollect(1, 8, 1, 4, null, null,true);
        });
      }
    },
    //批量管理按钮事件
    showShadow() {
      this.isBatch = !this.isBatch;
      //清空选择  好像不需要  还是需要
      // this.$refs.studio.checkedStudio = [];
      console.log("usdiohfsdiufsdiuhfyiusdlui", this.isBatch);
    },
    handleCheckAllChange() {
      !this.isAll;
    },
    handleCurrentChange(toPage, name) {
      this.page = toPage;
      switch (name) {
        case "CollectStore":
          this.page_size = 9;
          this.getCollect(toPage, this.page_size, 1, 0, null, this.searchText);
          break;
        case "CollectStudio":
          this.page_size = 8;
          this.getCollect(toPage, this.page_size, 1, 1, null, this.searchText);
          break;
        case "CollectEquip":
          this.page_size = 8;
          this.getCollect(toPage, this.page_size, 1, 2, null, this.searchText);
          break;
        case "CollectModel":
          this.page_size = 8;
          this.getCollect(toPage, this.page_size, 1, 4, null, this.searchText);
          break;
        // case "CollectEquip":
        //   this.page_size = 8;
          // this.getCollect(toPage, this.page_size, 1, 4, null, this.searchText);
          // break;
        case "CollectActivity":
          break;
        case "CollectCourse":
          break;
      }
    },
    //根据参数获取不同的数据集
    //page page_size order顺序 obj 1收藏，type 0店铺1影棚2器材3活动 to_uid店铺 search搜索
    //多接受一个true或false决定是否赋值totalCount
    getCollect(page, page_size, obj, type, to_uid, search, flag) {
      this.getRequest(frontPersonal.getCollectList, {
        page,
        page_size,
        obj,
        type,
        to_uid,
        search
      })
        .then(res => {
          if (type == 0) {
            this.storeList = res.result;
            this.storeCount = parseInt(res.count);
            flag?this.totalCount=this.storeCount:"";
            console.log("dsfhuslidfhs", this.totalCount, "dosifdsio");
            console.log(this.storeList, "00000000000");
          } else if (type == 1) {
            this.studioList = res.result;
            this.studioCount = parseInt(res.count);
            flag?this.totalCount=this.studioCount:"";
          } else if (type == 2) {
            this.equipList = res.result;
            this.equipCount = parseInt(res.count);
            flag?this.totalCount=this.equipCount:"";
          } else if (type == 3) {
            this.activityList = res.result;
            this.activityCount = parseInt(res.count);
            flag?this.totalCount=this.activityCount:"";
          } else if (type == 4) {
            this.modelList = res.result;
            this.modelCount = parseInt(res.count);
            flag?this.totalCount=this.modelCount:"";
          }
        })
        .catch(err => {});
    },
    //写一个函数给子组件调用以更新列表
    //接收一个type即可
    timeToGet(type) {
      switch (type) {
        case "店铺":
          //店铺
          this.getCollect(1, 9, 1, 0, null, null,true);
          break;
        case "影棚":
          //影棚
          this.getCollect(1, 8, 1, 1, null, null,true);
          break;
        case "设备":
          //设备
          this.getCollect(1, 8, 1, 2, null, null,true);
          break;
        case "模特":
          //设备
          this.getCollect(1, 8, 1, 4, null, null,true);
          break;
        case "服务":
          //设备
          this.getCollect(1, 8, 1, 4, null, null,true);
          break;
      }
    },
    clickEquip() {
      this.totalCount=0;
      this.$router.push({
        path: "/personal/collection/collectequip"
      });
      this.subFlag = false;
      this.getCollect(1, 8, 1, 2, null, null,true);
    },
    clickStudio() {
      this.totalCount=0;
      this.$router.push({
        path: "/personal/collection/collectstudio"
      });
      this.subFlag = true;
      this.getCollect(1, 8, 1, 1, null, null,true);
    },
    //获得高亮的一级菜单的type
    //选择一级菜单
    mySelectNav(nav) {
      this.$router.push(nav.path);
      nav.isActive = true;
    },
    //根据路由判断显示那个模块方法kldjsfhsdjkfhdsjfhkjdhfjdsfkjdsjkfjdk
    showPageByRoute() {
      this.navArr.forEach(item => {
        item.isActive = false;
      });
      //获取路由地址
      let path = this.$route.name;
      switch (path) {
        case "CollectStore":
          this.navArr[1].isActive = true;
          this.page_size = 9;
          this.getCollect(1, this.page_size, 1, 0, null, this.searchText,true);
          this.placeword = "请输入店铺名称";
          console.log("店铺");
          console.log(this.totalCount);
          break;
        case "CollectStudio":
          this.navArr[0].isActive = true;
          this.page_size = 8;
          this.subFlag = true;
          this.getCollect(1, this.page_size, 1, 1, null, this.searchText,true);
          this.placeword = "请输入影棚名称";
          console.log("影棚");
          break;
        case "CollectEquip":
          this.navArr[0].isActive = true;
          this.page_size = 8;
          this.subFlag = false;
          this.getCollect(1, this.page_size, 1, 2, null, this.searchText,true);
          this.placeword = "请输入器材名称";
          // this.totalCount = this.equipCount;
          console.log("器材");
          break;
        case "CollectActivity":
          this.navArr[2].isActive = true;
          this.page_size = 3;
          this.getCollect(1, this.page_size, 1, 3, null, this.searchText,true);
          this.placeword = "请输入活动名称";
          break;
        case "CollectModel":
          this.navArr[3].isActive = true;
          this.page_size = 8;
          this.getCollect(1, this.page_size, 1, 4, null, this.searchText,true);
          this.placeword = "请输入模特姓名";
          break;
        case "CollectServer":
          this.navArr[4].isActive = true;
          this.page_size = 3;
          this.getCollect(1, this.page_size, 1, 3, null, this.searchText,true);
          this.placeword = "请输入服务名称";
          break;
        // case "CollectCourse":
        //   this.navArr[3].isActive = true;
        //   this.placeword = "请输入课程名称";
        //   break;
      }
    }
  },
  watch: {
    $route: function(to, from) {
      this.showPageByRoute();
      if (this.$route.name === "CollectStudio") {
        this.placeword = "请输入影棚名称";
      } else if (this.$route.name === "CollectEquip") {
        this.placeword = "请输入器材名称";
      } else if(this.$route.name==="CollectStore"){
        this.placeword = "请输入店铺名称";
      }else if(this.$route.name==="CollectActivity"){
        this.placeword = "请输入活动名称";
      }else if(this.$route.name==="CollectModel"){
        this.placeword = "请输入模特名称";
      }else if(this.$route.name==="CollectServer"){
        this.placeword = "请输入服务名称";
      }
    },
    isBatch(val) {}
  },
  computed: {
    activeType() {
      let itm = this.navArr.filter(item => {
        return item.isActive == true;
      });
      return itm[0].type;
    }
  },
  beforeRouteLeave(to, from, next) {
    this.isBatch = false;
    next();
  }
};
</script>

<style lang="scss" scoped>
.container {
  .top-nav {
    display: flex;
    justify-content: flex-start;
    background-color: #fff;
    div {
      cursor: pointer;
      line-height: 60px;
      text-align: center;
      height: 60px;
      font-size: 0;
      margin-left: 20px;
      span {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        padding: 5px 0;
      }
      &:hover{
        span {
          color: $Theme-color;
          &:nth-child(1) {
            border-bottom: 1px solid $Theme-color;
          }
        }
      }
      &.active {
        span {
          color: $Theme-color;
          &:nth-child(1) {
            border-bottom: 1px solid $Theme-color;
          }
        }
      }
    }
  }
  .subMenu {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    height: 60px;
    padding: 12px 20px;
    align-items: center;
    .subStudio {
      margin-left: 12px;
      width: 25%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        width: 45%;
        text-align: center;
        height: 36px;
        padding-top: 8px;
        cursor: pointer;
        &.active {
          background-color: $Theme-color;
          color: #fff;
        }
        &:hover {
          background-color: $Theme-color;
          color: #fff;
        }
      }
    }
    .subStore {
      // margin-top: 20px;
      margin-top: 0;
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      height: 60px;
      padding: 12px;
      .subLeft {
        background-color: $Theme-color;
        color: #fff;
        width: 104px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        cursor: default;
      }
    }
    .subActivity{
       // margin-top: 20px;
      margin-top: 0;
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      height: 60px;
      padding: 12px;
      div {
        background-color: $Theme-color;
        color: #fff;
        width: 104px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        cursor: default;
      }
    }
    .subRight {
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      width: 50%;
      height: 100%;
      position: relative;
      .batch {
        position: absolute;
        right: 230px;
        top: 0;
        width: 84px;
        height: 100%;
        text-align: center;
        padding-top: 8px;
        cursor: pointer;
        border: 1px solid rgba(217, 217, 217, 1);
        user-select: none;
        &:hover{
          color:$Theme-color;
        }
      }
      .search {
        position: absolute;
        right: 10px;
        top: 0;
        width: 200px;
        height: 100%;
        display: flex;
        border: 1px solid rgba(217, 217, 217, 1);
        input {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          border: none;
          padding-left: 10px;
        }
        div {
          border-left: 1px solid rgba(217, 217, 217, 1);
          text-align: center;
          width: 45px;
          padding-top: 7px;
          cursor: pointer;
          &:hover {
            color: $Theme-color;
          }
          i {
            margin: auto;
          }
        }
      }
      .del {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 340px;
        height: 100%;
        text-align: center;
        padding-top: 9px;
        i {
          margin-right: 7px;
        }
        &:hover {
          color: $Theme-color;
        }
      }
      /deep/ .el-checkbox {
        // display: block;
        height: 100%;
        position: absolute;
        top: 0;
        right: 410px;
        padding-top: 9px;
      }
    }
  }
}
/deep/ .el-divider--horizontal {
  margin: 0;
}
</style>
