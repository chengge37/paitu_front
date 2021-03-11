<template>
	<div class="newServe">
		<div class="mainInfo">
			<!-- 头部 -->
			<div class="top">
				<!-- 添加设备按钮 -->
				<div>
					<el-button icon="el-icon-plus" class="incomeBtn" type="primary" @click="toAddAssistant('0')">添加助理</el-button>
					<!--<el-button type="text" @click="downTable('exportTable')" style="color:#333;" class='word-hover'>导出表格</el-button>-->
				</div>
			</div>

			<!-- 设备列表 -->
			<div class="device-table">
				<el-table ref="multipleTable" :data="assistantList" tooltip-effect="dark" v-loading="tblLoading">

					<el-table-column label="序号" width="55">
						<template slot-scope="scope">{{(listParams.page-1)*listParams.page_size+scope.$index+1}}</template>
					</el-table-column>

					<el-table-column label="添加时间" align="center" show-overflow-tooltip>
						<template slot-scope="{row}">{{row.create_time|time2FullDate}}</template>
					</el-table-column>

					<el-table-column label="标题" align="center" show-overflow-tooltip>
						<template slot-scope="{row}">{{row.title}}</template>
					</el-table-column>

					<el-table-column label="名称" align="center" show-overflow-tooltip>
						<template slot-scope="{row}">{{row.name}}</template>
					</el-table-column>

					<el-table-column label="手机" align="center" show-overflow-tooltip>
						<template slot-scope="{row}">{{row.mobile}}</template>
					</el-table-column>

					<el-table-column label="头像" align="center" show-overflow-tooltip>
			          <template slot-scope="{row}">
			            <el-image style="width:60px; height: 60px" :src="util.picExplode(row.pic)" fit="contain"></el-image>
			          </template>
			        </el-table-column>
			        
			        <el-table-column label="上下架" align="center" show-overflow-tooltip>
						<template slot-scope="{row}">{{row.is_up==0?'下架':'上架'}}</template>
					</el-table-column>

					<el-table-column label="操作" show-overflow-tooltip width="250">
						<template class="operation-btn" slot-scope="{row}">
							<span class="operateBtn" @click="toAddAssistant('2',row.id)">详情</span>
							<span class="operateBtn" @click="toAddAssistant('1',row.id)">修改</span>
							<span class="operateBtn" @click="assistantIsUp(row)">{{row.is_up==0?'上架':'下架'}}</span>
							<span class="operateBtn" @click="del(row.id)">删除</span>
							<!--<span class="operateBtn" @click="equipIsUp(row)">{{row.del==0?'下架':'上架'}}</span>-->
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>


		<!--分页模块-->
		<pagination :total="parseInt(listParams.total)" :page="parseInt(listParams.page)" :pagesize="parseInt(listParams.page_size)" @getPageNum="changePage" class="pagination"></pagination>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import searchBox from "ServeComponents/searchBox";
	import pagination from "FrontComponents/pagination";
	export default {
		data() {
			return {
				equipCategoryArray: [], //从静态库中获取的所有类别
				category: [], //选中的分类
				listParams: {
					// 请求设备列表发送的页数和每页size参数
					page: 1,
					page_size: 10,
					total: 0,
					search: ""
				},
				assistantList: [],
				tblLoading: false,
			};
		},

		components: {
			pagination,
			searchBox
		},

		computed: {
			...mapGetters(["user_data"])
		},

		mounted() {
			this.getAssistantList();
		},

		methods: {

			// 进入页面请求接口获取设备列表
			getAssistantList() {
				this.tblLoading = true;
				let params={
					page:this.listParams.page,
					page_size:this.listParams.page_size
				}
				this.util.getAssistantList(params).then(res=>{
						this.tblLoading = false;
						if(res) {
							console.log('getAssistantList----------',res);
							this.listParams.page = parseInt(res.page);
							this.listParams.page_size = parseInt(res.page_size);
							this.listParams.total = parseInt(res.total_count);
							this.assistantList = res.rows;
						}
					})
					.catch(err => {
						this.tblLoading = false;
					});
			},
			
			// 跳转到添加助理页面,type://0:新增，1/修改，2/详情
			toAddAssistant(type,id) {
				this.$router.push({
					path: "/serve/manage/assistantDetail",
					query:{type:type,id}
				});
			},
			
			//助理上下架, 0/上架 ，1/下架
			assistantIsUp(item) {
				let title = "";
				let isUp = "";
				if(item.is_up == 0) {
					title = "上架";
					isUp = 1;
				} else if(item.is_up == 1) {
					title = "下架";
					isUp = 0;
				}
				let params = {
					ids: item.id,
					is_up: isUp
				};
				this.util.confirm(this, "确定" + title + "助理吗?").then(res => {
						if(res) {
							this.util.operateAssistant(params).then(res => {
								console.log("equipIsUp-------", res);
								this.$message.success(title + "成功！");
								this.getAssistantList();
							});
						}
					})
					.catch(err => {});
			},
			
			//删除助理方法
			del(id){
				let params={
					ids:id,
					del:1
				}
				this.util.confirm(this,'确定删除助理密码 ?').then(res=>{
					if(res){
						this.util.operateAssistant(params).then(res=>{
							this.$message.success("删除成功！");
							this.getAssistantList();
						})
					}
				})
			},

			// 顶部搜索
			search(val) {
				this.listParams.search = val;
				this.getDeviceList();
			},
			
			// 切换页码
			changePage(val) {
				this.listParams.page = val;
				this.getAssistantList();
			}
		},
	};
</script>

<style lang="scss" scoped>
	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px;
	}
	
	.select-search {
		display: flex;
		align-items: center;
		.search-box {
			margin-left: 20px;
		}
	}
	
	.operateBtn {
		color: $Theme-color;
		cursor: pointer;
		margin-right: 10px;
	}
	/*设备列表*/
	
	.device-table {
		/*border: 1px solid #eee;*/
		border-radius: 10px;
		margin-bottom: 20px;
		.el-table /deep/ .el-table__row /deep/ .cell {
			padding: 7px;
		}
	}
	
	.device-table /deep/ .el-table--fit {
		height: 100%;
	}
</style>