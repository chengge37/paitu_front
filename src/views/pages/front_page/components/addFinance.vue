<template>
    <div>
    	<el-dialog title="添加财务" :visible.sync="isShow" width="30%" :before-close="closed" center>	
			<el-form ref="form" :model="form" :rules="rules" label-width="95px">
				<el-form-item label="收货地址：" class="address" prop="city">
					<el-cascader size="large" :options="cityOptions"  @change="cityChange" placeholder="请选择省份/城市/地区">
					</el-cascader>
					<el-input v-model="form.city" style="display:none;"></el-input>
				</el-form-item>
				<el-form-item label="详细地址：" prop="addressPOI">
					<el-input v-model="form.addressPOI"></el-input>
				</el-form-item>
				<el-form-item label="邮政编码：">
					<el-input  v-model="form.postal_code"></el-input>
				</el-form-item>
				<el-form-item label="收货人：" prop="name">
					<el-input  v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="手机号：" prop="mobile">
					<el-input  v-model="form.mobile"></el-input>
				</el-form-item>
			</el-form>
			
			<div class="foot">
				<el-button @click="addAdress" class="confirmBtn">添加地址</el-button>
				<el-button @click="closed" class="cancelBtn">取消</el-button>
			</div>
		</el-dialog>
    </div>
</template>
/*                  添加财务dialog
 *        接受参数是openlogin,接受一个布尔值
 *        ,其中true是显示,false是隐藏,默认为false
 *       closed  回调函数，关闭窗口dialog
 */
<script>
    export default {
    	props: {
		    openlogin: {
		      type: Boolean,
		      default: false
		    },
		},
        data(){
            return{
            	isShow: this.openlogin,
            }
        },
        created(){
        	
        },
        watch:{
        	openlogin(to) {
		      this.isShow = to;
		    },
        },
        mounted(){
        	
        },
        methods:{
        	//关闭窗口方法
        	closed() {
		      this.$emit("closed");
		    },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    
</style>