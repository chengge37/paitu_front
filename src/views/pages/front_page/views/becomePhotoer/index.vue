<template>
	<div>
		<div class="hire-wrap">
			<div class="hire-head">
				<ali-svg-icon icon-class="store_gray" class-name="bg-hire_head"></ali-svg-icon>
				<p class="open">我要成为摄影师</p>
			</div>
			
			<!--成为摄影师表格-->
			<div class="photoerForm">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="姓名">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="模特分类">
						<el-checkbox-group v-model="form.skill">
							<el-checkbox v-for="(item,index) in photoerSkillList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					
					<el-form-item>
						<el-button type="primary" @click="applyPhotoer">立即申请</el-button>
						<el-button>取消</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "model",
		data() {
			return {
				photoerSkillList:[],
				form:{
					name:'',
					skill:'',
				}
			};
		},
		watch:{
		},
		components: {},
		created() {
			this.photoerSkillList=this.config.photoerSkillList;
		},
		mounted(){
			
		},
		methods: {
			applyPhotoer(){
				console.log('申请成为摄影师-----------',this.form);
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
	.photoerForm{
		width:1200px;
		margin:0px auto;
		padding:50px 100px;
		border:1px solid #ddd;
		display:flex;
		justify-content:center;
	}
</style>