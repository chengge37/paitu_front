<template>
	<div class="city">
		<div v-popover:popover>
			<span class="el-dropdown-link cursor word-hover">
		       	 {{selectCity}}
		       	 <i class="el-icon-arrow-down el-icon--right"></i>
		   </span>
			<!--<el-dropdown-menu slot="dropdown">
				<el-dropdown-item v-for="(item,index) in cityList" :key="index" :command="item">
					{{item.city}}
				</el-dropdown-item>
			</el-dropdown-menu>-->
			
		</div>
		
		<!--<el-popover ref="popover" placement="bottom" width="600" trigger="click">-->
			<el-popover ref="popover" placement="bottom-start" width="600" trigger="click">
				<ul class="cityList">
					<li v-for="(item,index) in menuList" @click="changeMenu(index)" class="word-hover" :class="{'active':menuIndex==index}">{{item}}</li>
				</ul>
				<!--<el-dropdown-item v-for="(item,index) in showCityList.city" :key="index" :command="item">
					{{item.city}}
				</el-dropdown-item>-->
				<ul class="hotCity" v-if="menuIndex==0">
					<li v-for="(item,index) in showHotCity" :key="index" class="word-hover" @click="changeCity(item)">
						{{item.city}}
					</li>
				</ul>
				<ul class="cityResult" v-if="menuIndex!=0">
					<li v-for="(item,index) in showCityList" :key="index">
						<span>{{item.pinyin}}</span>
						<div>
							<span  class="word-hover" @click="changeCity(subItem)" v-for="(subItem,index2) in item.city" :key="index2">
								{{subItem.city}}
							</span>
						</div>
					</li>
				</ul>
			</el-popover>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import { provinceAndCityData } from 'element-china-area-data';
	export default {
		props: {
			code: {
				type: String,
				default: '0'
			}
		},
		watch: {
			city_code(to, from) {
				console.log('selectCity------------------',city_code);
				this.setCityByCode(this.city_code);
			},
			code(to, from) {
				console.log('selectCity----code---',this.code);
				this.setCityByCode(to);
			}
		},
		data() {
			return {
				selectCity: '',
				cityList: [],
				showCityList:[],
				hotCity:['010','021','020','0755','0756','028','023','0592','0871','0571','029','027','0731','025','0371','0757'],
				showHotCity:[],
				menuIndex:'0',
				menuList:['热门城市','ABCDE','FGHJ','KLMNP',"QRSTW","XYZ"],
				showCity:true,
			};
		},
		computed: {
			...mapGetters(["city_code"])
		},
		created() {
			this.cityList = this.util.deepcopy(this.config.allCityCode);
			console.log('selectCity------------',this.cityList);
			this.cityList.sort(this.compare('pinyin'));
			this.cityList = this.getCityList();
			this.getHotCity();
			console.log('selectCity------------',this.cityList);
			this.changeMenu(this.menuIndex);
		},
		mounted() {
			//获取城市
//			if(this.code == 0) {
//				if(this.city_code) {
//					this.setCityByCode(this.city_code);
//				}
//			} else {
//				this.setCityByCode(this.code);
//			}	

			//暂时不定位城市使用的代码
			this.setCityByCode(0);
		},
		components: {},
		methods: {
			//获取热门城市数据
			getHotCity(){
				//为热门城市添加一个不限的选项
				let obj={
					city: "不限",
					code: "0",
				};
				this.showHotCity.push(obj);
				this.hotCity.forEach((item,index)=>{
					this.config.allCityCode.forEach((subItem,index2)=>{
						if(subItem.code==item){
							this.showHotCity.push(subItem);
						}
					})
				})
				console.log('this.getHotCity-------------',this.showHotCity);
				
			},
			//切换城市菜单
			changeMenu(index){
				this.menuIndex=index;
				if(index!=0){
					this.showCityList=[];
					let list=this.menuList[index].split('');
					list.forEach((item,index)=>{
						this.cityList.forEach((subItem,index2)=>{
							if(subItem.pinyin==item){
								this.showCityList.push(subItem);
							}
						})
					})
				}
				console.log('this.showCityList---------',this.showCityList);
				
			},
			compare(propertyName) {
				return function(object1, object2) {
					var value1 = object1[propertyName];
					var value2 = object2[propertyName];
					if(value2 < value1) {
						return 1;
					} else if(value2 > value1) {
						return -1;
					} else {
						return 0;
					}
				}
			},

			getCityList() {
				var map = {},dest = [];
				for(var i = 0; i < this.cityList.length; i++) {
					var ai = this.cityList[i];
					if(!map[ai.pinyin]) {
						dest.push({
							pinyin: ai.pinyin,
							city: [ai]
						});
						map[ai.pinyin] = ai;
					} else {
						for(var j = 0; j < dest.length; j++) {
							var dj = dest[j];
							if(dj.pinyin == ai.pinyin) {
								dj.city.push(ai);
								break;
							}
						}
					}
				}
				return dest;
			},

			//根据code设置城市
			setCityByCode(code) {
				console.log('setCityByCode-------',this.cityList);
				console.log('setCityByCode-------',code);
				if(code==0){
					this.selectCity='不限';
					return;
				}
				this.config.allCityCode.forEach((item, index) => {
					if(code == item.code) {
						this.selectCity = item.city;
					}
				})
			},
			changeCity(command) {
				this.selectCity = command.city;
				this.$parent.changeCity(command);
				this.$refs['popover'].doClose();
				
				console.log('this.$refs.popover------',this.$refs.popover);
			},
			//隐藏弹出框
			hidePopver(){
//				this.$nextTick(()=>{
					let dom=document.getElementsByClassName('el-popover')[0];
					console.log('dom----------------',dom);
					dom.style.display='none';
//				})
			}
		}
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	
	/deep/ .el-popover{
		border:1px solid red;
	}
	.el-dropdown-menu {
		max-width: 1000px;
		top: 227px!important;
		display: flex;
		flex-wrap: wrap;
		box-shadow: 0px 0px 32px 0px rgba(101, 31, 255, 0.18);
		padding-left:20px;
	}
	
	.el-dropdown-link {
		font-weight: 600;
	}

	.cityList{
		display:flex;
		justify-content:center;
		font-size:16px;
		margin-bottom:15px;
		li{
			margin-right:20px;
			font-weight:600;
			cursor:pointer;
			&.active{
				color:#7C6AFF;
			}
		}
	}
	.hotCity{
		display:flex;
		align-items:center;
		flex-wrap: wrap;
		padding-left:15px;
		li{
			margin-right:20px;
			cursor:pointer;
			font-size:13px;
			color:#696969;
			margin-bottom:15px;
		}
	}
	.cityResult{
		padding-left:15px;
		li{
			display:flex;
			align-items:baseline;
			margin-bottom:10px;
			&>span{
				margin-right:10px;
				font-size:16px;
				color:#7C6AFF;
				font-weight:600;
			}
			div{
				span{
					margin-right:20px;
					cursor:pointer;
					font-size:13px;
					color:#696969;
					margin-bottom:10px;
					display:inline-block;
				}
			}
		}
	}
</style>