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
						<el-button class="word-hover" type="text" v-show="showBodyOption" @click="resetCondition()">清空体型特征筛选</el-button>
					</ul>
				</div>
			</div>
			
			
			
			<div class="rightShow">
				<div class="imgSearch">
					<upload-img  showPlus='true' type="model" :imageUrl="modelImg?($qiniuHost+modelImg):''" @handleSuccess="modelPic"></upload-img>
					<el-button class="default-hover" type='primary' @click='getListByPic'>以图搜图</el-button>
					<el-button class='hotSearch' @click="toSearchHistory">
						<ali-svg-icon icon-class="hot1" class="hot1"></ali-svg-icon>
						<span>大家都在搜</span>
					</el-button>
				</div>
			
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
				<li>
					<span>模特类型：</span>
					<el-radio-group v-model="modelIndex">
						<el-radio v-for="(item,index) in modelType" :key="item.id" :label="item.id">
							<span class="word-hover">{{item.name}}</span>
						</el-radio>
					</el-radio-group>
				</li>
				<li>
					<span>拍摄风格：</span>
					<el-radio-group v-model="style">
						<el-radio v-for="(item,index) in shootingType" :key="index" :label="item.id">
							<span class="word-hover">{{item.name}}</span>
						</el-radio>
					</el-radio-group>
				</li>
			</ul>
			<div class="searchModule">
				<div class='img'>
					<el-image style="width:260px;height:360px;" fit="contain" src="https://pic.paitume.com/images/modelSearch.png"/>
				</div>
				<div class='content'>
					<span>body x scan</span>
					<p>根据体型特征检索</p>
					<span class='btn cursor color-area' @click="showTable">检索</span>
				</div>
			</div>
		</div>

		<!--中间主体部分模块-->
		<div class="main radio-setting">
			<div class="leftInfo">
				<recommend-good type="2"></recommend-good>
			</div>
			<div class="rightInfo"  v-loading="loadList">
				<div v-if="listParams.totalCount!=0">
					<div class="top">
						<div style="user-select:none;">
							<span :class="{active:curIndex==index+1,sort:index>0,up:index>0&&curIndex==index+1&&order=='asc',down:index>0&&curIndex==index+1&&order=='desc'}" class="radio-hover" v-for="(item,index) in orderType" :key="index" :label="index" @click="changeSort(index+1)">{{item}}</span>
						</div>
						<p>
							<span>共</span>
							<span class="num">{{listParams.totalCount}}</span>
							<span>个模特</span>
							<span class="num curPage">{{listParams.page}}</span>
							<span class="total">/{{listParams.totalPage}}</span>
							<i class="el-icon-arrow-left page-hover" @click="operatePage('prev')"></i>
							<i class="el-icon-arrow-right page-hover" @click="operatePage('next')"></i>
						</p>
					</div>

					<!--列表模块-->
					<shooting-list :list="list" :listByPic="listByPic" type="0"></shooting-list>
				</div>

				<div class="findNot" v-if="listParams.totalCount==0 && !loadList">
					<div class="info">
						<p>为您找到 0 个</p>
						<span>"相关模特"</span>
					</div>
					<p class="toBack">请您返回上一级操作</p>
					<el-button @click="clearAllOption()" class="default-hover">返回</el-button>
					<div class="similarModel" v-if="similarList.length>0">
						为你找到类似的模特：
					</div>
					<shooting-list v-if="similarList.length>0" similar='1' :list="similarList" :listByPic="listByPic" type="0"></shooting-list>
				</div>
			</div>
		</div>
		<!--分页模块-->
		<pagination :total="listParams.totalCount" :page="parseInt(listParams.page)" :pagesize="listParams.pageSize" @getPageNum="changePage" class="pagination"></pagination>

		<!--联系客服模块-->
		<contact :cartInfo="cartInfo" v-if="showContact"></contact>
		
		<!--模特体型条件搜索-->
		<el-dialog class="modelTable" title="条件选择" center :visible.sync="modelSearchTable" width="60%">
			 <div class="options">
			 	<div class="leftInfo">

			 		<div class="item heigth">
			 			<p>身高(cm)：<span>{{condition.height[0]}}~{{condition.height[1]}}</span></p>
			 			<div class="sliderInfo">
			 				<el-slider v-model="condition.height" @change="changeBodyOption" range :min="ranges.heightRange[0]" :max="ranges.heightRange[1]">
    						</el-slider>
			 			</div>
			 		</div>
			 		<div class="item heigth">
			 			<p>体重(kg)：<span>{{condition.weight[0]}}~{{condition.weight[1]}}</span></p>
			 			<div class="sliderInfo">
			 				<el-slider v-model="condition.weight"  @change="changeBodyOption" range  :min="ranges.weightRange[0]" :max="ranges.weightRange[1]">
    						</el-slider>
			 			</div>
			 		</div>
			 		<div class="item heigth">
			 			<p>臂展(cm)：<span>{{condition.arm[0]}}~{{condition.arm[1]}}</span></p>
			 			<div class="sliderInfo">
			 				<el-slider v-model="condition.arm" @change="changeBodyOption" range :min="ranges.armRange[0]" :max="ranges.armRange[1]">
    						</el-slider>
			 			</div>
			 		</div>
			 		<div class="item heigth">
			 			<p>肩宽(cm)：<span>{{condition.shoulder[0]}}~{{condition.shoulder[1]}}</span></p>
			 			<div class="sliderInfo">
			 				<el-slider v-model="condition.shoulder" @change="changeBodyOption" range  :min="ranges.shoulderRange[0]" :max="ranges.shoulderRange[1]">
    						</el-slider>
			 			</div>
			 		</div>
			 		<div class="otherInfo">
			 			<div class="otherItem hair">
			 				<p>当前发型</p>
			 				<div class="info">
			 					<el-select v-model="hair" placeholder="请选择">
								    <el-option v-for="item in hairList" :key="item.id" :label="item.name" :value="item.id">
								    </el-option>
								  </el-select>
			 				</div>
			 			</div>
			 			<div class="otherItem hair">
			 				<p>肤色</p>
			 				<div class="info">
			 					<el-select v-model="skin" placeholder="请选择">
								    <el-option v-for="item in skinList" :key="item.id" :label="item.name" :value="item.id">
								    </el-option>
								  </el-select>
			 				</div>
			 			</div>
			 			<div class="otherItem hair">
			 				<p>脸型</p>
			 				<div class="info">
			 					<el-select v-model="face" placeholder="请选择">
								    <el-option v-for="item in faceList" :key="item.id" :label="item.name" :value="item.id">
								    </el-option>
								  </el-select>
			 				</div>
			 			</div>
			 			<div class="otherItem hair">
			 				<p>眼睛类型</p>
			 				<div class="info">
			 					<el-select v-model="eye" placeholder="请选择">
								    <el-option v-for="item in eyeList" :key="item.id" :label="item.name" :value="item.id">
								    </el-option>
								  </el-select>
			 				</div>
			 			</div>
			 		</div>
			 	</div>
			 	
			 	<div class="rightContent">
			 		<ul>
			 			<li>
			 				<div>
			 					<p>上围(cm)：<span>{{condition.upper[0]}}~{{condition.upper[1]}}</span></p>
			 					<el-slider v-model="condition.upper" @change="changeBodyOption" range :min="ranges.upperRange[0]" :max="ranges.upperRange[1]">
    							</el-slider>
			 				</div>
			 				<div>
			 					<p>腰围(cm)：<span>{{condition.waist[0]}}~{{condition.waist[1]}}</span></p>
			 					<el-slider v-model="condition.waist" @change="changeBodyOption" range :min="ranges.waistRange[0]" :max="ranges.waistRange[1]">
    							</el-slider>
			 				</div>
			 				<div>
			 					<p>臀围(cm)：<span>{{condition.hip[0]}}~{{condition.hip[1]}}</span></p>
			 					<el-slider v-model="condition.hip" @change="changeBodyOption" range :min="ranges.hipRange[0]" :max="ranges.hipRange[1]">
    							</el-slider>
			 				</div>
			 				<div>
			 					<p>腿长(cm)：<span>{{condition.leg[0]}}~{{condition.leg[1]}}</span></p>
			 					<el-slider v-model="condition.leg" @change="changeBodyOption" range  :min="ranges.legRange[0]" :max="ranges.legRange[1]">
    							</el-slider>
			 				</div>
			 				<div>
			 					<p>鞋码(码)：<span>{{condition.shoes[0]}}~{{condition.shoes[1]}}</span></p>
			 					<el-slider v-model="condition.shoes" @change="changeBodyOption" range show-stops :min="ranges.shoesRange[0]" :max="ranges.shoesRange[1]">
    							</el-slider>
			 				</div>
			 			</li>
			 		</ul>
			 	</div>
			 </div>
			 	
		 	<div class='operateBtn'>
		 		<span class='check cursor color-area' @click="searching">检索</span>
		 		<span class='reset cursor color-area' @click="resetCondition">重置</span>
		 	</div>
			 
		</el-dialog>
		
		
		
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
	import uploadImg from 'ServeComponents/UploadImg/index.vue'
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
				provideList: [],
				selectOption: [],
				priceList: [],
				modelType: [],  //模特类型
				shootingType:[],  //拍摄风格
				cityCode: "0",   //城市
				list: [],
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
				showSearch: true, //是否显示搜索框模块
				modelSearchTable:false,  //是否显示模特搜索模块
				height:0, //身高区间
				condition:{
					height:[50,220],  //身高区间
					weight:[35,150], //体重区间
					arm:[50,230], //臂展区间
					shoulder:[24,60], //肩宽区间
					upper:[50,110], //上围区间
					waist:[45,90], //腰围区间
					hip:[50,110],  //臀围区间
					leg:[60,150],  //腿长区间
					shoes:[24,45], //鞋码区间
				},
				ranges:{
					heightRange:[50,220],  //身高范围
					weightRange:[35,150], //体重范围
					armRange:[50,230],  //臂展范围
					shoulderRange:[24,60], //肩宽范围
					upperRange:[50,110], //上围范围
					waistRange:[45,90], //腰围范围
					hipRange:[50,110], //臀围范围
					legRange:[60,150], //腿长范围
					shoesRange:[24,45], //鞋码范围
				},
				sexType:[
					{id:0,name:'不限'},
					{id:1,name:'男'},
					{id:2,name:'女'},
				],
				sex:0,  //性别下标
				modelIndex:0,  //模特类型下标
				style:0, //拍摄风格下标
				hairList:[{id:0,name:'不限'},{id:1,name:'直长发'},{id:2,name:'短发'}],
				skinList:[{id:0,name:'不限'},{id:1,name:'白色'},{id:2,name:'黄色'},{id:3,name:'黑色'}],
				faceList:[{id:0,name:'不限'},{id:1,name:'圆脸'},{id:2,name:'长脸'},{id:3,name:'瓜子脸'}],
				eyeList:[{id:0,name:'不限'},{id:1,name:'单眼皮'},{id:2,name:'双眼皮'}],
				hair:0,  //头发类型
				skin:0,  //肤色
				face:0,  //脸型
				eye:0,  //眼睛
				showBodyOption:false, //是否显示体型特征按钮
				modelImg:'', //以图搜图模特图片
				listByPic:'', //是否是以图搜图
				similarList:[], //类似模特列表
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
			cart,
			uploadImg
		},
		watch: {
			hair: function(to, from) {
				this.checkOption();
			},
			skin: function(to, from) {
				this.checkOption();
			},
			face: function(to, from) {
				this.checkOption();
			},
			eye: function(to, from) {
				this.checkOption();
			},
			sex: function(to, from) {
				this.changeOption('sexType',to);
			},
			modelIndex: function(to, from) {
				this.changeOption('modelType',to);
			},
			style: function(to, from) {
				this.changeOption('shootingType',to);
			},
			cityCode: function(to, from) {
				this.listParams.page = 1;
				console.log("cityCode-----", this.cityCode);
				this.getCity();
				this.getModelList();
			},
			searchTxt(to, from) {
				this.listParams.page = 1;
				console.log("searchTxt------------", this.searchTxt);
				this.addOption("search", to);
				this.getModelList();
			}
		},
		created() {
			let obj={
				id:0,
				name:'不限'
			}
			this.modelType=this.util.deepcopy(this.config.modelTypeList);
			this.shootingType=this.util.deepcopy(this.config.shootingTypeList);
			
			this.modelType.unshift(obj);
			this.shootingType.unshift(obj);
			
			//如果从首页搜索跳转过来
			let query=this.$route.query;
			if(query.searchText) {
				this.search(this.$route.query.searchText);
			}
			
			if (query.type) {
				this.modelIndex=query.type;
		    }
			
			//获取全部城市信息
			this.allCity = this.config.allCityCode;

			//获取模特列表
			this.getModelList();
		},
		computed: {
			...mapGetters(["city_code"])
		},
		mounted() {
			
		},
		methods: {
			//跳转到搜索历史页面
			toSearchHistory(){
				this.util.modelSearchHistory();
			},
			//根据图片搜模特方法
			getListByPic(){
				//先判断有没有上传图片
				if(!this.modelImg){
					this.util.showWarn('请先上传图片！');
					return;
				}
				let params={
					num:10,
					file:this.modelImg
				}
				this.listParams.page=1;
				this.loadList=true;
				this.similarList=[];
				this.util.getModelByPic(params).then(res=>{
					console.log('getListByPic------',res);
					this.listByPic='1';
					let list=[];
					res.forEach((item,index)=>{
						if(item['1']<0.5){
							list.push(item);
						}
					})
					if(list.length==0){
						this.list=[];
						this.similarList=res;
						this.listParams.totalCount=0;
					}else{
						this.list=list;
						this.listParams.totalCount=list.length;
					}
					this.loadList=false;
					console.log('list---------',this.list);
					console.log('similarList---------',this.similarList);
				})
			},
			
			//上传模特图标回调方法
			modelPic(val){
				console.error('modelPic-=-------',val);
				this.modelImg=val;
			},
			//检索体型特定方法
			changeBodyOption(){
				this.checkOption();
				//重新搜索列表
				this.getModelList();
			},
			
			//判断是否跟初始设置一样
			checkOption(){
				//获取对象的长度
				let arrLength=Object.keys(this.condition).length;
				let count=0;
				for(let i in this.condition){
					for(let j in this.ranges){
						if((i+'Range')==j && this.condition[i].toString()==this.ranges[j].toString()){
							count++;
						}
					}
				}
				if(arrLength==count && this.hair==0 && this.skin==0 && this.face==0 && this.eye==0){
					this.showBodyOption=false;
				}else{
					this.showBodyOption=true;
				}
			},
			//检索
			searching(){
				console.log('searching-----------');
				this.modelSearchTable=false;
			},
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
				this.getModelList();
			},
			//重置条件选项
			resetCondition(){
				for(let i in this.condition){
					this.condition[i]=this.ranges[i+'Range'];
				}
				this.hair=0;
				this.skin=0;
				this.face=0;
				this.eye=0;
				this.getModelList();
				this.showBodyOption=false;
			},
			//开始搜索体型弹窗
			showTable(){
				this.modelSearchTable=true;
			},
			//关闭搜索体型弹窗
			handleClose(){
				console.log('handleClose-----');
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
				this.getModelList();
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
			getModelList() {
				this.loadList=true;
				this.listByPic='';
				let condition=this.condition;
				let params={
					page:this.listParams.page,
					page_size:this.listParams.pageSize,
					height_min:condition.height[0]>0?condition.height[0]:null,
					height_max:condition.height[1],
					weight_min:condition.weight[0]>0?condition.weight[0]:null,
					weight_max:condition.weight[1],
					wingspan_min:condition.arm[0]>0?condition.arm[0]:null,  //臂展
					wingspan_max:condition.arm[1],
					shoulder_min:condition.shoulder[0]>0?condition.shoulder[0]:null,
					shoulder_max:condition.shoulder[1], 
					upper_min:condition.upper[0]>0?condition.upper[0]:null,
					upper_max:condition.upper[1],
					waist_min:condition.waist[0]>0?condition.waist[0]:null,
					waist_max:condition.waist[1],
					hip_min:condition.hip[0]>0?condition.hip[0]:null,
					hip_max:condition.hip[1],
					leg_min:condition.leg[0]>0?condition.leg[0]:null,
					leg_max:condition.leg[1],
					shoes_min:condition.shoes[0]>0?condition.shoes[0]:null,
					shoes_max:condition.shoes[1],
				};
				if(this.cityCode>0){
					params.city_code=this.cityCode;
				}
				if(this.modelIndex>0){
					params.type=this.modelIndex;
				}
				if(this.style>0){
					params.style=this.style;
				}
				if(this.sex>0){
					params.sex=this.sex;
				}
				if(this.face>0){
					params.face=this.face;
				}
				if(this.skin>0){
					params.skin=this.skin;
				}
				if(this.hair>0){
					params.hair=this.hair;
				}
				if(this.eye>0){
					params.eyelid=this.eye;
				}
				//
				console.log('params-----------',params);
				this.util.getModelList(params).then(res=>{
					console.log('getModelList--------',res);
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
					case "modelType":
						this.modelIndex = 0;
						break;
					case "city":
						this.cityCode = '0';
						break;
					case "shootingType":
						this.style = 0;
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
				console.log("this.cityCode---", this.cityCode);
			},
			changePage(val) {
				console.log("changePage----", val);
				this.listParams.page = val;
				this.getModelList();
			},
			operatePage(type) {
				if(type == "prev") {
					if(this.listParams.page > 1) {
						this.listParams.page--;
						this.getModelList();
					}
				} else {
					if(this.listParams.page != this.listParams.totalPage) {
						this.listParams.page++;
						this.getModelList();
					}
				}
			},
			search(val) {
				console.log("search1111----", val);
				this.searchTxt = val;
				this.getModelList();
			},
			footSearch(val) {
				console.log("footSearch----", val);
			},
			toCartPage() {
				this.util.toCartPage();
			},
			//删除设备方法
			delEquip(order, index) {
				console.log("order----", order);
				console.log("delEquip----", index);

				//如果是设备订单，而且是最后一个设备，就是删除订单
				if(order.has_studio == 0 && this.orderEquipArr.length == 1) {
					//删除订单
					this.util.delUserOrder(order.id).then(res => {
						console.log("删除用户订单成功！--------", res);
						this.orderCount = 0;
					});
					return;
				}

				let start_time = order.start_time;
				let end_time = order.end_time;
				if(order.rent_type == 2) {
					start_time = order.start_time.split(" ")[0];
					end_time = order.end_time.split(" ")[0];
				}
				let params = {
					order_id: order.id,
					rent_type: order.rent_type,
					start_time: start_time,
					end_time: end_time,
					equip_id: this.orderCart.equip_array[index].equip_id,
					count: 0,
					price: 1
				};
				console.log("params----", params);
				this.util.editRentOrder(params).then(res => {
					this.$message.success("删除设备成功！");
					let price = res.price;
					this.orderEquipArr = price.equipPriceArr;
					this.orderCart.price = price.equip_price + price.order_price;
				});
			}
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
	
	.imgSearch{
		display:flex;
		align-items:center;
		margin-right:10px;
		.hotSearch{
			border:1px solid #EFE7FF;
		}
		button{
			margin-left:10px;
			height:36px;
		}
	}
	
	.similarModel{
		font-size:20px;
		margin-bottom:20px;
	}
	
	/deep/{
		.el-upload--picture-card{
			width:36px;
			height:36px;
		}
		.avatar-uploader-icon{
			font-size:18px;
		}
	}
</style>