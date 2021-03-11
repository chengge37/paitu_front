<template>
	<div>
		<div class="body" v-if="textArr[0].isActive">
			<el-form ref="form" :model="form" :rules="rules" label-width="90px"  :inline="false">
				<el-form-item label="当前头像：" class="avatar">
					<!--<upload-img  :imageUrl="form.avatar?($qiniuHost+form.avatar):util.male_pic" @handleSuccess="handleSuccess"></upload-img>-->
					<upload-img  :imageUrl="form.avatar?($qiniuHost+form.avatar):''" @handleSuccess="handleSuccess"></upload-img>
				</el-form-item>

				<!-- <Clipper :ratio="120/120" :uploadNum="3" :uploadWidth="100" :uploadHeight="100"></Clipper> -->

				<el-form-item label="昵称：" prop="nick">
					<el-input  v-model="form.nick" placeholder="请输入2-16个字符"></el-input>
				</el-form-item>
				<el-form-item class="born" label="出生日期：">
					<el-date-picker v-model="form.birthday" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="性别：">
					<el-radio-group v-model="form.sex">
						<el-radio label="1">男</el-radio>
						<el-radio label="2">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机号码：" prop="mobile">
					<span>{{user_data.mobile | toTel}}</span>
					<el-button type="text" @click="updateMobile">修改</el-button>
				</el-form-item>
				<el-form-item label="邮箱：" prop="email">
					<div v-if="!user_data.email">
						<span>您的账号还没有绑定邮箱</span>
						<el-button type="text" @click="bindEmail">绑定邮箱</el-button>
					</div>
					<div v-else>
						<span>{{user_data.email}}</span>
						<el-button type="text" @click="bindEmail">修改邮箱</el-button>
					</div>
				</el-form-item>
				<el-form-item class="foot">
					<el-button @click="updateUser" class="saveBtn color-area">修改</el-button>
				</el-form-item>
			</el-form>
		</div>

	</div>
</template>

<script>
	import uploadImg from 'ServeComponents/UploadImg/index.vue'
	import { mapGetters } from "vuex";
	import { frontPersonal,frontShop } from "@config/api.js"
	// import Clipper from '../../../../front_page/components/photoClipper'
	export default {
		data() {
    		return {
			textArr: [{
					word: '基本信息',
					isActive: true
				},
				{
					word: '地址管理',
					isActive: false
				}
			],
			activeIndex: '1',
			options: [{
				value: '1',
				label: '测试1',
			}, {
				value: '2',
				label: '测试2'
			}],
			form: {
				avatar: '',
				nick: '',
				name: '',
				birthday: '',
				sex: '0',
				company: '',
				address: '',
				bornDate: '',
				mobile:'',
				email:'',
			},
			rules: {
				nick: [
		          { required: true, message: "请输入姓名", trigger: "blur" },
		        ],
		   },
			avatarImg: '',
			token:'',
			role:'',
			}
	   },

		components: {
			uploadImg,
			// Clipper
		},
		created() {
			console.log('个人资料-----', this.user_data);
			console.log('this.validate--------',this.validate);
			//保存一个token变量,角色变量
			this.token=this.user_data.token;
			this.form.nick = this.user_data.nick
			
			//获取用户信息
			this.getUserInfo(this.user_data.id);
		},

		mounted() {},

		computed: {
			...mapGetters(["user_data"])
		},

		methods: {
			//获取用户信息
			getUserInfo(id){
				let params={
					uid:id
				}
				this.util.getUserMsg(params).then(res=>{
					console.log('getUserInfo------',res);
//					this.form.birthday = res.birthday;
//					this.form.sex = res.sex;
//					this.avatarImg = this.$qiniuHost + res.avatar;
//					this.role=res.role;
					this.form=res;
				})
			},
			
			updateUser(){
				console.log('this.form----',this.form);
				this.form.isAutoMsg=1;
				this.util.checkForm(this).then(res=>{
					this.util.updateSetting(this.form).then(res => {
						console.log('修改用户信息-----',res);
						this.$message.success('修改用户信息成功！');
						this.$store.dispatch('GetUserInfo')
					}).catch(err => {});
				})
			},
			
			//跳转到修改手机页面方法
			updateMobile(){
				this.$router.push({path:'/personal/person/security/phone'});
			},
			selectHeadTab(tab) {
				this.textArr.forEach(item => {
					item.isActive = false
				})
				tab.isActive = true
			},
			//图片上传成功方法
			handleSuccess(key) {
				this.form.avatar=key;
			},
			//绑定邮箱，跳转到绑定邮箱页面
			bindEmail(){
				this.$router.push({path:'/personal/person/security/email'});
			}
		}
	};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
	@import "../common/index.scss";
	.frontLayout {
		background: #FAFAFA!important;
	}
	.container {
		.head-tab {
			height: 60px;
			background: #fff;
			padding-left: 20px;
			box-sizing: border-box;
			display: flex;
			// align-items: center;
			// background: gold;
			.tab-item {
				font-size: 16px;
				color: #666;
				display: flex;
				margin-right: 30px;
				cursor: pointer;
				padding: 15px 0;
				box-sizing: border-box;
				// background: pink;
				span {
					// padding-bottom:5px;
					// box-sizing: border-box;
				}
			}
			.active {
				color: #7C6AFF;
				span:first-child {
					border-bottom: 2px solid #7C6AFF;
				}
			}
		}
		.body {
			height: 590px;
			border: 1px solid #eee;
			border-radius: 5px;
			padding: 39px 0px 92px 41px;
			background: #fff;
			/deep/ {
				.born {
					.time-label {
						margin: 0 11px;
					}
				}
				.el-radio__input.is-checked {
					.el-radio__inner {
						background: #7C6AFF;
						border-color: #7C6AFF;
					}
				}
				.el-radio__label {
					color: #333;
				}
				.el-form-item__label {
					// width: 88px;
					// height: 80px;
					// background: yellow;
					text-align: left;
				}
			}
			.avatar {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				img {
					width: 80px;
					height: 80px;
				}
				/deep/ {
					.el-form-item__label {
						width: 88px;
						height: 80px;
						text-align: left;
					}
					.el-form-item__label:first-child {
						line-height: initial;
					}
					.el-form-item__content {
						margin-left: 0px!important;
						line-height: 0px;
					}
					.el-upload--picture-card {
						width: 80px;
						height: 80px;
					}
				}
			}
			.address {
				/deep/ {
					.el-input__inner {
						width: 100px;
					}
					.el-select {
						margin-right: 10px;
					}
				}
			}
			.el-button {
				border-radius: 0px;
				margin-left:25px;
				color:#7C6AFF;
			}
			.foot {
				margin-top: 58px;
				/deep/{
					.el-form-item__content{
						margin-left:0px!important;
					}
				}
				
			}
			.saveBtn {
				background: #7C6AFF;
				color: #fff;
				border: none;
				margin-left:0px;
			}
		}
	}
	
	.el-input {
		width: 20%;
	}
	
	/deep/ .bottom {
		width: 80px;
	}
</style>