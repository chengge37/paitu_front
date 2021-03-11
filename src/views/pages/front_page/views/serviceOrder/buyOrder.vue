<template>
	<div>
		
		<step-info :stepIndex='stepIndex'></step-info>
		
		<div class="productInfo">
			<div class="orderStatus">
				<span>当前订单状态：</span>
				<span v-if="modelOrderInfo">{{modelOrderInfo.pay_status|orderStatusStr}}</span>
				<span v-if="serviceOrderInfo">{{serviceOrderInfo.pay_status|orderStatusStr}}</span>
				<span v-if="teamOrderInfo">{{teamOrderInfo.pay_status|orderStatusStr}}</span>
				<span v-if="assistantOrderInfo">{{assistantOrderInfo.pay_status|orderStatusStr}}</span>
				<span v-if="packOrderInfo">{{packOrderInfo.pay_status|orderStatusStr}}</span>
			</div>
			
			<div>
				<!--模特订单信息-->
				<div v-if='modelOrderInfo'>
					<div class='service'>
						<div class="title">
							<div class="info">服务</div>
							<div>开始时间</div>
							<div>结束时间</div>
							<div>价格(元)</div>
							<div>优惠(元)</div>
							<div>实付(元)</div>
						</div>
						<div class="name">
							<div>店铺名称：{{modelOrderInfo.to_user.nick}}</div>
						</div>
						<div class="content">
							<div class="info">
								<div class="img">
									<el-image fit="contain" :src="util.picExplode(modelOrderInfo.photo)"></el-image>
								</div>
								<div class="top">
									<span class="product">{{modelOrderInfo.title}}</span>
									<p>规格描述</p>
								</div>
							</div>
							<div>{{modelOrderInfo.start_time|strTime2Date}}</div>
							<div>{{modelOrderInfo.end_time|strTime2Date}}</div>
							<div>{{modelOrderInfo.price}}</div>
							<div>0.00</div>
							<div>{{modelOrderInfo.price}}</div>
						</div>
					</div>
					<div class="payInfo">
						<div class="subTotal">
							<span>付款小计：</span>
							<p>¥{{modelOrderInfo.price}}</p>
						</div>
						<div class="payReal">
							<span>实付款：</span>
							<p>¥{{modelOrderInfo.price}}</p>
						</div>
					</div>
					<div class="other" v-if="userAddress">
						<span>工作地址：</span>
						<span>{{userAddress.name}}</span>
						<span>{{userAddress.mobile}}</span>
						<span>{{userAddress.address}}</span>
					</div>
					<div class="other">
						<span>工作内容：</span>
						<span>{{modelOrderInfo.remark?modelOrderInfo.remark:'无'}}</span>
					</div>
					
					<div class="notFound" v-if="notFound">
						不存在的信息！
					</div>
					
				</div>
				
				
				<!--助理订单信息-->
				<div v-if='assistantOrderInfo'>
					<div class='service'>
						<div class="title">
							<div class="info">服务</div>
							<div>开始时间</div>
							<div>结束时间</div>
							<div>价格(元)</div>
							<div>优惠(元)</div>
							<div>实付(元)</div>
						</div>
						<div class="name" v-if="packOrderInfo.auto_msg_to_uid">
							<div>店铺名称：{{assistantOrderInfo.auto_msg_to_uid.nick}}</div>
						</div>
						<div class="content">
							<div class="info">
								<div class="img">
									<el-image fit="contain" :src="util.picExplode(assistantOrderInfo.pic)"></el-image>
								</div>
								<div class="top">
									<span class="product">{{assistantOrderInfo.title}}</span>
									<p>规格描述</p>
								</div>
							</div>
							
							<div class="time" v-if="assistantOrderInfo.rent_type==2">{{assistantOrderInfo.start_time|strTime2Date}}</div>
							<div class="time"  v-if="assistantOrderInfo.rent_type==2">{{assistantOrderInfo.end_time|strTime2Date}}</div>
							
							<div class="time" v-if="assistantOrderInfo.rent_type==1">{{assistantOrderInfo.start_time}}</div>
							<div class="time"  v-if="assistantOrderInfo.rent_type==1">{{assistantOrderInfo.end_time}}</div>
							
							<div>{{assistantOrderInfo.price}}.00</div>
							<div>0.00</div>
							<div>{{assistantOrderInfo.price}}.00</div>
						</div>
					</div>
					<div class="payInfo">
						<div class="subTotal">
							<span>付款小计：</span>
							<p>¥{{assistantOrderInfo.price}}.00</p>
						</div>
						<div class="payReal">
							<span>实付款：</span>
							<p>¥{{assistantOrderInfo.price}}.00</p>
						</div>
					</div>
					<div class="other" v-if="userAddress">
						<span>工作地址：</span>
						<span>{{userAddress.name}}</span>
						<span>{{userAddress.mobile}}</span>
						<span>{{userAddress.address}}</span>
					</div>
					<div class="other">
						<span>工作内容：</span>
						<span>{{assistantOrderInfo.remark?assistantOrderInfo.remark:'无'}}</span>
					</div>
					
					<div class="notFound" v-if="notFound">
						不存在的信息！
					</div>
					
				</div>
				
				<!--套餐订单信息-->
				<div v-if='packOrderInfo'>
					<div class='service'>
						<div class="title">
							<div class="info">服务</div>
							<div>开始时间</div>
							<div>结束时间</div>
							<div>价格(元)</div>
							<div>优惠(元)</div>
							<div>实付(元)</div>
						</div>
						<div class="name" v-if="packOrderInfo.auto_msg_to_uid">
							<div>店铺名称：{{packOrderInfo.auto_msg_to_uid.nick}}</div>
						</div>
						<div class="content">
							<div class="info">
								<div class="img">
									<el-image fit="contain" :src="util.picExplode(packOrderInfo.pic)"></el-image>
								</div>
								<div class="top">
									<span class="product">{{packOrderInfo.title}}</span>
									<p>规格描述</p>
								</div>
							</div>
							
							<div class="time" v-if="packOrderInfo.rent_type==2">{{packOrderInfo.start_time|strTime2Date}}</div>
							<div class="time"  v-if="packOrderInfo.rent_type==2">{{packOrderInfo.end_time|strTime2Date}}</div>
							
							<div class="time" v-if="packOrderInfo.rent_type==1">{{packOrderInfo.start_time}}</div>
							<div class="time"  v-if="packOrderInfo.rent_type==1">{{packOrderInfo.end_time}}</div>
							
							<div>{{packOrderInfo.price}}.00</div>
							<div>0.00</div>
							<div>{{packOrderInfo.price}}.00</div>
						</div>
					</div>
					<div class="payInfo">
						<div class="subTotal">
							<span>付款小计：</span>
							<p>¥{{packOrderInfo.price}}.00</p>
						</div>
						<div class="payReal">
							<span>实付款：</span>
							<p>¥{{packOrderInfo.price}}.00</p>
						</div>
					</div>
					<div class="other" v-if="userAddress && packOrderInfo.is_out==1">
						<span>收货地址：</span>
						<span>{{userAddress.name}}</span>
						<span>{{userAddress.mobile}}</span>
						<span>{{userAddress.address}}</span>
					</div>
					<div class="other" v-if="packOrderInfo.is_out==0">
						<span>店家地址：</span>
						<span>{{packOrderInfo.auto_msg_to_uid.nick}}</span>
						<span>{{packOrderInfo.auto_msg_to_uid.mobile}}</span>
						<span>{{packOrderInfo.auto_msg_to_uid.address}}</span>
					</div>
					<div class="other">
						<span>工作内容：</span>
						<span>{{packOrderInfo.remark||'无'}}</span>
					</div>
					
					<div class="notFound" v-if="notFound">
						不存在的信息！
					</div>
					
				</div>
				
				
				<!--服务订单信息-->
				<div v-if='serviceOrderInfo'>
					<div class='service'>
						<div class="title">
							<div class="info">服务</div>
							<div>单价(元)</div>
							<div>数量</div>
							<div>价格(元)</div>
							<div>优惠(元)</div>
							<div>实付(元)</div>
						</div>
						<div class="name">
							<div>店铺名称：{{serviceOrderInfo.user.nick?serviceOrderInfo.user.nick:'暂无公司名称'}}</div>
						</div>
						<div class="content">
							<div class="info">
								<div class="img">
									<el-image fit="contain" :src="util.picExplode(serviceOrderInfo.service_pic)"></el-image>
								</div>
								<div class="top">
									<span class="product">{{serviceOrderInfo.service_title}}</span>
									<p>{{serviceOrderInfo.norms_name}}</p>
								</div>
							</div>
							<div>{{serviceOrderInfo.norms_price}}</div>
							<div>{{serviceOrderInfo.count}}</div>
							<div>{{serviceAllPrice}}</div>
							<div>{{serviceReducePrice}}</div>
							<div>{{serviceOrderInfo.total_price}}</div>
						</div>
					</div>
					<div class="payInfo">
						<div class="subTotal">
							<span>付款小计：</span>
							<p>¥{{serviceOrderInfo.total_price}}</p>
						</div>
						<div class="payReal">
							<span>实付款：</span>
							<p>¥{{serviceOrderInfo.total_price}}</p>
						</div>
					</div>
					<div class="other" v-if="userAddress">
						<span>收货地址：</span>
						<span>{{userAddress.name}}</span>
						<span>{{userAddress.mobile}}</span>
						<span>{{userAddress.address}}</span>
					</div>
					<div class="other">
						<span>留言：</span>
						<span>{{serviceOrderInfo.remark?serviceOrderInfo.remark:'无'}}</span>
					</div>
					
					<div class="notFound" v-if="notFound">
						不存在的信息！
					</div>
					
				</div>
				
				
				<!--团购拼拍订单信息-->
				<div v-if='teamOrderInfo'>
					<div class='service'>
						<div class="title">
							<div class="info">服务</div>
							<div>单价(元)</div>
							<div>数量</div>
							<div>价格(元)</div>
							<div>优惠(元)</div>
							<div>实付(元)</div>
						</div>
						<div class="name">
							<div>店铺名称：{{teamOrderInfo.to_user.nick?teamOrderInfo.to_user.nick:'暂无公司名称'}}</div>
						</div>
						<div class="content">
							<div class="info">
								<div class="img">
									<el-image fit="contain" :src="util.picExplode(teamOrderInfo.photo)"></el-image>
								</div>
								<div class="top">
									<span class="product">{{teamOrderInfo.title}}</span>
									<p>{{teamOrderInfo.norms_name}}</p>
								</div>
							</div>
							<div>{{teamOrderInfo.base_price}}</div>
							<div>{{teamOrderInfo.num}}</div>
							<div>{{teamAllPrice}}</div>
							<div>0.00</div>
							<div>{{teamAllPrice}}</div>
						</div>
					</div>
					<div class="payInfo">
						<div class="subTotal">
							<span>付款小计：</span>
							<p>¥{{teamAllPrice}}</p>
						</div>
						<div class="payReal">
							<span>实付款：</span>
							<p>¥{{teamAllPrice}}</p>
						</div>
					</div>
					<div class="other" v-if="userAddress">
						<span>收货地址：</span>
						<span>{{userAddress.name}}</span>
						<span>{{userAddress.mobile}}</span>
						<span>{{userAddress.address}}</span>
					</div>
					<div class="other">
						<span>留言：</span>
						<span>{{teamOrderInfo.remark?teamOrderInfo.remark:'无'}}</span>
					</div>
					
					<div class="notFound" v-if="notFound">
						不存在的信息！
					</div>
					
				</div>
				
				<div class="storeAddress" v-if="orderType!=0 && storeAddress">
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
				
				<div class="pay" v-if="stepIndex!=3">
					<el-button class="color-area" @click="buyOrder" v-if="modelOrderInfo && modelOrderInfo.pay_status==1">立即付款</el-button>
					<el-button class="color-area" @click="buyOrder" v-if="serviceOrderInfo && serviceOrderInfo.pay_status==1">立即付款</el-button>
					<el-button class="color-area" @click="buyOrder" v-if="teamOrderInfo && teamOrderInfo.pay_status==1">立即付款</el-button>
					<el-button class="color-area" @click="buyOrder" v-if="assistantOrderInfo && assistantOrderInfo.pay_status==1">立即付款</el-button>
					<el-button class="color-area" @click="buyOrder" v-if="packOrderInfo && packOrderInfo.pay_status==1">立即付款</el-button>
				</div>
		
			</div>
		
		</div>
		
		<el-dialog :visible.sync="showPay" class="payDialog" @closed="closed" width="550px">
      		<!--支付步骤模块-->
			<div>
				<div class="payType">
					<p>支付方式:</p>
					<ul>
						<li v-for="(item,index) in payImgList" :key="index" class="cursor" :class="{'active':pay_way==index}" @click="changePay(index)">
							<ali-svg-icon :icon-class="item.icon"></ali-svg-icon>
							<span>{{item.title}}</span>
						</li>
					</ul>
				</div>
				<div class="code">
					<canvas class="codepay" id="canvas"></canvas>
					<p v-if="pay_way==1 && orderType==0" class="price">
						总价：
						<span>￥{{modelOrderInfo.price}}</span>
					</p>
					<p v-if="pay_way==1 && orderType==1" class="price">
						总价：
						<span>￥{{serviceAllPrice}}</span>
					</p>
					<p class="codetext">{{codetext}}</p>
					<div id="aliForm"></div>
				</div>
			</div>
			<!--<el-button @click="fakePay" type='primary'>模拟拼拍支付</el-button>-->
			<!--<el-button @click="fakePay1" type='primary'>模拟模特支付</el-button>-->
    	</el-dialog>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import QRCode from "qrcode";
	import stepInfo from './steps.vue'
	export default {
		data() {
			return {
				stepIndex:'2',
				timer:null,
				orderType:0, //订单类型,0/模特订单，1/服务订单,2/团购订单,3/助理订单,4/套餐订单
				notFound:false,  //如果数据不存或者异常显示的
				modelOrderId:'',  //模特订单id
				modelOrderInfo:null,  //模特订单信息
				serviceOrderId:'',  //服务订单id
				serviceOrderInfo:null, //服务订单信息
				teamOrderId:'',  //团购订单id
				teamOrderInfo:null, //团购订单信息
				assistantOrderId:'',  //助理订单id
				assistantOrderInfo:null, //助理订单信息
				packOrderId:'',  //套餐订单id
				packOrderInfo:null,  //套餐订单信息
				modelDays:'', //订单模特天数
				workContent:'', //工作内容信息(备注)
				payId:-1,
				payImgList: [{
						title: '微信支付',
						icon:'weixinPay'
					},
					{
						title: '支付宝支付',
						icon:'alipay'
					},
				],
				pay_way:0,   //默认微信支付
				codetext:'',  //支付显示的文本
				stepInfo:{
					'one':true,
					'two':false
				},
				showPay:false,  //是否显示支付窗口
				storeAddress:null,  //商家地址信息
				userAddress:null, //用户地址信息
			};
		},
		components: {
			stepInfo
		},
		
		created() {
			//获取订单id
			let query=this.$route.query;
			this.orderType=query.type;
			
			switch(parseInt(this.orderType)){
				//模特订单
				case 0:
					this.modelOrderId=query.orderId;
					this.getModelOrder(this.modelOrderId);
					break;
				//服务订单
				case 1:
					this.serviceOrderId=query.orderId;
					this.getServiceOrder(this.serviceOrderId);
					break;
				//团购拼拍订单
				case 2:
					this.teamOrderId=query.orderId;
					this.getTeamOrder(this.teamOrderId);
					break;
				//助理订单
				case 3:
					this.assistantOrderId=query.orderId;
					this.getAssistantOrder(this.assistantOrderId);
					break;
				//套餐订单
				case 4:
					this.packOrderId=query.orderId;
					this.getPackOrder(this.packOrderId);
					break;
			}
		},
		computed: {
			...mapGetters(["city_code","user_data","payStatus"]),
			serviceAllPrice(){
				if(this.serviceOrderInfo){
					return (parseInt(this.serviceOrderInfo.norms_price)*this.serviceOrderInfo.count).toFixed(2);
				}
			},
			//服务订单优惠价格
			serviceReducePrice(){
				let obj=this.serviceOrderInfo;
				if(obj){
					let total=parseInt(obj.norms_price)*obj.count;
					let reducePrice=(total-parseInt(obj.total_price)).toFixed(2);
					return reducePrice;
				}
			},
			teamAllPrice(){
				if(this.teamOrderInfo){
					return (parseInt(this.teamOrderInfo.base_price)*this.teamOrderInfo.num).toFixed(2);
				}
			}
		},
		watch:{
			payStatus(val){
				let status=val.split('+')[0];
				console.log('payStatus-------------',val);
				if(status==this.payId){
					//当前订单支付
					console.log('获取到支付状态----');
					this.$message.success('支付成功')
					this.closed();
					this.stepIndex='3'
					//重新获取订单信息
					if(this.orderType==0){
						//模特订单
						this.getModelOrder(this.modelOrderId);
					}else if(this.orderType==1){
						//服务订单
						this.getServiceOrder(this.serviceOrderId);
					}else if(this.orderType==2){
						//团购拼拍订单
						this.getTeamOrder(this.teamOrderId);
					}
				}
			},
			showPay(){
				clearInterval(this.timer)
			}
		},
		filters:{
			orderStatusStr(str){
				let statusList=[
					'已取消',
					'宝贝已拍下，请在 15分钟 内付款；若未及时付款，系统将自动取消订单',
					'已支付',
					'商家已接单',
					'退款中',
					'退款完毕',
					'订单进行中',
					'待评论',
					'已评论'
				]
				return statusList[str];
			}
		},
		mounted() {
			
		},
		methods: {
			
			fakePay(){
				this.getRequest('team/ajaxorderpaytest',{orderId:this.payId}).then(res=>{
					console.log('支付--推送');
				})
			},
			fakePay1(){
				this.getRequest('orderModel/ajaxorderpaytest',{order_id:this.payId}).then(res=>{
					console.log('支付--推送');
				})
			},
			//关闭支付窗口
			closed(){
				this.showPay=false;
			},
			
			//获取商家地址信息,type:0/用户地址，1/商家地址
			getAddressDetail(id,type) {
				console.log('getAddressDetail--------',id);
				this.util.getDefaultAddress(id).then(res=>{
					console.log('getDefaultAddress----------',res);
					if(type==1){
						this.storeAddress=res;
					}else{
						this.userAddress=res;
					}
					
					console.log('userAddress-------------',this.userAddress);
				})
			},
			
			//付款（下单）
			commitOrder(){
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
				})
			},
			
			//根据订单id获取模特订单信息
			getModelOrder(id){
				console.log('getOrderById--------',id);
				let params={
					id:id
				}
				this.util.getModelOrder(params).then(res=>{
					this.modelOrderInfo=res;
					//计算预定模特的天数
					this.modelDays=this.util.datedif(res.start_time,res.end_time);
					//获取用户地址信息
					this.getAddressDetail(res.address_id,0);
					console.log('this.modelDays----------',this.modelDays);
					this.checkOrderStatus(res);
				})
			},
			
			//根据订单id获取助理订单信息
			getAssistantOrder(id){
				console.log('getOrderById--------',id);
				let params={
					id:id,
					isAutoMsg:1,
				}
				this.util.getAssistantOrder(params).then(res=>{
					this.assistantOrderInfo=res;
					//计算预定模特的天数
					this.assistantDays=this.util.datedif(res.start_time,res.end_time);
					//获取用户地址信息
					this.getAddressDetail(res.address_id,0);
					console.log('this.assistantDays----------',this.assistantDays);
					this.checkOrderStatus(res);
				})
			},
			
			//根据订单id获取服务订单信息
			getServiceOrder(id){
				let params={
					id:id,
				}
				this.util.getServiceOrder(params).then(res=>{
					console.log('getServiceOrder---',res);
					this.serviceOrderInfo=res;
					//获取公司地址信息
					this.getAddressDetail(res.service_address_id,1);
					//获取用户地址信息
					this.getAddressDetail(res.user_address_id,0);
					this.checkOrderStatus(res);
				})
			},
			
			//根据id获取团购拼拍订单信息
			getTeamOrder(id){
				let params={
					id:id,
					is_user:1,  //1 查 用户 2查店家 不传查所有
				}
				this.util.teamOrderList(params).then(res=>{
					console.log('teamOrderList------',res);
					this.teamOrderInfo=res;
					//获取地址信息
					this.getAddressDetail(res.team_address,1);
					//获取用户地址信息
					this.getAddressDetail(res.address_id,0);
					this.checkOrderStatus(res);
				})
			},
			
			//根据id获取套餐订单信息
			getPackOrder(id){
				let params={id:id,isAutoMsg:1};
				this.util.getPackOrder(params).then(res=>{
					this.packOrderInfo=res;
					console.warn('getPackOrder-----------',this.packOrderInfo);
				})
			},
			
			//判断订单状态
			checkOrderStatus(item){
				console.log('checkOrderStatus------------',item);
				if(item.pay_status>=2){
					this.stepIndex=3;
				}
			},
			
			//切换支付方式方法
			changePay(index) {
				this.pay_way = index;
				this.payOrder();
			},
			//根据id获取服务详情
			getServiceById(){
				
			},
			
			//跳转到支付页面
			buyOrder(){
				this.showPay=true;
				this.payOrder();
			},
			
			//支付订单
			payOrder() {
				if(this.pay_way === 0) {
					this.codetext = "正在生成微信二维码";
				} else if(this.pay_way === 1) {
					this.codetext = "正在创建支付宝订单";
				}
				let payWay=parseInt(this.pay_way)+1;
				let params,flag;
				switch(parseInt(this.orderType)){
					//模特订单
					case 0:
						flag='payModelOrder';
						params = {
							order_id: this.modelOrderId,
							total_price: this.modelOrderInfo.price
						}
						break;
					//服务订单
					case 1:
						flag='payServiceOrder';
						params = {
							order_id: this.serviceOrderId,
							total_price: this.serviceOrderInfo.total_price
						}
						break;
					//拼拍订单
					case 2:
						flag='payTeamOrder';
						params = {
							order_id: this.teamOrderId,
							total_price: this.teamAllPrice.price
						}
						break;
					//助理订单
					case 3:
						flag='payAssistantOrder';
						params = {
							order_id: this.assistantOrderId,
							total_price: this.assistantOrderInfo.price
						}
						break;
					//套餐订单
					case 4:
						flag='payPackOrder';
						params = {
							order_id: this.packOrderId,
							total_price: this.packOrderInfo.price
						}
						break;
				}
				
				params.pay_way=payWay;

				this.payId=params.order_id
				console.log('params-----', flag,params);
				this.util[flag](params).then(res => {
						console.log("payOrder", res);
						if(this.pay_way == 0) {
							//微信
							this.codetext =
								"请用微信扫描支付,支付完成后可以在订单中心查看订单情况！";
							let canvas = document.getElementById("canvas");
							QRCode.toCanvas(
								canvas,
								res, {
									errorCorrectionLevel: "H"
								},
								error => {
									if(error) {
										this.$message.warning("微信支付码生成失败");
									}
								}
							);
							
							console.log('------------------------------------------------------');
							//如果30秒没支付  则刷新订单
							this.timer=setTimeout(()=>{
								this.$message.error('网络有些问题，请刷新以更新支付状态')
							},30000)
							console.log('------------------------------------------------------');
						} else {
							this.codetext = "创建支付宝订单成功,跳转支付宝支付";
							//支付宝
							let aliForm = document.getElementById("aliForm");
							aliForm.innerHTML = res;
							document.forms["alipay_submit"].submit();
						}
					})
					.catch(err => {});
			},
			initSocket() {
        
      },
			
		}
	};
</script>

<style lang="scss" scoped>
.productInfo {
	color: #666;
	width: 1200px;
	margin: 0px auto;
}
.service{
	.title,.content{
		display:flex;
		justify-content: flex-start;
		&>div{
			flex:1;
			margin-right:1px;
			text-align:center;
			padding:12px 16px;
		}
		div.info{
			flex:3;
			text-align:left;
		}
	}
	.title{
		div{
			border-bottom: 3px solid #a7cbff;
		}
	}
	.name{
		padding:16px 16px 16px 0px;
	}
	.content{
		padding:16px 0px 16px 10px;
		border:1px solid #eee;
		.info{
			display:flex;
			justify-content:flex-start;
			align-items:center;
			padding:0px;
			margin-right:15px;
			.top{
				line-height:20px;
				p{
					color:#999;
				}
			}
		}
		&>div{
			/*line-height:36px;*/
		}
		.time{
			/*line-height:20px;*/
		}
		.img{
			width:60px;
			height:60px;
			margin-right:10px;
			display:flex;
		}
	}
}
.payInfo{
	background:#f7faff;
	padding-top:20px;
	&>div{
		display:flex;
		justify-content:flex-end;
		padding:0px 20px 20px 0px;
	}
}

.pay{
	display:flex;
	justify-content:flex-end;
	button{
		margin:20px 0px;
		border-radius:0px;
		color:#fff;
		font-size:12px;
		padding:10px 40px;
		background:$Theme-color;
	}
	
}


/*订单状态样式*/
.orderStatus{
	padding:20px;
	font-weight:600;
	background:#fff7eb;
	border:1px solid #F58B0F;
}
.other{
	padding:10px;
	border:1px solid #f6f6f6;
	display:flex;
	justify-content:flex-end;
	align-items:center;
	span{
		margin-right:15px;
	}
}


/*支付方式样式*/
.payType{
	p{
		font-size:16px;
	}
	ul{
		display:flex;
		align-items:center;
		margin-top:10px;
	}
	li{
		margin-right:20px;
		padding:3px 5px;
		border:1px solid #ddd;
		&.active{
			background:#ddd;
		}
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

/*支付窗口样式*/
.payDialog{
	/deep/{
		.el-dialog{
			display:flex;
			justify-content:center;
		}
	}
}

</style>