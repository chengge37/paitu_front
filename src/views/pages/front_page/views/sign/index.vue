<template>
	<div class="wrap">
		<p>签约入驻：</p>
		<div class="list">
			<ul>
				<li v-for="(item,index) in list" :key="index" @click="signType(index)">
					<img src="" alt="" />
					<el-button type="primary">{{item.name}}</el-button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import {apply} from '@config/api.js'

	export default {
		data() {
			return {
				list:[
					{
						name:'租赁商',
						icon:'',
					},
					{
						name:'摄影公司',
						icon:'',
					},
					{
						name:'模特公司',
						icon:'',
					},
					{
						name:'MCN公司',
						icon:'',
					},
					{
						name:'摄影师',
						icon:'',
					},
					{
						name:'模特',
						icon:'',
					}
				],
				applyUrl:'',
				detailRole:'',
				roleText:''
			};
		},
		components: {
			
		},
		
		created() {
			console.log(this.user_data,'个人信息')
			if(!this.user_data){
				this.$router.push({path:'/login',query:{to:'sign'}})
			}
		},
		computed: {
			...mapGetters(["city_code","user_data"])
		},
		mounted() {
			
		},
		methods: {
			//入驻
			signType(index){
				let routerList=[
					{
						url:'/gosetstore',
						role:1
					},
					{
						url:'/sign/companySign',
						role:2
					},
					{
						url:'/sign/companySign',
						role:3
					},
					{
						url:'/sign/companySign',
						role:4
					},
					{
						url:'/sign/modelSign',
						role:5
					},
					{
						url:'/sign/modelSign',
						role:6
					},
				]
				// let routerList=['/gosetstore','/sign/companySign','/sign/companySign','/sign/companySign','/sign/modelSign','/sign/modelSign'];
				this.getRequest(apply.get,{type:1}).then(res=>{
					console.log(res,'申请商家')
					if(res.progress!=1){
						if(res.type==1){
							if(res.detail.type==1){
								this.applyUrl='/gosetstore'
								this.detailRole=1
								this.roleText='租赁商'
							}else if(res.detail.type==2){
								this.applyUrl='/sign/companySign'
								this.detailRole=2
								this.roleText='摄影公司'
							}else if(res.detail.type==3){
								this.applyUrl='/sign/companySign'
								this.detailRole=3
								this.roleText='模特经纪公司'
							}else{
								this.applyUrl='/sign/companySign'
								this.	this.detailRole=4
								this.roleText='MCN公司'
							}
							// switch(res.detail.type){
							// 	case 1:
							// 		this.applyUrl='/gosetstore'
							// 		this.detailRole=1
							// 		this.roleText='租赁商'
							// 		break;
							// 	case 2:
							// 		this.applyUrl='/sign/companySign'
							// 		this.detailRole=2
							// 		this.roleText='摄影公司'
							// 		break;
							// 	case 3:
							// 		this.applyUrl='/sign/companySign'
							// 		this.detailRole=3
							// 		this.roleText='模特经纪公司'
							// 		break;
							// 	case 4:
							// 		this.applyUrl='/sign/companySign'
							// 		this.	this.detailRole=4
							// 		this.roleText='MCN公司'
							// 		break;
							// }
						}else{
							console.log('type2执行')
							if(res.detail.type==1){
								this.applyUrl='/sign/modelSign'
								this.detailRole=5
								this.roleText='摄影师'
							}else{
								this.applyUrl='/sign/modelSign'
								this.detailRole=6
								this.roleText='模特'
							}
						}
						console.log(this.applyUrl,this.detailRole,this.roleText,'oooooooooooooooooooo')
						if(routerList[index].url==this.applyUrl&&routerList[index].role==this.detailRole){
							this.$router.push({path:this.applyUrl,query:{role:this.detailRole,progress:res.progress}})
						}else{
							this.$router.push({path:this.applyUrl,query:{role:this.detailRole,progress:res.progress}})
							return
							this.$confirm(`您已经以 ${this.roleText} 的身份提交了申请`, "提示", {
								confirmButtonText: "确定",
								cancelButtonText: "取消",
								type: "warning"
							}).then(() => {
							}).catch(()=>{
							})
							// this.$message.error(`您已经以${roleText}的身份提交了申请`)
						}
					}else{
						if(!this.user_data.true_name){
							console.log('执行888',index)
							if(index==4||index==5){
								this.$confirm(`请先完成实名认证`, "提示", {
									confirmButtonText: "确定",
									cancelButtonText: "取消",
									type: "warning"
								}).then(() => {
									this.$router.push('/personal/person/certificate')
								}).catch(()=>{
								})
							}else{
								this.$router.push({path:routerList[index].url,query:{role:routerList[index].role,progress:1}});
							}
						}
						// let routerList=['/gosetstore','/sign/companySign','/sign/mcnSign','/sign/personSign','','/sign/modelSign'];
						// let routerList=['/gosetstore','/sign/companySign','/sign/companySign','/sign/companySign','/sign/modelSign','/sign/modelSign'];
					}
				}).catch(err=>{
					console.error(err)
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
.wrap{
	min-height: 400px;
	p{
		margin-bottom: 30px;
	}
	.list{
		ul{
			display:flex;
			align-items:center;
			li{
				margin-right: 20px;
			}
		}
	}
}
</style>