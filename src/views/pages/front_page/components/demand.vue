<template>
	<div class="demandDialog">
		<el-dialog :visible.sync="isShow" :title="title" center class="dialog" @closed="closed">
			<div class="demandInfo">

				<div class="login-botton">
					<el-button type="primary" @click.native="confirm">确定</el-button>
					<el-button type="default" @click.native="cancel">取消</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	/*                  mini登录组件
		 *        接受参数是openDialog,接受一个布尔值,
		 * 		  接受参数id，默认为空，如果有传，就是修改
		 *        ,其中true是显示,false是隐藏,默认为false
		 * 		  添加或者修改成功后返回方法 success方法
		 */
	import { mapGetters } from "vuex";

	export default {
		props: {
			openDialog: {
				type: Boolean,
				default: false
			},
			id:{
				type:String,
				default:'',
			}
		},
		data() {
			return {
				title:'发布需求',
				isShow: this.openlogin,
				form:{
					
				},
				demandInfo:null, //任务详情信息
			};
		},
		watch: {
			openDialog(to) {
				this.isShow = to;
			},
			id(to){
				//获取相关需求详情
				this.getDemandDetail(to);
			}
		},
		components: {},
		computed: {
			...mapGetters(["user_data"])
		},

		mounted() {
			console.log("demand--------------------------");
		},
		//注入app全局定义的方法
		inject: ["reloadComponent"],

		methods: {
			//获取任务详情
			getDemandDetail(id){
				console.log('getDemandDetail------',id);
			},
			//确认方法
			confirm(){
				console.log('confirm-----');
				this.$emit('success',true);
			},
			//关闭弹窗方法
			closed() {
				this.$emit("closed");
			},

		}
	};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
	@import "@css/color.scss";
	.demandDialog {
		/deep/ .el-dialog {
			width: 500px;
		}
		.demandInfo {}
	}
</style>