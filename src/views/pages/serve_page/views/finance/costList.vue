<!--  -->
<template>
	<div>
		<!--支出列表表格-->
		<el-table :data="list" v-loading="listLoading" element-loading-text="Loading" fit :header-cell-style="{background:'#F5F8FE',color:'#606266'}" class="table-control">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column align="center" type="index" label="序号" width="95"></el-table-column>
			<el-table-column align="center" prop="date" label="时间"></el-table-column>
			<el-table-column align="center" label="类别">
				<template slot-scope="scope">{{scope.row.is_in | formatInOrOut}}</template>
			</el-table-column>
			<el-table-column align="center" prop="type_name" label="类型"></el-table-column>
			<el-table-column align="center" prop="money" label="金额"></el-table-column>
			<el-table-column align="center" prop="sn_no" label="支出收据"></el-table-column>
			<el-table-column align="center" prop="content" label="支出明细"></el-table-column>
			<el-table-column align="center" prop="status" label="状态">
				<template slot-scope="scope">
					<span v-if="scope.row.type_id==5">{{scope.row.status==0?'待审核':'已审核'}}</span>
					<span v-if="scope.row.type_id!=5">-</span>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="created_at" width="180" label="操作">
				<template slot-scope="scope">
					<!--<el-button type="text" @click="detail(scope.$index,scope.row,3)">详情</el-button>
					<el-button type="text" @click="detail(scope.$index,scope.row,4)">修改</el-button>-->
					<el-button type="text" @click="detail(scope.row.id,scope.row,'3')">修改</el-button>
					<el-button type="text" @click="delFinance(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--分页模块-->
		<el-pagination background layout="prev, pager, next" @current-change="loadList" :current-page.sync="listParams.page" :total="listParams.total" style="text-align: right;" v-show="list.length > 0">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data: () => ({
			list: [],
			listLoading: true,
			listParams: {
				page: 1,
				pageSize: 10,
				total: 0
			},
			dateStart: '',
			dateEnd: '',
		}),

		components: {},

		watch: {
			"$parent.selectType": function(to, from) {
				this.listParams.page = 1;
				this.loadList();
			},
			"$parent.selectFinanceType":function(to,from){
				this.listParams.page = 1;
				this.loadList();
			},
			"$parent.dateValue": function(to, from) {
				console.log('incomeList-----------changeDate----------', to);
				if(to) {
					this.dateStart = to[0];
					this.dateEnd = to[1];
				} else {
					this.dateStart = '';
					this.dateEnd = '';
				}
				this.listParams.page = 1;
				this.loadList();
			}
		},

		mounted() {
			this.loadList();
		},

		methods: {
			//加载列表数据
			loadList() {
				let params = {
					is_in: 0,
					page: this.listParams.page,
					page_size: this.listParams.pageSize,
					order_by:'date',
					order:'desc'
				};
				if(this.dateStart) {
					params.start_date = this.dateStart;
					params.end_date = this.dateEnd;
				}
				let type = this.$parent.selectType;
				switch(parseInt(type)) {
					case 0:
						break;
					case 1:
						params.type_array = [5];
						break;
					case 2:
						params.type_array = [1,2,3,4];
						break;
				}
				let financeType=this.$parent.selectFinanceType;
				if(financeType!=0){
					params.type_array=[financeType];
				}
				console.log('params----------', params);
				this.util.getFinanceList(params).then(res => {
					console.log('incomeList-----loadList----', res);
					this.listParams.total = parseInt(res.total_count);
					this.$parent.costTotal=res.money_count;
					console.log('this.$parent.costTotal-----------',this.$parent.costTotal);
					this.list = res.rows;
					this.listLoading = false;
				})
			},
			detail(index, item = {}, status = 0) {
				this.$parent.detail(index, item, status);
			},
			//删除收入/支出方法
			delFinance(id) {
				this.util.confirm(this).then(() => {
					this.util.delFinance(id).then(res => {
						this.$message.success("删除数据成功！");
						this.loadList();
					})
				});
			}
		}
	}
</script>
<style rel='stylesheet/scss' lang='scss' scoped>

</style>