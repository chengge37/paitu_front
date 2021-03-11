<template>
	<div class="certificate-wrap">
		<div class="certificate" v-if="!certificateSuccess">
			<div class="name">
				<span>姓名：</span>
				<el-input v-model="userName" placeholder="请输入真实姓名" @blur="checkName"></el-input>
			</div>
			<div class="id-card">
				<span>身份证号：</span>
				<el-input v-model="idCard" placeholder="身份证号与真实姓名对应" @blur="checkIdCard(idCard)"></el-input>
			</div>
			<el-button class="color-area" @click="check">立即验证</el-button>
		</div>
		<div class="success" v-else>
			<ali-svg-icon icon-class="succ" class-name="success-icon"></ali-svg-icon>
			<span>认证成功</span>
		</div>
	</div>
</template>

<script>
import { setting } from "@/config/api.js";

	export default {
		data(){
			return{
				certificateSuccess:false,
				userName:'',
				idCard:''
			}
		},
		computed: {
			
		},
		created(){
			// this.$message.warning("功能建设中！");
			this.isUserTrue();
		},
		methods:{
			//获取用户是否已经使实名认证
			isUserTrue(){
				this.util.isUserTrue().then(res=>{
					if(res){
						this.certificateSuccess=true;
					}
				})
			},
			check(){
				this.postRequest(setting.checkUser,{name:this.userName,card:this.idCard}).then(res=>{
					console.warn(res,'oiopiopopoii')
					if(res){
						this.certificateSuccess=!this.certificateSuccess;
					}
				}).catch(err=>{})
			},
			checkName(){
				if(this.userName.length<2){
					this.$message.warning('姓名长度必须在两位以上')
				}
			},
			checkIdCard(val){
				if(val.length!=18){
					this.$message.warning('身份证号码位数不正确')
				}
				var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
				if(!idcardReg.test(val)) {
					this.$message.warning('身份证号码不正确')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.certificate-wrap{
	background: #fff;
	min-height: 584px;
	padding-top: 33px;
	padding-left: 22px;
	box-sizing: border-box;
	.certificate{
		.name,.id-card{
			width: 50%;
			display: flex;
			align-items: center;
			span{
				display: block;
				text-align: right;
				width: 100px;
				margin-right: 12px;
			}
		}
		.name{
			margin-bottom: 34px;
		}
		.id-card{
			margin-bottom: 44px;
		}
		.el-button{
			margin-left: 94px;
			width:100px;
			height:40px;
			background:rgb(101,31,255);
			color: #fff;
			border-radius: 0;
		}
	}
	.success{
		padding-top: 60px;
		box-sizing: border-box;
		text-align: center;
		display: flex;
		flex-direction: column;
		.success-icon{
			width: 64px;
			height: 64px;
			margin-bottom: 18px;
			align-self: center;
		}
		span{
			font-size: 24px;
			color: #333;
		}
	}
}
</style>