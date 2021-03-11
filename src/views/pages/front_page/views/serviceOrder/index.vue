<template>
	<div class="hire-wrap">
		<step-info stepIndex='1'></step-info>
		<div class="first-step productInfo">
			<!--收货信息-->
			<div class="serviceInfo">
				<div class="top">
					<span v-if="orderType==4 && door_to_door==0">店家地址</span>
					<span v-else>收货信息</span>
				</div>
				<div class="mainInfo">
					<div class="info addressInfo" v-if="orderType!=4">
						<!--<p>默认地址</p>-->
						<div class="baseInfo receive" v-if="addressInfo">
							<p>
								<span>收&nbsp; 货&nbsp; 人：</span>
								<span>{{addressInfo.name}}</span>
							</p>
							<p>
								<span>联系方式 ：</span>
								<span>{{addressInfo.mobile | toTel}}</span>
							</p>
							<p>
								<span>收货地址 ：</span>
								<span>{{addressInfo.address}}</span>
							</p>

						</div>
						<div v-else>
							<p>暂无可用地址</p>
						</div>
					</div>
					<div class="detail" v-if="orderType!=4">
						<div class="operate">
							<el-button type="text" v-if="addressList.length>1" @click="changeAddress">切换地址</el-button>
							<el-button type="text" class="newAddress" @click="addAddress">新增地址</el-button>
						</div>
					</div>

					<div class="info" v-if="packInfo && door_to_door==0 && orderType==4">
						<p>
							店家名称：
							<span>{{packInfo.auto_msg_user.nick}}</span>
						</p>
						<p>
							联系电话：
							<span>{{packInfo.auto_msg_user.mobile}}</span>
						</p>
						<p>
							店家地址：
							<span>{{packInfo.auto_msg_user.address}}</span> 
						</p>
					</div>
	
				</div>
			</div>
			
			<div class="selectMode">
				<el-radio-group  :disabled="packInfo && packInfo.door_to_door!=1" v-model="door_to_door">
			      <el-radio label="0">到店自取</el-radio>
			      <el-radio label="1">配送</el-radio>
			    </el-radio-group>
		   </div>

			<!--服务详情信息-->
			<div class="serviceInfo">
				<div class="top">
					服务
				</div>
				
				<!--模特订单信息-->
				<div class="mainInfo" v-if="modelInfo">
					<div class="info">
						<!--<p>商品信息</p>-->
						<div class="baseInfo">
							<p>基本信息</p>
							<p>{{modelInfo.name}}</p>
						</div>
						<div class="baseInfo">
							<p>店铺名称</p>
							<p>{{modelInfo.to_user.nick}}</p>
						</div>
						<div class="avatar">
							<el-image fit="contain" :src="util.picExplode(modelInfo.photo)" class="cursor"/>
							</el-image>
						</div>
					</div>
					<div class="detail">
						<ul>
							<li>
								<p>时间</p>
								<span>{{totalDays}}天</span>
							</li>
							<li>
								<p>开始时间</p>
								<span>{{startTime}}</span>
							</li>
							<li>
								<p>结束时间</p>
								<span>{{endTime}}</span>
							</li>
							<li>
								<p>单价</p>
								<span>￥{{modelInfo.ppd}}.00</span>
							</li>
							<li>
								<p>实付</p>
								<span>￥{{totalPrice}}</span>
							</li>
						</ul>
					</div>
				</div>
				
				
				<!--助理订单信息-->
				<div class="mainInfo" v-if="assistantInfo">
					<div class="info">
						<!--<p>商品信息</p>-->
						<div class="baseInfo">
							<p>基本信息</p>
							<p>{{assistantInfo.title}}</p>
						</div>
						<div class="baseInfo">
							<p>店铺名称</p>
							<p>{{assistantInfo.auto_msg_user.nick?assistantInfo.auto_msg_user.nick:'该商家未填写名称'}}</p>
						</div>
						<div class="avatar">
							<el-image fit="contain" :src="util.picExplode(assistantInfo.pic)" class="cursor"/>
							</el-image>
						</div>
					</div>
					<div class="detail">
						<ul>
							<li>
								<p>开始时间</p>
								<span>{{startTime}}</span>
							</li>
							<li>
								<p>结束时间</p>
								<span>{{endTime}}</span>
							</li>
							<li v-if="rentType==1">
								<p>时间</p>
								<span>{{totalHours}}小时</span>
							</li>
							<li v-if="rentType==2">
								<p>时间</p>
								<span>{{totalDays}}天</span>
							</li>
							<li v-if="rentType==2">
								<p>单价</p>
								<span>￥{{assistantInfo.price_day}}</span>
							</li>
							<li>
								<p>实付</p>
								<span>￥{{totalPrice}}</span>
							</li>
						</ul>
					</div>
				</div>
				
				<!--套餐订单信息-->
				<div class="mainInfo" v-if="packInfo">
					<div class="info">
						<!--<p>商品信息</p>-->
						<div class="baseInfo">
							<p>基本信息</p>
							<p>{{packInfo.name}}</p>
						</div>
						<div class="baseInfo">
							<p>店铺名称</p>
							<p>{{packInfo.auto_msg_user.nick?packInfo.auto_msg_user.nick:'该商家未填写名称'}}</p>
						</div>
						<div class="avatar">
							<el-image fit="contain" :src="util.picExplode(packInfo.pic)" class="cursor"/>
							</el-image>
						</div>
					</div>
					<div class="detail">
						<ul>
							<li>
								<p>开始时间</p>
								<span>{{startTime}}</span>
							</li>
							<li>
								<p>结束时间</p>
								<span>{{endTime}}</span>
							</li>
							<li v-if="rentType==1">
								<p>时间</p>
								<span>{{totalHours}}小时</span>
							</li>
							<li v-if="rentType==2">
								<p>时间</p>
								<span>{{totalDays}}天</span>
							</li>
							<li v-if="rentType==2">
								<p>单价</p>
								<span>￥{{packInfo.priceDay}}</span>
							</li>
							<li>
								<p>实付</p>
								<span>￥{{totalPrice}}</span>
							</li>
						</ul>
					</div>
				</div>
				
				<!--服务订单信息-->
				<div class="mainInfo" v-if="serviceInfo">
					<div class="info">
						<div class="baseInfo">
							<p>服务信息</p>
							<p>{{serviceInfo.title}}</p>
						</div>
						<div class="baseInfo">
							<p>规则描述</p>
							<p>{{productInfo.name}}</p>
						</div>
						<div class="baseInfo">
							<p>店铺名称</p>
							<p>{{serviceInfo.auto_msg_user.nick?serviceInfo.auto_msg_user.nick:'该商家未填写名称'}}</p>
						</div>
						<div class="avatar">
							<el-image fit="contain" :src="serviceInfo.auto_msg_user.avatar?$qiniuHost+serviceInfo.auto_msg_user.avatar:config.defaultStorePic" class="cursor"/>
							</el-image>
						</div>
					</div>
					<div class="detail">
						<ul>
							<li>
								<p>单价</p>
								<span>￥{{productInfo.price}}</span>
							</li>
							<li>
								<p>数量</p>
								<span>{{serviceNum}}</span>
							</li>
							<li>
								<p>实付</p>
								<span>￥{{serviceAllPrice}}</span>
							</li>
						</ul>
					</div>
				</div>
				
				
				<!--团购拼拍订单信息-->
				<div class="mainInfo" v-if="teamInfo">
					<div class="info">
						<div class="baseInfo">
							<p>服务信息</p>
							<p>{{teamInfo.title}}</p>
						</div>
						<div class="baseInfo">
							<p>店铺名称</p>
							<p>{{teamInfo.user.nick}}</p>
						</div>
						<div class="avatar">
							<el-image fit="contain" :src="util.picExplode(teamInfo.photo)" class="cursor"/>
							</el-image>
						</div>
					</div>
					<div class="detail">
						<ul>
							<li>
								<p>单价</p>
								<span>￥{{teamInfo.price}}</span>
							</li>
							<li>
								<p>数量</p>
								<span>{{teamNum}}</span>
							</li>
							<li>
								<p>实付</p>
								<span>￥{{teamAllPrice}}</span>
							</li>
						</ul>
					</div>
				</div>
				
				
			</div>
			
			
			<!--模特下单信息-->
			<div class="workContent" v-if="modelInfo">
				<span>工作内容：</span>
				<el-input type="textarea" v-model="workContent" placeholder="请输入模特大概工作内容" :row="2"></el-input>
			</div>
			
			
			<div class="remark" v-if="serviceInfo || teamInfo || assistantInfo || packInfo">
				<span>备注内容：</span>
				<el-input placeholder="请输入备注内容" v-model="remark"></el-input>
			</div>
			
			
			<!--显示商家地址（暂时只有团购拼拍有显示）-->
			<div class="storeAddress" v-if="(teamInfo || serviceInfo) && storeAddress">
				<ul>
					<li>
						<span>请将样品寄到以下地址</span>
						<p>{{storeAddress.address}}</p>
					</li>
					<li>
						<span>收件人</span>
						<p>{{storeAddress.name}}</p>
					</li>
					<li>
						<span>联系电话</span>
						<p>{{storeAddress.mobile}}</p>
					</li>
				</ul>
			</div>


			<div class="totalPrice" v-if="modelInfo || assistantInfo">
				<p>总计应付：</p>
				<span>￥{{totalPrice}}</span>
			</div>
			<div class="totalPrice" v-if="serviceInfo">
				<p>总计应付：</p>
				<span>￥{{serviceAllPrice}}</span>
			</div>
			
			<div class="toPay" v-if="modelInfo">
				<el-button class="payBtn color-area" @click="commitModelOrder">去付款</el-button>
			</div>
			<div class="toPay" v-if="serviceInfo">
				<el-button class="payBtn color-area" @click="commitServiceOrder">去付款</el-button>
			</div>
			<div class="toPay" v-if="teamInfo">
				<el-button class="payBtn color-area" @click="commitTeamOrder">去付款</el-button>
			</div>
			<div class="toPay" v-if="assistantInfo">
				<el-button class="payBtn color-area" @click="commitAssistantOrder">去付款</el-button>
			</div>
			<div class="toPay" v-if="packInfo">
				<el-button class="payBtn color-area" @click="commitPackOrder">去付款</el-button>
			</div>

		</div>
		

		<!--新增地址-->
		<new-address :showDialog.sync="showAddAddress" @closed="closeAddAdress" @addSuccess="addSuccess"></new-address>

		<!--切换地址模块-->
		<el-dialog title="切换地址" :visible.sync="showAddressList" width="50%"  center>
			<el-table :data="addressList" style="width: 100%" height="250">
				<el-table-column prop="name" label="姓名" width="150">
				</el-table-column>
				<el-table-column prop="address" label="地址">
				</el-table-column>
				<el-table-column  label="手机" width="120">
					<template slot-scope="scope">
						{{scope.row.mobile | toTel}}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button  type="text" size="small" @click="setDefaultAddress(scope.row.id)">
							设为默认地址
						</el-button>
						<el-button  type="text" size="small" @click="editAddress(scope.row)">
							编辑
						</el-button>
						<el-button  type="text" size="small" @click="selectAddress(scope.row.id)">
							选择
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>

	</div>
</template>

<script>
	import { frontOrder, frontEquip, sms, frontAddress } from "@config/api.js"
	import newAddress from "FrontComponents/newAddress"
	import QRCode from "qrcode"
	import {updateOrderAddress} from "@util/common.js";
	import stepInfo from './steps.vue'
	export default {
		data() {
			return {
				orderType:0, //订单类型，  0/模特订单，1/服务订单,2/团购拼拍订单,3/助理订单,4/套餐订单
				addressInfo: null, //要显示的收货地址信息
				storeAddress:null, //商家地址
				showAddAddress: false, //是否显示新增地址窗口
				orderId:'',   //订单id
				modelId:'',  //模特id
				assistantId:'',  //助理id
				packId:'', //套餐id
				teamId:'',  //团购id
				serviceId:'',  //服务id
				productId:'',  //服务项目id
				productInfo:'',  //服务项目信息
				serviceInfo:null, //服务信息
				servicePrice:0, //服务订单单价
				totalServicePrice:'',  //服务订单总价
				serviceNum:0,  //服务项目数量
				modelInfo:null,  //模特信息
				assistantInfo:null,  //助理信息
				teamInfo:null,  //团购拼拍信息
				teamNum:0,  //团购拼拍数量
				storeInfo: {}, //店家信息
				totalDays: 0, //一共多少天
				totalHours:0, //一共多少个小时
				startTime: '', //订单开始时间
				endTime: '', //订单结束时间
				payIndex: 0,
				stepOne: true,
				stepTwo: false,
				stepThree: false,
				totalPrice: 0,
				addressList:[],  //地址列表
				showAddressList:false,  //是否显示地址列表弹框
				workContent:'',  //模特工作内容（类似于备注）
				remark:'',  //备注（服务订单,助理订单）
				rentType:'', //助理订单，下单模式 1/按小时  2/按天
				packInfo:null, //套餐产品信息
				door_to_door:'0', //是否送货上门（套餐订单）
			}
		},
		created() {
			//判断是模特订单（有id字段就是模特订单）暂定，还是服务订单
			let query=this.$route.query;
			if(query.id){
				//模特订单
				this.modelId=query.id;
				this.getModelById(this.modelId);
				this.startTime=query.startTime;
				this.endTime=query.endTime;
				this.totalDays=this.util.datedif(this.startTime,this.endTime)+1;
			}else if(query.serviceId){
				//服务订单
				this.serviceId=query.serviceId;
				this.productId=query.productId;
				this.serviceNum=query.num;
				this.getServiceDetail(this.serviceId);
				this.orderType=1;
			}else if(query.teamId){
				//团购拼拍订单
				this.teamId=query.teamId;
				this.teamNum=query.num;
				this.getTeamDetail(this.teamId);
				this.orderType=2;
			}else if(query.assistantId){
				//助理订单
				this.assistantId=query.assistantId;
				this.getAssistantDetail(this.assistantId);
				this.startTime=query.startTime;
				this.endTime=query.endTime;
				//租赁模式 1/按小时  2/按天
				this.rentType=query.type;
				if(this.rentType==1){
					console.log('rentType-----------------1----------',this.startTime,this.endTime);
					this.totalHours=this.util.calHours(this.startTime,this.endTime);
				}else if(this.rentType==2){
					this.totalDays=this.util.datedif(this.startTime,this.endTime)+1;
				}
				//获取助理价格
				this.getAssistantPrice();
				this.orderType=3;
			}else if(query.packId){
				//套餐订单
				this.packId=query.packId;
				this.startTime=query.startTime;
				this.endTime=query.endTime;
				//租赁模式 1/按小时  2/按天
				this.rentType=query.type;
				this.getPackDetail(this.packId);
				if(this.rentType==1){
					this.totalHours=this.util.calHours(this.startTime,this.endTime);
				}else if(this.rentType==2){
					this.totalDays=this.util.datedif(this.startTime,this.endTime)+1;
				}
				//获取套餐价格
				this.getPackPrice();
				this.orderType=4;
			}
			
			//获取地址列表
			this.getAddressList();
		},
		watch:{
			
		},
		computed:{
			serviceAllPrice(){
				return (parseInt(this.productInfo.price)*this.serviceNum).toFixed(2);
			},
			teamAllPrice(){
				return (parseInt(this.teamInfo.price)*this.teamNum).toFixed(2);
			}
		},
		mounted() {
		},
		components: {
			newAddress,
			stepInfo
		},
		methods: {
			
			//设置为默认地址
			setDefaultAddress(id){
				this.util.setDefaultAddress(id).then(res=>{
					this.$message.success('设置默认地址成功！');
				})
			},
			
			//编辑地址信息
			editAddress(item){
				
			},
			
			//切换地址弹窗
			changeAddress(){
				this.showAddressList=true;
				//重新获取地址列表
				this.getAddressList('1');
			},
			
			//选择地址
			selectAddress(id){
				console.log('id---',id);
				this.addressList.forEach((item,index)=>{
					if(id==item.id){
						this.addressInfo=item;
					}
				})
				this.showAddressList=false;
			},
			
			//获取地址列表type:1,只是获取，不用切换修改
			getAddressList(type) {
				this.util.getAddressList().then(res=>{
					this.addressList=res;
					if(!type && res.length>0){
						this.addressInfo=res[0];
						this.addressId=res[0].id;
					}
				})
			},
			
			//获取商家地址地址信息
			getAddressDetail(id) {
				console.log('getAddressDetail--------',id);
				this.util.getDefaultAddress(id).then(res=>{
					this.storeAddress=res;
					console.log('getDefaultAddress-------------',res);
				})
			},

			//根据id获取模特详情
			getModelById(id){
				console.log('getModelById-------');
				let params = {
					id: id
				}
				this.notFound=false;
				this.util.getModelList(params).then(res => {
					console.log('getModelList--------', res);
					this.modelInfo = res;
					this.totalPrice=res.ppd*this.totalDays;
					console.log('res.ppd-----',res.ppd,this.totalDays);
					if(this.util.isEmpty(res)){
						this.notFound=true;
					}
					console.log('this.modelInfo--------', this.modelInfo);
				})
			},
			
			//根据id获取服务详情内容
			getServiceDetail(id){
				this.util.getServiceDetail(id).then(res=>{
					console.log('getServiceDetail----',res);
					this.serviceInfo=res;
					res.norms.forEach((item,index)=>{
						if(item.id==this.productId){
							this.productInfo=item;
						}
					})
					//获取产品地址
					this.getAddressDetail(this.serviceInfo.address_id);
					console.log('serviceInfo------',this.serviceInfo);
					console.log('productInfo------',this.productInfo);
				})
			},
			
			
			//根据id获取团购拼拍详情内容
			getTeamDetail(id){
				let params={id:id}
				this.util.getTeamList(params).then(res=>{
					console.log('getTeamDetail----',res);
					this.teamInfo=res;
					//添加一个剩余件数字段
					this.teamInfo.stockNum=parseInt(res.team_max)-parseInt(res.total);
					//添加一个成团数量差数
					this.teamInfo.differ=(parseInt(res.team_num)-parseInt(res.total))>0?true:false;
					//获取地址信息
					this.getAddressDetail(res.team_address);
				})
			},
			
			//获取助理详情（根据id)
			getAssistantDetail(id){
				let params={id:id,isAutoMsg:1};
				this.util.getAssistantList(params).then(res=>{
					console.log('getAssistantDetail----',res);
					this.assistantInfo=res;
				})
			},
			
			//获取套餐详情
			getPackDetail(id){
				this.util.packAjaxDetail(id).then(res=>{
					//为套餐信息添加一个每天价格字段
					if(this.rentType==2){
						res.price_arr.forEach((item,index)=>{
							if(item.rent_type==2 && !res.priceDay){
								res.priceDay=item.price;
							}
						})
					}
					this.packInfo=res;
					this.door_to_door=res.door_to_door||'0';
					console.warn('getPackDetail------',res);
				})
			},
			
			//获取助理价格, //type:
			getAssistantPrice(){
				let params={
					id:this.assistantId,
					rent_type:this.rentType,
					start_time:this.startTime,
					end_time:this.endTime
				}
				console.log("getAssistantPrice-----",params);
				this.util.getAssistantPrice(params).then(res=>{
					this.totalPrice=res.price.toFixed(2);
				})
			},
			
			//计算获取套餐价格
			getPackPrice(){
				let params={
					id:this.packId,
					rent_type:this.rentType,
					start_time:this.startTime,
					end_time:this.endTime
				}
				this.util.getPackPrice(params).then(res=>{
					console.warn('getPackPrice------------',res);
					this.totalPrice=res.price.toFixed(2);
				})
			},
			
			//付款模特（下单）
			commitModelOrder(){
				console.log('payOrder----------');
				let params={
					rent_type:2, //1小时 2天
					start_time:this.startTime,
					end_time:this.endTime,
					id:this.modelId,
					address_id:this.addressId,
					remark:this.workContent
				}
				console.log('params-------',params);
				this.util.addModelOrder(params).then(res=>{
					this.$message.success("提交订单成功！");
					console.log('addModelOrder------',res);
					//跳转到购买产品页面，并传入订单id
					this.util.toBuyOrder(0,res.id);
				})
			},
			
			//付款助理（下单）
			commitAssistantOrder(){
				console.log('payOrder----------');
				let params={
					rent_type:this.rentType, //1小时 2天
					start_time:this.startTime,
					end_time:this.endTime,
					id:this.assistantId,
					address_id:this.addressId,
					remark:this.workContent
				}
				console.log('params-------',params);
				this.util.userAddAssistant(params).then(res=>{
					this.$message.success("提交订单成功！");
					console.log('userAddAssistant------',res);
					//跳转到购买产品页面，并传入订单id
					this.util.toBuyOrder(3,res.id);
				})
			},
			
			//付款服务（下单）
			commitServiceOrder(){
				let params={
					id:this.serviceId,
					norms_id:this.productId,
					count:this.serviceNum,
					address_id:this.addressId,
					remark:this.remark
				}
				console.log('params-----------',params);
				this.util.addServiceOrder(params).then(res=>{
					this.$message.success('提交订单成功！');
					console.log('addServiceOrder----------',res);
					//跳转到购买产品页面，并传入订单id
					this.util.toBuyOrder(1,res);
				})
			},
			
			//付款拼拍订单（下单）
			commitTeamOrder(){
				let params={
					id:this.teamId,
					num:this.teamNum,
					address_id:this.addressId,
					remark:this.remark
				}
				console.log('params------------',params);
				this.util.addTeamOrder(params).then(res=>{
					this.$message.success('提交订单成功！');
					console.log('addServiceOrder----------',res);
					//跳转到购买产品页面，并传入订单id
					this.util.toBuyOrder(2,res.id);
				})
			},
			
			//付款套餐订单（下单）
			commitPackOrder(){
				let params={
					rent_type:this.rentType, //1小时 2天
					start_time:this.startTime,
					end_time:this.endTime,
					id:this.packId,
					remark:this.remark,
					is_out:0,
					order_count:1,
				}
				//如果是送货上门，参数要把地址加上
				if(this.door_to_door==1){
					params.address_id=this.addressId;
				}
				this.util.userAddPack(params).then(res=>{
					this.$message.success('提交订单成功！');
					//跳转到购买产品页面，并传入订单id
					this.util.toBuyOrder(4,res.id);
				})
			},
			
			//根据id获取服务详情
			getServiceById(id){
				
			},
			
			//关闭新增地址对话框
			closeAddAdress() {
				this.showAddAddress = false;
			},
			
			//新增地址方法
			addAddress() {
				this.showAddAddress = true;
			},
			
			//新增地址成功回调函数
			addSuccess(data) {
				console.log('car------addAddressSuccess==========',data);
				this.showAddAddress=false;
				//获取地址列表
				this.util.getAddressList().then(res=>{
					this.addressList=res;
					res.forEach((item,index)=>{
						if(data==item.id){
							this.addressInfo=item;
						}
					})
				})
			},
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.hire-wrap {
		.hire-head {
			width: 100%;
			height: 230px;
			background: linear-gradient(270deg, rgba(85, 26, 215, 1) 0%, rgba(96, 29, 242, 1) 41%, rgba(86, 26, 217, 1) 50%, rgba(96, 29, 242, 1) 60%, rgba(85, 26, 214, 1) 100%);
			text-align: center;
			p {
				font-size: 60px;
				font-weight: 600;
				color: #fff;
				letter-spacing: 5px;
			}
		}
		.hire-progress {
			height: 100px;
			background: #FAFAFA;
			margin-bottom: 40px;
			.progress-center {
				width: 1200px;
				margin: 0 auto;
				display: flex;
				.progress-item {
					padding-top: 20px;
					box-sizing: border-box;
					height: 100%;
					text-align: center;
					div {
						width: 36px;
						margin: 0 auto;
						height: 36px;
						line-height: 36px;
						background: rgba(101, 31, 255, .5);
						border: 1px solid #D9D9D9;
						color: #fff;
						border-radius: 50%;
						text-align: center;
						margin-bottom: 6px;
					}
				}
				.progress-active {
					div {
						background: #7C6AFF;
					}
				}
				.line {
					height: 37px;
					flex: 1;
					background: none;
					margin: 0;
					border-bottom: 2px dashed rgba(101,31,255,.5);
				}
			}
		}
		/*订单核对模块*/
		.first-step {
			box-sizing: border-box;
			.info {
				.baseInfo.receive {
					p {
						margin-bottom: 10px;
						span {
							color: #333333;
							&:first-child {
								color: #999999;
								display: inline-block;
								width: 85px;
							}
						}
					}
				}
			}
			.first-center {
				width: 1200px;
				margin: 0 auto;
				.agreement-wrap {
					height: 500px;
					overflow: auto;
					background: #fff;
					padding: 40px 30px 30px;
					margin-bottom: 30px;
					h3 {
						margin-top: 50px;
					}
					p:not(.no-indent) {
						text-indent: 3em;
					}
					p {
						line-height: 40px;
					}
				}
				.i-agree {
					margin-bottom: 30px;
					padding-left: 30px;
					box-sizing: border-box;
					opacity: 0;
					.el-checkbox {
						margin-right: 0;
					}
					.agree-what {
						color: #5A1CE3;
					}
				}
				.next-cancel {
					margin-bottom: 30px;
					padding-left: 30px;
					box-sizing: border-box;
					opacity: 0;
					.el-button:first-child {
						background: #5A1BE5;
						color: #fff;
						border-radius: 0;
					}
					.el-button:last-child {
						color: #999;
						background: #fafafa;
					}
				}
				.already {
					opacity: 1;
				}
			}
			.detail {
				.operate {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					padding-right: 30px;
					padding-left: 180px;
					border-left: 1px solid #F0F0F0;
					height: 50px;
					padding-top: 80px;
					padding-bottom: 80px;
					button {
						padding: 0px;
						margin-bottom: 15px;
						color: #7C6AFF;
						margin-left: 0px;
						position: relative;
					}
					.newAddress:before {
						clear: both;
						content: "\002B";
						display: block;
						height: 0;
						position: absolute;
						top: 0px;
						left: -12px;
					}
				}
			}
		}
		

	}
	
	.productInfo {
		color: #666;
		width: 1200px;
		margin: 0px auto;
		.serviceInfo {
			margin-bottom: 20px;
		}
		.mainInfo {
			padding: 20px 70px 20px 20px;
			border: 1px solid #F0F0F0;
			background: #fff;
			display: flex;
			justify-content:space-between;
			.addressInfo{
				display:flex;
				align-items:center;
			}
		}
		.detail {
			ul {
				display: flex;
				li {
					margin-right: 30px;
					text-align: center;
					p {
						margin-bottom: 20px;
					}
					&:last-child {
						margin-right: 0px;
					}
				}
			}
		}
		.info {
			&>p {
				margin-bottom: 20px;
			}
			.baseInfo {
				margin-bottom:20px;
				p:first-child {
					color: #999999;
				}
			}
			.avatar {
				margin-top: 20px;
				width: 102px;
				height: 102px;
				border: 1px solid #F0F0F0;
				display:flex;
			}
		}
		.top {
			padding-left: 20px;
			height: 30px;
			background: #FBFAFF;
			line-height: 30px;
		}
	}
	
	.totalPrice {
		display: flex;
		justify-content: flex-end;
		margin: 20px 0px;
		p {
			color: #333;
			font-size: 18px;
			margin-right: 25px;
		}
		span {
			color: #D4282D;
			font-size: 18px;
			font-weight: 600;
		}
	}
	
	.toPay {
		display: flex;
		justify-content: flex-end;
		margin-top:20px;
		margin-bottom: 60px;
		.payBtn {
			background: linear-gradient(180deg, rgba(236, 81, 89, 1) 0%, rgba(212, 40, 45, 1) 100%);
			border-radius: 0px;
			padding: 8px 50px;
			color: #fff;
			font-size: 18px;
		}
		.delBtn {
			border: 1px solid #F0F0F0;
			background: none;
		}
	}
	
	/*工作内容样式,备注样式*/
	.workContent,.remark{
		display: flex;
		align-items: baseline;
		span{
			white-space: nowrap;
			margin-right:40px;
		}
	}
	
	/*样品地址信息样式*/
	.storeAddress{
		display:flex;
		justify-content:center;
		text-align:center;
		padding-top:40px;
		padding-bottom:20px;
		border-bottom:1px solid #F0F0F0;
		margin-bottom:20px;
		li{
			font-size:20px;
			margin-bottom:20px;
			span{
				color:#999999;
				display:inline-block;
				margin-bottom:3px;
			}
			p{
				color:#333;
			}
		}
	}
	.selectMode{
		margin-bottom:20px;
	}
</style>
