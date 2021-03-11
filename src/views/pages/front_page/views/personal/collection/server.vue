<template>
  <div class="container">
    <el-divider></el-divider>
    <div class="activityWraper" v-if="activityList.length>0">
      <div
        class="activity cursor"
        v-for="(item,index) in activityList"
        :key="index"
        :class="{isBatch:activityBatch}"
        @click="toActivity(item.id)"
      >
        <div class="images">
          <!--<img :src="util.qiniuAddress+item.pic" :onerror="util.errorPic" alt />-->
          <el-image style="width:313px;height:240px;" fit="contain" :src="util.picExplode(item.pic)"
					:onerror="util.errorPic" class="cursor"/>
        </div>
        <div class="detail">
          <h1>{{item.name}}</h1>
          <p class="introduction">{{item.brief}}</p>
          <p>费用：{{item.fee>0?item.fee:"免费"}}</p>
          <p>时间：{{handleTime(item.start_time,item.end_time)}}</p>
          <p>地点：{{item.city}}</p>
          <p>举办方：{{item.nick}}</p>
          <div
            class="state"
            :class="getClass(item.start_time,item.end_time)"
          >{{getState(item.start_time,item.end_time)}}</div>
        </div>
        <el-checkbox-group
          v-model="checkedActivitys"
          @change="handleCheckedActivitysChange(item)"
          v-if="activityBatch"
        >
          <el-checkbox :label="item.id"></el-checkbox>
        </el-checkbox-group>
        <div class="shadow" v-if="activityBatch"></div>
      </div>
    </div>
    <div v-else class="nothing">
      <div class="toHome">
        <img src="https://pic.paitume.com/3-1573794931556.png" />
        <div>还没有任何收藏活动~</div>
        <div>
          推荐您去：
          <a @click="toHome">首页</a>逛逛~
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["activityList", "activityBatch", "isAll"],
  data() {
    return {
      checkedActivitys: []
    };
  },
  created() {
    console.log(this.activityList);
  },
  methods: {
    toHome() {
      this.$router.push({
        path: "/"
      });
    },
    toActivity(id) {
      if (!this.activityBatch) {
        this.util.toActivityPage(id);
      }
    },
    handleCheckedActivitysChange() {
      console.log(this.checkedActivitys);
    },
    //传入两个时间，返回yyyy年m月d日-。。。
    handleTime(start, end) {
      let t1 = new Date(start);
      let t1y = t1.getFullYear();
      let t1m = t1.getMonth() + 1;
      let t1d = t1.getDate();
      let t2 = new Date(end);
      let t2y = t2.getFullYear();
      let t2m = t2.getMonth() + 1;
      let t2d = t2.getDate();
      return `${t1y}年${t1m}月${t1d}日-${
        t2y == t1y ? "" : t2y + "年"
      }${t2m}月${t2d}日`;
    },
    getState(start, end) {
      //判断活动的状态
      let t1 = new Date(start).getTime();
      let t2 = new Date(end).getTime();
      let now = new Date().getTime();
      if (now < t1) {
        return "即将开始";
      } else {
        if (now < t2) {
          return "进行中";
        } else {
          return "已结束";
        }
      }
    },
    getClass(s, e) {
      //根据状态改变颜色
      let state = this.getState(s, e);
      switch (state) {
        case "即将开始":
          return { to: true };
          break;
        case "进行中":
          return { on: true };
          break;
        case "已结束":
          return { pass: true };
          break;
      }
    }
  },
  watch: {
    isAll(newVal) {
      this.checkedActivitys = [];
      if (newVal) {
        for (let i = 0; i < this.activityList.length; i++) {
          this.checkedActivitys.push(this.activityList[i].id);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
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
.container {
  background-color: #fff;
  .activityWraper {
    padding: 0 30px;
    .activity {
      //蒙版样式
      position: relative;
      .shadow {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        // width: 920px;
        // height: 242px;
        z-index: 22;
        background-color: rgba(0, 0, 0, 0.3);
      }
      width: 905px;
      height: 242px;
      border: 1px solid rgba(217, 217, 217, 1);
      margin-top: 21px;
      &:hover {
        box-shadow: 0px 0px 18px 0px rgba(5, 5, 5, 0.3);
      }
      display: flex;
      .images {
        height: 240px;
        flex: 3.4;
        img {
          width: 100%;
          height: 100%;
          border: none;
        }
      }
      .detail {
        height: 240px;
        flex: 6.4;
        position: relative;
        color: rgba(51, 51, 51, 1);
        font-family: Microsoft YaHei;
        font-size: 14px;
        font-weight: 400;
        .introduction {
          margin-top: 23px;
          height: 40px;
          padding-right: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-wrap: break-word;
        }
        p {
          margin-left: 40px;
          &:not(:nth-child(2)) {
            margin-top: 12px;
            font-size: 12px;
            height: 12px;
          }
          &:nth-child(3) {
            margin-top: 27px;
          }
        }
        h1 {
          margin-left: 40px;
          margin-top:  24px;
          font-size: 21px;
          height: 28px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .state {
          position: absolute;
          bottom: 16px;
          right: 26px;
          font-size: 14px;
          padding-top: 0;
        }
        .to {
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(255, 86, 0, 1);
        }
        .on {
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(234, 0, 31, 1);
        }
        .pass {
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
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
    }
    .isBatch {
      &:hover {
        box-shadow: none;
      }
    }
  }
}
</style>