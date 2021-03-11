<template>
	<div class="find">
			<div class="tips">
				<span>您是不是要找：</span>
				<ul>
					<li class="cursor word-hover" @click="toDetail(item)" v-for="(item,index) in list" :key="index">
						{{item}}
					</li>
				</ul>
			</div>
			<div>
				<span>重新搜索：</span>
				<!--<front-searchbox @search='footSearch'></front-searchbox>-->
				<front-searchbox @search='footSearch'></front-searchbox>
			</div>
		</div>
</template>

<script>
	import frontSearchbox from './frontSearchBox'
	export default {
		props: {
			//type 0/影棚 1/设备
			type:{
				type:String,
				default:''
			}
		},

		data() {
			return {
				list:[],
				studio:['豪华影棚','精致影棚'],
				equip:['AD600M','AD600M','Canon EOS 6D Mark II']
			};
		},
		created() {
			if(this.type==0){
				this.list=this.studio;
			}else if(this.type==1){
				this.list=this.equip;
			}
			console.log('this.list------------',this.list);
		},
		components:{frontSearchbox},
		
		methods: {
			//跳到对应列表页面
			toDetail(val){
				let params={search:val};
				if(this.type==0){
					this.util.toStudioList(params);
				}else if(this.type==1){
					this.util.toEquipList(params);
				}
			},
			footSearch(val){
//				this.$emit('search',val);
				this.toDetail(val);
			}
		}
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.find{
		background:#fff;
		padding:30px 0px 20px 20px;
		color:#333333;
		font-family:PingFangSC-Regular;
		margin:80px 0px;
		.tips{
				margin-bottom:30px;
			}
		&>div{
			display:flex;
			align-items:baseline;
			span{
				margin-right:20px;
			}
			ul{
				display:flex;
				li{
					color:$Theme-color;
					margin-right:20px;
					&:hover{
						color:#409EFF!important;
					}
				}
			}
		}
	}
</style>