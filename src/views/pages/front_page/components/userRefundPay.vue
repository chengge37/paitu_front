<template>
	<div>
		<el-dialog :visible.sync="isShow" title="退款" center class="dialog" @closed="closed" width="500px">
			<!--<div class="text">
				<span>退款金额：</span>
				<input type="text" v-model="refund_price" placeholder="请输入正整数的金额" />
			</div>
			<div class="text">
				<span>退款原因：</span>
				<input type="text" v-model="refund_reason" placeholder="请输入退款原因" />
			</div>-->
			
			<el-form ref="form" label-width="95px">
				<el-form-item label="退款金额：">
					<el-input v-model="refund_price" placeholder="请输入正整数的金额" ></el-input>
				</el-form-item>
				<el-form-item label="退款原因：">
					<el-input  v-model="refund_reason" placeholder="请输入退款原因" ></el-input>
				</el-form-item>
			</el-form>
			
			<div class="foot">
				<el-button @click="refund" type="primary" class="confirmBtn">退款</el-button>
				<el-button @click="closed" class="cancelBtn">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props:{
			show: {
		      type: Boolean,
		      default: false
		    },
		    type:{
		    	type:String,
		    	default:'',
		    },
		    id:{
		    	type:String,
		    	default:'',
		    }
		},
		data() {
			return {
				isShow: this.show,
				refund_price:'',  //退款金额
				refund_reason:'',  //退款原因
			}
		},
		watch: {
    
		    show(to) {
		      this.isShow = to;
		    },
		  },
		
	    mounted(){
	    	
	    },
		methods: {
			refund(){
				let params={
		        	order_id:this.id,
		        	order_type:this.type,
		        	refund_price:this.refund_price,
		        	refund_reason:this.refund_reason
		        };
				this.util.userRefundPay(params).then(res=>{
		          this.$message.success('你的退款申请已提交！');
		          this.$emit("refundSuccess",true);
		        })
			},
			//关闭窗口
			closed() {
			  this.refund_price='';
			  this.refund_reason='';
		      this.$emit("closed");
		    },
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.foot{
	display:flex;
	align-items:center;
	justify-content:center;
}

</style>