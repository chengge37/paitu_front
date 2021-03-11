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
						<el-button class="word-hover" type="text" v-show="selectOption.length>0" @click="clearAllOption()">清空所有筛选</el-button>
					</ul>
				</div>
			</div>
			<div class="rightShow">
				<front-searchbox :searchTxt="searchTxt" @search="search" v-if="showSearch"></front-searchbox>
				<!--购物车模块-->
				<cart :res="cartInfo" v-if="cartInfo"></cart>
			</div>
		</div>

		<!--类型选择模块-->
		<div class="selectType">
			<ul>
				<li class="cursor" :class="{'active':selectType==item.id}" @click="changeType(item.id)" v-for="(item,index) in selectTypeList" :key="index">
					{{item.name}}
				</li>
			</ul>
		</div>
		
		<!--摄影服务分类-->
		<!--选项选择模块-->
		<div class="front_options radio-setting" v-if="selectType!=0">
			<ul>
				<li>
					<span>服务城市：</span>
					<select-city :code="cityCode" @changeCity="changeCity"></select-city>
				</li>
				<li>
					<span>{{titleList[parseInt(selectType)-1]}}：</span>
					<el-radio-group v-model="serviceType">
						<el-radio v-for="(item,index) in serviceTypeList"  :key="index" :label="item.id">
							<span class="word-hover">{{item.name}}</span>
						</el-radio>
					</el-radio-group>
				</li>
			</ul>
		</div>
		
		
		<!--拼拍分类-->
		<!--选项选择模块-->
		<div class="front_options radio-setting" v-if="selectType==0">
			<ul>
				<li>
					<span>服务城市：</span>
					<select-city :code="cityCode" @changeCity="changeCity"></select-city>
				</li>
				<li>
					<span>拍摄行业：</span>
					<el-radio-group v-model="pinType">
						<el-radio v-for="(item,index) in typeList"  :key="index" :label="item.id">
							<span class="word-hover">{{item.name}}</span>
						</el-radio>
					</el-radio-group>
				</li>
				<li>
					<span>拍摄风格：</span>
					<el-radio-group v-model="way">
						<el-radio v-for="(item,index) in wayList"  :key="index" :label="item.id">
							<span class="word-hover">{{item.name}}</span>
						</el-radio>
					</el-radio-group>
				</li>
				<li>
					<span>拍摄方式：</span>
					<el-radio-group v-model="classify">
						<el-radio v-for="(item,index) in classifyList"  :key="index" :label="item.id">
							<span class="word-hover">{{item.name}}</span>
						</el-radio>
					</el-radio-group>
				</li>
				<li>
					<span>模特需求：</span>
					<el-radio-group v-model="obj">
						<el-radio v-for="(item,index) in objList"  :key="index" :label="item.id">
							<span class="word-hover">{{item.name}}</span>
						</el-radio>
					</el-radio-group>
				</li>
			</ul>
		</div>
		

		<!--中间主体部分模块-->
		<div class="main radio-setting">
			<div class="leftInfo">
				<recommend-good type="3"></recommend-good>
			</div>
			<div class="rightInfo" v-loading="loadList">
				<!--<div v-if="listParams.totalCount!=0">-->
				<div v-if="serviceList.length>0">
					<div class="top">
						<div style="user-select:none;">
							<span :class="{active:curIndex==index+1,sort:index>0,up:index>0&&curIndex==index+1&&order=='asc',down:index>0&&curIndex==index+1&&order=='desc'}" class="radio-hover" v-for="(item,index) in orderType" :key="index" :label="index" @click="changeSort(index+1)">{{item}}</span>
						</div>
						<p>
							<span>共</span>
							<span class="num">{{listParams.totalCount}}</span>
							<span>个服务</span>
							<span class="num curPage">{{listParams.page}}</span>
							<span class="total">/{{listParams.totalPage}}</span>
							<i class="el-icon-arrow-left page-hover" @click="operatePage('prev')"></i>
							<i class="el-icon-arrow-right page-hover" @click="operatePage('next')"></i>
						</p>
					</div>

					<!--列表模块//type 0:模特  1:摄影服务  2：团购拼拍  3：红人服务   -->
					<shooting-list :list="serviceList" v-if="selectType!=0" type="1"></shooting-list>
					<shooting-list :list="serviceList" v-if="selectType==0" type="2"></shooting-list>
				</div>

				<div class="findNot" v-if="listParams.totalCount==0 && !loadList">
					<div class="info">
						<p>为您找到 0 个</p>
						<span>"相关服务"</span>
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
				selectOption: [],
				selectType:-1, //选择类型
				selectTypeList:[],
				serviceCategoryList:[],  //服务分类属性列表
				cityCode: "0",
				serviceList: [],  //服务列表
				loadList: true,
				listParams: {
					totalCount: 0,
					totalPage: 0,
					pageSize: 48,
					page: 1
				},
				collectList: [], //用户已经收藏的（影棚，器材)列表
				allCity: [], //全部城市选项
				cartInfo: null, //购物车信息
				showContact: false, //显示联系客服模块
				showSearch: true, //是否显示搜索框模块,
				serviceType:0, //拍摄行业
				titleList:['拍摄行业','服务行业','增值服务类型'],  //分类标题
				serviceTypeList:[], //行业分类列表
				typeList:[],   //拼拍拍摄行业列表
				wayList:[],   //拼拍拍摄风格列表
				classifyList:[],  //拼拍方式列表
				objList:[],   //拼拍模特需求列表
				pinType:0,  
				way:0,
				classify:0,
				obj:0,
				loadList:true,
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
			pinType(to,from){
				this.changeOption('typeList',to);
			},
			way(to,from){
				this.changeOption('wayList',to);
			},
			classify(to,from){
				this.changeOption('classifyList',to);
			},
			obj(to,from){
				this.changeOption('objList',to);
			},
			serviceType(to, from) {
			  console.log('serviceType-------',to);
		      this.changeOption('serviceTypeList',to);
		    },
			cityCode: function(to, from) {
				this.listParams.page = 1;
				console.log("cityCode-----", this.cityCode);
				this.getCity();
				this.getList();
			},
			searchTxt(to, from) {
				this.listParams.page = 1;
				console.log("searchTxt------------", this.searchTxt);
				this.addOption("search", to);
				this.getList();
			}
		},
		created() {
			this.modelTypeList=this.config.modelTypeList;
			this.shootingTypeList=this.config.shootingTypeList;
			this.shootMethodList=this.config.shootMethodList;
			
			this.typeList=this.util.deepcopy(this.config.pinpaiType);
			this.wayList=this.util.deepcopy(this.config.pinpaiWay);
			this.classifyList=this.util.deepcopy(this.config.pinpaiClassify);
			this.objList=this.util.deepcopy(this.config.pinpaiObj);
			
			//为分类添加一个不限的分类
			let obj={
				id:0,
				name:'不限'
			}
			this.typeList.unshift(obj);
			this.wayList.unshift(obj);
			this.classifyList.unshift(obj);
			this.objList.unshift(obj);
			
			//获取全部城市信息
			this.allCity = this.config.allCityCode;
			//获取已经收藏列表,首先判断用户是否有登录，如果没有，不用获取
			if(this.util.userIsLogin()) {
				userGetList("1").then(res => {
					console.log("userGetList-------", res);
					this.collectList = res.result;
				});
				//获取购物车信息
				this.getCartInfo();
			} else {
				//没有登录也显示联系客服模块
				this.showContact = true;
			}

			//获取服务分类
			this.getServiceCategory();

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
				let value = "";
				if(to > 0) {
					value = this.getNameByList(to, flag);
				}
				this.addOption(flag, value);
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
			//获取服务分类
			getServiceCategory(){
				this.util.getServiceCategory().then(res=>{
					console.log('getServiceCategory------',res);
					this.serviceCategoryList=res;
					res.forEach((item,index)=>{
						let obj={
							id:item.id,
							name:item.name,
						}
						this.selectTypeList.push(obj);
					})
					
					//添加一个拼拍分类类别
					let obj={
						id:0,
						name:'拼拍'
					}
//					this.selectTypeList.push(obj);
					this.selectTypeList.splice(1,0,obj);
					this.selectType=res[0].id;
					this.getServiceType(this.selectType);
					
					//获取地址相关参数
					let query = this.$route.query;
					console.log("query----", query);
					if(JSON.stringify(query) != "{}") {
						if(query.search) {
							this.searchTxt = query.search;
						}
						//分类id   0/拼拍，1/平面，2/视频，3/后期
						if(query.classifyId){
							let id=query.classifyId;
							if(query.classifyId!=0){
								this.selectType=id;
							}else{
								this.pinType=id;
							}
						}
						//type, 分类id
						if(query.type){
							this.serviceType=query.type;
						}else{
							this.selectType=res[0].id;
						}
						this.getServiceType(this.selectType);
					}
					
					//获取摄影服务列表
					this.getList();
				})
			},
			
			//根据服务分类id获取对应服务类型
			getServiceType(id){
				this.serviceTypeList=[];
				console.log('before-----',this.serviceTypeList);
				this.serviceCategoryList.forEach((item,index)=>{
					let tempList=[];
					if(item.id==id){
						this.serviceTypeList=this.util.deepcopy(item.children);
					}
				})
				//为分类添加一个不限的分类
				let obj={
					id:0,
					name:'不限'
				}
				this.serviceTypeList.unshift(obj);
				console.log('serviceTypeList-----',this.serviceTypeList);
			},
			
			//获取服务（或者拼拍）列表
			getList(){
				if(this.selectType==0){
					this.getTeamList();
				}else{
					this.getServiceList();
				}
			},
			
			//获取摄影服务列表数据
			getServiceList() {
				this.loadList=true;
				let params = {
					page: this.listParams.page,
					page_size: this.listParams.pageSize,
					category_id:this.selectType,  //分类id
					serach:'',  //搜索内容
					isAutoMsg:1, //自动获取uid 或 to_uid address_id 的补通信息
				};
				if(this.cityCode>0){
					params.city_code=this.cityCode;
				}
				console.log("params--------------------------", params);
				this.util.getServiceList(params).then(res => {
						console.log("getServiceList----", res);
						this.listParams.totalCount = res.total_count;
						this.listParams.pageSize = parseInt(res.page_size);
						this.listParams.page = res.page;
						this.listParams.totalPage = Math.ceil(
							res.total_count / res.page_size
						);
						//为列表添加一个显示的价格
						this.serviceList = res.rows;
						let price='';
						let showPrice='';
						this.serviceList.forEach((item,index)=>{
							let maxPro=Math.max.apply(Math,item.norms.map(item => { return item.priority }))
							item.norms.forEach((item2,index2)=>{
								if(item2.priority==maxPro){
									price=item2.price;
									showPrice=item2.show_price;
								}
							})
							item.price=price;
							item.showPrice=showPrice;
						})
						//为列表添加一个是否已经收藏字段
						this.getCollectList('5');
						
						console.error("getServiceList----", res);
						
						setTimeout(()=>{
							this.loadList = false;
						},300);
					})
					.catch(err => {});
			},
			
			//获取拼拍列表
			getTeamList() {
				this.loadList = true;
				let params = {
					page: this.listParams.page,
					page_size: this.listParams.pageSize,
					is_up:1,  //用户端必须1上架，后台不传获取所有
					del:0, //用户端必须0，后台不穿获取所有
					is_user:1,  //用户端必须为1 作用是获取当前时间上架且通过审核的拼拍
					valid:1,  //是否审核了
				};
				if(this.cityCode>0){
					params.city_code=this.cityCode;
				}
				if(this.pinType>0){
					params.team_type=this.pinType;
				}
				if(this.way>0){
					params.team_way=this.way;
				}
				if(this.classify>0){
					params.team_classify=this.classify;
				}
				if(this.obj>0){
					params.team_obj=this.obj;
				}
				console.log("params--------------------------", params);
				this.util.getTeamList(params).then(res => {
						console.log("getTeamList----", res);
						this.serviceList=res.rows;
						this.listParams.totalCount = res.total_count;
						this.listParams.pageSize = parseInt(res.page_size);
						this.listParams.page = res.page;
						this.listParams.totalPage = Math.ceil(
							res.total_count / res.page_size
						);
						
						//为列表添加一个是否已经收藏字段
						this.getCollectList('5');
						console.log("serviceList----", this.serviceList);
						setTimeout(()=>{
							this.loadList = false;
						},300);
						
					})
					.catch(err => {});
			},
			
			//切换类型
			changeType(id){
				this.selectType=id;
				if(id!=0){
					this.getServiceType(id);
				}
				this.getList();
				//清空所有选项
				this.clearAllOption('all');
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
			
			////判断是否已经登录，为列表添加是否已经收藏的字段,type:0表示店铺本身，1表示影棚，2表示设备，3表示活动 4模特 5拼拍
			getCollectList(type) {
				if(this.util.userIsLogin()) {
					userGetList(type).then(res => {
						console.log("userGetList-------", res);
						this.collectList = res.result;
						this.collectList.forEach((item, index) => {
							this.serviceList.forEach((subItem, index2) => {
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
			//删除设施判断
			delCondition(item) {
				
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
				//设置为不限并删除选项的选项
				this.resetOption(type);
			},
			//清空所有选项方法
			clearAllOption() {
				this.resetOption("all");
			},
			//回复选项位置
			resetOption(type) {
				switch(type) {
					case "all":
						this.serviceType = 0;
						this.pinType=0;
						this.way=0;
						this.classify=0;
						this.obj=0;
						this.cityCode='0';
						break;
					case "serviceTypeList":
						this.serviceType = 0;
						break;
					case "typeList":
						this.pinType=0;
						break;
					case "wayList":
						this.way=0;
						break;
					case "classifyList":
						this.classify=0;
						break;
					case "objList":
						this.obj=0;
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
			},
			changePage(val) {
				console.log("changePage----", val);
				this.listParams.page = val;
				this.getServiceList();
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
			/*.list {
				display: flex;
				flex-wrap: wrap;
				li {
					background: #fff;
					width: 224px;
					border: 1px solid #f0f0f0;
					color: #999;
					margin-right: 10px;
					margin-bottom: 10px;
					&:nth-child(4n) {
						margin-right: 0px;
					}
				}
			}*/
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
	.selectType{
		ul{
			display:flex;
			align-items:center;
			li{
				cursor:pointer;
				margin-right:5px;
				padding:20px 100px;
				background:#E0E0E0;
				&.active,&:hover{
					color:#fff;
					background:linear-gradient(270deg,rgba(158,66,255,1) 0%,rgba(101,31,255,1) 100%);
				}
			}
		}
	}
</style>