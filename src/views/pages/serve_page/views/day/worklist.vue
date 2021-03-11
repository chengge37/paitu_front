<!--  -->
<template>
  <div class="app-container">
    <div class="top-nav">
      <div class="top-title">工作列表</div>
      <div @click="back" class="back">
        <ali-svg-icon icon-class="back" class-name="back-one"></ali-svg-icon>
        <ali-svg-icon icon-class="back" class-name="back-two"></ali-svg-icon>
        <span>返回</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="top-box" v-if="false">
      <div class="top-select">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="top-seach">
        <div class="date-seach">
          按日期筛选
          <el-date-picker v-model="date_seach" type="date" placeholder="选择日期" class="long"></el-date-picker>
        </div>
        <div class="seach-box">
          <div class="seach">
            <div class="icon">
              <ali-svg-icon icon-class="seach"></ali-svg-icon>
            </div>
            <input type="text" placeholder="输入您想查询的内容" class="seach-input" v-model="seach_text" />
          </div>
          <div class="seach-button">搜索</div>
        </div>
      </div>
    </div>
    <el-table
      :data="list"
      v-loading="listLoading"
      element-loading-text="Loading"
      fit
      :header-cell-style="{background:'#F5F8FE',color:'#333333'}"
      class="table-control"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column align="center" label="序号" width="50" type="index"></el-table-column>
      <el-table-column label="分配时间" width="160">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.start_time|format_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作名称" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间范围" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.start_time|format_time}}至{{scope.row.end_time|format_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作人员" align="center">
        <template slot-scope="scope">
          <span class="overflow">{{scope.row.employee_name_array}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="工作备注" align="center">
        <template slot-scope="scope">
          <span class="overflow">{{scope.row.remark}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="状态" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.state|workstatus}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" width="180" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="details(scope.row)">详情</el-button>
          <el-button type="text" @click="edit(scope.row)">修改</el-button>
          <el-button type="text" @click="dele(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="total_count"
      style="text-align: right;"
    ></el-pagination>
  </div>
</template>

<script>
import { format } from "date-fns";
import { day } from "@/config/api";
export default {
  data: () => ({
    value: "",
    seach_text: "",
    date_seach: "",
    options: [
      {
        value: "1",
        label: "进行中"
      },
      {
        value: "2",
        label: "未启动"
      },
      {
        value: "3",
        label: "已结束"
      }
    ],
    listLoading: false,
    list: [],
    list_date: null,
    total_count: 0
  }),

  components: {},
  created() {
    this.list_date = this.$route.query;
    this.init();
  },
  mounted() {},

  methods: {
    back() {
      this.$router.back(-1);
    },
    details(data) {
      console.log(data);
      let Qdata = {
        Noedit: true,
        data: encodeURIComponent(JSON.stringify(data))
      };
      let path = "/serve/day_set/worklist_details";
      this.openPage(path, Qdata);
    },
    edit(data) {
      let Qdata = {
        Noedit: false,
        data: encodeURIComponent(JSON.stringify(data))
      };
      let path = "/serve/day_set/worklist_details";
      this.openPage(path, Qdata);
    },
    dele(data) {
      console.log(data);
      let params = {
        id: data
      };
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.postRequest(day.serve_dele_job, params)
          .then(res => {
            if (res === data) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });

              this.list.splice(data, 1);
            } else {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
            }
          })
          .catch(err => {});
      });
    },
    openPage(path, Qdata) {
      this.$store.dispatch("DayOpenNext", Qdata).then(() => {
        this.$router.push({ path: path });
      });
    },
    handleCurrentChange(e) {
      this.list_date.page = e;
      this.init();
    },
    init() {
      let myreg = /^[1-9]\d*$/;
      this.getRequest(day.serve_get_job, this.list_date)
        .then(res => {
          this.list = res.rows;
          this.total_count = res.total_count;
          this.list.forEach((item, index) => {
            if (
              !myreg.test(
                new Date(item.start_time).getTime() - new Date().getTime()
              ) &&
              myreg.test(
                new Date(item.end_time).getTime() - new Date().getTime()
              )
            ) {
              this.list[index]["state"] = 1;
            } else if (
              !myreg.test(
                new Date(item.end_time).getTime() - new Date().getTime()
              )
            ) {
              this.list[index]["state"] = 3;
            } else {
              this.list[index]["state"] = 2;
            }
          });
        })
        .catch(err => {});
    }
  },
  filters: {
    format_time(data) {
      return format(data, "YYYY-MM-DD");
    },
    workstatus(status) {
      const statusMap = {
        1: "进行中",
        2: "未启动",
        3: "已结束"
      };
      return statusMap[status];
    }
  }
};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import '@/assets/css/color.scss';
.top-nav {
  justify-content: space-between;
  .top-title {
    padding-bottom: 20px;
    padding-top: 35px;
    font-size: 20px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    border-bottom: 4px solid $Theme-color;
  }
  .back {
    cursor: pointer;
    .back-one {
      margin-right: -26px;
    }
    .back-two {
      margin-right: 2px;
    }
  }
}
.top-box {
  display: flex;
  margin-bottom: 20px;
  .top-select {
    flex: 1;
  }
  .top-select /deep/ .el-select {
    width: 100px;
  }
  .top-seach {
    flex: 1;
    display: flex;
    justify-content: flex-end;

    .date-seach {
      .long {
        width: 150px;
        margin-left: 23px;
      }
    }

    .seach-box {
      margin-left: 25px;
      display: flex;
      .seach {
        display: flex;
        height: 38px;
        align-items: center;
        border: 1px solid #dcdfe6;
        border-radius: 2px 0 0 2px;
        background-color: #fff;
        .icon {
          width: 14px;
          height: 14px;
          margin: 12px 5px 12px 5px;
        }
        .seach-input {
          border: none;
          outline: medium;
          background-color: #ffffff;
          height: 30px;
          font-size: 14px;
        }
      }
      .seach-button {
        width: 54px;
        height: 38px;
        line-height: 38px;
        background-color: #3a7f9f;
        text-align: center;
        color: #fff;
        border-radius: 0px 2px 2px 0px;
        cursor: pointer;
      }
      .seach-button:active {
        background-color: #2c637c;
      }
    }
  }
}
.overflow {
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: nowrap; /*规定段落中的文本不进行换行 */
  width: 190px;
}
</style>