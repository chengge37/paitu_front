<template>
	<div>
		<div class="address-manage" v-if="addressList">
			<el-table :data="list" border style="width: 100%">
				<el-table-column label="姓名" width="180">
					<template slot-scope="scope">
						<span>{{scope.row.name}}</span>
					</template>
				</el-table-column>
				<el-table-column label="所在地区" width="180">
					<template slot-scope="scope">
						<span>{{scope.row.areas}}</span>
					</template>
				</el-table-column>
				<el-table-column label="详细地址">
					<template slot-scope="scope">
						<span>{{scope.row.addressPOI}}</span>
					</template>
				</el-table-column>
				<el-table-column label="手机/电话" width="180">
					<template slot-scope="scope">
						<span>{{scope.row.mobile}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="180">
					<template slot-scope="scope">
						<div class="operate">
							<el-button type="text" class="edit" @click="editAddress(scope.row)">编辑</el-button>
							<el-button type="text" @click="delAddress(scope.row.id)">删除</el-button>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="">
					<template slot-scope="scope">
						<span class="setDefault" v-if="scope.row.is_default==1">默认地址</span>
						<span  v-else  class="default word-hover " @click="setDefaultAddress(scope.row.id)">设为默认</span>
					</template>
				</el-table-column>
			</el-table>
			<div class="address-btn color-area" @click="toAddress">
				新增收货地址
			</div>
		</div>
		
		<!--新增地址模块-->
		<div class="addNew" v-if="addNew">
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
				<el-form-item>
					<el-checkbox v-model="addIsDefault">设置为默认地址</el-checkbox>
				</el-form-item>
				
				<el-form-item class="foot">
					<el-button @click="backToList">返回</el-button>
					<el-button class="confirmBtn" @click="addAdress">保存</el-button>
				</el-form-item>
			</el-form>
		</div>
		
		
		<!--编辑地址模块-->
		<div class="addNew" v-if="showEdit">
			<el-form ref="editItem" :model="editItem" :rules="editRules" label-width="95px">
				<el-form-item label="收货地址：" class="address" prop="city">
					<el-cascader size="large"  v-model="editItem.areas_code" :options="cityOptions"  @change="cityChange" placeholder="请选择省份/城市/地区">
					</el-cascader>
					<el-input v-model="editItem.city" style="display:none;"></el-input>
				</el-form-item>
				<el-form-item label="详细地址：" prop="addressPOI">
					<el-input v-model="editItem.addressPOI"></el-input>
				</el-form-item>
				<el-form-item label="收货人：" prop="name">
					<el-input  v-model="editItem.name"></el-input>
				</el-form-item>
				<el-form-item label="手机号：" prop="mobile">
					<el-input  v-model="editItem.mobile"></el-input>
				</el-form-item>
				<el-form-item>
					<el-checkbox v-model="editIsDefault" :disabled="editIsDefault">设置为默认地址</el-checkbox>
				</el-form-item>
				
				<el-form-item class="foot">
					<el-button @click="backToList">返回</el-button>
					<el-button class="confirmBtn" @click="updateAddress">保存</el-button>
				</el-form-item>
			</el-form>
		</div>
		

	</div>
</template>

<script>
	import { regionData,CodeToText } from 'element-china-area-data';
	import { allCity } from "@config/config.js"
	import {frontAddress} from "@config/api.js"
	export default {
		data: () => ({
			activeIndex: '1',
			addIsDefault:false,  //新增地址是否设置为默认地址
			editIsDefault:false,  //修改地址是否设置为默认地址
			addressList:true,  //显示地址列表
			cityOptions: regionData,
			textArr: [{
					word: '基本信息',
					isActive: true
				},
				{
					word: '地址管理',
					isActive: false
				}
			],
			list:[],   //地址列表信息
			addNew:false,  //是否显示新增地址模块
			showEdit:false,  //是否显示编辑地址模块
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
			editItem:{    //编辑地址信息
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
		   editRules: {
		      name: [{ required: true, message:'请输入收货人信息', trigger: "blur" }],
		      mobile: [{ required: true, message:'请输入手机号码',  trigger: "blur" }],
		      addressPOI: [{ required: true,  message:'请输入详细地址',  trigger: "blur" }],
		      city: [{ required: true, message:'请选择城市',   trigger: "blur" }],
		    }
		}),

		components: {},

		created(){
			this.getAddressList();
		},
		mounted() {
		},

		methods: {
			//获取用户地址列表信息
			getAddressList(){
				 this.getRequest(frontAddress.getAddressList).then(res => {
	        	 	console.log('getAddressList------',res);
	        	 	this.list=res;
		        }).catch(err => {});
			},
			//根据id删除用户地址
			delAddress(id){
				this.util.confirm(this).then(res=>{
					console.log('id---',id);
				    let params={id:id};
				    this.getRequest(frontAddress.delAddress,params).then(res => {
	        	 	   console.log('delAddress------',res);
	        	 	   this.$message.success('删除地址成功！');
	        	 	   //重新获取地址列表
	        	 	   this.getAddressList();
		            }).catch(err => {});
				}).catch(err => {});
				
			},
			selectHeadTab(tab) {
				this.textArr.forEach(item => {
					item.isActive = false
				})
				tab.isActive = true
			},
			//城市选择
			cityChange(val) {
				console.log('cityChange--------------',val);
				let form;
				if(this.addNew){
					form=this.form;
				}else if(this.showEdit){
					form=this.editItem;
				}
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
				form.province=CodeToText[val[0]];
				//判断是否是市辖区,如果是，则城市名称是省份名称为省份名称
				if(secondVal=="市辖区"){
					form.city=form.province;
				}else{
					form.city=secondVal;
				}
				
				//判断是否为澳门或者香港
				if(form.province=='澳门特别行政区' || form.province=="香港特别行政区"){
					form.city_code=this.util.getCodeByCity(form.province);
					form.city=form.province;
					form.areas=form.city+secondVal;
					form.areas_code=val;
					return;
				}else{
					form.city_code=this.util.getCodeByCity(form.city);
				}
				let area='';
				if(val.length>2){
					area=CodeToText[val[2]];
				}
				if(CodeToText[val[1]]=="市辖区"){
					form.areas=form.province+CodeToText[val[1]]+area;
				}else{
					form.areas=form.province+form.city+area;
				}
				
				form.areas_code=val;
				console.log('form--------------',form);
			},
			//返回地址列表
			backToList(){
				this.addNew=false;
				this.showEdit=false;
				this.addressList=true;
				//重新获取数据
				this.getAddressList();
			},
			//清空地址参数
			resetParams(){
				for(var item in this.form){
					this.form[item]='';
				}
				this.form.areas_code=[];
				console.log('resetParams------------',this.form);
			},
			//跳转到新增地址模块
			toAddress(){
				//跳入页面之前，清空之前的数据
				this.resetParams();
				this.addressList=false;
				this.addNew=true;
			},
			//新增地址方法
			addAdress(){
				this.form.address=this.form.areas+this.form.addressPOI;
				this.form.areas_code=JSON.stringify(this.util.deepcopy(this.form.areas_code));
				console.log('this.form----',this.form);
				this.util.checkForm(this).then(res => {
			        if(res){
			        	 this.postRequest(frontAddress.addNewAddress,this.form).then(res => {
			        	 	console.log('frontAddress------',res);
			        	 	this.$message.success('新增地址成功！');
			        	 	//判断是否设置为默认地址
			        	 	if(this.addIsDefault==1){
			        	 		this.setDefaultAddress(res);
			        	 	}else{
			        	 		this.backToList();
			        	 	}
				        }).catch(err => {});
				        
			        }
			    });
			},
			//修改地址保存方法
			updateAddress(){
				this.editItem.address=this.editItem.areas+this.editItem.addressPOI;
				this.editItem.areas_code=JSON.stringify(this.editItem.areas_code);
				if(this.editIsDefault){
					this.editItem.is_default='1';
				}else{
					this.editItem.is_default='0';
				}
				console.log('this.editItem----',this.editItem);
				this.util.checkForm(this,'editItem').then(res => {
			        if(res){
			        	 this.postRequest(frontAddress.updateAddress,this.editItem).then(res => {
			        	 	console.log('updateAddress------',res);
			        	 	this.$message.success('修改地址成功！');
			        	 	//判断是否设置为默认地址
			        	 	if(this.editItem.is_default==1){
			        	 		this.setDefaultAddress(this.editItem.id);
			        	 	}else{
			        	 		this.backToList();
			        	 	}
			        	 	
				        }).catch(err => {});
				        
			        }
			    });
			},
		
			//编辑地址模块
			editAddress(item){
				console.log('this.editItem----',item);
				this.editItem=item;
				this.showEdit=true;
				this.addressList=false;
				//将区域编码转为数组
				this.editItem.areas_code=JSON.parse(this.editItem.areas_code);
				if(this.editItem.is_default==1){
					this.editIsDefault=true;
				}else{
					this.editIsDefault=false;
				}
				
			},
			//设置默认地址
			setDefaultAddress(id){
				this.util.setDefaultAddress(id).then(res=>{
					if(this.addNew || this.showEdit){
						//返回地址列表页面
						this.backToList();
					}else{
						this.$message.success('设置默认地址成功！');
		        	 	//重新获取地址列表
		        	 	this.getAddressList();
					}
				})
			},
			
		}
	};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
	.container {
		.head-tab {
			height: 60px;
			background: #fff;
			padding-left: 20px;
			box-sizing: border-box;
			display: flex;
			.tab-item {
				font-size: 16px;
				color: #666;
				display: flex;
				margin-right: 30px;
				cursor: pointer;
				padding: 15px 0;
				box-sizing: border-box;
			}
			.active {
				color: #7C6AFF;
				span:first-child {
					border-bottom: 2px solid #7C6AFF;
				}
			}
		}
		.address-manage {
			.el-table {
				margin-bottom: 45px;
				border-radius: 0;
				/deep/ {
					.el-table__row {
						height: 100px;
						.edit,
						.default {
							color: #7C6AFF;
							cursor:pointer;
						}
					}
					.el-table_1_column_5 {
						.el-row {
							width: 20%;
							margin: 0 auto;
							cursor: pointer;
						}
						.el-row:first-child {
							margin-bottom: 15px;
						}
					}
					th {
						background: #D9D9D9!important;
						height: 54px;
					}
				}
			}
			.address-btn {
				cursor: pointer;
				width: 118px;
				height: 36px;
				line-height: 36px;
				text-align: center;
				background: rgb(101, 31, 255);
				color: #fff;
				margin-left: 30px;
			}
			.operate{
				display:flex;
				flex-direction: column;
				justify-content:center;
				align-items:center;
				button{
					width:50px;
					margin-left:0px!important;
				}
			}
			span.setDefault{
				
			}
		}
	}
	
	
	/*新增地址样式*/
	.addNew{
		background:#fff;
		padding-left:20px;
		padding-top:30px;
		/deep/{
			input{
				width:30%;
				border-radius:0px;
			}
			.address{
				input{
					width:220px!important;
				}
			}
		}
		.confirmBtn{
			background:#7C6AFF;
			width:80px;
			height:40px;
			color:#fff;
			border-radius:0px;
			margin-bottom:100px;
		}
	}
	/deep/{
		.el-table th,.el-table td{
			text-align:center;
		}
	}
	
</style>