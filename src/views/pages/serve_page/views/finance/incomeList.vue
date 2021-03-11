<!--  -->
<template>
	<div>
		<!--支出列表表格-->
		<!--支出列表表格-->
		<el-table :data="list" v-loading="listLoading" element-loading-text="Loading" fit :header-cell-style="{background:'#F5F8FE',color:'#606266'}" class="table-control">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column align="center" type="index" label="序号" width="95"></el-table-column>
			<el-table-column align="center" prop="date" label="时间"></el-table-column>
			<el-table-column align="center" label="类别">
				<template slot-scope="scope">{{scope.row.is_in | formatInOrOut}}</template>
			</el-table-column>
			<!--<el-table-column align="center" prop="type_name" label="类型"></el-table-column>-->
			<el-table-column align="center" prop="type_name" label="类型">
				<template slot-scope="scope">
					<span @click="toOrderDetail(scope.row)" class="word-hover cursor" v-if="scope.row.type_id==8 || scope.row.type_id==9 || scope.row.type_id==10">
						{{scope.row.type_name}}
					</span>
					<span v-else>{{scope.row.type_name}}</span>
				</template>
			</el-table-column>
			<!--<el-table-column prop="job" label="职务">
				<template slot="header" slot-scope="scope">
					<el-dropdown trigger="click" @command="handleCommand" size="mini">
						<span class="cursor">
				            类型<i class="el-icon-arrow-down el-icon--right"></i>
				          </span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item v-for="(item,index) in typeList" :key="index" :command="item.value">
								{{item.label}}
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
				<template slot-scope="scope">
					{{scope.row.type_name}}
				</template>
			</el-table-column>-->
			<el-table-column align="center" prop="money" label="金额"></el-table-column>
			<el-table-column align="center" prop="sn_no" label="收入单号"></el-table-column>
			<el-table-column align="center" prop="content" label="收入明细"></el-table-column>
			<el-table-column align="center" prop="created_at" width="180" label="操作">
				<template slot-scope="scope">
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
			listLoading: false,
			dateStart: '',
			dateEnd: '',
			listParams: {
				page: 1,
				pageSize: 10,
				total: 0
			},
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
			handleCommand(command) {
		       console.log('command--------------',command);
		   },
			//加载列表数据
			loadList() {
				let params = {
					is_in: 1,
					page: this.listParams.page,
					page_size: this.listParams.pageSize,
					order_by:'date',
					order:'desc'   //倒序
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
						params.type_array = [8, 9, 10];
						break;
					case 2:
						params.type_array = [11, 12, 13];
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
					this.$parent.incomeTotal=res.money_count;
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
			},
			//跳转到订单详情页面
			toOrderDetail(item){
				console.log('item------------------',item);
				if(item.id==8 || item.id==9){
					this.util.toServerOrderDetail(item.id);
				}else if(item.id==10){
					this.util.toServerActivityDetail(item.id);
				}
			},
		}
	}
</script>
<style rel='stylesheet/scss' lang='scss' scoped>

</style>