<template>
	<div>
		<div class="head">
			<span>通知</span>
			<span>({{total}})</span>
			<el-checkbox v-show="isBatch" v-model="isAll" @change="checkAll">全选</el-checkbox>
			<div class="batch-del" v-show="isBatch">
				<i class="el-icon-delete"></i>
				<span @click="delMsg(batchArray.join())">删除</span>
			</div>
			<span class="batch-btn" @click="batchManage" v-text="batchText">取消批量</span>
			<span class="read-btn" @click="allRead">全部标为已读</span>
		</div>
		<ul class="notice">
			<div v-if="list.length!=0">
				<li :class="{'batch-manage':isBatch}" v-for="(item,index) in list" :key="index">
					<el-checkbox :class="{'check-active':item.checked}" @change="selectMsg(item.id)" v-model="item.checked" :key="item.id">
						<i class="el-icon-check"></i>
					</el-checkbox>
					<div class="content-time">
						<span class="content" :class="{'not-read':item.is_read==0}" @click="toDetail(item,item.rel_id)">{{item.remark}}</span>
						<span class="time">{{item.create_time|time2FullDate}}</span>
					</div>
					<i class="el-icon-delete" @click="delMsg(item.id)"></i>
				</li>
			</div>
			<div v-else class="nodata" style="padding-top:30px">暂无数据</div>
			<!--分页模块-->
			<div class="page-wrap">
				<!-- <el-pagination background layout="prev, pager, next" :current-page.sync="currentPage" :page-size="6" :total="total" @current-change="changePage">
				</el-pagination> -->
				<Pagination v-if="total>6" :total="total" :page="currentPage" :pagesize="6" @getPageNum="changePage"></Pagination>
			</div>
		</ul>

	</div>
</template>

<script>
	import { frontMessage } from "@config/api.js"
	import Pagination from 'FrontComponents/pagination'

	export default {
		data: () => ({
			batchText: '批量管理',
			isBatch: false,
			list: [],
			total: 0,
			currentPage: 1,
			batchArray: [],
			isAll: false,
			readArray: [],
			timer: null
		}),

		components: {
			Pagination
		},

		mounted() {
			this.getList(1, 1, 6)
			this.timer = setInterval(() => {
				this.getList(1, this.currentPage, 6)
			}, 60000)
		},
		beforeDestroy() {
			clearInterval(this.timer)
		},
		watch: {
			isAll(val) {
				if(val) {
					this.batchArray = []
					this.list.forEach(item => {
						item.checked = true
						this.batchArray.push(item.id)
					})
				}
			}
		},
		methods: {
			getList(is_sys, page, page_size, type, is_read) {
				this.getRequest(frontMessage.getMsgList, {
					is_sys,
					page,
					page_size
				}).then(res => {
					console.log(res, '获取所有通知')
					this.list = res.rows
					this.total = res.total_count
					this.isAll = false
				}).catch(err => {})
			},
			batchManage() {
				this.isBatch = !this.isBatch
				this.batchText = this.isBatch ? '取消批量' : '批量管理'
			},
			toDetail(item, orderId) {
				if(item.is_read == 0) {
					this.markRead(item.id)
				}
				if(item.type == '4') {
					console.log(item.id, '把这个标为已读')
					this.$router.push({
						path: '/personal/order/myOrder/detail',
						query: {
							orderId
						}
					})
				}

			},
			changePage(val) {
				this.isAll = false
				console.log(this.currentPage, '页数')
				this.getList(1, val, 6)
			},
			delMsg(id) {
				if(!this.total || !id) return
				console.log(this.currentPage, '当前页数')
				this.$confirm('确定要删除消息吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.getRequest(frontMessage.delMsg, {
						id
					}).then(res => {
						console.log(res, '删除消息')
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						// this.batchManage();
						this.isBatch = false
						// if(id.split(',').length==this.list.length){
						// 	this.currentPage--
						// }
						this.getList(1, 1, 6)
					}).catch(err => {})
				}).catch(() => {
					//        this.$message({
					//          type: 'info',
					//          message: '已取消删除'
					//        });          
				});
			},
			selectMsg(id) {
				this.batchArray = []
				this.list.forEach(item => {
					if(item.checked) {
						this.batchArray.push(item.id)
					}
				})
				this.isAll = this.list.every(item => {
					return item.checked
				})
				console.log(this.batchArray, '批量管理的数组')
			},
			checkAll() {
				if(this.isAll) {
					this.batchArray = []
					this.list.forEach(item => {
						this.$set(item, 'checked', true)
						this.batchArray.push(item.id)
					})
					console.log(this.batchArray, '666666666')
				} else {
					this.batchArray = []
					this.list.forEach(item => {
						item.checked = false
					})
					console.log(this.batchArray, '666666666')
				}
			},
			markRead(id) {
				this.getRequest(frontMessage.hasRead, {
					id
				}).then(res => {
					console.log(res, 'ppppppppp')
					this.isBatch = false;
				}).catch(err => {})
			},
			allRead() {
				if(!this.list.length) return
				this.list.forEach(item => {
					this.readArray.push(item.id)
				})
				this.markRead(this.readArray.join())
				this.getList(1, this.currentPage, 6)
			}
		},
		
	}
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
	@import "../common/index.scss";
	@import "./styles/index.scss";
	.head {
		height: 60px;
		background: #fff;
		margin-bottom: 30px;
		display: flex;
		align-items: center;
		padding: 0 30px;
		box-sizing: border-box;
		span:first-child {
			margin-right: 8px;
		}
		span:nth-child(2) {
			margin-right: auto;
		}
		.batch-del {
			span {
				cursor: pointer;
				&:hover {
					color: #7C6AFF;
				}
			}
		}
		.el-checkbox {
			margin-right: 25px;
		}
		div {
			margin-right: 25px;
		}
		.batch-btn {
			padding: 9px 14px;
			border: 1px solid #d9d9d9;
			box-sizing: border-box;
			margin-right: 20px;
			cursor: pointer;
			&:hover {
				color: #7C6AFF;
			}
		}
		.read-btn {
			padding: 9px 14px;
			border: 1px solid #d9d9d9;
			box-sizing: border-box;
			cursor: pointer;
			&:hover {
				color: #7C6AFF;
			}
		}
	}
	
	.notice {
		background: #fff;
		padding: 0 30px 30px;
		box-sizing: border-box;
		li+li {
			border-top: 1px solid #EBEBEB;
		}
		li {
			height: 109px;
			display: flex;
			align-items: center;
			overflow: hidden;
			cursor: pointer;
			.el-checkbox {
				margin-left: -60px;
				margin-right: 30px;
				transition: margin-left 0.5s;
				/deep/ .el-checkbox__inner {
					width: 30px;
					height: 30px;
					background: #fff;
					border-color: #999;
					&:after {
						display: none;
					}
				}
				/deep/ .el-checkbox__label {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					z-index: 9;
					font-size: 20px;
					color: #fff;
					padding-left: 0;
					.el-icon-check {
						margin: auto;
					}
				}
			}
			.check-active {
				/deep/ .el-checkbox__inner {
					background: #7C6AFF;
					border-color: #7C6AFF;
				}
			}
			.content-time {
				display: flex;
				flex-direction: column;
				margin-right: auto;
				.content {
					font-size: 16px;
					color: #323333;
					font-weight: bold;
					margin-bottom: 19px;
					position: relative;
				}
				.not-read {
					&:after {
						content: '';
						width: 12px;
						height: 12px;
						border-radius: 50%;
						background: #EA001E;
						position: absolute;
					}
				}
				.time {
					font-size: 14px;
					color: #999;
				}
			}
			.el-icon-delete {
				font-size: 20px;
				color: #999;
				cursor: pointer;
				display: none;
				&:hover {
					color: #7C6AFF;
				}
			}
			&:hover {
				.content-time {
					.content {
						color: #7C6AFF;
					}
					.time {
						color: #7C6AFF;
					}
				}
				.el-icon-delete {
					display: block;
				}
			}
		}
		.batch-manage {
			.el-checkbox {
				margin-left: 0;
			}
		}
		.page-wrap {
			padding-top: 30px;
			padding-bottom: 15px;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
		}
	}
</style>