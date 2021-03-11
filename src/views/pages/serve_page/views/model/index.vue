<!--  -->
<template>
  <div class="newServe">
    <div class="mainInfo">
      <!-- 头部 -->
      <header>
        <div class="time-range">
          <span>按日期筛选：</span>
          <el-date-picker
            @change="changeDate"
            v-model="timeRange"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <!-- 影棚搜索框 -->
        <search-box @change="search" placeholder="输入模特名称"></search-box>
        <span class="up-put" @click="operate('1')">批量上架</span>
        <span class="down-put" @click="operate('0')">批量下架</span>
        <!-- 添加模特按钮 -->
        <el-button type="primary" class="add-button" @click="toModelDetails">
          <i class="el-icon-plus"></i>
          <span class="word">新增模特</span>
        </el-button>
        <!--<span class="group-del">批量删除</span>-->
      </header>

      <!-- 模特列表 -->
      <el-table
        ref="multipleTable"
        :row-key="getRowKey"
        :data="ModelList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="tblLoading"
      >
        <el-table-column type="selection" :reserve-selection="true" width="45"></el-table-column>

        <el-table-column label="自定义名称" sortable align="center">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>

        <el-table-column label="名字" sortable align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.real_name }}</template>
        </el-table-column>

        <el-table-column label="头像" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-image class="header-img" :src="$qiniuHost+scope.row.header_pic" fit="scale-down"></el-image>
          </template>
        </el-table-column>

        <el-table-column label="性别" align="center">
          <template slot-scope="scope">{{ scope.row.sex=="1"?"男":"女" }}</template>
        </el-table-column>

        <el-table-column label="添加日期" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.create_time|time2Date }}</template>
        </el-table-column>

        <el-table-column label="接单总量" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.total }}</template>
        </el-table-column>
        <!-- 在岗还是休假 -->
        <el-table-column align="center" show-overflow-tooltip>
          <template v-slot:header>
            <el-dropdown @command="ChangeAllState">
              <span class="el-dropdown-link cursor">
                {{AllState}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in AllStateArray"
                  :key="item.value"
                  :command="item.value"
                >{{item.label}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template slot-scope="scope">{{ scope.row.is_work == "1"?"在岗":"休假" }}</template>
        </el-table-column>

        <!-- <el-table-column label="近七天接单情况" align="center">
          <template slot-scope="scope">{{ scope.row.day_7}}</template>
        </el-table-column>-->
        <!-- 上下架 -->
        <el-table-column align="center" show-overflow-tooltip>
          <template v-slot:header>
            <el-dropdown @command="ChangeAllState">
              <span class="el-dropdown-link cursor">
                {{AllUpState}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in AllUpStateArray"
                  :key="item.value"
                  :command="item.value"
                >{{item.label}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template slot-scope="scope">{{ scope.row.is_up == "1"?"上架":"下架" }}</template>
        </el-table-column>

        <el-table-column align="center">
          <template v-slot:header>
            <el-dropdown @command="ChangeAllOrderState">
              <span class="el-dropdown-link cursor">
                {{AllOrderState}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in AllOrderStateArray"
                  :key="item.value"
                  :command="item.value"
                >{{item.label}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <template slot-scope="scope">{{ scope.row.status}}</template>
        </el-table-column>

        <el-table-column label="数据统计" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="statistics(scope.row.id)">数据统计</el-button>
          </template>
        </el-table-column>

        <el-table-column label="联系方式" align="center">
          <template slot-scope="scope">{{ scope.row.mobile}}</template>
        </el-table-column>

        <el-table-column class="operation" label="操作" show-overflow-tooltip width="250">
          <template class="operation-list" slot-scope="{row}">
            <el-button @click="toModelDetail(row.id)" type="text">详情</el-button>
            <el-button @click="toModelEdit(row.id)" type="text">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--分页模块-->
    <pagination
      :total="parseInt(total)"
      :page="parseInt(page)"
      :pagesize="parseInt(pageSize)"
      @getPageNum="changePage"
      class="pagination"
    ></pagination>
    <!--显示模特档期弹窗-->
    <model-days :isShow.sync="isShowModelDays" isServe :id.sync="modelId" @closed="closeModelDays"></model-days>
  </div>
</template>

<script>
import { model } from "@config/api.js";
import { conditionArray } from "@config/config.js";
import { storage } from "@util/storage.js";
import searchBox from "ServeComponents/searchBox";
import pagination from "FrontComponents/pagination";
import modelDays from "FrontComponents/modelDays";
export default {
  data() {
    return {
      modelId: "",
      isShowModelDays: false, //是否显示模特档期
      ModelList: [],
      showFAQlist: false, //是否显示设置问题对话框
      selectId: "", //选择关联的id
      timeRange: "",
      searchText: "", //搜索的内容
      page: 1,
      pageSize: 10,
      total: 0,
      ids: [],
      AllState: "全部状态",
      AllOrderState: "接单状态",
      AllUpState: "上/下架",
      AllOrderStateArray: [
        { value: "-1", label: "今日可接单" },
        { value: "0", label: "明日可接单" },
        { value: "1", label: "本周可接单" },
        { value: "2", label: "休假" },
        { value: "3", label: "订单进行中" }
      ],
      AllStateArray: [
        { value: "0", label: "休假" },
        { value: "1", label: "在岗" },
        { value: null, label: "全部状态" }
      ],
      AllUpStateArray: [
        { value: "1", label: "上架" },
        { value: "0", label: "下架" },
        { value: null, label: "上/下架" }
      ]
    };
  },

  components: {
    searchBox,
    pagination,
    modelDays
  },

  created() {
    console.log(conditionArray, "服务设施静态库");
    this.getModelList();
  },

  mounted() {
    // this.searchList = this.ModelList;
  },

  filters: {},

  methods: {
    statistics(id) {
      this.modelId = id
      this.isShowModelDays = true;

    },
    closeModelDays() {
      this.isShowModelDays = false;
    },
    ChangeUpState(is_up) {
      let UpStateObj = this.AllUpStateArray.filter(item => item.value == is_up);
      this.AllUpState = UpStateObj[0].label;
      let data = { is_up };
      this.getModelList(data);
    },
    ChangeAllState(is_work) {
      let AllStateObj = this.AllStateArray.filter(
        item => item.value == is_work
      );
      this.AllState = AllStateObj[0].label;
      let data = { is_work };
      this.getModelList(data);
    },
    ChangeAllOrderState(command) {
      let AllOrderStateObj = this.AllOrderStateArray.filter(
        item => item.value == command
      );
      this.AllOrderState = AllOrderStateObj[0].label;
    },
    //切换页码方法
    changePage(val) {
      console.log("changePage----------", val);
      this.page = val;
      this.getModelList();
    },

    // 获取影棚列表
    getModelList(data) {
      this.tblLoading = true;
      let _this = this;
      let params = {
        page: this.page,
        page_size: this.pageSize,
        search: this.searchText,
        is_work: data?.is_work || null,
        is_up: data?.is_up || null
      };
      if (this.timeRange) {
        params.st_time = this.timeRange[0];
        params.et_time = this.timeRange[1];
      }
      console.log("getModelList-----------", params);
      this.getRequest(model.GetCompanyModel, params)
        .then(res => {
          this.tblLoading = false;
          console.log(res, "所有影棚信息");
          this.ModelList = res.rows;
          this.total = res.total_count;
        })
        .catch(err => {
          this.tblLoading = false;
        });
    },

    //批量操作方法，0/上架 ，1/下架
    operate(type, item) {
      let ids = "";
      let is_up;
      let title = "";
      if (type == 0) {
        is_up = 0;
        title = "上架";
      } else {
        is_up = 1;
        title = "下架";
      }
      if (!item) {
        if (this.ids.length == 0) {
          this.$message.warning("请选择对应模特");
          return;
        }
        ids = this.ids.join(",");
      } else {
        ids = item.id;
      }

      let params = {
        ids: ids,
        is_up: is_up
      };
      this.util
        .confirm(this, "确定" + title + "吗?")
        .then(res => {
          if (res) {
            this.util.ModelIsUp(params).then(res => {
              this.$message.success("操作成功!");
              this.getModelList();
              console.log("studioShelfIsUp-------", res);
            });
          }
        })
        .catch(error => {});
    },

    // 指定一个key标识这一行的数据,分页记住勾选
    getRowKey(row) {
      return row.id;
    },

    //选择选项方法
    handleSelectionChange(val) {
      this.ids = [];
      val.forEach(item => {
        this.ids.push(item.id);
      });
      console.log("this.ids---", this.ids);
    },

    //选择时间方法
    changeDate() {
      this.getModelList();
    },
    //搜索方法
    search(val) {
      this.searchText = val;
      this.getModelList();
    },
    // 点击添加按钮跳转到影棚详情页面，状态为可添加
    toModelDetails() {
      this.$router.push({
        path: "/serve/manage/modelDetail",
        query: {
          canEdit: true
        }
      });
    },
    // 跳转到影棚详情页，状态为不可编辑
    toModelDetail(id) {
      this.$router.push({
        path: "/serve/manage/modelDetail",
        query: {
          id,
          canEdit: false
        }
      });
    },
    toModelEdit(id) {
      this.$router.push({
        path: "/serve/manage/modelDetail",
        query: {
          id,
          canEdit: true
        }
      });
    },
    // 删除设备
    delStudio(id) {
      this.$confirm("此操作将永久删除该影棚, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.postRequest(studioApi.studioServeDel, {
            id
          })
            .then(res => {
              console.log(res);
              this.getModelList();
            })
            .catch(err => {});
        })
        .catch(() => {});
    },
    filterHandle(value, row) {
      return row.tag === value;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/css/color.scss";
// 头部
header {
  height: 73px;
  display: flex;
  align-items: center;
  padding: 0 10px 0 30px;
  .time-range {
    margin-right: auto;
    .el-date-editor {
      width: 250px;
      /deep/ {
        .el-range-separator {
          margin-right: 10px;
        }
      }
    }
  }
  // 添加按钮
  .add-button {
    width: 117px;
    height: 34px;
    background-color: $Theme-color;
    border-radius: 2px;
    color: #fff;
    margin-right: 20px;
    .el-icon-plus {
      width: 14px;
      height: 14px;
    }
    .word {
      font-size: 14px;
      margin-left: 0px;
    }
  }
  .search-box {
    margin-right: 20px;
  }
  // 搜索输入框
  .search {
    border: 1px solid #ccc;
    display: flex;
    height: 34px;
    border-radius: 2px;
    margin-right: 20px;
    input {
      height: 100%;
      outline: none;
      border: none;
      text-indent: 1em;
    }
    .el-icon-search {
      background: #fff;
      display: flex;
      align-items: center;
      padding: 5px;
      box-sizing: border-box;
    }
    .search-button {
      background-color: $Theme-color;
      border-radius: 0;
      color: #fff;
      border: none;
    }
  }
  .up-put {
    width: 76px;
    height: 34px;
    background: #7c6aff;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
  }
  .down-put {
    width: 76px;
    height: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    border: 1px solid #d9d9d9;
    color: #999;
    cursor: pointer;
  }
  .group-del {
    width: 76px;
    height: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    border: 1px solid #d9d9d9;
    color: #999;
    cursor: pointer;
  }
}

// 影棚列表
.studio-table {
  background: #fff;
  padding: 10px;
  border: 1px solid #eee;
  border: none;
  /*min-height: 700px;*/
  .el-table {
    border: none;
    border-radius: 0;
    /deep/ {
      .el-table__row {
        height: 50px;
        .cell {
          padding: 0 7px;
        }
      }
      .el-table__header {
        thead {
          tr {
            th {
              background: #f0faff !important;
            }
          }
        }
      }
    }
  }
}
.header-img {
  width: 60px;
  height: 60px;
}

// 分页
.page {
  display: flex;
  justify-content: flex-end;
  .el-pagination {
    padding-right: 0;
  }
}
</style>