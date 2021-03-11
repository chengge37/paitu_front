<template>
	<div class="mainContent">

		<!--中间主体部分-->
		<div class="main_Info">

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
							<el-button type="text" v-show="selectOption.length>0" @click="clearAllOption()">清空所有筛选</el-button>
						</ul>
					</div>
				</div>
			</div>

			<!--选项选择模块-->
			<div class="front_options radio-setting">
				<ul>
					<!--<li>
						<span>使用城市：</span>
						<select-city @changeCity="changeCity"></select-city>
					</li>-->
					<li class="time">
						<span>开始时间：</span>
						<el-date-picker value-format="yyyy-MM-dd" v-model="dateStart" :picker-options="pickerOptionsStart" type="date" placeholder="yy-mm-dd"></el-date-picker>
						<span class="endDom widthAuto">结束时间：</span>
						<el-date-picker value-format="yyyy-MM-dd" v-model="dateEnd" :picker-options="pickerOptionsEnd" type="date" placeholder="yy-mm-dd"></el-date-picker>
					</li>
					<li>
						<span>器材类型：</span>
						<el-radio-group v-model="equipType" class="equip">
							<el-radio v-for="item in equipTypeList" :key="item.id" :label="item.id">
								<span class="word-hover">{{item.name}}</span>
							</el-radio>
						</el-radio-group>
					</li>
					<li class="price">
						<span>单价范围：</span>
						<el-radio-group v-model="equipPrice">
							<el-radio :label="item.id" v-for="(item,index) in priceRange" :key="index">
								<span class="word-hover">{{item.name}}</span>
							</el-radio>
						</el-radio-group>
						<span class="endDom widthAuto">送货上门：</span>
						<el-checkbox v-model="isTake" class="word-hover">是</el-checkbox>
					</li>
					<li v-show="showBrand">
						<span>品牌筛选：</span>
						<el-checkbox-group v-model="brand" @change="changeBrand" v-if="brandList.length>0">
							<el-checkbox :label="item.name" v-for="(item,index) in brandList" :key="index">
								<span class="word-hover">{{item.name}}</span>
							</el-checkbox>
						</el-checkbox-group>
						<span v-else>无</span>
					</li>
				</ul>
			</div>

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

			<!--商品列表模块-->
			<div class="goodList">
				<ul>
					<li class="card-hover" v-for="(item,index) in list" :key="index">
						<el-image style="width:280px;height:280px;" fit="contain" :src="util.picExplode(item.pic,config.defaultEquipPic)" :onerror="util.errorPic" @click="toEquipDetail(item.id)"  class="cursor" />
						<p class="word-hover cursor" @click="toEquipDetail(item.id)">{{item.custom_desc||item.name}}</p>
						<div class="detail">
							<div class="priceInfo">
								<span class="price">￥{{item.price}}</span>
								<span class="unit">/每小时</span>
							</div>
							<div class="saleInfo">
								<span>成交：</span>
								<span class="saleNum">{{item.total}}次</span>
							</div>
						</div>
					</li>
				</ul>
			</div>

			<!--分页模块-->
			<pagination :total="listParams.totalCount" :page="listParams.page" :pagesize="listParams.pageSize" @getPageNum="changePage" class="pagination"></pagination>

		</div>

	</div>
</template>

<script>
	import pagination from "FrontComponents/pagination";
	import selectCity from "FrontComponents/selectCity";
	import find from "FrontComponents/find";
	import { frontEquip } from "@config/api.js";
	export default {
		data() {
			return {
				sortIndex: 0,
				sortList: ['综合排序', '价格', '销量'],
				list: [],
				provideList: [],
				pickerOptionsStart:this.util.checkDateStart(this,'dateEnd'),
				pickerOptionsEnd:this.util.checkDateEnd(this,'dateStart'),
				dateStart: "",
				dateEnd: "",
				searchTxt: "",
				studioType: 0,
				equipType: '0',
				equipPrice: 0,
				type: 0,
				isTake: "",
				brand: [],
				conditionArray: "",
				clearAll: false,
				showBrand: false, //是否显示品牌选项
				brandList: [],
				selectOption: [],
				priceRange:[],
				equipTypeList:[],
				cityCode: "",
				listParams: {
					totalCount: 0,
					totalPage: 0,
					pageSize: 20,
					page: 1
				},
				uid:'',   //店家id
			}
		},
		components: {
			pagination,
			selectCity
		},
		watch: {
			isTake: function(to, from) {
				let value = "";
				if(to) {
					value = "包含器材";
				}
				this.addOption("isTake", value);
				this.getList();
			},
			equipPrice: function(to, from) {
				console.log("to----", to);
				let value = "";
				if(to > 0) {
					this.priceRange.forEach((item, index) => {
						if(item.id == to) {
							value = item.name;
						}
					});
				}
				this.addOption("equipPrice", value);
				this.getList();
			},
			dateStart: function(to, from) {
				this.util.setTimeStart(this,'dateStart','dateEnd','addOption','time').then(res=>{
					if(res){
						this.getList();
					}
				});
			},
			dateEnd: function(to, from) {
				this.util.setTimeEnd(this,'dateStart','dateEnd','addOption','time')
				this.getList();
			},
			equipType: function(to, from) {
				let value = "";
				console.log("to---", to);
				if(to > 0) {
					this.equipTypeList.forEach((item, index) => {
						if(item.id == to) {
							value = item.name;
						}
					});
					//获取品牌
					this.getBrandByCategory(to);
					this.showBrand = true;
				} else {
					this.showBrand = false;
				}
				//清空品牌
				this.brand = [];
				this.delAllBrand();
				this.addOption("equipType", value);
				this.getList();
			}
		},

		created() {
			//获取店家id
			let query = this.$route.query;
			if(JSON.stringify(query) != "{}") {
				if(query.uid) {
					this.uid=query.uid;
				}
			}
			
			//初始化数据
			this.studioList = this.config.studioType;
			this.priceList = this.config.priceRange;
			this.studioSizeList = this.config.squareArray;
			this.priceRange=this.config.priceRange;
			this.equipTypeList=this.util.getEquipArray();
			this.provideList.push('全部');
			this.config.conditionArray.forEach((item, index) => {
				this.provideList.push(item.name);
			})
			if(this.$route.query.startTime){
				this.dateStart=this.$route.query.startTime
			}
			if(this.$route.query.endTime){
				this.dateEnd=this.$route.query.endTime
			}

		},

		mounted() {
			Array.prototype.remove = function(val) {
				var index = this.indexOf(val);
				if(index > -1) {
					this.splice(index, 1);
				}
			};
			this.getEquipList();
		},
		methods: {
			//修改排序方法
			changeOrder(index){
				if(this.sortIndex==index) return;
				this.sortIndex=index;
				this.getEquipList();
			},
			//根据分类ID获取品牌
			getBrandByCategory(id) {
				let params = {
					category_id: id
				};
				this.getRequest(frontEquip.getBrandByCategory, params)
					.then(res => {
						console.log("getBrandByCategory----", res);
						this.brandList = res;
					})
					.catch(err => {});
			},
			getList() {
				if(!this.clearAll) {
					this.getEquipList();
				}
			},
			//获取器材列表数据
			getEquipList() {
				//转换相关的品牌id
				let params = {
					page: this.listParams.page,
					page_size: this.listParams.pageSize,
					typeClassify: this.equipType,
					equipPrice: this.equipPrice,
					brand: this.getBrandParams(),
					isTake: this.isTake ? 1 : 0,
					borrow_type:'0,2',
					uid:this.uid
				};
				if(this.cityCode){
					params.cityCode=this.cityCode;
				}
				if(this.dateStart) {
					params.dateStart = this.dateStart;
				}
				if(this.dateEnd) {
					params.dateEnd = this.dateEnd;
				}
				
				switch(parseInt(this.sortIndex)){
					case 0:
						break;
					case 1:
						params.order_by='price_day_workday_in';
						params.order='desc';
						break;
					case 2:
						params.order_by='total';
						params.order='desc';
						break;
				}
				
				console.log("params--------------------------", params);
				
				this.util.getEquipList(params).then(res=>{
						if(this.clearAll) {
							this.clearAll = false;
						}
						console.log("getEquipList----", res);
						this.listParams.totalCount = res.total_count;
						this.listParams.pageSize = parseInt(res.page_size);
						this.listParams.page = parseInt(res.page);
						this.listParams.totalPage = Math.ceil(
							res.total_count / res.page_size
						);
						this.list = res.rows;
						console.log("list---", this.list);
				})
				
			},
			//根据选中的品牌转换为id字符串
			getBrandParams() {
				let str = "";
				if(this.brand.length > 0) {
					this.brandList.forEach((item, index) => {
						this.brand.forEach((subItem, index2) => {
							if(subItem == item.name) {
								str += item.id + ",";
							}
						});
					});
				}
				if(str.indexOf(",") > 0) {
					str = str.substring(0, str.length - 1);
				}
				return str;
				console.log("str-----", str);
			},
			changeBrand(value) {
				console.log("value-------", value);
				let list = [];
				this.selectOption.forEach((item, index) => {
					if(item.split("=")[0] == "brand") {
						list.push(item.split("=")[1]);
					}
				});
				let addValue = value[value.length - 1];
				//判断是添加，还是删除
				if(list.length > 0) {
					//添加
					let dif = this.util.getArrDifference(value, list);
					if(value.length > list.length) {
						this.addOption("brand", dif[dif.length - 1]);
					} else {
						//删除
						this.delOption("brand=" + dif[dif.length - 1]);
					}
				} else {
					this.addOption("brand", value[value.length - 1]);
				}
				console.log("list-----", list);
			},
			//删除全部品牌
			delAllBrand() {
				console.log("delAllBrand-----", this.selectOption);
				let tempList = this.util.deepcopy(this.selectOption);
				tempList.forEach((item, index) => {
					if(item.split("=")[0] == "brand") {
						this.delOption(item);
					}
				});
			},
			//添加、修改选项方法
			addOption(type, value) {
				let val = type + "=" + value;
				if(type == "brand") {
					this.selectOption.push(val);
					this.getEquipList();
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
			//删除设施判断
			delCondition(item) {
				let index = this.selectOption.indexOf(item);
				let val = item.split("=")[1];
				this.brand.remove(val);
				this.selectOption.splice(index, 1);
				this.getEquipList();
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
				if(type == "brand") {
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
						this.clearAll = true;
						this.selectOption = [];
						this.dateStart = "";
						this.dateEnd = "";
						this.equipType = 0;
						this.equipPrice = 0;
						this.brand = [];
						this.isTake = false;
						this.conditionArray = "";
						this.getEquipList();
						break;
					case "time":
						this.addOption('time','');
						this.dateStart = "";
						this.dateEnd = "";
						break;
					case "equipType":
						this.equipType = 0;
						break;
					case "equipPrice":
						this.equipPrice = 0;
						break;
					case "isTake":
						this.isTake = false;
						break;
				}
			},
			changeCity(command) {
				this.cityCode = command.code;
				this.getEquipList();
				console.log("this.cityCode---", this.cityCode);
			},
			changePage(val) {
				console.log("changePage----", val);
				this.listParams.page = val;
				this.getEquipList();
			},
			operatePage(type) {
				if(type == "prev") {
					if(this.listParams.page > 1) {
						this.listParams.page--;
						this.getEquipList();
					}
				} else {
					if(this.listParams.page != this.listParams.totalPage) {
						this.listParams.page++;
						this.getEquipList();
					}
				}
			},
			//跳转到影棚详情页面
			toEquipDetail(id){
				this.util.toEquipDetail(id);
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "@front/common/common.scss";
	.front_select {
		margin-bottom: 20px;
		.rightShow {
			display: flex;
			justify-content: flex-start;
			i {
				display: block;
				width: 36px;
				height: 36px;
				box-sizing: border-box;
				background: #fff;
				margin-left: 20px;
				text-align: center;
				line-height: 36px;
			}
			.listCart {
				position: relative;
				&>i {
					cursor: pointer;
				}
				&:hover {
					.goodList {
						display: block;
					}
				}
				.goodList {
					display: none;
					position: absolute;
					top: 36px;
					right: 0px;
					width: 450px;
					box-sizing: border-box;
					border: 1px solid #eee;
					background: #fff;
					z-index: 100;
					padding: 20px 0px 0px 0px;
					&>p {
						color: #333333;
						font-weight: 600;
						margin-bottom: 20px;
						padding-left: 20px;
					}
					ul {
						max-height: 300px;
						overflow-y: auto;
						padding: 0px 20px;
						li {
							display: flex;
							justify-content: space-between;
							margin-bottom: 12px;
							img {
								border: 1px solid #F0F0F0;
							}
							.leftInfo {
								img {
									margin-right: 10px;
								}
								display:flex;
								width:300px;
								p {
									width: 300px;
									word-break: break-all;
									word-wrap: break-word;
									text-overflow: ellipsis;
								}
							}
							.right_price {
								display: flex;
								flex-direction: column;
								align-items: flex-end;
							}
						}
					}
					.cartDetail {
						padding: 10px 20px;
						display: flex;
						justify-content: space-between;
						height: 54px;
						line-height: 54px;
						background: #F0F0F0;
						align-items: center;
						button {
							background: #D4282D;
							color: #fff;
						}
						span {
							margin-right: 10px;
						}
					}
				}
			}
		}
	}
	
	.main_Info {
		width: 1200px;
		margin: 0px auto;
		margin-top: 40px;
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
		/*产品列表样式*/
		.goodList {
			margin-bottom: 10px;
			ul {
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				li {
					width: 280px;
					height: 400px;
					border: 1px solid #F0F0F0;
					margin-right: 26px;
					margin-bottom: 25px;
					&:nth-child(4n) {
						margin-right: 0px;
					}
					p {
						font-size: 16px;
						padding: 18px 15px;
						height: 45px;
						line-height: 25px;
						box-sizing: content-box;
					}
					.detail {
						display: flex;
						justify-content: space-between;
						padding: 0px 15px;
						.price {
							color: #EA001F;
							font-size: 16px;
							font-weight: 600;
						}
						.unit {
							color: #999999;
							font-size: 12px;
						}
						.saleInfo {
							color: #999999;
						}
					}
				}
			}
		}
		.pagination {
			display: flex;
			justify-content: center;
			margin-bottom: 50px;
		}
	}
</style>