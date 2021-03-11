<template>
	<div>
		<!--流程图模块-->
		<div class="workFlow">
			<ul>
				<li v-for="(item,index) in workFlowList" :key="index">
					<div :class="{addLeft:index!=0}">
						<span>{{item.title}}</span>
						<p>{{item.content}}</p>
					</div>
					<span class="arrow" v-if="index!=(workFlowList.length-1)"></span>
				</li>
			</ul>
		</div>
		<!--选择结果模块-->
		<div class="front_select">
			<div class="result">
				<p>筛选结果：</p>
				<div>
					<ul>
						<li v-for="(item,index) in selectOption" :key="index" v-if="item.split('=')[1]!='全部'">
							<div>
								<span>{{item.split('=')[1]}}</span>
								<i class="el-icon-close cursor" @click="delOption(item)"></i>
							</div>
						</li>
						<el-button class="word-hover" type="text" v-show="selectOption.length>0" @click="clearAllOption()">清空所有筛选</el-button>
					</ul>
				</div>
			</div>

			<div class="rightShow">
				<front-searchbox :searchTxt="searchTxt" @search="search" v-if="showSearch"></front-searchbox>
				<!--购物车模块-->
				<!--<cart :res="cartInfo" v-if="cartInfo"></cart>-->
			</div>
		</div>

		<!--选项选择模块-->
		<div class="mainInfo">
			<div class="front_options radio-setting">
				<ul>
					<li>
						<span>项目类型：</span>
						<el-radio-group v-model="projectType">
							<el-radio v-for="(item,index) in projectList" :key="index" :label="item.id">
								<span class="word-hover">{{item.name}}</span>
							</el-radio>
						</el-radio-group>
					</li>
					<li>
						<span>交付地域：</span>
						<select-city :code="cityCode" @changeCity="changeCity"></select-city>
					</li>
					<li class="time">
						<span>发布日期：</span>
						<el-date-picker value-format="yyyy-MM-dd" v-model="dateStart" :picker-options="pickerOptionsStart" type="date" placeholder="yy-mm-dd"></el-date-picker>
						<span class="endDom widthAuto">至：</span>
						<el-date-picker value-format="yyyy-MM-dd" v-model="dateEnd" :picker-options="pickerOptionsEnd" type="date" placeholder="yy-mm-dd"></el-date-picker>
					</li>
					<li>
						<span>项目预算：</span>
						<el-radio-group v-model="budget">
							<el-radio v-for="(item,index) in budgetList" :key="index" :label="item.id">
								<span class="word-hover">{{item.name}}</span>
							</el-radio>
						</el-radio-group>
					</li>
					<li>
						<span>项目状态：</span>
						<el-radio-group v-model="projectStatus">
							<el-radio v-for="(item,index) in projectStatusList" :key="index" :label="item.id">
								<span class="word-hover">{{item.name}}</span>
							</el-radio>
						</el-radio-group>
					</li>

				</ul>

			</div>
			
			<div class="biddingContent">
				<el-image src="https://pic.paitume.com/574/1591868535887.png"></el-image>
				<span class="title">竞标大厅模式：</span>
				<p>雇主发布招标需求，多个服务商在投标期内参与投标，雇主选择一位中标后，由中标服务商向雇主提交需求解决方案的交易模式。</p>
				<button class="basicBtn cursor default-hover" @click="toAddDemand">发布项目</button>
			</div>
			
		</div>

		<!--中间主体部分模块-->
		<div class="main radio-setting">

			<div class="rightInfo">
				<div v-if="listParams.totalCount!=0">
					<div class="top">
						<div style="user-select:none;">
							<span :class="{active:curIndex==index+1,sort:index>0,up:index>0&&curIndex==index+1&&order=='asc',down:index>0&&curIndex==index+1&&order=='desc'}" class="radio-hover" v-for="(item,index) in orderType" :key="index" :label="index" @click="changeSort(index+1)">{{item}}</span>
						</div>
						<p>
							<span>共</span>
							<span class="num">{{listParams.totalCount}}</span>
							<span>个需求</span>
							<span class="num curPage">{{listParams.page}}</span>
							<span class="total">/{{listParams.totalPage}}</span>
							<i class="el-icon-arrow-left page-hover" @click="operatePage('prev')"></i>
							<i class="el-icon-arrow-right page-hover" @click="operatePage('next')"></i>
						</p>
					</div>

					<!--列表模块-->
					<demand-list :list="list"></demand-list>
				</div>

				<div class="findNot" v-if="listParams.totalCount==0 && !loadList">
					<div class="info">
						<p>为您找到 0 个</p>
						<span>"相关产品"</span>
					</div>
					<p class="toBack">请您返回上一级操作</p>
					<el-button @click="clearAllOption()">返回</el-button>
					<div class="option">
						<div>
							<div class="delOption">
								<p>删除</p>
								<span>一些筛选项</span>
							</div>
							<div class="front_select">
								<div class="result">
									<p>筛选结果：</p>
									<div>
										<ul>
											<li v-for="(item,index) in selectOption" :key="index">
												<div>
													<span>{{item.split('=')[1]}}</span>
													<i class="el-icon-close cursor" @click="delOption(item)"></i>
												</div>
											</li>
											<el-button type="text" v-show="selectOption.length>0" @click="clearAllOption()">清空所有筛选</el-button>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="leftInfo">
				<!--<recommend-good></recommend-good>-->
			</div>
		</div>
		<!--分页模块-->
		<pagination :total="listParams.totalCount" :page="parseInt(listParams.page)" :pagesize="listParams.pageSize" @getPageNum="changePage" class="pagination"></pagination>

		<!--联系客服模块-->
		<!--<contact :cartInfo="cartInfo" v-if="showContact"></contact>-->
	</div>
</template>

<script>
	import frontSearchbox from "FrontComponents/frontSearchBox";
	import productList from "FrontComponents/productList";
	import recommendGood from "FrontComponents/recommendGood";
	import pagination from "FrontComponents/pagination";
	import selectCity from "FrontComponents/selectCity";
	import contact from "FrontComponents/contact";
	import find from "FrontComponents/find";
	import cart from "FrontComponents/cart";
	import shootingList from "FrontComponents/shootingList";
	import demandList from "FrontComponents/demandList";
	import { userGetList } from "@util/common.js";
	import { mapGetters } from "vuex";

	export default {
		data() {
			return {
				pickerOptionsStart: this.util.checkDateStart(
					this,
					"dateStart",
					"dateEnd"
				),
				pickerOptionsEnd: this.util.checkDateEnd(this, "dateStart"),
				dateStart: "",
				dateEnd: "",
				searchTxt: "",
				projectType: 0,
				square: 0,
				studioPrice: 0,
				type: 0,
				//默认默认
				curIndex: 1,
				order: "asc",
				orderType: ["发布日期", "项目预算"],
				provide: [],
				conditionArray: "",
				clearAll: false,
				selectOption: [],
				priceList: [],
				studioList: [],
				studioSizeList: [],
				cityCode: "",
				list: [{
						id: 1,
						name: '项目名称淘宝天猫banner设计,共15张',
						type: 1,
						status: 1,
						budget: 1000,
						createTime: 1588902864,
						city: 0,
						skills: '1,2',
						period: '6',
						joinNum: '3',
						num: '8'
					},
					{
						id: 2,
						name: '313131313',
						type: 1,
						status: 1,
						budget: 1000,
						createTime: 1588902864,
						city: 0,
						skills: '1,2',
						period: '6',
						joinNum: '3',
						num: '8'
					},
					{
						id: 3,
						name: '4141441',
						type: 1,
						status: 1,
						budget: 1000,
						createTime: 1588902864,
						city: 0,
						skills: '1,2',
						period: '6',
						joinNum: '3',
						num: '8'
					}
				],
				loadList: true,
				listParams: {
					totalCount: 0,
					totalPage: 0,
					pageSize: 10,
					page: 1
				},
				collectList: [], //用户已经收藏的（影棚，器材)列表
				allCity: [], //全部城市选项
				cartInfo: null, //购物车信息
				showContact: false, //显示联系客服模块
				showSearch: true, //是否显示搜索框模块
				budget: 0,
				projectStatus: 0,
				projectList: [], //项目类型列表
				budgetList: [], //项目预算列表
				projectStatusList: [], //项目状态列表
				workFlowList: [{
						title: '需求方',
						content: '发布需求，投标开始'
					},
					{
						title: '服务商',
						content: '根据需求投标'
					},
					{
						title: '需求方',
						content: '筛选服务商'
					},
					{
						title: '服务商',
						content: '开始服务'
					},
					{
						title: '服务商',
						content: '完成工作，提交验收'
					},
					{
						title: '需求方',
						content: '验收并且支付尾款'
					},
				],
			};
		},
		components: {
			frontSearchbox,
			productList,
			recommendGood,
			selectCity,
			find,
			pagination,
			contact,
			cart,
			shootingList,
			demandList
		},
		watch: {
			dateStart: function(to, from) {
				this.listParams.page = 1;
				this.util
					.setTimeStart(this, "dateStart", "dateEnd", "addOption", "time")
					.then(res => {
						if(res) {
							this.getList();
						}
					});
			},
			dateEnd: function(to, from) {
				this.listParams.page = 1;
				this.util.setTimeEnd(this, "dateStart", "dateEnd", "addOption", "time");
				this.getList();
			},
			projectType: function(to, from) {
				this.listParams.page = 1;
				let value = "";
				if(to > 0) {
					value = this.getNameByList(to, "projectList");
				}
				this.addOption("projectList", value);
				this.getList();
			},
			projectStatus: function(to, from) {
				this.listParams.page = 1;
				let value = "";
				if(to > 0) {
					value = this.getNameByList(to, "projectStatusList");
				}
				this.addOption("projectStatusList", value);
				this.getList();
			},
			budget: function(to, from) {
				this.listParams.page = 1;
				let value = "";
				if(to > 0) {
					value = this.getNameByList(to, "budgetList");
				}
				this.addOption("budgetList", value);
				this.getList();
			},
			cityCode: function(to, from) {
				this.listParams.page = 1;
				console.log("cityCode-----", this.cityCode);
				this.getCity();
				this.getNameById();
			},
			searchTxt(to, from) {
				this.listParams.page = 1;
				console.log("searchTxt------------", this.searchTxt);
				this.addOption("search", to);
				this.getList();
			}
		},
		created() {
			//如果从首页搜索跳转过来
			if(this.$route.query.searchText) {
				this.search(this.$route.query.searchText);
			}
			//获取全部城市信息
			this.allCity = this.config.allCityCode;

			//项目类型列表
			this.projectList = this.config.projectList;
			this.addFirstOption(this.projectList);

			//项目预算列表
			this.budgetList = this.config.budgetList;
			this.addFirstOption(this.budgetList);

			//项目状态列表
			this.projectStatusList = this.config.projectStatusList;
			this.addFirstOption(this.projectStatusList);

			//获取影棚列表
			this.getList();

			//初始化数据
			this.studioList = this.config.projectType;
			this.priceList = this.config.priceRange;
			this.studioSizeList = this.config.squareArray;
		},
		computed: {
			...mapGetters(["city_code"])
		},
		mounted() {
			Array.prototype.remove = function(val) {
				var index = this.indexOf(val);
				if(index > -1) {
					this.splice(index, 1);
				}
			};
		},
		methods: {
			//跳转到我要发布需求页面
			toAddDemand() {
				console.log('toAddDemand------');
				this.util.toAddDemand();
			},
			//为类型列表添加不限选项
			addFirstOption(list) {
				let obj = {
					id: 0,
					name: '不限'
				}
				list.unshift(obj);
			},
			// 点击默认，价格或者销量
			changeSort(val) {
				if(val == 1) {
					// 默认
					this.type = 0;
					this.curIndex = 1;
				} else if(val == 2) {
					// 价格
					this.orderBy = "priceWorkDayWorkTimePerHour";
					if(this.curIndex == 2) {
						this.order = this.order == "asc" ? "desc" : "asc";
					} else {
						this.curIndex = 2;
						this.order = "asc";
					}
					this.type = 1;
				} else {
					// 销量
					this.orderBy = "total";
					if(this.curIndex == 3) {
						this.order = this.order == "asc" ? "desc" : "asc";
					} else {
						this.curIndex = 3;
						this.order = "asc";
					}
					this.type = 2;
				}
				this.getList();
			},
			//根据id，获取列表中对应的名称
			getNameByList(id, list) {
				let val = "";
				this[list].forEach((item, index) => {
					if(item.id == id) {
						val = item.name;
					}
				});
				return val;
			},
			//获取城市并添加城市选项
			getCity() {
				let value = "";
				if(this.cityCode > 0) {
					//添加城市选项
					this.allCity.forEach((item, index) => {
						if(this.cityCode == item.code) {
							value = item.city;
						}
					});
				}
				this.addOption("city", value);
			},
			//根据id获取对象数组的name属性值
			getNameById(id, list) {
				list.forEach((item, index) => {
					if(item.id == id) {
						return item.name;
					}
				});
			},
			//获取任务需求列表数据
			getList() {
				let params = {
					is_valid:1,
					page: this.listParams.page,
					page_size: this.listParams.pageSize,
				};
				if(this.projectType>0){
					params.type=this.projectType;
				}
				if(this.searchTxt) {
					params.search = this.searchTxt;
				}
				if(this.cityCode>0) {
					params.city_code = this.cityCode;
				}
				if(this.projectStatus>0){
					params.status=parseInt(this.projectStatus)-1;
				}
				if(this.dateStart) {
					params.st_time = this.dateStart;
				}
				if(this.dateEnd) {
					params.et_time = this.dateEnd;
				}
				
				params.min_price=this.getBudget()[0];
				params.max_price=this.getBudget()[1];

				this.util.getBiddingList(params)
					.then(res => {
						console.log("getStudioList----", res);
						this.listParams.totalCount = res.total_count;
						this.listParams.pageSize = parseInt(res.page_size);
						this.listParams.page = res.page;
						this.listParams.totalPage = Math.ceil(
							res.total_count / res.page_size
						);
						this.list = res.rows;
						this.loadList = false;

						console.warn("list----", this.list);
					})
					.catch(err => {});
			},
			//获取预算价格参数
			getBudget(){
				let list=[null,null];
				switch(parseInt(this.budget)){
					case 1:
						list[1]=500;
						break;
					case 2:
						list[0]=500;
						list[1]=1000;
						break;
					case 3:
						list[0]=1000;
						list[1]=5000;
						break;
					case 4:
						list[0]=5000;
						break;
					case 5:
						break;
				}
				return list;
			},
			////判断是否已经登录，为列表添加是否已经收藏的字段
			getCollectList() {
				if(this.util.userIsLogin()) {
					userGetList("1").then(res => {
						console.log("userGetList-------", res);
						this.collectList = res.result;
						this.collectList.forEach((item, index) => {
							this.list.forEach((subItem, index2) => {
								if(item.id == subItem.id) {
									this.$set(subItem, "isCollect", true);
								}
							});
						});
					});
				}
			},

			//添加、修改选项方法
			addOption(type, value) {
				let val = type + "=" + value;
				if(type == "provide") {
					this.selectOption.push(val);
					//根据设施选项转成对应的选项下标
					this.changeCondition();
					this.getStudioList();
					return;
				}
				//判断是否已经有该类型的选项，如果有就是修改
				let i;
				this.selectOption.forEach((item, index) => {
					if(item.split("=")[0] == type) {
						i = index;
					}
				});
				//如果传值为空，或者为false，就是删除该选项
				if(!value) {
					this.selectOption.splice(i, 1);
				} else {
					if(i >= 0) {
						this.selectOption[i] = val;
					} else {
						this.selectOption.push(val);
					}
				}
				console.log("selectOption--", this.selectOption);
			},
			//删除选项方法,并把该类型位置设置为不限(影棚类型，影棚大小，单价范围)
			delOption(item) {
				console.log("delOption---", item);
				console.log("selectOption----", this.selectOption);
				let index = this.selectOption.indexOf(item);
				if(index < 0) return;
				console.log("delOption----", index);
				let type = item.split("=")[0];
				console.log("type----", type);
				if(type == "provide") {
					let val = item.split("=")[1];
					this.delCondition(item);
				} else {
					//设置为不限并删除选项的选项
					this.resetOption(type);
				}
			},
			//清空所有选项方法
			clearAllOption() {
				this.resetOption("all");
			},
			//回复选项位置
			resetOption(type) {
				switch(type) {
					case "all":
						this.searchTxt = "";
						this.resetSearch();
						this.dateStart = "";
						this.dateEnd = "";
						this.projectType = 0;
						this.cityCode = "0";
						this.getList();
						break;
					case "time":
						this.addOption("time", "");
						this.dateStart = "";
						this.dateEnd = "";
						break;
					case "projectType":
						this.projectType = 0;
						break;
					case "city":
						this.cityCode = "0";
						break;
					case "search":
						this.searchTxt = "";
						this.resetSearch();
						break;
				}
			},
			//如果删除搜索内容或者清空选项，需要重新加载搜索框模块
			resetSearch() {
				this.showSearch = false;
				this.$nextTick(() => {
					this.showSearch = true;
				});
			},
			changeCity(command) {
				this.cityCode = command.code;
				this.getList();
				console.log("this.cityCode---", this.cityCode);
			},
			changePage(val) {
				console.log("changePage----", val);
				this.listParams.page = val;
				this.getList();
			},
			operatePage(type) {
				if(type == "prev") {
					if(this.listParams.page > 1) {
						this.listParams.page--;
						this.getList();
					}
				} else {
					if(this.listParams.page != this.listParams.totalPage) {
						this.listParams.page++;
						this.getList();
					}
				}
			},
			search(val) {
				console.log("search1111----", val);
				this.searchTxt = val;
				this.getList();
			},
			footSearch(val) {
				console.log("footSearch----", val);
			},
			toCartPage() {
				this.util.toCartPage();
			},

		}
	};
</script>

<style lang="scss" scoped>
	@import "@front/common/common.scss";
	.find {
		background: #fff;
		padding: 30px 0px 20px 20px;
		color: #333333;
		font-family: PingFangSC-Regular;
		margin: 80px 0px;
		.tips {
			margin-bottom: 30px;
		}
		&>div {
			display: flex;
			align-items: baseline;
			span {
				margin-right: 20px;
			}
			ul {
				display: flex;
				li {
					color: #7c6aff;
					margin-right: 20px;
					cursor: pointer;
				}
			}
		}
	}
	
	.mainInfo {
		display: flex;
		.front_options{
			width:946px;
			flex:none;
			margin-right:10px;
		}
		.biddingContent {
			background: #fff;
			padding: 10px;
			flex: 1;
			.el-image{
				margin-bottom:30px;
			}
			.title{
				display:inline-block;
				font-weight:600;
				margin-bottom:10px;
			}
			p{
				color:#666;
			}
			button{
				color:#fff;
				background:$Theme-color;
				padding:10px;
				border-radius:4px;
				border:none;
				margin-top:30px;
			}
		}
	}
	/*中间主体部分*/
	
	.main {
		margin-top: 10px;
		display: flex;
		.rightInfo {
			/*width:100%;*/
			width: 946px;
			margin-right: 10px;
			background: #fff;
			padding: 10px;
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 10px;
				border-bottom: 1px solid #f0f0f0;
				margin-bottom: 10px;
				font-size: 0px;
				span,
				i {
					font-size: 14px;
				}
				.num {
					color: #ff641f;
				}
				.curPage {
					margin-left: 10px;
				}
				.total {
					margin-right: 10px;
				}
				p {
					i {
						cursor: pointer;
						border: 1px solid #eee;
					}
				}
			}
		}
	}
	
	.findNot {
		background: #fff;
		text-align: center;
		padding: 30px 0px;
		margin: 10px 0px;
		.info {
			display: flex;
			align-items: baseline;
			justify-content: center;
			font-size: 20px;
			p {
				color: #999999;
			}
			span {
				color: #333333;
			}
		}
		.toBack {
			font-size: 12px;
			color: #999;
			margin: 10px 0px;
		}
		button {
			background: #f6f6f6;
			color: #333333;
			border-radius: 0px;
			margin-bottom: 30px;
		}
		.option {
			display: flex;
			justify-content: center;
			&>div {
				width: 885px;
				height: 105px;
				background: #fafafa;
				padding: 20px 0px 20px 12vw;
			}
			.delOption {
				display: flex;
				font-size: 20px;
				font-weight: 600;
				margin-bottom: 10px;
				p {
					color: #7c6aff;
				}
				span {
					color: #666;
					font-weight: 400;
				}
			}
		}
	}
	
	/deep/ {
		.el-date-editor {
			width: 95px;
		}
		.el-input__suffix {
			top: -10px;
		}
	}
	
	.pagination {
		display: flex;
		justify-content: flex-end;
		margin-top: 20px;
	}
	
	.sort.up {
		&:before {
			border-bottom-color: #651fff;
			border-bottom: 6px solid #651fff;
		}
	}
	
	.sort.down {
		&:after {
			border-top-color: #651fff;
			border-top: 6px solid #651fff;
		}
	}
	
	.sort {
		color: #303133;
		margin-right: 40px;
		position: relative;
		cursor: pointer;
		&:before {
			content: "";
			border-bottom: 6px solid #d8d8d8;
			border-left: 4px solid transparent;
			border-right: 4px solid transparent;
			position: absolute;
			right: -14px;
			top: 1px;
		}
		&:after {
			content: "";
			border-top: 6px solid #d8d8d8;
			border-left: 4px solid transparent;
			border-right: 4px solid transparent;
			position: absolute;
			right: -14px;
			top: 9px;
		}
		&:hover {
			color: #651fff;
		}
	}
	
	.active {
		font-weight: 600;
		color: #651fff;
	}
	
	.radio-hover {
		cursor: pointer;
	}
	
	.pagination {
		justify-content: flex-start!important;
	}
	
	.workFlow {
		background: #fff;
		padding: 10px;
		margin-bottom: 15px;
		ul {
			background: #E8EAFE;
			display: flex;
			align-items: center;
			overflow: hidden;
			li {
				flex: 1;
				font-size: 17px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				&>div {
					display: flex;
					justify-content: flex-start;
					flex-direction: column;
					padding: 15px;
					position: relative;
					left: 0px;
					z-index: 200;
					&.addLeft {
						left: 30px;
					}
					p {
						margin-top: 15px;
						font-weight: 600;
					}
				}
				.arrow {
					position: relative;
					top: -65px;
				}
				.arrow:after,
				.arrow:before {
					width: 0;
					height: 0;
					border-top: 65px solid transparent;
					border-left: 30px solid transparent;
					border-bottom: 65px solid transparent;
					border-left-color: #fff;
					position: absolute;
					content: "";
				}
				.arrow:before {
					top: 0;
					left: -8px;
					border-left-color: #E8EAFE;
					z-index: 100;
				}
			}
		}
	}
</style>