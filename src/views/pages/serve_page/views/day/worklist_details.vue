<!--  -->
<template>
  <div class="app-container">
    <div class="top-nav">
      <div class="top-title">
        <div class="left-text" @click="back">工作列表</div>>>>
        <div class="right-text">{{isEdit?`查看详情`:`修改详情`}}</div>
      </div>
      <div @click="back" class="back">
        <ali-svg-icon icon-class="back" class-name="back-one"></ali-svg-icon>
        <ali-svg-icon icon-class="back" class-name="back-two"></ali-svg-icon>
        <span>返回</span>
      </div>
    </div>
    <div class="line"></div>
    <el-card>
      <div class="info-set">
        <div class="info-icon"></div>
        <div class="info-title">工作信息</div>
      </div>
      <div class="form-box">
        <el-form ref="form" :model="worklist" label-width="80px">
          <el-row>
            <el-col :span="10">
              <el-form-item label="工作名称" style="width:calc(100% + 300px)">
                <el-input v-model="worklist.name" :disabled="isEdit"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="short-input">
            <el-col :span="10">
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="worklist.start_time"
                  type="date"
                  placeholder="选择日期"
                  :disabled="isEdit"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10" class="input-num">
              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="worklist.end_time"
                  type="date"
                  placeholder="选择日期"
                  :disabled="isEdit"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row class="short-input">
            <el-col :span="10">
              <el-form-item label="工作人员">
                <el-select v-model="worklist.workname" placeholder="请选择" :disabled="isEdit">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10" class="input-num">
              <el-form-item label="所属部门">
                <el-select :disabled="isEdit" v-model="worklist.work" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>-->
          <el-row>
            <el-col :span="10">
              <el-form-item label="人员名单" class="table">
                <el-table
                  :data="worklist.employee_array"
                  :header-cell-style="{background:'#F5F8FE',color:'#606266'}"
                  border
                >
                  <el-table-column type="index" label="序号" width="80"></el-table-column>
                  <el-table-column label="姓名">
                    <template slot-scope="scope">
                      <!-- <input type="text" v-model="scope.row.name" :disabled="isEdit"> -->
                      <span>{{scope.row.name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="部门">
                    <template slot-scope="scope">
                      <!-- <input type="text" v-model="scope.row.phone" :disabled="isEdit"> -->
                      <span>{{scope.row.name}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="工作备注" style="width:calc(100% + 300px)">
                <el-input
                  v-model="worklist.remark"
                  type="textarea"
                  :autosize="{ minRows: 6}"
                  :disabled="isEdit"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <div class="bottom-button button-set">
      <div v-if="!isEdit">
        <el-button @click="isEdit = !isEdit">取消</el-button>
        <el-button type="primary" @click="confirm" :loading="is_loading" :disabled="is_loading">确定</el-button>
      </div>
      <el-button type="primary" v-else @click="isEdit = !isEdit">修改</el-button>
    </div>
  </div>
</template>

<script>
import { day } from "@/config/api";
export default {
  data: () => ({
    isEdit: Boolean,
    worklist: null,
    is_loading:false
  }),

  components: {},

  mounted() {},
  created() {
    console.log(this.$store.state.day);
    this.isEdit = this.$store.state.day.day_page_data.Noedit;
    this.worklist = JSON.parse(
      decodeURIComponent(this.$store.state.day.day_page_data.data)
    );
  },

  methods: {
    back() {
      this.$store.dispatch("DayOutPage").then(() => {
        this.$router.back(-1);
      });
    },
    confirm() {
      this.is_loading = true
      let data = {
        id: this.worklist.id,
        start_time: this.worklist.start_time,
        end_time: this.worklist.end_time,
        remark: this.worklist.remark,
        name: this.worklist.name,
        employee_id_array_str: this.worklist.employee_name_array
      };
      this.postRequest(day.serve_edit_job, data)
        .then(res => {
          this.is_loading = false
          if (res == this.worklist.id) {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.back();
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import '@/assets/css/color.scss';
.top-nav {
  justify-content: space-between;
  .top-title {
    padding-top: 35px;
    font-size: 20px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    display: flex;
    .left-text {
      cursor: pointer;
      margin-right: 20px;
    }
    .right-text {
      padding-bottom: 20px;
      margin-left: 20px;
      border-bottom: 4px solid $Theme-color;
    }
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
.form-box {
  .short-input /deep/ .el-input {
    width: 220px;
  }
  .table {
    width: calc(100% + 300px);
    input {
      background: none;
      outline: none;
      border: 0px;
      height: 40px;
      width: 80%;
    }
    .dele {
      width: 100%;
      height: 100%;
    }
  }
  .table /deep/ .el-table th {
    padding: 0;
  }
  .table /deep/ .el-table__body {
    height: 50px;
  }
}
.button-set {
  margin-top: 14px;
}
</style>