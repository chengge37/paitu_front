<template>
	<div>
		<div class="hire-wrap">
			<div class="hire-head">
				<ali-svg-icon icon-class="store_gray" class-name="bg-hire_head"></ali-svg-icon>
				<p class="open">经纪公司入驻</p>
			</div>
			
			<!--成为模特表格-->
			<div class="modelForm">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="公司名称:">
					    <el-input v-model="form.name"></el-input>
					 </el-form-item>
					 <el-form-item label="公司地址:">
					    <el-input v-model="form.name"></el-input>
					 </el-form-item>
					 <el-form-item label="联系人:">
					    <el-input v-model="form.contact"></el-input>
					 </el-form-item>
					 <el-form-item label="联系人:">
					    <el-input v-model="form.mobile"></el-input>
					 </el-form-item>
					 <el-form-item label="电子邮箱:">
					    <el-input v-model="form.email"></el-input>
					 </el-form-item>
					 <el-form-item label="公司简介:">
					    <el-input type='textarea' v-model="form.email"></el-input>
					 </el-form-item>
					<el-form-item label="营业执照：：" class="avatar">
						<upload-img  :imageUrl="form.idCard1" @handleSuccess="handleSuccess"></upload-img>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="applyBroker">立即申请</el-button>
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
				form: {
					
		        }
			};
		},
		watch:{
			
		},
		components: {uploadImg},
		created() {
			
		},
		mounted(){
			
		},
		methods: {
			applyBroker(){
				console.log('入驻经纪公司-----------');
			},
			//图片上传成功回调方法
			handleSuccess(key){
				
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
</style>