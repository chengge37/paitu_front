<template>
	<div class="newServe" ref="container">
		<!-- 头部 -->
		<header class="header">
			<el-button type="default" @click="back">返回</el-button>
		</header>

		<!-- 全部表单信息 -->
		<el-form ref="assistantForm" :rules="rules" :model="assistantForm" class="device-form">
			<!-- 图片展示 -->
			<div class="card">
				<p class="headTitle">图片展示</p>

				<clipper :imgList="imgList" @delSuccess="delSuccess" @uploadSuccess="uploadSuccess" :uploadWidth="148" :uploadHeight="148" :uploadNum="uploadNum" :ratio="3/4"></clipper>

			</div>

			<!-- 基本信息 -->
			<div class="basic-info card">
				<!-- 标题 -->
				<Title titleName="基本信息"></Title>
				<!-- 基本信息表单 -->
				<div class="basic-table">

					<el-row :gutter="100" class="num-rent">
						<el-col :span="8">
							<el-form-item label="显示标题：" prop="title">
								<el-input placeholder="显示标题" v-model="assistantForm.title"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="租赁方式："  prop="only_rent_day">
								<el-select placeholder="请选择租赁方式" v-model="assistantForm.only_rent_day" @change="rentMethod">
									<el-option v-for="(item,index) in rentArray" :key="index" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row :gutter="100">
						<el-col :span="8">
							<el-form-item label="姓名：" prop="name">
								<el-input v-model="assistantForm.name" placeholder="助理姓名"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="手机：" prop="mobile">
								<el-input v-model="assistantForm.mobile" placeholder="手机"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row :gutter="100">
						<el-col :span="8">
							<el-form-item label="工作时间：" prop="working">
								<el-input v-model="assistantForm.working" placeholder="例如:周一到周日：9:00 ~ 18:00"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="性别：" prop="sex">
								<el-radio-group v-model="assistantForm.sex">
									<el-radio :label="'1'">男</el-radio>
									<el-radio :label="'2'">女</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row :gutter="100">
						<el-col :span="8">
							<el-form-item label="常驻城市：" prop="city_code">
								<el-cascader placeholder="试试搜索自己所在的省名" :options="cityOptions" v-model="assistantForm.city_code" filterable @change="changeCity">
								</el-cascader>
								<!--<el-input v-model="assistantForm.city_code" style="display:none;"></el-input>-->
							</el-form-item>
						</el-col>

						<el-col :span="8">
							<el-form-item label="原价显示：">
								<el-input v-model="assistantForm.show_rate" placeholder="如：5 就是 价格*0.05 + 价格"></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<el-row :gutter="100">
				            <el-col :span="8">
				              <el-form-item label="起拍小时">
				                <el-input placeholder="请输入正整数，默认为1" v-model="assistantForm.hour_num"></el-input>
				              </el-form-item>
				            </el-col>
				          
				          <el-col :span="8">
							<el-form-item label="上下架：" prop="sex">
								<el-radio-group v-model="assistantForm.is_up">
									<el-radio :label="'1'">上架</el-radio>
									<el-radio :label="'0'">下架</el-radio>
								</el-radio-group>
							</el-form-item>
						 </el-col>
					</el-row>

				</div>
			</div>

			<!-- 具体收费 -->
			<div class="charge card">
				<!-- 标题 -->
				<p class="headTitle">具体收费</p>
				
				
				<!-- 按时收费 -->
				<div class="charge-title">
					<div>
						<span class="red-start">*</span>
						<span>按天收费</span>
					</div>
				</div>
				<el-row :gutter="100">
					<el-col :span="8">
						<el-form-item label="按天收费：" prop="priceDay">
							<el-input v-model="assistantForm.priceDay" placeholder="按天收费价格"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<!-- 按时收费 -->
				<div class="charge-title" v-if="assistantForm.only_rent_day!=1">
					<div>
						<span class="red-start">*</span>
						<span>按时收费</span>
					</div>
					<div class="add-more default-hover" @click="addHour">继续添加</div>
				</div>
				<div class="charge-table" v-if="assistantForm.only_rent_day!=1">
					<div class="table-head">
						<span>使用时长</span>
						<div class="center">
							<span>价格</span>
						</div>
						<span>操作</span>
					</div>
					<div class="charge-item" v-for="(item,index) in assistantForm.price_arr" :key="index">
						<div class="using-time">
							<el-select class="selectHour" placeholder="请选择使用时长" v-model="item.hour" style="width:90px" @change="selectHour">
								<el-option v-for="(item,index) in hourList" :disabled="item.choose" :key="index" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</div>
						<div class="charge-row">
							<div class="row-item">
								<div>
									<el-input ref="inp" require  maxlength="8" v-model="item.price">
										<div slot="suffix">￥</div>
									</el-input>
								</div>
							</div>

						</div>
						<div class="operation">
							<el-button class="del-btn color-area" @click="delHour(index)">删除</el-button>
						</div>
					</div>
					<div class="no-item" v-if="assistantForm.price_arr.length==0">暂无数据</div>
				</div>

			</div>

			<!-- 视频及描述 -->
			<div class="card video-dec">
				<p class="headTitle">视频</p>

				<!-- 视频及描述 -->
				<div class="video-wrap">
					<!-- 添加视频 -->
					<el-upload class="avatar-uploader" action="https://up-z2.qiniup.com/" accept=".mp4, .qlv, .qsv, .ogg, .flv, .avi, .wmv, .rmvb" :data="videoData" :show-file-list="false" :before-upload="beforeUploadVideo" :on-success="handleVideoSuccess" :on-change="getFile" :on-progress="uploadVideoProcess">
						<div class="add-video" v-if="!videoURL">
							<div class="center">
								<i class="el-icon-video-play"></i>
								<span>点击添加视频</span>
							</div>
						</div>
						<video class="show-video" v-if="videoURL" :src="videoURL" width="572" height="327" controls="controls">您的浏览器不支持视频播放</video>
					</el-upload>
					<div v-if="videoURL" class="tip">点击视频框区域可更换上传视频 ! ! !</div>
					<el-button v-if="videoURL" class="del-video" @click="delVideo">删除视频</el-button>

				</div>
			</div>

			<!-- 基本信息 -->
			<div class="basic-info card">
				<!-- 标题 -->
				<Title titleName="详情信息"></Title>
				<div class="textare">
					<tinymce v-model="assistantForm.content" :height="300" />
				</div>
			</div>

			<!-- 修改按钮 -->
			<div class="bottomBtn">
				<el-button class="color-area" :loading="saveLoading" type="primary" @click="saveAssistant">保存</el-button>
				<el-button class="color-area" type="default" @click="back">取 消</el-button>
			</div>
		</el-form>

	</div>
</template>

<script>
	import EditorImage from "ServeComponents/Tinymce/components/EditorImage";
	import { checkPic } from "@util/picUtil.js";
	import { checkVideo } from "@util/videoCheck.js";
	import Title from "ServeComponents/Title/index";
	import Tinymce from "ServeComponents/Tinymce";
	import { storage } from "@util/storage.js";
	import { mapGetters } from "vuex";
	import clipper from 'FrontComponents/photoClipper'
	import frontSearchbox from "FrontComponents/frontSearchBox";
	import pagination from "FrontComponents/pagination";
	export default {
		data() {
			return {
				saveLoading: false,
				// 添加表单信息
				assistantForm: {
					title: '', //助理标题
					name: '', //助理名称
					content: '', //内容（产品详情）
					city: '', //城市
					city_code: '', //城市编码
					video: '', //视频
					remark: '', //备注
					extend: '', //扩展
					pic: '', //图片
					only_rent_day: '0', //是否只能按天  1是 0按小时和按天
					show_rate: '', //是否展示 上调比例
					suceess_case: '', //成功案例
					working: '', //工作时间
					sex: '2', //1男 2女
					price_arr: [{
						hour: '1',
						price: 0,
					}],
					priceDay: '', //按天收费价格
					is_up: '1', //1 上 0下
				},
				hourRow: {
					hour: 1,
					price: 0,
				}, //添加小时行
				// 视频相关
				videoURL: "",
				videoFlag: false, //刚开始的时候显示为flase
				videoUploadPercent: "0%", //进度条刚开始的时候为0%
				videoData: {
					//添加其他参数
				},
				rentArray: [{
						label: "按天/按小时",
						value: '0'
					},
					{
						label: "按天",
						value: '1'
					}
				],
				hourList: [{
						label: "1 小时",
						value: '1',
						choose: false
					},
					{
						label: "2 小时",
						value: '2',
						choose: false
					},
					{
						label: "3 小时",
						value: '3',
						choose: false
					},
					{
						label: "4 小时",
						value: '4',
						choose: false
					}
				],
				rules:{
					title: [
			            { required: true, message: '请输入标题', trigger: 'blur' }
			          ],
			         name: [
			            { required: true, message: '请输入姓名', trigger: 'blur' }
			          ],
			         mobile: [
			            { required: true, message: '请输入手机', trigger: 'blur' }
			          ],
			          working: [
			            { required: true, message: '请输入工作时间', trigger: 'blur' }
			          ],
			          city_code: [
			            { required: true, message: '请选择常驻城市', trigger: 'blur' }
			          ],
				},
				// 视频相关
				videoObj: {},
				imgList: [],
				uploadPicList: [], // 上传图片列表
				cityOptions: [], //城市选项列表
				canEdit:true,  //是否能编辑表单
//				assistantInfo:null, 
				type:0, //type://0:新增，1/修改，2/详情
				updateAssistantId:'', //修改助理id
				uploadNum:6, //上传图片限制张数
				selectCity:[], //选择城市选项
			};
		},

		components: {
			Title,
			Tinymce,
			clipper,
			frontSearchbox,
			pagination
		},
		created() {
			this.cityOptions = this.GetCityCode();
			console.log('cityOptions--------', this.cityOptions);
			
			//type://0:新增，1/修改，2/详情
			this.type=this.$route.query.type;
			switch(parseInt(this.type)){
				case 0:
					break;
				case 1:
					this.updateAssistantId=this.$route.query.id;
					//获取助理 详情
					this.getAssistantDetail(this.updateAssistantId);
					break;
				case 2:
					this.canEdit=false;
					this.updateAssistantId=this.$route.query.id;
					//获取助理 详情
					this.getAssistantDetail(this.updateAssistantId);
					break;
			}
		},

		computed: {
			...mapGetters(["user_data"])
		},
		mounted() {
			
			Array.prototype.remove = function(val) { 
				var index = this.indexOf(val); 
				if (index > -1) { 
					this.splice(index, 1); 
				} 
			};

			
			this.imgList.push({
				key: ""
			});
		},

		methods: {
			//根据id获取助理详情
			getAssistantDetail(id){
				let params={
					id:id
				}
				let priceArr=[];
				let priceDay='';
				this.util.getAssistantList(params).then(res=>{
					console.log('getAssistantList----',res);
					//转换价格字段
					res.price_arr.forEach((item,index)=>{
						if(item.rent_type==2){
							priceDay=item.price;
						}else{
							let obj={
								hour:item.num,
								price:item.price
							}
							priceArr.push(obj);
						}
					})
					res.price_arr=priceArr;
					res.priceDay=priceDay;
					
					//处理图片
					let pics=[{key: ""}];
					if(res.pic){
						pics = res.pic.split(",");
						pics.forEach((item,index)=>{
			            	this.uploadPicList.push(item);
			            })
			            pics = pics.map(item => {
			              return { key: item };
			            });
			            if(pics.length<=this.uploadNum){
			            	pics.push({key: ""});
			            }
			            
			            
					}
					this.imgList = pics;
					
					
					
					
					this.assistantForm=res;
					console.log('getAssistantDetail----',this.assistantForm);
				})
			},
			//切换城市方法
			changeCity(data) {
				console.log('changeCity-----', data);
				this.assistantForm.city_code = data[1];
			},
			GetCityCode() {
				const provinces = this.$staticAllCityArray.map(item => {
					return item.province;
				});
				let provincesArr = [...new Set(provinces)];
				provincesArr = provincesArr.map(item => {
					return {
						label: item,
						children: []
					};
				});
				const options = provincesArr.map(item => {
					this.$staticAllCityArray.forEach(city => {
						if(item.label === city.province) {
							item.children.push({
								label: city.city,
								value: city.code
							});
						}
					});
					return item;
				});
				return options;
			},
			//时间转换方法
			changeHour() {
				let form = this.assistantForm;
				let arr = [];
				let dayPrice = {
					is_overtime: '0', //是否 加班 1是 0否不加班正常时间 
					is_holiday: '3', //是否假日 1节日 2周末 3正常
					is_out: '0', //是否借 0租用 1外借
					price: form.priceDay,
					rent_type: 2, //1小时 2天
					num: 1, //租用时长 多少小时或多少天
				}
				
				arr.push(JSON.stringify(dayPrice));

				form.price_arr.forEach((item, index) => {
					let obj = {
						is_overtime: '0', //是否 加班 1是 0否不加班正常时间 
						is_holiday: '3', //是否假日 1节日 2周末 3正常
						is_out: '0', //是否借 0租用 1外借
						price: item.price,
						rent_type: 1, //1小时 2天
						num: item.hour, //租用时长 多少小时或多少天
					}
					arr.push(JSON.stringify(obj));
				})
				form.price_arr = arr;
				console.log('form------', this.assistantForm);
			},
			//添加小时
			addHour() {
				console.log('添加小时------addHour------');
				let form = this.assistantForm;
				if(form.price_arr.length >= this.hourList.length) {
					this.$message.warning('已经不能多设置了！');
					return;
				}
				form.price_arr.forEach(item => {
					this.hourList.forEach((item2, index) => {
						if(item.hour == item2.value) {
							item2.choose = true;
						}
					});
				});
				let arr = [];
				this.hourList.forEach((item, index) => {
					if(!item.choose) {
						arr.push(item);
						this.hourRow.hour = arr[0].value;
					}
				});
				form.price_arr.push(this.util.deepcopy(this.hourRow));
			},

			//删除小时
			delHour(index) {
				let form = this.assistantForm;
				form.price_arr.splice(index, 1);
				this.hourList[index].choose = false;
			},

			//切换租赁方式
			rentMethod() {
				console.log('rentMethod---------');
			},
			//切换分页方法
			changePage(val) {
				this.equipListParams.page = val;
				this.getEquipList();
			},

			// 用图片裁剪后上传七牛成功
			uploadSuccess(data) {
				console.log('uploadSuccess---------', data);
				this.uploadPicList.push(data);
				this.assistantForm.pic = this.uploadPicList.join(',');
				console.warn(this.assistantForm.pic, '上传的图片数组')
			},

			// 用图片裁剪组件删除图片
			delSuccess(data) {
				this.uploadPicList.remove(data.removeArray[0]);
				this.assistantForm.pic = this.uploadPicList.join(',');
			},

			//视频上传之前判断他的大小
			beforeUploadVideo(file) {
				this.util.checkVideoInfo(this,file,'videoData');
			},

			// 获取预览视频信息
			getFile(file, fileList) {
				this.videoFlag = !this.videoFlag;
				this.videoURL = window.URL.createObjectURL(file.raw);
			},

			//视频上传的时候获取上传进度传给进度条
			uploadVideoProcess(event, file, fileList) {
				this.videoFlag = true;
				this.videoUploadPercent = parseInt(file.percentage);
			},

			//视频上传成功之后返回视频地址
			handleVideoSuccess(res, file) {
				this.videoFlag = true;
				this.videoUploadPercent = 0;
				this.videoURL = window.URL.createObjectURL(file.raw);
				this.assistantForm.video = res.key;
			},

			// 添加视频后删除视频重选
			delVideo() {
				this.videoFlag = !this.videoFlag;
				this.videoURL = "";
				this.assistantForm.video = '';
			},

			// 选择自定义小时
			selectHour() {
				this.assistantForm.price_arr.forEach(item => {
					this.hourList.forEach((item2, index) => {
						if(item.hour == item2.value) {
							item2.choose = true;
						}
					});
				});
				this.hourList.forEach((item, index) => {
					if(!item.choose) {
						this.hourRow.hour = this.hourList[index].hour;
					}
				});
			},

			//添加助理方法,
			saveAssistant() {
				this.util.checkForm(this,'assistantForm').then(res=>{
					if(res){
						if(this.type==1){
							this.assistantForm.id=this.updateAssistantId;
						}
						this.changeHour();
						if(!this.assistantForm.hour_num){
				      		this.assistantForm.hour_num='1';
				      	}
						console.log('saveAssistant------------', this.assistantForm);
						if(this.type==0){
							this.util.addAssistant(this.assistantForm).then(res => {
								console.log('addAssistant------', res);
								this.$message.success('添加助理成功！');
								this.$router.push({
									path: "/serve/manage/assistant",
								});
							})
						}else if(this.type==1){
							this.util.editAssistant(this.assistantForm).then(res=>{
								this.$message.success('修改助理成功！');
								this.$router.push({
									path: "/serve/manage/assistant",
								});
							})
						}
					}
				}).catch(()=>{});
				
			},

			// 点击返回
			back() {
				this.util.back(this);
			},

		}
	};
</script>

<style lang="scss" scoped>
	.red-start {
		color: red;
	}
	
	// 头部
	.header {
		display: flex;
		justify-content: flex-end;
		button {
			margin: 10px 0px;
		}
	}
	
	// 表单
	.device-form {
		// 图片展示
		.picture-show {
			background-color: #fff;
			display: flex;
			flex-direction: column;
			margin-bottom: 31px;
			padding-bottom: 10px;
			.pictures {
				flex: 1;
				padding-top: 18px;
				padding-left: 20px;
				box-sizing: border-box;
				// 不可编辑时的图片展示区
				.display-img {
					width: 120px;
					height: 107px;
					margin-right: 10px;
					border-radius: 2px;
				}
			}
			// 可编辑时的图片添加区域
			.pictures /deep/ .el-upload--picture-card {
				border: 1px solid #ccc;
				background-color: #eee;
			}
		}
		// 基本信息
		.basic-info {
			min-height: 323px;
			margin-bottom: 31px;
			.basic-table {
				padding-left: 20px;
				padding-top: 18px;
			}
		}
		.basic-table /deep/ .has-nodevice {
			margin-bottom: 30px;
		}
		.basic-table /deep/ .el-row:nth-child(2) .nodevice-tip {
			color: #7C6AFF;
			padding-left: 65px;
			cursor: pointer;
			margin-bottom: 30px;
		}
		.basic-table /deep/ .el-form-item__content {
			display: flex;
		}
		.basic-table /deep/ .num-control .el-input__inner {
			width: 180px;
		}
		// 具体收费
		.charge {
			margin-bottom: 31px;
			.title {
				margin-bottom: 18px;
			}
			.charge-title {
				width:500px;
				display: flex;
				justify-content: space-between;
				padding: 0 20px;
				margin-bottom: 10px;
				.add-more {
					color: #7C6AFF;
					cursor: pointer;
				}
				.add-more:active {
					background-color: #7C6AFF;
					border-color: #7C6AFF;
					color: #fff;
				}
			}
			.charge-table {
				width:500px;
				margin: 0 20px;
				margin-bottom: 30px;
				border: 1px solid rgb(204, 204, 204);
				border-radius: 2px;
				color: #333;
				.table-head {
					height: 38px;
					background: rgb(245, 248, 254);
					display: flex;
					align-items: center;
					justify-content: space-around;
				}
				.charge-item {
					display: flex;
					align-items: center;
					border-bottom: 1px solid #eee;
					justify-content: space-around;
					.using-time {
						text-align: center;
						display: flex;
						justify-content: center;
						.day {
							width: 90px;
							height: 40px;
							line-height: 40px;
							border: 1px solid #eee;
							border-radius: 4px;
						}
					}
					.charge-row {
						height: 100%;
						text-align: center;
						.row-item {
							height: 50%;
							display: flex;
							align-items: center;
							border-bottom: 1px solid #eee;
							div {
								padding: 5px 10px;
								box-sizing: border-box;
								.el-input {
									line-height: 50px;
									width:120px;
								}
								.day-input {
									width: 50%;
									height: 50%;
								}
							}
						}
						.row-item:last-child {
							border-bottom: none;
						}
					}
					.operation {
						text-align: center;
						.del-btn {
							background: #7C6AFF;
							color: #fff;
							cursor: pointer;
						}
					}
				}
				.charge-item:last-child {
					border-bottom: none;
				}
				.no-item {
					height: 60px;
					color: #909399;
					text-align: center;
					line-height: 60px;
				}
			}
		}
		// 视频及描述
		.video-dec {
			margin-bottom: 21px;
			// 标题
			// 视频及描述外层
			.video-wrap {
				margin-top: 18px;
				padding-left: 20px;
				// 视频
				.video {
					margin-bottom: 20px;
					border-radius: 2px;
				}
				// 添加视频
				.add-video {
					margin-bottom: 20px;
					width: 604px;
					height: 302px;
					background: rgb(238, 238, 238);
					border: 1px solid rgb(204, 204, 204);
					border-radius: 2px;
					color: #666;
					cursor: pointer;
					.center {
						width: 90px;
						margin: 0 auto;
						height: 100%;
						display: flex;
						flex-direction: column;
						text-align: center;
						justify-content: center;
						.el-icon-video-play {
							font-size: 68px;
							margin-bottom: 22px;
						}
					}
				}
				// 添加视频成功后
				.show-video {
					margin-bottom: 20px;
					outline: none;
				}
				// 提示
				.tip {
					margin-bottom: 20px;
					color: #7C6AFF;
				}
				// 删除视频按钮
				.del-video {
					margin-bottom: 20px;
					background: #7C6AFF;
					border-radius: 4px;
					color: #fff;
					border: none;
				}
				.del-video:active {
					background-color: #255368;
					border-color: #255368;
				}
				// 显示描述
				.text-show {
					padding-left: 20px;
					padding-top: 10px;
					background: rgb(238, 238, 238);
					border-radius: 2px;
					min-height: 120px;
				}
			}
		}
	}
	
	.selected {
		display: flex;
		margin-left: 10px;
		li {
			position: relative;
			margin-right: 60px;
			margin-bottom: 8px;
			height: 25px;
			i {
				width: 20px;
				height: 20px;
				line-height: 17px;
				text-align: center;
				border: 1px solid #D9D9D9;
				background: #fff;
				color: #999999;
				position: absolute;
				right: -29px;
				top: -1px;
				cursor: pointer;
			}
		}
	}
	
	.showSelect {
		display: flex;
		margin: 20px 0px;
		background: #FAFAFA;
		padding: 15px;
		&>span {
			color: #7C6AFF;
		}
		&.noSelect {
			justify-content: space-around;
		}
		.selected {
			li {
				padding: 0px;
				position: relative;
				background: #7C6AFF;
				padding: 3px 5px;
				color: #fff;
				span {
					margin-right: 0px !important;
					top: -5px;
				}
			}
		}
		.noSelect {
			display: flex;
			flex-direction: column;
			align-items: center;
			img {
				width: 101px;
				height: 81px;
				margin-top: 40px;
				margin-bottom: 20px;
			}
		}
	}
	
	.tableFoot {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.confirmBtn {
		background-color: #7C6AFF;
		border-radius: 0px;
		color: #fff;
	}
	
	.cancelBtn {
		background-color: transparent;
		border-radius: 0px;
		border: 1px solid #d9d9d9;
	}
	
	/deep/ {
		.el-pagination__editor.el-input {
			width: 50px!important;
			.el-input__inner {
				height: 28!important;
			}
		}
	}
	
	@media screen and (max-width: 1615px) {
		/deep/ .el-card__body {
			.charge-item {
				.using-time {
					flex: 0.5;
				}
				.charge-row {
					.row-item {
						div {
							padding: 5px 5px !important;
							/deep/ {
								.el-input__inner {
									padding-left: 5px;
								}
							}
						}
					}
				}
				.operation {
					flex: 0.5;
				}
			}
		}
	}
	
	.card {
		padding: 20px 30px;
		background: #fff;
		margin-bottom: 20px;
		.headTitle {
			font-size: 20px;
			color: #333;
			padding-bottom: 20px;
			border-bottom: 1px solid #F0F0F0;
			margin-bottom: 35px;
		}
		.topNav {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #F0F0F0;
			padding-bottom: 20px;
			.headTitle {
				border-bottom: none;
				padding-bottom: 0px;
				margin-bottom: 0px;
			}
		}
	}
	
	.sn-input {
		display: flex;
		flex-direction: column;
	}
	
	/deep/ {
		.selectHour {
			.el-input {
				width: 100px!important;
			}
		}
		.el-form-item {
			display: flex;
			align-items: center;
			.el-form-item__label {
				width:85px;
				white-space: nowrap;
			}
		}
	}
</style>