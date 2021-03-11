<template>
	<div class="newServe">
		<div class="mainInfo">
			<!-- 头部 -->
			<div class="top">
				<!-- 添加设备按钮 -->
				<el-button icon="el-icon-plus" class="incomeBtn" type="primary" @click="toPackDetail('0')">添加套餐</el-button>

				<!-- 类别筛选及搜索框 -->
				<div class="select-search">
					<search-box @change="search"></search-box>
				</div>
			</div>

			<!-- 设备列表 -->
			<div class="device-table">
				<el-table ref="multipleTable" :data="packList" tooltip-effect="dark">

					<el-table-column label="序号" width="55">
						<template slot-scope="scope">{{(listParams.page-1)*listParams.page_size+scope.$index+1}}</template>
					</el-table-column>

					<el-table-column label="创建时间" align="center" show-overflow-tooltip>
						<template slot-scope="{row}">{{row.create_time|time2FullDate}}</template>
					</el-table-column>

					<el-table-column label="套餐名称" align="center" show-overflow-tooltip>
						<template slot-scope="{row}">{{row.name}}</template>
					</el-table-column>
					
					<el-table-column label="套餐类型" align="center" show-overflow-tooltip>
						<template slot-scope="{row}">{{row.ptm_type==1?'影棚套餐':'设备套餐'}}</template>
					</el-table-column>
					
					<el-table-column label="产品图片" align="center" show-overflow-tooltip>
			          <template slot-scope="{row}">
			            <el-image style="width:60px; height: 60px" :src="util.picExplode(row.pic)" fit="contain"></el-image>
			          </template>
			        </el-table-column>

					<el-table-column label="上架/下架" align="center">
						<template slot-scope="{row}">{{row.is_up==0?'下架':'上架'}}</template>
					</el-table-column>

					<el-table-column label="租用类型" align="center">
						<template slot-scope="{row}">{{row.only_rent_day==0?'按天/按小时':'按天'}}</template>
					</el-table-column>

					<el-table-column label="使用中/库存数" align="center">
						<template slot-scope="{row}">{{row.stock_num}}</template>
					</el-table-column>

					<el-table-column label="是否送货上门" align="center">
						<template slot-scope="{row}">{{row.door_to_door}}</template>
					</el-table-column>

					<el-table-column label="成交总数">
						<template slot-scope="{row}">{{row.total}}</template>
					</el-table-column>

					<el-table-column label="操作">
						<template class="operation-btn" slot-scope="{row}">
							<el-button type="text" class="operateBtn" @click="toPackDetail('2',row.id)">详情</el-button>
							<el-button type="text" class="operateBtn" @click="toPackDetail('1',row.id)">修改</el-button>
							<el-button type="text" @click="packIsUp(row)">{{row.is_up==0?'上架':'下架'}}</el-button>
							<!--<el-button class="operateBtn" @click="del(row.id)">删除</el-button>-->
						</template>
					</el-table-column>
				</el-table>
			</div>

		</div>

		<!--分页模块-->
		<pagination :total="parseInt(listParams.total)" :page="parseInt(listParams.page)" :pagesize="parseInt(listParams.page_size)" @getPageNum="changePage" class="pagination">
		</pagination>

	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import searchBox from 'ServeComponents/searchBox'
	import pagination from "FrontComponents/pagination";
	export default {
		data() {
			return {
				listParams:{
					page:1,
					page_size:10,
					total:0,
				},
				packList:[],  //套餐列表
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
			this.getPackList();
		},

		methods: {
			//获取套餐列表
			getPackList(){
				let params={
					page:this.listParams.page,
					page_size:this.listParams.page_size
				}
				this.util.serveGetPack(params).then(res=>{
					console.log('packList---------',res);
					this.packList=res.rows;
					this.listParams.total=res.total_count;
				})
			},
			//套餐上下架
			packIsUp(item){
				let is_up,title;
				if(item.is_up == 0) {
					title = "上架";
					is_up = 1;
				} else if(item.is_up == 1) {
					title = "下架";
					is_up = 0;
				}
				let params = {
					ids: item.id,
					is_up: is_up
				};
				this.util.confirm(this, "确定" + title + "套餐吗?").then(res => {
						if(res) {
							this.util.packIsUp(params).then(res=>{
								this.$message.success(title + "成功！");
								this.getPackList();
							})
						}
					})
					.catch(err => {});
			},
			//搜索方法
			search(){
				console.log('search----------');
			},
			//添加套餐方法,跳转到添加套餐详情,type,0/新增，1/修改，2/详情
			toPackDetail(type,id){
				this.$router.push({
					path: "/serve/manage/packageDetail",
					query:{type:type,id}
				});
			},
			//切换分页方法
			changePage(i){
				this.listParams.page=i;
				this.getPackList();
			},
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
	/*设备列表*/
	
	.device-table {
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