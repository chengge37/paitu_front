<template>
	<div v-loading.fullscreen="loading" element-loading-text="正在获取数据" element-loading-spinner="el-icon-loading">

		<div class="main_Info">
			<!--选择结果模块-->
			<div class="front_select">
				<div class="result">
					<p>筛选结果：</p>
					<ul>
						<li v-for="item in tags" :key="item.type" v-if="item.label !==''&&item.label !== '全部'&&item.label !== '全部'">
							<div>
								<span>{{item.label}}</span>
								<i class="el-icon-close cursor" @click="dele_sete(item.type)"></i>
							</div>
						</li>
					</ul>
					<el-button type="text" v-if="tags[0].label !==''" @click.native="clearall">清空所有筛选</el-button>
				</div>
			</div>

			<!--选项选择模块-->
			<div class="front_options radio-setting">
				<ul>
					<li>
						<span>活动城市：</span>
						<select-city @changeCity="changeCity"></select-city>
					</li>
					<li>
						<span>活动时间：</span>
						<el-radio-group v-model="activeTime">
							<el-radio :label="0">
								<span class="word-hover">全部</span>
							</el-radio>
							<el-radio :label="1">
								<span class="word-hover">今天</span>
							</el-radio>
							<el-radio :label="2">
								<span class="word-hover">明天</span>
							</el-radio>
							<el-radio :label="3">
								<span class="word-hover">本周</span>
							</el-radio>
							<el-radio :label="4">
								<span class="word-hover">本月</span>
							</el-radio>
						</el-radio-group>
						<div class="custom-time-box">
							<div class="time-button" v-show="!showtime" @click="sh">按时间区间筛选</div>
							<el-date-picker v-model="datatime" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-show="showtime"></el-date-picker>
							<div class="time-button" v-show="showtime" @click="sh">取消</div>
						</div>
					</li>
					<li>
						<span>是否收费：</span>
						<el-radio-group v-model="IsFree">
							<el-radio :label="0">
								<span class="word-hover">不限</span>
							</el-radio>
							<el-radio :label="1">
								<span class="word-hover">免费</span>
							</el-radio>
							<el-radio :label="2">
								<span class="word-hover">收费</span>
							</el-radio>
						</el-radio-group>
					</li>
					<li>
						<span>活动类型：</span>
						<el-radio-group v-model="activeType">
							<el-radio :label="0">
								<span class="word-hover">不限</span>
							</el-radio>
							<el-radio :label="1">
								<span class="word-hover">线上活动</span>
							</el-radio>
							<el-radio :label="2">
								<span class="word-hover">线下活动</span>
							</el-radio>
						</el-radio-group>
					</li>
					<li>
						<span>活动状态：</span>
						<el-radio-group v-model="activeStat">
							<el-radio :label="0">
								<span class="word-hover">不限</span>
							</el-radio>
							<el-radio :label="1">
								<span class="word-hover">报名中</span>
							</el-radio>
							<el-radio :label="2">
								<span class="word-hover">进行中</span>
							</el-radio>
							<el-radio :label="3">
								<span class="word-hover">已结束</span>
							</el-radio>
						</el-radio-group>
					</li>
				</ul>
			</div>
			<!-- 活动列表 -->
			<div class="list">
				<!--顶部排序部分模块-->
				<div class="sort">
					<ul>
						<li class="cursor" @click="changeOrder(index)" v-for="(item,index) in sortList" :key="index" :class="{'active':sortIndex==index}">
							<span>{{item}}</span>
						</li>
					</ul>
					<div class="pageModule">
						<span class="num curPage">{{listParams.page}}</span>
						<span class="total">/{{listParams.totalPage}}</span>
						<i class="el-icon-arrow-left page-hover" @click="operatePage('prev')"></i>
						<i class="el-icon-arrow-right page-hover" @click="operatePage('next')"></i>
					</div>
				</div>

				<!-- 列表主体 -->
				<div v-if="city_code !== 0">
					<div class="main-list" v-for="item in activelist" :key="item.id">
						<el-image :src="$qiniuHost+item.pic" class="list-image cursor" fit="scale-down" width='430' height="240"  @click="OpenDetails(item)"/>
						</el-image>
						<div class="right-content">
							<div class="title-box" @click="OpenDetails(item)">
								<div class="title word-hover">{{item.name}}</div>
								<div class="people">报名人数：{{item.current_person}}/{{item.max_person}}</div>
							</div>
							<div class="content" @click="OpenDetails(item)">{{item.brief}}</div>
							<div class="list-bottom">
								<div class="tab" @click="OpenDetails(item)">
									<div class="tab-item">
										<span class="item-name">费用：</span>
										<span class="item-content">
	                    				<span v-if="item.fee > 0">{{item.fee}}元</span>
										<span v-else>免费</span>
										</span>
									</div>
									<div class="tab-item">
										<span class="item-name">时间：</span>
										<span class="item-content">{{item.start_time}} 至 {{item.end_time}}</span>
									</div>
									<div class="tab-item">
										<span class="item-name">地点：</span>
										<span class="item-content">{{item.address}}</span>
									</div>
									<div class="tab-item">
										<span class="item-name">举办方：</span>
										<span class="item-content">{{item.user_detail.nick}}</span>
									</div>
								</div>
								<div class="signup-box">
									<!--<el-button type="primary" plain @click="active_confirm(item)">立即报名</el-button>-->
									<el-button type="primary" plain @click="active_confirm(item)" v-if="item.max_person - item.current_person > 0&&item.is_start == 0&&Date.parse(new Date(Nowdate)) < new Date(item.start_time.replace(/-/g, '/'))">立即报名</el-button>
		                            <el-button type="primary" plain disabled v-else-if="item.is_start == 1">报名截止</el-button>
		                            <el-button type="primary" plain disabled v-else-if="Date.parse(new Date(Nowdate)) > new Date(item.start_time.replace(/-/g, '/'))">已开始</el-button>
		                            <el-button type="primary" plain disabled v-else>报名人员已满</el-button>
								</div>
							</div>
						</div>
					</div>
					<div v-if="activelist.length === 0" class="nullactive">
						<ali-svg-icon icon-class="empty" class-name="empty"></ali-svg-icon>
						<div>您当前地区或您选择的条件没有活动可供查看，若自动定位出现偏差还请手动调整活动城市至您当前的城市（或者更改您的筛选条件）</div>
					</div>
				</div>
			</div>
			<div class="page" v-if="listParams.totalCount > 0">
				<pagination :total="listParams.totalCount" :page="listParams.page" :pagesize="listParams.page_size" @getPageNum="getPageNum" />
			</div>
			<div v-if="openpay">
				<pay-window :openpay="openpay" :paydata="paydata" @closed="closed" />
			</div>
		</div>
	</div>
</template>

<script>
	import selectCity from "FrontComponents/selectCity";
	import { activity } from "@/config/api";
	import pagination from "FrontComponents/pagination";
	import { mapGetters } from "vuex";
	import { frontHome, frontShop, frontStudio, frontEquip } from "@config/api.js";
	import payWindow from "../activity/components/pay_dalog";
	export default {
		data: () => ({
			sortIndex: 0,
			sortList: ['最新','最热'],
			activeTime: 0,
			IsFree: 0,
			activeType: 0,
			activeStat: 0,
			activeSort: 1,
			searchTxt: "",
			search: "",
			// 这里的tag对象指的是当要删除某个键值时，在方法中调用
			tags: [{
					type: "time",
					label: "",
					tag: "activeTime"
				},
				{
					type: "free",
					label: "",
					tag: "IsFree"
				},
				{
					type: "type",
					label: "",
					tag: "activeType"
				},
				{
					type: "stat",
					label: "",
					tag: "activeStat"
				},
				{
					type: "sort",
					label: "",
					tag: "activeSort"
				}
			],
			activelist: [],
			// 页面loading
			loading: false,
			// 打开支付页面
			openpay: false,
			paydata: {},
			// 筛选列表
			params: {
				type_time: 0,
				// 当type_time为5时，传入开始和结束时间
				start_time: "",
				end_time: "",
				// 是否免费0不限1免费2收费
				is_fee: 0,
				// 线上线下0不限1线上2线下
				is_manual: 0,
				// 活动状态0不限1报名中2进行中3结束
				status: 0,
				// 筛选0最新1最热
				order_by: 0,
				// 城市代码
				city_code: 0
			},
			showtime: false,
			datatime: "",
			listParams: {
				totalCount: 0,
				totalPage: 0,
				pageSize: 10,
				page: 1
			},
			uid:'',  //店家id
			Nowdate:new Date(),
		}),
		watch: {
			activeTime(data) {
				this.tags.forEach(item => {
					if(item.type === "time") {
						switch(data) {
							case 0:
								item.label = "";
								this.params.type_time = 0;
								break;
							case 1:
								item.label = "今天";
								this.params.type_time = 1;
								break;
							case 2:
								item.label = "明天";
								this.params.type_time = 2;
								break;
							case 3:
								item.label = "本周";
								this.params.type_time = 3;
								break;
							case 4:
								item.label = "本月";
								this.params.type_time = 4;
								break;
							default:
								break;
						}
					}
				});
				this.get_list();
			},
			IsFree(data) {
				this.tags.forEach(item => {
					if(item.type === "free") {
						switch(data) {
							case 0:
								item.label = "";
								this.params.is_fee = 0;
								break;
							case 1:
								item.label = "免费";
								this.params.is_fee = 1;
								break;
							case 2:
								item.label = "收费";
								this.params.is_fee = 2;
								break;
							default:
								break;
						}
					}
				});
				this.get_list();
			},
			activeType(data) {
				this.tags.forEach(item => {
					if(item.type === "type") {
						switch(data) {
							case 0:
								item.label = "";
								this.params.is_manual = 0;
								break;
							case 1:
								item.label = "线上活动";
								this.params.is_manual = 1;
								break;
							case 2:
								item.label = "线下活动";
								this.params.is_manual = 2;
								break;
							default:
								break;
						}
					}
				});
				this.get_list();
			},
			activeStat(data) {
				this.tags.forEach(item => {
					if(item.type === "stat") {
						switch(data) {
							case 0:
								item.label = "";
								this.params.status = 0;
								break;
							case 1:
								item.label = "报名中";
								this.params.status = 1;
								break;
							case 2:
								item.label = "进行中";
								this.params.status = 2;
								break;
							case 3:
								item.label = "已结束";
								this.params.status = 3;
								break;
							default:
								break;
						}
					}
				});
				this.get_list();
			},
			city_code(data) {
				console.log("城市代码");
				console.log(data);

				if(data == undefined || data === 0) {
					this.get_list();
					this.$Message.error("定位失败,将为您加载全国的活动,请注意地区");
				} else {
//					this.params.city_code = data;
					this.get_list();
				}
			},
			datatime(data) {
				console.log("时间");
				console.log(data);
				// 由于这里取回来的是数组，那么就可以直接这样拿
				this.params.start_time = data[0];
				this.params.end_time = data[1];
				this.get_list();
			}
		},
		filters: {
			partnerPicDeal(val) {
				let sub = val.slice(val.indexOf("src"));
				let sub1 = sub.slice(sub.indexOf('"') + 1);
				let sub2 = sub1.slice(0, sub1.indexOf('"'));
				return sub2;
			}
		},
		computed: {
			...mapGetters(["city_code"])
		},
		components: {
			selectCity,
			pagination,
			payWindow
		},
		
		created(){
			//获取店家id
			let query = this.$route.query;
			if(JSON.stringify(query) != "{}") {
				if(query.uid) {
					this.uid=query.uid;
				}
			}
		},

		mounted() {
//			let params = {
//				city_code: this.city_code
//			};
			this.get_list();
		},

		methods: {
			//修改排序方法
			changeOrder(index){
				if(this.sortIndex==index) return;
				this.sortIndex=index;
				this.get_list();
			},
			sh() {
				if(this.showtime) {
					this.showtime = false;
					this.params.type_time = 0;
					this.params.start_time = "";
					this.params.end_time = "";
				} else {
					this.showtime = true;
					this.params.type_time = 5;
				}
			},
			closed() {
				this.openpay = false;
			},
			getPageNum(num) {
				this.listParams.page=num
				this.get_list();
			},
			active_confirm(item) {
				this.openpay = true;
				this.paydata = item;
			},
			clearall() {
				this.tags = [{
						type: "time",
						label: ""
					},
					{
						type: "free",
						label: ""
					},
					{
						type: "type",
						label: ""
					},
					{
						type: "stat",
						label: ""
					},
					{
						type: "sort",
						label: ""
					}
				];
				this.activeTime = 0;
				this.IsFree = 0;
				this.activeType = 0;
				this.activeStat = 0;
				this.activeSort = 1;
			},
			changeCity(command) {
				console.log("index---changeCity----", command);
				this.params.city_code = command.code;
            	this.get_list();
			},
			OpenDetails(item) {
				this.util.toActivityPage(item.id);
			},
			dele_sete(data) {
				this.tags.forEach(item => {
					switch(data) {
						case item.type:
							item.label = "";
							this[item.tag] = 0;
							break;

						default:
							break;
					}
				});
			},
			get_list() {
				this.params.page=this.listParams.page;
				this.params.page_size=this.listParams.pageSize;
				this.params.uid=this.uid;
				this.params.order_by=this.sortIndex;
				console.log('activity-------------',this.params);
				this.getRequest(activity.get_activity_list, this.params).then(res => {
					console.log(res);
					this.listParams.totalCount = res.total_count;
					this.listParams.pagesize = res.page_size;
					this.listParams.page = parseInt(res.page);
					this.listParams.totalPage = Math.ceil(
						res.total_count / res.page_size
					);
					this.activelist = res.rows;
					console.log('this.activeList-----', this.activelist);
				});
			},
			search_text(e) {
				console.log(e)
			},
			operatePage(type) {
				if(type == "prev") {
					if(this.listParams.page > 1) {
						this.listParams.page--;
						this.get_list();
					}
				} else {
					if(this.listParams.page != this.listParams.totalPage) {
						this.listParams.page++;
						this.get_list();
					}
				}
			},
		},

	};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
	@import "@front/common/common.scss";
	@import "@css/color.scss";
	.front_select {
		margin-bottom: 20px;
	}
	
	.custom-time-box {
		display: flex;
		align-items: center;
		/deep/.el-date-editor {
			width: auto;
			margin-right: 20px;
		}
		.time-button {
			cursor: pointer;
			color: $Theme-color;
		}
	}
	
	.list {
		background-color: #ffffff;
		.list-header {
			display: flex;
			justify-content: space-between;
			padding: 14px 0px;
			border-bottom: 1px solid #f0f0f0;
			.tags {
				/deep/ {
					.el-radio {
						margin-right: 20px;
					}
					.el-radio__label {
						padding-left: 0px;
						color: #999999;
					}
					.el-radio__input {
						display: none;
					}
					.el-radio__input.is-checked+.el-radio__label {
						color: $Theme-color;
						.gang {
							background: $Theme-color;
						}
					}
				}
			}
			.paging {
				display: flex;
				.pagenum {
					color: #999999;
				}
				.arrow {
					margin-left: 10px;
					span {
						border: 1px solid rgba(217, 217, 217, 1);
						color: #d9d9d9;
					}
				}
			}
		}
		.main-list {
			padding-right: 40px;
			display: flex;
			border: 1px solid #f0f0f0;
			margin-bottom: 40px;
			padding:20px;
			.list-image {
				width: 430px;
				margin-right: 20px;
			}
			.right-content {
				display: flex;
				flex-direction: column;
				/*justify-content: space-evenly;*/
				width: 100%;
				padding-top: 5px;
				.title-box {
					display: flex;
					justify-content: space-between;
					/*margin-bottom: 10px;*/
					cursor: pointer;
					align-items: center;
					.title {
						font-size: 24px;
					}
					.people {
						color: #666666;
						font-size: 14px;
					}
				}
				.content {
					line-height: 23px;
					margin: 10px 0px;
					cursor: pointer;
				}
				.list-bottom {
					display: flex;
					justify-content: space-between;
					.tab {
						cursor: pointer;
						.tab-item {
							font-size: 14px;
							color: #333333;
							margin-top: 12px;
							&:first-child {
								margin-top: 0px;
							}
							.item-name {
								color: #666;
							}
						}
					}
					.signup-box {
						display: flex;
						align-items: flex-end;
						/deep/ .el-button--primary.is-plain {
							color: $Theme-color;
							background: #fafafa;
							border: 1px solid #F0F0F0;
							padding: 7px 13px;
						}
						/deep/ .el-button--primary.is-plain:hover {
							color: $Theme-color;
							background: rgba(50, 42, 70, 0.103);
							border-color: $Theme-color;
						}
					}
				}
			}
		}
		.nullactive {
			text-align: center;
			padding: 60px 0;
			color: #000;
			.empty {
				width: 80px;
				height: 80px;
			}
		}
	}
	
	.page {
		display: flex;
		justify-content: flex-end;
	}
	
	.textcolor {
		color: $Theme-color;
	}
	
	.main_Info {
		width: 1200px;
		margin: 40px auto;
		.sort {
			margin: 20px 0px;
			height: 42px;
			background: #F0F0F0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			ul {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				li {
					padding: 0px 0px 0px 20px;
					/*margin-right:15px;*/
					height: 100%;
					line-height: 42px;
					span {
						padding-right: 20px;
						border-right: 1px solid #CCCCCC;
					}
					&.active,&:hover{
						color:#fff;
						background:#7C6AFF;
					}
				}
			}
			.pageModule {
				padding-right: 20px;
				font-size: 0px;
				display: flex;
				align-items: center;
				span {
					font-size: 14px;
					display: inline-block;
				}
				.num {
					color: #FF5600;
				}
				.total {
					margin-right: 15px;
				}
				i {
					font-size: 14px;
					width: 30px;
					height: 30px;
					background: #fff;
					border: 1px solid #999999;
					text-align: center;
					line-height: 30px;
					cursor: pointer;
				}
			}
		}
	}
</style>