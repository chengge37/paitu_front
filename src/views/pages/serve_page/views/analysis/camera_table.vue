<template>
  <div>
    <el-row>
      <AnalysisHead
        :type="2"
        @selectTab="selectTab"
        @handleFresh="handleFresh"
        @selectTime="selectTime"
        @selectTimeRange="selectTimeRange"
        @clickPurpleBtn="clickPurpleBtn"
        @clickSearch="clickSearch"
        @clickAttr="clickAttr"
      ></AnalysisHead>
    </el-row>
    <el-row>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="名称" width="220"></el-table-column>
        <el-table-column prop="detail.rent_count" label="租借次数" width="180"></el-table-column>
        <el-table-column prop="detail.close_rate" label="成交率"></el-table-column>
        <el-table-column prop="detail.sales_volume" label="销售额"></el-table-column>
        <el-table-column prop="detail.rent_total_count" label="租借时长"></el-table-column>
        <el-table-column prop="detail.rent_rate" label="租借率"></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
import AnalysisHead from "../../components/AnalysisHead/index";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["user_data"])
  },
  data() {
    return {
      tableData: [
        {
          name: "佳能龙腾相机人像摄影专用",
          detail: {
            rent_count: 123,
            close_rate: "95%",
            sales_volume: 7545,
            rent_total_count: 231,
            rent_rate: "12%"
          }
        },
        {
          name: "佳能龙腾相机人像摄影专用",
          detail: {
            rent_count: 123,
            close_rate: "95%",
            sales_volume: 7545,
            rent_total_hour: 231,
            rent_rate: "12%"
          }
        }
      ]
    };
  },
  methods: {
    // 选择器材或者影棚
    selectTab() {
      console.warn("选择器材数据或者影棚数据");
    },
    // 刷新
    handleFresh() {
      console.warn("刷新");
    },
    // 点击昨日今日上周...
    selectTime() {
      console.warn("点击昨日今日上周");
    },
    // 选择日期范围
    selectTimeRange() {
      console.warn("选择日期范围");
    },
    // 查看列表
    clickPurpleBtn() {
      console.warn("查看列表");
    },
    // 查找
    clickSearch() {
      console.warn("查找");
    },
    // 点击租借次数，成交
    clickAttr() {
      console.warn("点击租借次数，成交");
    }
  },
  components: {
    AnalysisHead
  }
};
</script>
<style lang="scss">
</style>