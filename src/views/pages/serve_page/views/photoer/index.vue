<template>
  <div class="newServe">
    <el-button type="primary" @click="addProduct" class="incomeBtn">添加服务</el-button>
    <el-table :data="productList" border>
      <el-table-column prop="id" label="id" width="80"></el-table-column>
      <el-table-column prop='create_time' label='创建时间'>
        <template slot-scope="scope">
          {{scope.row.create_time|time2FullDate}}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column label="图片" align="center" width='100'>
			<template slot-scope="{row}">
				<el-image style="width:60px; height: 60px" :src="util.picExplode(row.pic)" fit="contain"></el-image>
			</template>
		</el-table-column>
      <el-table-column prop="category_name" label="分类"></el-table-column>
      <el-table-column prop="parent_category_name" label="所属父类"></el-table-column>
      <el-table-column label='规格数'>
        <template slot-scope="scope">
          {{scope.row.norms.length}}
        </template>
      </el-table-column>
			<!-- 图片 -->
      <el-table-column label='审核状态'>
        <template slot-scope="scope">
          {{scope.row.valid=='0'?'未审核':scope.row.valid=='1'?'审核通过':'审核未通过'}}
        </template>
      </el-table-column>
      <el-table-column label='审核信息' prop='valid_msg'></el-table-column>
			<el-table-column label='操作'>
				<template slot-scope="scope">
					<el-button type='text' @click='toDetail(scope.row.id)'>详情</el-button>
					<el-button type='text' @click='edit(scope.row.id)'>修改</el-button>
					<el-button type='text' @click='del(scope.row.id)'>删除</el-button>
				</template>
			</el-table-column>
    </el-table>
    
    <!--分页模块-->
	<pagination :total="total" :page="page" :pagesize="page_size" @getPageNum="changePage" class="pagination"></pagination>
    
  </div>
</template>

<script>
import searchBox from "ServeComponents/searchBox";
import pagination from "FrontComponents/pagination";
export default {
  data() {
    return {
      searchText: "", //搜索的内容
      page: 1,
      page_size: 10,
      total: 0,
      productList: []
    };
  },

  components: {
    searchBox,
    pagination
  },

  created() {
    this.getProdyctList();
    console.log('---------------------');
    console.log(this.$router);
    console.log('---------------------');
  },

  mounted() {},

  methods: {
    //获取服务列表
    getProdyctList() {
      this.getRequest("service/serviceGet",{}).then(res => {
        console.log(res.rows, "kscj");
        this.productList = res.rows;
        this.total=res.total_count;
      });
    },
    //跳转到添加服务页面（详情）
    addProduct() {
      this.$router.push({
        path: "/serve/manage/serviceDetail"
      });
    },
    toDetail(id){
      this.$router.push({
        path: "/serve/manage/serviceDetail",
        query:{id,type:'detail'}
      });
    },
    edit(id){
      this.$router.push({
        path: "/serve/manage/serviceDetail",
        query:{id,type:'edit'}
      });
    },
    del(id){
      this.$confirm('确认删除？').then(()=>{
        this.postRequest('service/serviceDel',{id}).then(res=>{
        console.log(res);
        this.$message.success('删除成功')
        this.getProdyctList()
      })
      })
    },
    
    changePage(val) {
			this.page = val;
			this.getProdyctList();
	},
    
    
  }
};
</script>
<style lang='scss' scoped>
.page {
  display: flex;
  justify-content: flex-end;
  .el-pagination {
    padding-right: 0;
  }
}
</style>