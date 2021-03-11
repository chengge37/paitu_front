<!--  -->
<template>
  <div>
    <!--全部列表表格-->
    <el-table
      :data="list"
      v-loading="listLoading"
      element-loading-text="Loading"
      fit
      :header-cell-style="{background:'#F5F8FE',color:'#606266'}"
      class="table-control"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column align="center" type="index" label="序号" width="95"></el-table-column>
      <el-table-column align="center" label="时间">
        <template slot-scope="scope">{{scope.row.date}}</template>
      </el-table-column>
      <el-table-column align="center" label="类别">
        <template slot-scope="scope">{{scope.row.is_in | formatInOrOut}}</template>
      </el-table-column>
      <el-table-column align="center" prop="type_name" label="类型"></el-table-column>
      <el-table-column align="center" prop="money" label="金额"></el-table-column>
      <el-table-column align="center" prop="sn_no" label="收入单号/支出收据"></el-table-column>
      <el-table-column align="center" prop="content" label="收入/支出明细"></el-table-column>
      <el-table-column align="center" prop="created_at" width="180" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="detail(scope.row.id,scope.row,'3')">修改</el-button>
          <el-button type="text" @click="delFinance(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页模块-->
    <el-pagination
      background
      style="text-align: right;"
      @current-change="loadList"
      :current-page.sync="getListParameter.page"
      :page-size="getListParameter.page_size"
      layout="total, prev, pager, next"
      :total="listTotalCount"
    ></el-pagination>
  </div>
</template>

<script>
import { finance } from "@config/api.js";
export default {
  data: () => ({
    list: [],
    listLoading: false,
    getListParameter: {
      page: 1,
      page_size: 10, //TODO For test pagination
      start_date: null,
      end_date: null
    },
    listTotalCount: 0
  }),

  components: {},

  created() {},

  mounted() {
    this.loadList();
  },

  methods: {
    loadList() {
      this.listLoading = true;
      let params={
	      	page: this.getListParameter.page,
	      	page_size: this.getListParameter.page_size, //TODO For test pagination
      }
      console.log('params-------------',params);
			this.util.getFinanceList(params).then(res=>{
      	console.log('allList---loadList----',res);
      	this.listLoading=false;
      	this.list=res.rows
      	this.listTotalCount=parseInt(res.total_count);
      },(err)=>{
        this.listLoading=false;
      })
    },
    detail(index, item = {}, status = 0) {
      console.log("allList---detail----", index, item);
      this.$parent.detail(index, item, status);
    },
    //删除收入/支出方法
    delFinance(id){
    	this.util.confirm(this).then(() => {
					this.util.delFinance(id).then(res=>{
						this.$message.success("删除数据成功！");
						this.loadList();
					})
      });
    }
  }
};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
</style>