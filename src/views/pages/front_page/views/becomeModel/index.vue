<template>
	<div>
		<div class="hire-wrap">
			<div class="hire-head">
				<ali-svg-icon icon-class="store_gray" class-name="bg-hire_head"></ali-svg-icon>
				<p class="open">我要成为模特</p>
			</div>
			
			<!--成为模特表格-->
			<div class="modelForm">
				<el-form ref="form" :model="form" label-width="110px">
					<el-form-item label="真实姓名">
					    <el-input v-model="form.name"></el-input>
					 </el-form-item>
					 <el-form-item label="身份证号码">
					    <el-input v-model="form.idCard"></el-input>
					 </el-form-item>
					<el-form-item label="身份证正面：" class="avatar">
						<upload-img  :imageUrl="form.idCard1" @handleSuccess="handleSuccess"></upload-img>
					</el-form-item>
					<el-form-item label="身份证反面：" class="avatar">
						<upload-img  :imageUrl="form.idCard2" @handleSuccess="handleSuccess2"></upload-img>
					</el-form-item>
					<el-form-item label="手持身份证照片：" class="avatar">
						<upload-img  :imageUrl="form.idCard3" @handleSuccess="handleSuccess3"></upload-img>
					</el-form-item>
					<el-form-item label="模特分类">
						<el-checkbox-group v-model="form.modelType">
							<el-checkbox v-for="(item,index) in modelList" :label="index" :key="index">{{item.name}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item label="拍摄风格">
						<el-checkbox-group v-model="form.shootingType">
							<el-checkbox v-for="(item,index) in shootingList" :label="index" :key="index">{{item.name}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					 <el-form-item label="常驻城市">
					    <el-input v-model="form.city"></el-input>
					 </el-form-item>
					 <el-form-item label="身高">
					    <el-input v-model="form.height"></el-input>
					 </el-form-item>
					 <el-form-item label="体重">
					    <el-input v-model="form.weight"></el-input>
					 </el-form-item>
					 <el-form-item label="三围">
					    <el-input v-model="form.height"></el-input>
					 </el-form-item>
					 <el-form-item label="罩杯">
					    <el-input v-model="form.cup"></el-input>
					 </el-form-item>
					 <el-form-item label="鞋码">
					    <el-input v-model="form.shoseSize"></el-input>
					 </el-form-item>
					 <el-form-item label="国籍">
					    <el-input v-model="form.nationality"></el-input>
					 </el-form-item>
					 <el-form-item label="第一语言">
					    <el-input v-model="form.firstLanguage"></el-input>
					 </el-form-item>
					 <el-form-item label="第二语言">
					    <el-input v-model="form.secondLanguage"></el-input>
					 </el-form-item>
					 <el-form-item label="异地接单">
					    <el-radio-group v-model="form.placeOrder">
					      <el-radio label="是"></el-radio>
					      <el-radio label="否"></el-radio>
					    </el-radio-group>
					  </el-form-item>
					<el-form-item>
						<el-button type="primary" @click="applyModel">立即申请</el-button>
						<el-button>取消</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import uploadImg from 'ServeComponents/UploadImg/index.vue'
	export default {
		name: "model",
		data() {
			return {
				modelList:[],
				shootingList:[],
				languageList:[],
				form: {
		          modelType:[],
		          shootingType:[],
		          languageType:[],
		        }
			};
		},
		watch:{
			
		},
		components: {uploadImg},
		created() {
			this.modelList=this.config.modelTypeList;
			this.shootingList=this.config.shootingTypeList;
			this.languageList=this.config.languageType;
			console.log('-------------------',this.modelType,this.shootingType,this.languageType);
		},
		mounted(){
			
		},
		methods: {
			applyModel(){
				console.log('申请成为模特-----------');
			},
			handleSuccess(key){
				
			},
			handleSuccess2(key){
				
			},
			handleSuccess3(key){
				
			},
		}
	};
</script>

<style lang="scss" scoped>
	.hire-wrap {
		.hire-head {
			width: 100%;
			height: 230px;
			text-align: center;
			color: #333333;
			.open {
				font-size: 40px;
			}
			.step {
				font-size: 18px;
			}
			.bg-hire_head {
				width: 113px;
				height: 120px;
				color: $Theme-color;
			}
		}
	}
	.modelForm{
		width:1200px;
		margin:0px auto;
		padding:50px 100px;
		border:1px solid #ddd;
		display:flex;
		justify-content:center;
	}
	/deep/{
		.el-form-item{
			label{
				white-space:nowrap;
			}
		}
	}
</style>