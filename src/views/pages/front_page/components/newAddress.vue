<template>
	<div>
		<el-dialog title="添加地址" :visible.sync="isShow" width="30%" :before-close="closed" center>	
			<el-form ref="form" :model="form" :rules="rules" label-width="95px">
				<el-form-item label="收货地址：" class="address" prop="city">
					<el-cascader size="large" :options="cityOptions"  @change="cityChange" placeholder="请选择省份/城市/地区" v-model="bb">
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
				<!--<el-form-item>
					<el-checkbox v-model="addIsDefault">设置为默认地址</el-checkbox>
				</el-form-item>-->
				
				<!--<el-form-item class="foot">
					<el-button @click="backToList">返回</el-button>
					<el-button class="confirmBtn" @click="addAdress">保存</el-button>
				</el-form-item>-->
			</el-form>
			
			<div class="foot">
				<el-button @click="addAdress" class="confirmBtn">添加地址</el-button>
				<el-button @click="closed" class="cancelBtn">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	/*                  新增地址登录组件
	 *      只接受一个参数就是showDialog,接受一个布尔值
	 *      ,其中true是显示,false是隐藏,默认为false
	 * 		接受关闭方法@closed来接受, 还有添加地址成功回调函数@addSuccess来接受
	 */		

	import { regionData,CodeToText } from 'element-china-area-data';
	import { frontAddress } from '@config/api.js';
	import { addNewAddress } from '@util/common.js';
	export default {
		props: {
			showDialog: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				bb:'',
				isShow:this.showDialog,
				cityOptions: regionData,
				form:{
					name:'',
					mobile:'',
					province:'',
					city:'',
					city_code:'',
					address:'',
					addressPOI:'',
					postal_code:'',
					areas:'',
					areas_code:'',
				},
				rules: {
			       name: [{ required: true, message:'请输入收货人信息', trigger: "blur" }],
			       mobile: [{ required: true, message:'请输入手机号码',  trigger: "blur" }],
			       addressPOI: [{ required: true,  message:'请输入详细地址',  trigger: "blur" }],
			       city: [{ required: true, message:'请选择城市',   trigger: "blur" }],
			    },
			}
		},
		watch: {
			showDialog(to) {
				this.isShow = to;
				if(to==false){
					this.bb=''
				}
			},
		},
		components: {},

		mounted() {},

		methods: {
			closed() {
				this.resetOption();
				this.$emit('closed');
			},
			//清空输入文本框内容
			resetOption(){
				this.form.name='';
				this.form.mobile='';
				this.form.province='';
				this.form.city='';
				this.form.city_code='';
				this.form.address='';
				this.form.addressPOI='';
				this.form.postal_code='';
				this.form.areas='';
				this.form.areas_code='';
			},
			//新增地址方法
			addAdress(){
				this.form.address=this.form.areas+this.form.addressPOI;
				console.log('this.form----',this.form);
				this.util.checkForm(this).then(res => {
			        if(res){
				        addNewAddress(this.form).then(res=>{
				        	this.resetOption();
			        	 	this.$message.success('新增地址成功！');
									 this.$emit('addSuccess',res);
				        })
			        }
			    });
			},

			//城市选择
			cityChange(val) {
				console.log('cityChange--------------',val,this.form);
				let form=this.form;
//				if(this.addNew){
//					form=this.form;
//				}else if(this.showEdit){
//					form=this.editItem;
//				}
				
				//判断是否选择为台湾省
				let firstVal=CodeToText[val[0]];
				if(firstVal=="台湾省"){
					form.city=firstVal;
					form.province=firstVal;
					form.city_code=this.util.getCodeByCity(form.province);
					form.areas=firstVal;
					form.areas_code=JSON.stringify(val);
					return;
				}
				
				let secondVal=CodeToText[val[1]];
				console.log('secondVal------------',secondVal,this.form.province);
				form.province=CodeToText[val[0]];
				//判断是否是市辖区,如果是，则城市名称是省份名称为省份名称
				if(secondVal=="市辖区"){
					form.city=this.form.province;
				}else{
					form.city=secondVal;
				}
				
				//判断是否为澳门或者香港
				if(form.province=='澳门特别行政区' || form.province=="香港特别行政区"){
					form.city_code=this.util.getCodeByCity(form.province);
					form.city=form.province;
					form.areas=form.city+secondVal;
					form.areas_code=JSON.stringify(val);
					return;
				}else{
					form.city_code=this.util.getCodeByCity(this.form.city);
				}
//				if(form.city=='北京市'){
//					this.$set(form,'city','北京城区');
//				}
				let area;
				if(val.length>2){
					area=CodeToText[val[2]];
				}
				if(CodeToText[val[1]]=="市辖区"){
					form.areas=this.form.province+CodeToText[val[1]]+area;
				}else{
					form.areas=this.form.province+this.form.city+area;
				}
				
				form.areas_code=JSON.stringify(val);
				console.log('this.form-----',form,this.form);
			},
		}
	};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
@import "@front/common/common.scss";
.foot{
	display:flex;
	justify-content:flex-end;
}
</style>