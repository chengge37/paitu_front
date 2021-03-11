<template>
	<div class="container">
		<div class="container-title">
			<span @click="$router.back()">发起活动</span>
			<i class="el-icon-arrow-right"></i>
			<span>活动详情</span>
		</div>
		<div class="main">
			<div class="title">
				2019站酷设计师大趴分享交流会
			</div>
			<div class="detail">
				<div class="detail-head">
					<div>
						<span>活动时间：</span>
						<span>2019-07-07</span>
					</div>
					<div>
						<span>类型：</span>
						<span>线下活动</span>
					</div>
					<div>
						<span>费用：</span> 
						<span class="price">￥158</span>
					</div>
					<div>
						<span>人数：</span>
						<span>27/100人</span>
					</div>
					<div>
						进行中
					</div>
				</div>
				<div class="image">
					<img src="https://pic.paitume.com/1-1561961207494.png" alt="" />
				</div>
				<div class="show">
					1. 投稿作品须思想健康、主题鲜明；<br /> 2. 代表“2021年第31届世界大学生夏季运动会”活动的会徽1幅、吉祥物1个（可分开投稿）； <br /> 3. 作品的图样说明（图样的尺寸、比例、色值等）； <br /> 4. 参加本次征集活动须签署并提交应征资质文件与法律文件（详见2021年第31届世界大学生夏季运动会会徽、吉祥物设计征集文件）； <br /> 5. 作品的创意及理念说明（说明指对应征方案的创意基础、创作过程、创作理念、灵感和概念的详细说明，还可包括关于会徽、吉祥物的故事，且故事应该充分描述会徽、吉祥物的风格、个性、特质、优点等）；<br /> 6. 投稿文件应为.jpg图片格式、RGB色彩空间、A4尺寸、分辨率300dpi，一次同时提交“投稿要求”1-5项文件，视为一套投稿作品。 <br /> 7. 本次征集不收取任何费用，作者自行承担创作费用及应征投稿的其它费用，所有来稿一律不予退还，请作者务必保留分辨率至少为300dpi（AI、PSD、CDR等）的原始文件。
				</div>
				<!-- <div class="map_form">
					<div class="leftInfo">
						<p>位置：珠海香洲区香洲旅游路1285号-得闲居轰趴馆 </p>
						<div class="map">
							<div id="container" style="width:100%;height:100%;padding-left: 10px;"></div>
						</div>
					</div>
					<div class="rightInfo">
						<p>报名</p>
						<div class="form">
							<el-form  :model="form">
							  <el-form-item>
							    <el-input v-model="form.name" placeholder="请输入您的姓名"></el-input>
							  </el-form-item>
							  <el-form-item>
							    <el-input v-model="form.personNum" placeholder="请输入人数"></el-input>
							  </el-form-item>
							  <el-form-item>
							    <el-input v-model="form.mobile" placeholder="请输入您的联系电话"></el-input>
							  </el-form-item>
							  <el-form-item>
							    <el-input v-model="form.mergeMobile" placeholder="请输入紧急联系人电话"></el-input>
							  </el-form-item>
							  <el-form-item>
							    <el-button type="primary">立即报名</el-button>
							  </el-form-item>
							</el-form>
						</div>
					</div>
				</div> -->
				<div class="footer">
					<p>举办方：站酷</p>
					<p>发布时间：2019-6-25</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import { lazyAMapApiLoaderInstance } from "vue-amap";
	export default {
		data: () => ({
			activeIndex: '1',
			form:{}
		}),

		components: {},
		
		computed: {
			// _autoComplete() {
			// 	if(!this.loaded) return;
			// 	return new AMap.Autocomplete({});
			// },
			// _placeSearch() {
			// 	if(!this.loaded) return;
			// 	return new AMap.PlaceSearch({});
			// }
		},
		
		mounted() {
			// let _loadApiPromise = lazyAMapApiLoaderInstance.load();
			// _loadApiPromise.then(() => {
			// 	this.loaded = true;
			// 	this.mapinit();
			// });
		},

		methods: {
			//初始化地图方法
			// mapinit() {
			// 	this.map = new AMap.Map("container", {
			// 		resizeEnable: true
			// 	});
			// 	this.placeSearch = new AMap.PlaceSearch({
			// 		map: this.map
			// 	});
			// 	//异步同时加载多个插件
			// 	AMap.plugin(["AMap.ToolBar", "AMap.MapType"], () => {
			// 		let toolbar = new AMap.ToolBar();
			// 		let maptype = new AMap.MapType();
			// 		this.map.addControl(toolbar);
			// 		this.map.addControl(maptype);
			// 	});
			// 	// 监听地图点击并更改地址栏文字
			// 	this.map.on("click", e => {
			// 		let lnglatXY = [e.lnglat.getLng(), e.lnglat.getLat()];
			// 		this.form.lat = [e.lnglat.getLng(), e.lnglat.getLat()][1];
			// 		this.form.lng = [e.lnglat.getLng(), e.lnglat.getLat()][0];
			// 		AMap.service("AMap.Geocoder", () => {
			// 			let geocoder = new AMap.Geocoder();
			// 			geocoder.getAddress(lnglatXY, (status, result) => {
			// 				if(status === "complete" && result.info === "OK") {
			// 					this.form.address = result.regeocode.formattedAddress;
			// 					this.form.addressPOI = result.regeocode.formattedAddress;
			// 				} else {}
			// 			});
			// 		});
			// 	});

			// },

			// 如果发生更改了就执行定位信息
			// changeTip(tip) {
			// 	this.form.address = tip.address;
			// 	// 当有重复地点时，adcode用于标识唯一地点
			// 	this.placeSearch.setCity(tip.code);
			// 	//关键字查询查询
			// 	this.placeSearch.search(tip.address);
			// },

			// 执行搜索并将结果返回给下拉栏
			// autoComplete(queryString, cb) {
			// 	console.log(queryString);
			// 	if(!queryString || !this._autoComplete) return;
			// 	this._autoComplete.search(queryString, (status, result) => {
			// 		if(status === "complete") {
			// 			let results = queryString ?
			// 				result.tips.filter(this.createFilter(queryString)) :
			// 				restaurants;
			// 			console.log(results);
			// 			let endresults = [];
			// 			results.forEach(item => {
			// 				endresults.push({
			// 					value: item.district + "  " + item.name,
			// 					address: item.name,
			// 					code: item.adcode
			// 				});
			// 			});
			// 			cb(endresults);
			// 		}
			// 	});
			// },

			// 筛选出选择的
			// createFilter(queryString) {
			// 	return restaurant => {
			// 		return(
			// 			restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
			// 		);
			// 	};
			// },
		}
	};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
	.el-menu /deep/ {
		display: none;
	}
	
	.container {
		.container-title{
			background: #fff;
			height: 60px;
			line-height: 60px;
			padding-left: 20px;
			box-sizing: border-box;
			margin-bottom: 24px;
			span:first-child{
				cursor: pointer;
			}
		}
		.main {
			padding: 52px 65px 0;
			box-sizing: border-box;
			background: #fff;
			.title {
				font-size: 24px;
				font-weight: bold;
				text-align: center;
				margin-bottom: 30px;
			}
			.detail {
				.detail-head {
					display: flex;
					justify-content: space-between;
					margin-bottom: 30px;
					div:last-child{
						color: #EA001F;
					}
				}
				.image {
					margin: 10px 0px 40px;
					img{
						width: 100%;
					}
				}
				.show {
					font-size: 16px;
					line-height: 30px;
					padding-bottom: 38px;
					box-sizing: border-box;
					border-bottom: 1px solid #eee;
					margin-bottom: 14px;
				}
			}
			// .map_form{
			// 	display:flex;
			// 	text-align:center;
			// 	font-size:18px;
			// 	font-weight:bold;
			// 	padding-bottom:20px;
			// 	border-bottom:1px solid #eee;
			// 	margin:50px 0px 20px 0px;
			// 	.leftInfo>p,.rightInfo>p{
			// 		margin-bottom:20px;
			// 	}
			// 	.leftInfo{
			// 		margin-right:15px;
			// 		.map{
			// 			width:720px;
			// 			height:423px;
			// 			padding:10px 8px;
			// 			background:#F5F8FE;
			// 		}
			// 	}
			// 	.form{
			// 		background:#F8F8F8;
			// 		border-radius:5px;
			// 		padding:43px 53px 20px;
			// 		/deep/ .el-input__inner{
			// 			width:350px;
			// 			height:52px;
			// 		}
			// 		button{
			// 			width:100%;
			// 			background:#F93737;
			// 		}
			// 	}
			// }
			.footer{
				display:flex;
				justify-content:space-between;
				padding-bottom: 25px;
				box-sizing: border-box;
				p{
					color:#666;
				}
			}
		}
	}
</style>