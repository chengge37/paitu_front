<template>
	<div>
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
						<el-button class="word-hover" type="text" v-show="selectOption.length>0" @click="clearAllOption()">清空类型筛选</el-button>
					</ul>
				</div>
			</div>
			<div class="rightShow">
				<front-searchbox :searchTxt="searchTxt" @search="search" v-if="showSearch"></front-searchbox>
				<!--购物车模块-->
				<cart :res="cartInfo" v-if="cartInfo"></cart>
			</div>
		</div>

		<!--选项选择模块-->
		<div class="front_options radio-setting modelSearch">
			<ul>
				<li>
					<span>服务城市：</span>
					<select-city :code="cityCode" @changeCity="changeCity"></select-city>
				</li>
				<li>
					<span>性别：</span>
					<el-radio-group v-model="sex">
						<el-radio v-for="(item,index) in sexType" :key="item.id" :label="item.id">
							<span class="word-hover">{{item.name}}</span>
						</el-radio>
					</el-radio-group>
				</li>
			</ul>
			
		</div>

		<!--中间主体部分模块-->
		<div class="main radio-setting">
			<div class="leftInfo">
				<recommend-good type="5"></recommend-good>
			</div>
			<div class="rightInfo">
				<div v-if="listParams.totalCount!=0">
					<div class="top">
						<div style="user-select:none;">
							<span :class="{active:curIndex==index+1,sort:index>0,up:index>0&&curIndex==index+1&&order=='asc',down:index>0&&curIndex==index+1&&order=='desc'}" class="radio-hover" v-for="(item,index) in orderType" :key="index" :label="index" @click="changeSort(index+1)">{{item}}</span>
						</div>
						<p>
							<span>共</span>
							<span class="num">{{listParams.totalCount}}</span>
							<span>个助理</span>
							<span class="num curPage">{{listParams.page}}</span>
							<span class="total">/{{listParams.totalPage}}</span>
							<i class="el-icon-arrow-left page-hover" @click="operatePage('prev')"></i>
							<i class="el-icon-arrow-right page-hover" @click="operatePage('next')"></i>
						</p>
					</div>

					<!--列表模块-->
					<shooting-list :list="list" type="4"></shooting-list>
				</div>

				<div class="findNot" v-if="listParams.totalCount==0 && !loadList">
					<div class="info">
						<p>为您找到 0 个</p>
						<span>"相关助理"</span>
					</div>
					<p class="toBack">请您返回上一级操作</p>
					<el-button @click="clearAllOption()">返回</el-button>
					
				</div>
			</div>
		</div>
		<!--分页模块-->
		<pagination :total="listParams.totalCount" :page="parseInt(listParams.page)" :pagesize="listParams.pageSize" @getPageNum="changePage" class="pagination"></pagination>

		<!--联系客服模块-->
		<contact :cartInfo="cartInfo" v-if="showContact"></contact>
		
	
		
		
		
	</div>
</template>

<script>
	import frontSearchbox from "FrontComponents/frontSearchBox";
	import shootingList from "FrontComponents/shootingList";
	import recommendGood from "FrontComponents/recommendGood";
	import pagination from "FrontComponents/pagination";
	import selectCity from "FrontComponents/selectCity";
	import contact from "FrontComponents/contact";
	import cart from "FrontComponents/cart";
	import { userGetList } from "@util/common.js";
	import { mapGetters } from "vuex";

	export default {
		data() {
			return {
				searchTxt: "",
				type: 0,
				//默认默认
				curIndex: 1,
				order: "asc",
				orderType: ["默认", "价格", "销量"],
				clearAll: false,
				selectOption: [],
				cityCode: "0",   //城市
				list: [],
				loadList: true,
				listParams: {
					totalCount: 0,
					totalPage: 0,
					pageSize: 48,
					page: 1
				},
				sexType:[
					{id:0,name:'不限'},
					{id:1,name:'男'},
					{id:2,name:'女'},
				],
				sex:0, //性别
				collectList: [], //用户已经收藏的（影棚，器材)列表
				allCity: [], //全部城市选项
				cartInfo: null, //购物车信息
				showContact: false, //显示联系客服模块
				showSearch: true, //是否显示搜索框模块
				
			};
		},
		components: {
			frontSearchbox,
			shootingList,
			recommendGood,
			selectCity,
			find,
			pagination,
			contact,
			cart
		},
		watch: {
			cityCode: function(to, from) {
				this.listParams.page = 1;
				console.log("cityCode-----", this.cityCode);
				this.getCity();
				this.getAssistantList();
			},
			searchTxt(to, from) {
				this.listParams.page = 1;
				console.log("searchTxt------------", this.searchTxt);
				this.addOption("search", to);
				this.getAssistantList();
			}
		},
		created() {
			
			//如果从首页搜索跳转过来
			let query=this.$route.query;
			if(query.searchText) {
				this.search(this.$route.query.searchText);
			}
			
			//获取全部城市信息
			this.allCity = this.config.allCityCode;

			//获取模特列表
			this.getAssistantList();
		},
		computed: {
			...mapGetters(["city_code"])
		},
		mounted() {
			
		},
		methods: {
			//切换选项
			changeOption(type,to){
				let flag=type;
				this.listParams.page = 1;
				console.log("to----", to);
				let value = "";
				if(to > 0) {
					value = this.getNameByList(to, flag);
				}
				this.addOption(flag, value);
				this.getAssistantList();
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
				this.getAssistantList();
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
			//获取购物车信息
			getCartInfo() {
				this.util.getOrderCart().then(res => {
					this.cartInfo = res;
					this.showContact = true;
				});
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
			//获取模特列表数据
			getAssistantList() {
				let params={
					page:this.listParams.page,
					page_size:this.listParams.pageSize,
					is_up:1,  //只显示上架的助理
					isAutoMsg:1
				};
				
				console.log('params-----------',params);
				this.util.getAssistantList(params).then(res=>{
					console.log('getAssistantList--------',res);
					this.listParams.totalCount = res.total_count;
					this.listParams.pageSize = parseInt(res.page_size);
					this.listParams.page = res.page;
					this.listParams.totalPage = Math.ceil(
						res.total_count / res.page_size
					);
					this.list = res.rows;
					this.loadList = false;
					
					//为列表添加是否已经收藏的字段
          			this.getCollectList();
				})
			},
			////判断是否已经登录，为列表添加是否已经收藏的字段
			getCollectList() {
				if(this.util.userIsLogin()) {
					userGetList("4").then(res => {
						console.log("userGetList-------", res);
						this.collectList = res.result;
						this.collectList.forEach((item, index) => {
							this.list.forEach((subItem, index2) => {
								if(item.id == subItem.id) {
									this.$set(subItem, "isCollect", true);
								}
							});
						});
						console.log('this.list-------------',this.list);
					});
				}
			},
			
			//添加、修改选项方法
			addOption(type, value) {
				let val = type + "=" + value;
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
			//删除选项方法,并把该类型位置设置为不限()
			delOption(item) {
				let index = this.selectOption.indexOf(item);
				if(index < 0) return;
				let type = item.split("=")[0];
				console.log("type----", type);
				//设置为不限并删除选项的选项
				this.resetOption(type);
			},
			//清空所有选项方法
			clearAllOption() {
				this.resetOption("all");
			},
			//重置选项位置
			resetOption(type) {
				switch(type) {
					case "all":
						this.cityCode = "0";
						this.sex = 0;
						this.modelIndex=0;
						this.style=0;
						break;
					case "sexType":
						this.sex = 0;
						break;
				}
			},
			changeCity(command) {
				this.cityCode = command.code;
				console.log("this.cityCode---", this.cityCode);
			},
			changePage(val) {
				console.log("changePage----", val);
				this.listParams.page = val;
				this.getAssistantList();
			},
			operatePage(type) {
				if(type == "prev") {
					if(this.listParams.page > 1) {
						this.listParams.page--;
						this.getAssistantList();
					}
				} else {
					if(this.listParams.page != this.listParams.totalPage) {
						this.listParams.page++;
						this.getAssistantList();
					}
				}
			},
			search(val) {
				console.log("search1111----", val);
				this.searchTxt = val;
				this.getAssistantList();
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
	/*中间主体部分*/
	
	.main {
		margin-top: 10px;
		display: flex;
		.rightInfo {
			/*width:100%;*/
			width: 946px;
			margin-left: 10px;
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
	.modelSearch{
		display:flex;
		.searchModule{
			position:relative;
			.content{
				color:$Theme-color;
				position:absolute;
				top:165px;
				left:105px;
				span{
					font-size:20px;
					padding-bottom:7px;
					display:inline-block;
				}
				p{
					color:$Theme-color;
					padding-bottom:7px;
				}
				.btn{
					font-size:14px;
					color:#fff;
					display:inline-block;
					padding:10px 15px;
					background:linear-gradient(180deg,rgba(158,66,255,1) 0%,rgba(101,31,255,1) 100%);
					border-radius:4px;
				}
			}
		}
	}
	.front_options{
		padding:0px 0px 0px 40px;
	}
	.modelTable{
		.options{
			display:flex;
			/deep/{
				.el-input__suffix{
					top:0px;
				}
				.el-input--suffix{
					margin:25px;
					width:75%;
				}
			}
			.leftInfo{
				width:700px;
				height:570px;
				.item{
					height:100px;
					border:1px solid #E0E0E0;
					margin-bottom:10px;
					.sliderInfo{
						width:80%;
						margin:0px auto;
						margin-top:10px;
					}
					p{
						padding:10px 24px;
						border-bottom:1px solid #E0E0E0;
					}
				}
				.otherInfo{
					display:flex;
					align-items:center;
					justify-content: space-between;
					.otherItem{
						border:1px solid #E0E0E0;
						margin-right:10px;
						&:last-child{
							margin-right:0px;
						}
						p{
							padding:10px 24px;
							border-bottom:1px solid #E0E0E0;
						}
						.el-radio-group{
							display:flex;
							align-items: center;
						}
					}
				}
			}
			
			.rightContent{
				flex:1;
				height:570px;
				border:1px solid #E0E0E0;
				margin-left:20px;
				ul{
					li{
						p{
							padding:10px 24px;
							border-bottom:1px solid #F0F0F0;
						}
						.el-slider{
							width:80%;
							margin:18px auto;
						}
					}
				}
			}
		}
		
		.operateBtn{
			padding:30px 0px 0px 0px;
			display:flex;
			justify-content:center;
			span{
				margin-right:20px;
				display:inline-block;
				color:#fff;
				padding:10px 50px;
				background:linear-gradient(180deg,rgba(158,66,255,1) 0%,rgba(101,31,255,1) 100%);
				border-radius:4px;
			}
		}
	}
</style>