<template>
	<div class="hire-wrap">
		<div class="hire-progress">
			<div class="progress-center">
				<div class="progress-item" :class="{'progress-active':stepOne}">
					<div>1</div>
					<p>商品列表，核对订单</p>
				</div>
				<div class="line"></div>
				<div class="progress-item" :class="{'progress-active':stepTwo}">
					<div>2</div>
					<p>选择支付方式，付款</p>
				</div>
				<div class="line"></div>
				<div class="progress-item" :class="{'progress-active':stepThree}">
					<div>3</div>
					<p>交易成功，等待客服确认</p>
				</div>
			</div>
		</div>
		<div class="first-step productInfo" v-if="stepOne&&!stepTwo&&orderCart.count==1">

			<!--收货信息-->
			<div class="studioInfo">
				<div class="top">
					<span v-if="cartInfo.is_door_to_door==0">店家地址</span>
					<span v-else>收货信息</span>
				</div>
				<div class="mainInfo">
					<div class="info addressInfo" v-if="cartInfo.is_door_to_door==1">
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
					<div class="detail" v-if="cartInfo.is_door_to_door==1">
						<div class="operate">
							<el-button type="text" v-if="addressList.length>1" @click="changeAddress">切换地址</el-button>
							<el-button type="text" class="newAddress" @click="addAddress">新增地址</el-button>
						</div>
					</div>

					<div class="info" v-if="cartInfo.is_door_to_door==0">
						<p>
							店家名称：
							<span>{{storeInfo.nick}}</span>
						</p>
						<p>
							店家地址：
							<span>{{storeInfo.address}}</span>
						</p>
					</div>

				</div>

			</div>

			<div v-if="orderData.has_studio==0" class="selectMode">
				<el-radio-group v-model="cartInfo.is_door_to_door" @change="changeMode">
			      <el-radio label="0">到店自取</el-radio>
			      <el-radio label="1" :disabled="door_to_door==0">配送</el-radio>
			    </el-radio-group>
		   </div>

			<!--影棚价格相信信息(影棚订单)-->
			<div class="studioInfo" v-if="priceInfo.studioPriceArr">
				<div class="top">
					影棚
				</div>
				<div class="mainInfo">
					<div class="info">
						<p>商品信息</p>
						<div class="baseInfo">
							<p>基本信息</p>
							<p>店家名称：{{storeInfo.nick}}</p>
							<p>地址：{{storeInfo.address}}</p>
							<p>影棚名称：<el-button type="text" @click="toStudioDetail">{{priceInfo.studioPriceArr.name}}</el-button></p>
						</div>
						<div class="avatar">
							<!--<el-image fit="contain" @click="toStudioDetail" :src="$qiniuHost+priceInfo.studioPriceArr.pic.split(',')[0]" class="cursor"/>-->
							<el-image fit="contain" @click="toStudioDetail" :src="util.picExplode(priceInfo.studioPriceArr.pic)" class="cursor"/>
							</el-image>
						</div>
					</div>
					<div class="detail">
						<ul>
							<li v-if="rent_type==1">
								<p>时间</p>
								<span>{{hours}}小时</span>
							</li>
							<li>
								<p>数量</p>
								<span>{{priceInfo.studioPriceArr.number}}</span>
							</li>
							<li v-if="rent_type==2">
								<p>开始时间</p>
								<span>{{orderData.start_time | formatTimeToDay}}</span>
							</li>
							<li v-if="rent_type==1">
								<p>开始时间</p>
								<span>{{orderData.start_time}}</span>
							</li>
							<li v-if="rent_type==2">
								<p>结束时间</p>
								<span>{{orderData.end_time | formatTimeToDay}}</span>
							</li>
							<li v-if="rent_type==1">
								<p>结束时间</p>
								<span>{{orderData.end_time}}</span>
							</li>
							<li>
								<p>租金</p>
								<span>￥{{priceInfo.studioPriceArr.base}}</span>
							</li>
							<li>
								<p>实付</p>
								<span>￥{{priceInfo.studioPriceArr.base}}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<!--(影棚，设备订单）设备列表信息-->
			<div v-if="stepOne&&!stepTwo&&priceInfo.equipPriceArr.length>0&&orderCart.count==1">
				<div class="top">
					设备
				</div>
				<div class="mainInfo" v-for="(item,index) in priceInfo.equipPriceArr" :key="index">
					<div class="info">
						<p>商品信息</p>
						<div class="baseInfo">
							<p>基本信息</p>
							<p>设备名称：<el-button type="text" @click="toEquipDetail(item.id)">{{item.custom_desc}}</el-button></p>
						</div>
						<div class="avatar">
							<!--<el-image fit="contain" @click="toEquipDetail(item.id)" :src="item.equip_pic?$qiniuHost+item.equip_pic.split(',')[0]:$qiniuHost+item.static_pic.split(',')[0]" class="cursor"/>-->
							<el-image fit="contain" @click="toEquipDetail(item.id)" :src="util.picExplode(item.equip_pic||item.static_pic)" class="cursor"/>
							</el-image>
						</div>
					</div>
					<div class="detail">
						<ul>
							<li v-if="rent_type==2">
								<p>数量</p>
								<span>{{item.number}}</span>
							</li>
							<li v-if="rent_type==1">
								<p>时间</p>
								<span>{{hours}}小时</span>
							</li>
							<li v-if="rent_type==1">
								<p>数量</p>
								<span>{{item.number}}</span>
							</li>
							<li v-if="rent_type==2">
								<p>开始时间</p>
								<span>{{orderData.start_time | formatTimeToDay}}</span>
							</li>
							<li v-if="rent_type==1">
								<p>开始时间</p>
								<span>{{orderData.start_time}}</span>
							</li>
							<li v-if="rent_type==2">
								<p>结束时间</p>
								<span>{{orderData.end_time | formatTimeToDay}}</span>
							</li>
							<li v-if="rent_type==1">
								<p>结束时间</p>
								<span>{{orderData.end_time}}</span>
							</li>
							<li>
								<p>租金</p>
								<span>￥{{item.base}}</span>
							</li>
							<li>
								<p>实付</p>
								<span>￥{{item.base}}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			
			
			
			<!--平台优惠券信息（满减）-->
			<div class="coupon">
				<div class="top">
					优惠券
				</div>
				<div class="mainInfo" v-if="platReduceList.length>0">
					<p>平台满减优惠券：</p>
					<ul>
						<li :class="{'use':item.selected}" @click="operateCoupon(item.id,'0')" v-for="(item,index) in platReduceList" :key="index">
							<div class="info">
								<p v-if="item.coupon_type==1">
									<span class="pre">￥</span>
									<span class="money">{{parseInt(item.money)}}</span>
									<span class="canUse" v-if="item.limit_money==0">通用</span>
									<span class="canUse" v-else>满{{item.limit_money}}元可用</span>
								</p>
								<p v-else>
									<span class="money">{{parseInt(item.money)}}折</span>
									<span class="canUse" v-if="item.limit_money==0">通用</span>
									<span class="canUse" v-else>满{{item.limit_money}}元可用</span>
								</p>
								<div>{{item.content}}</div>
							</div>
							<div class="time">
								<span>期限：</span>
								<p>{{item.st_time}} ～ {{item.end_time}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="mainInfo" v-if="platDiscountList.length>0">
					<p>平台折扣优惠券：</p>
					<ul>
						<li :class="{'use':item.select}" @click="operateCoupon(item.id,'1')" v-for="(item,index) in platDiscountList" :key="index">
							<div class="info">
								<p v-if="item.coupon_type==1">
									<span class="pre">￥</span>
									<span class="money">{{parseInt(item.money)}}</span>
									<span class="canUse" v-if="item.limit_money==0">通用</span>
									<span class="canUse" v-else>满{{item.limit_money}}元可用</span>
								</p>
								<p v-else>
									<span class="money">{{parseInt(item.money)}}折</span>
									<span class="canUse" v-if="item.limit_money==0">通用</span>
									<span class="canUse" v-else>满{{item.limit_money}}元可用</span>
								</p>
								<div>{{item.content}}</div>
							</div>
							<div class="time">
								<span>期限：</span>
								<p>{{item.st_time}} ～ {{item.end_time}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="mainInfo" v-if="storeReduceList.length>0">
					<p>店铺满减优惠券：</p>
					<ul>
						<li :class="{'use':item.select}" @click="operateCoupon(item.id,'2')" v-for="(item,index) in storeReduceList" :key="index">
							<div class="info">
								<p v-if="item.coupon_type==1">
									<span class="pre">￥</span>
									<span class="money">{{parseInt(item.money)}}</span>
									<span class="canUse" v-if="item.limit_money==0">通用</span>
									<span class="canUse" v-else>满{{item.limit_money}}元可用</span>
								</p>
								<p v-else>
									<span class="money">{{parseInt(item.money)}}折</span>
									<span class="canUse" v-if="item.limit_money==0">通用</span>
									<span class="canUse" v-else>满{{item.limit_money}}元可用</span>
								</p>
								<div>{{item.content}}</div>
							</div>
							<div class="time">
								<span>期限：</span>
								<p>{{item.st_time}} ～ {{item.end_time}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="mainInfo" v-if="storeDiscountList.length>0">
					<p>店铺折扣优惠券：</p>
					<ul>
						<li :class="{'use':item.select}" @click="operateCoupon(item.id,'3')" v-for="(item,index) in storeDiscountList" :key="index">
							<div class="info">
								<p v-if="item.coupon_type==1">
									<span class="pre">￥</span>
									<span class="money">{{parseInt(item.money)}}</span>
									<span class="canUse" v-if="item.limit_money==0">通用</span>
									<span class="canUse" v-else>满{{item.limit_money}}元可用</span>
								</p>
								<p v-else>
									<span class="money">{{parseInt(item.money)}}折</span>
									<span class="canUse" v-if="item.limit_money==0">通用</span>
									<span class="canUse" v-else>满{{item.limit_money}}元可用</span>
								</p>
								<div>{{item.content}}</div>
							</div>
							<div class="time">
								<span>期限：</span>
								<p>{{item.st_time}} ～ {{item.end_time}}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			
			
			
			<!--优惠金额信息-->
			<div class="discount">
				<span>优惠券:</span>
				<p>-￥{{parseInt(couponPrice)}}</p>
			</div>
			

			<div class="totalPrice">
				<p>总计应付：</p>
				<span>￥{{totalPrice}}</span>
			</div>
			<div class="toPay">
				<el-button class="payBtn" @click="toPay">去付款</el-button>
				<el-button class="delBtn" @click="delOrder">删除订单</el-button>
			</div>

		</div>
		
		<div v-if="orderCart.count==0" class="noOrder">
			<p class="timeCount">
				<span class="time">{{wait}}</span>
				<span>秒后将自动返跳转到影棚列表</span>
			</p>
			无未支付订单
			<el-button type="text" @click="util.toStudioList()">去看看产品吧！</el-button>
		</div>
		
		<!--第二个步骤模块-->
		<div class="second-step" v-if="stepTwo&&!stepThree">
			<div class="payType">
				<p>支付方式:</p>
				<ul>
					<li v-for="(item,index) in payImgList" :key="index" :class="{'active':payIndex==index}" @click="changePay(index)">
						<ali-svg-icon :icon-class="item.icon"></ali-svg-icon>
						<span>{{item.title}}</span>
					</li>
				</ul>
			</div>
			<div class="code">
				<canvas class="codepay" id="canvas"></canvas>
				<p v-if="payIndex==0" class="price">
					总价：
					<span>￥{{totalPrice}}</span>
				</p>
				<p class="codetext">{{codetext}}</p>
				<div id="aliForm"></div>
			</div>
			<div class="back">
				<el-button class="backBtn" @click="backStep(2)">返回上一步</el-button>
			</div>
		</div>

		<!--第三个步骤模块-->
		<div class="third-step" v-if="stepThree">
			支付成功
			<el-button type="text" @click="toMyOrderPage">查看订单</el-button>
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
	export default {
		data() {
			return {
				addressInfo: null, //要显示的收货地址信息
				showAddAddress: false, //是否显示新增地址窗口
				isTake: Boolean, //设备订单是否上门自提
				orderCart: {}, //购物车信息
				orderId:'',   //订单id
				orderCoupon:null,  //购物车优惠券信息
				couponPrice:'',   //优惠券优惠价格
//				orderCount:Number,  购物车数量
				orderData:{   //订单信息
					start_time: '',
					end_time: '',
				},  
				cartInfo: {}, //购物车信息
				storeInfo: {}, //店家信息
				priceInfo: {
					equipPriceArr: [], //设备价格列表信息
					studioPriceArr: null, //影棚价格信息
				}, //价格详细信息
				hours: '', //一共多少个小时
				orderType: -1, //0为影棚订单，1为设备订单
				rent_type: 0, //租赁形式  1为小时订单 2为按天订单
				codetext: '', //生成二维码时显示的文字信息
				startTime: '', //订单开始时间
				endTime: '', //订单结束时间
				payIndex: 0,
				payImgList: [{
						title: '微信支付',
						icon:'weixinPay'
					},
					{
						title: '支付宝支付',
						icon:'alipay'
					},
				],
				stepOne: true,
				stepTwo: false,
				stepThree: false,
				totalPrice: 0,
				addressList:[],  //地址列表
				showAddressList:false,  //是否显示地址列表弹框
				payInterval:null,   //支付状态定时器
				wait:5,   //修改密码成功后几秒后回到跳到影棚列表
				waitTimer:null,
				backToPage:'/studio/index',
				couponList:[],
				carUseCoupon:[],   //购物车已使用优惠券列表
				selectCoupon:[],  //默认选中可用的优惠券
				firstLoad:true,  //是否第一次加载购物车
				orderUseCoupon:[], //订单使用的优惠券id
				platReduceList:[], //平台满减优惠券列表
				storeReduceList:[], //店铺满减优惠券列表
				platDiscountList:[], //平台折扣优惠券列表
				storeDiscountList:[], //店铺折扣优惠券列表
				door_to_door:0, //是否能外送  0/到店自取，1/同城配送
			}
		},
		created() {
			this.getAddressList();
			this.getOrderCart();
		},
		watch:{
			stepTwo(to,from){
				if(to){
					this.getPayStatus();
				}else{
					this.clearPayInterval();
				}
			},
		},
		destroyed() {
			//清除定时器
		  this.clearPayInterval();
		  clearInterval(this.waitTimer);
		},
		mounted() {
		},
		components: {
			newAddress
		},
		methods: {
			
			//用户使用优惠券
			couponUse(orderId,id){
				this.util.couponUse(orderId,id).then(res=>{
					console.log('couponUse----success----------',res);
					this.getOrderCart(1);
				})
			},
			
			//用户取消使用订单优惠券,//type 0/重新请求订单信息，1/不请求
			couponCancel(orderId,id,type){
				console.log('couponCancel--------');
				this.util.couponCancel(orderId,id).then(res=>{
					console.log('couponCancel----success----------',res);
					if(!type){
						this.getOrderCart(1);
					}
				})
			},
			
			
			//根据设备id获取设备详情
			getEquipDetailById(id) {
				this.util.getEquipById(id).then(res=>{
					this.door_to_door=res.door_to_door;
				})
			},
			
			//获取购物车信息,type,1不请求优惠券信息
			getOrderCart(type) {
				this.getRequest(frontOrder.getOrderCart).then(async res => {
					console.log('getOrderCart----------',res);
					//如果购物车数量为空
					if(res.count==0){
						//开始倒计时返回
						this.setTime();
						this.$set(this.orderCart,'count',0);
						return;
					}
					this.priceInfo.equipPriceArr = res.price.equipPriceArr;
					console.log('this.priceInfo-----', this.priceInfo);
					this.orderData = res.data;
					this.cartInfo = res.cart;
					this.storeInfo = res.user;
					
					//判断是否为影棚订单
					if(res.data.has_studio == 1) {
						//影棚订单
						this.priceInfo.studioPriceArr = res.price.studioPriceArr;
					}else{
						//设备订单
						//获取第一个设备是否能外送
						let firstEquipId=res.price.equipPriceArr[0].id;
						//获取设备信息
						this.getEquipDetailById(firstEquipId);
						//获取订单地址
						this.getOrderAddress();
					}
					console.log('this.priceInfo.studioPriceArr-------------------------------',this.priceInfo.studioPriceArr);
					this.totalPrice = this.cartInfo.price;
					this.rent_type = res.cart.rent_type;
					this.orderCart = res;
					this.orderCoupon=res.price.coupon_array;
					this.couponPrice=res.price.coupon_price;
					console.log('this.orderCart----', this.orderCart);
					//小时订单
					if(this.rent_type == 1) {
						//计算一共几个小时
						this.hours = this.util.calHours(this.orderCart.cart.start_time, this.orderCart.cart.end_time);
					}
					console.log('this.priceInfo-----', this.priceInfo);
					
					//获取订单id
					this.orderId=res.id;
					
					//获取,并使用优惠券信息
					if(!type){
						//获取订单使用过的优惠券
						await this.couponOrder(this.orderId);
						this.getCouponList();
					}
					
					//将第一次加载购物车设置为false
					this.firstLoad=false;
					
				}).catch(err => {});
			},
			
			//获取用户优惠券信息
			getCouponList(){
				if(!this.firstLoad) return;
				let params={
					page:1,
					page_size:10000,
					group:1,
				};
				this.couponList=[];
				console.log('getCouponList-------params---------',params);
				this.util.userGetCoupon(params).then(res=>{
					console.log('userGetCoupon--------',res);
					this.orderUseCoupon.forEach((item,index)=>{
						item.selected=true;
						if(item.to_uid!=0 && item.coupon_type==1 ){
							this.storeReduceList.push(item);
						}else if(item.to_uid && item.coupon_type==2 ){
							this.storeDiscountList.push(item);
						}else if(item.to_uid==0 && item.coupon_type==1 ){
							this.platReduceList.push(item);
						}else if(item.to_uid==0 && item.coupon_type==2 ){
							this.platDiscountList.push(item);
						}
					})
					res.rows.forEach((item,index)=>{
						item.selected=false;
						if(this.orderUseCoupon.length>0){
							this.orderUseCoupon.forEach((item2,index2)=>{
								if(item2.id!=item.id){
									if(item.order_id>0){
										//获取店铺优惠券（折扣，满减）
										if(item.to_uid==this.storeInfo.id && item.status=='1' && item.coupon_type==1 && parseInt(this.cartInfo.price)>=parseInt(item.limit_money)){
											this.storeReduceList.push(item);
										}
										if(item.to_uid==this.storeInfo.id && item.status=='1' && item.coupon_type==2){
											this.storeDiscountList.push(item);
										}
										//获取平台优惠券（折扣，满减）
										if(item.to_uid==0 && item.status=='1' && item.coupon_type==1 && parseInt(this.cartInfo.price)>=parseInt(item.limit_money)){
											this.platReduceList.push(item);
										}
										if(item.to_uid==0 && item.status=='1' && item.coupon_type==2){
											this.platDiscountList.push(item);
										}
									}
									
								}
							})
						}else{
							console.log('-------------------',item,this.storeInfo);
							if(!(item.order_id>0)){
								//获取店铺优惠券（折扣，满减）
								if(item.to_uid==this.storeInfo.id && item.status=='1' && item.coupon_type==1 && parseInt(this.cartInfo.price)>=parseInt(item.limit_money)){
									this.storeReduceList.push(item);
								}
								if(item.to_uid==this.storeInfo.id && item.status=='1' && item.coupon_type==2){
									this.storeDiscountList.push(item);
								}
								//获取平台优惠券（折扣，满减）
								if(item.to_uid==0 && item.status=='1' && item.coupon_type==1 && parseInt(this.cartInfo.price)>=parseInt(item.limit_money)){
									this.platReduceList.push(item);
								}
								if(item.to_uid==0 && item.status=='1' && item.coupon_type==2){
									this.platDiscountList.push(item);
								}
							}
							
						}
						
					})
					console.log('this.couponList----------',this.couponList);
					console.log('storeReduceList',this.storeReduceList);
					console.log('storeDiscountList---',this.storeDiscountList);
					//默认选中优惠价格最高的优惠券
					//判断之前有没有使用过优惠券，如果有，不用获取
					let list1=this.storeReduceList.filter((item,index)=>{
						return item.selected==true;
					})
					if(list1.length==0){
						//获取最高价格优惠券
						if(this.storeReduceList.length>0){
							let id=this.storeReduceList.sort(this.util.compare("money"))[0].id;
							let index=this.storeReduceList.findIndex((item,index)=>{
								return item.id=id;
							})
							this.storeReduceList[index].selected=true;
							//使用优惠券
							this.couponUse(this.orderId,id);
						}
					}
					
					let list2=this.storeDiscountList.filter((item,index)=>{
						return item.selected==true;
					})
					if(list2.length==0){
						//获取最高价格优惠券
						if(this.storeDiscountList.length>0){
							let id=this.storeDiscountList.sort(this.util.compare("money"))[0].id;
							let index=this.storeDiscountList.findIndex((item,index)=>{
								return item.id=id;
							})
							this.storeDiscountList[index].selected=true;
							//使用优惠券
							this.couponUse(this.orderId,id);
						}
					}
					
					let list3=this.platReduceList.filter((item,index)=>{
						return item.selected==true;
					})
					if(list3.length==0){
						//获取最高价格优惠券
						if(this.platReduceList.length>0){
							let id=this.platReduceList.sort(this.util.compare("money"))[0].id;
							let index=this.platReduceList.findIndex((item,index)=>{
								return item.id=id;
							})
							this.platReduceList[index].selected=true;
							//使用优惠券
							this.couponUse(this.orderId,id);
						}
					}
					
					let list4=this.platDiscountList.filter((item,index)=>{
						return item.selected==true;
					})
					if(list4.length==0){
						//获取最高价格优惠券
						if(this.platDiscountList.length>0){
							let id=this.platDiscountList.sort(this.util.compare("money"))[0].id;
							let index=this.platDiscountList.findIndex((item,index)=>{
								return item.id=id;
							})
							this.platDiscountList[index].selected=true;
							//使用优惠券
							this.couponUse(this.orderId,id);
						}
					}
					
					
				})
			},

			//获取订单使用过得优惠券
			couponOrder(){
				this.orderCoupon.forEach((item,index)=>{
					this.orderUseCoupon.push(item);
				})
				console.log('orderUseCoupon--------',this.orderUseCoupon);
			},
			
			//选择，反选优惠券
			async operateCoupon(id,type){
				let list;
				let listName='';
				let index2=-1;
				console.log('id------',id,type);
				switch(parseInt(type)){
					case 0:
						listName='platReduceList';
						break;
					case 1:
						listName='platReduceList';
						
						break;
					case 2:
						listName='storeReduceList';
						
						break;
					case 3:
						listName='storeDiscountList';
						break;
						
				}
				let flag=false;  //是否反选
				//平台满减优惠券
				list=this.util.deepcopy(this[listName]);
				console.log('list--------',list,id);
				let cancelId='';
				list.forEach((item,index)=>{
					//取消优惠券
					console.log('index------',item.selected,item.id,id,index);
					if(item.selected && item.id==id){
						index2=index;
						flag=true;
					}else if(item.selected){
						index2=index;
						cancelId=item.id;
					}
				})
				console.log('index2------',index2);
				if(index2>=0){
					this.$set(this[listName][index2],'selected',false);
					await this.couponCancel(this.orderCart.id,cancelId?cancelId:id);
				}
				
				if(!flag){
					list.forEach((item,index)=>{
						if(item.id==id){
							this[listName][index].selected=true;
							//使用优惠券
							this.couponUse(this.orderId,id);
						}
					})
				}
					
			},
			
			//跳转到影棚详情页面
			toStudioDetail(){
				this.util.toStudioDetail(this.priceInfo.studioPriceArr.studio_id);
			},
			
			//跳转到设备详情页面
			toEquipDetail(id){
				this.util.toEquipDetail(id);
			},
			
			//修改配送方式
			changeMode(){
				console.log('changeMode------',this.cartInfo.is_door_to_door);
				this.util.updateOrderOut(this.orderData.id,this.cartInfo.is_door_to_door).then(res=>{
					console.log('修改配送方式成功！----',res);
				})
			},
			
			//获取订单地址
			getOrderAddress() {
				//先判断订单是否有设置好的地址，address_id
				let addressId=this.orderData.address_id;
				if(addressId && addressId!='0'){
					this.addressList.forEach((item,index)=>{
						if(addressId==item.id){
							this.addressInfo=item;
						}
					})
				}else{
					//获取默认地址
					this.util.getDefaultAddress().then(res=>{
						//如果有默认地址
						if(res){
							this.addressInfo = res;
						}else{
							this.addressInfo=this.addressList[0];
						}
						if(this.addressInfo){
							updateOrderAddress(this.orderData.id,this.addressInfo.id);
						}
					})
				}
			},
			
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
				this.getAddressList();
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
				//修改订单地址
				updateOrderAddress(this.orderData.id,id).then(res=>{
					console.log('修改地址成功！-----',res);
				})
			},
			
			//获取地址列表
			getAddressList() {
				this.util.getAddressList().then(res=>{
					this.addressList=res;
					console.log('getAddressList0000000000000000000000',res);
				})
			},

			


			//轮询获取支付状态
			getPayStatus(){
				this.payInterval=setInterval(()=>{
					this.util.getPayStatus(this.orderId).then(res=>{
						if(res.pay_status==2){
							this.clearPayInterval();
							this.stepTwo=false;
							this.stepThree=true;
						}
					})
				},1000);
			},
			
			//清除定时器
			clearPayInterval(){
				clearInterval(this.payInterval);
			},
			
			//去支付方法
			toPay() {
				if(!this.addressInfo && this.cartInfo.is_door_to_door==1){
					this.$message.warning('请添加地址!');
					return;
				}
				this.stepOne=false;
				this.stepTwo = true;
				this.payOrder();
			},
			
			//删除订单方法
			delOrder() {
				this.util.confirm(this).then(() => {
					let params = {
						id: parseInt(this.orderCart.id)
					}
					console.log('params-----', params);
					//取消使用已经使用的优惠券
					let tempArr=[].concat(this.platReduceList,this.storeReduceList,this.platDiscountList,this.storeDiscountList);
					let tempList=tempArr.filter((item,index)=>{
						return item.selected==true;
					})
					console.log('tempList---------',tempList);
					tempList.forEach(async (item,index)=>{
						await this.couponCancel(this.orderId,item.id,1);
					})
					
					this.postRequest(frontOrder.delUserOrder, params).then(res => {
						console.log('delUserOrder----', res);
						
						this.$message.success('删除订单成功！');
						//重新获取列表
						this.orderCart.count = 0;
						//定时器返回
						this.setTime();
					}).catch(err => {});
				}).catch(err => {});
			},
			
			//切换支付方式方法
			changePay(index) {
				this.payIndex = index;
				this.payOrder();
			},
			
			payOrder() {
				if(this.payIndex === 0) {
					this.codetext = "正在生成微信二维码";
				} else if(this.payIndex === 1) {
					this.codetext = "正在创建支付宝订单";
				}
				let params = {
					order_id: this.orderData.id,
					pay_way: this.payIndex + 1,
					total_price: this.totalPrice
				}
				console.log('params-----', params);
				this.postRequest(frontOrder.pay, params)
					.then(res => {
						console.log("payOrder", res, this.payIndex);
						if(this.payIndex == 0) {
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
			
			//跳转到我的订单页面
			toMyOrderPage(){
				this.$router.push({path:'/personal/order/myOrder'});
			},
			
			//返回上一步方法
			backStep(step) {
				if(parseInt(step) == 2) {
					this.stepOne=true;
					this.stepTwo = false;
				}
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
							//修改订单地址
							updateOrderAddress(this.orderData.id,this.addressInfo.id).then(res=>{
								console.log('修改地址成功！-----',res);
							})
						}
					})
				})
			},
			
			setTime() {
				if(this.wait == 0) {
					this.$router.push({path:this.backToPage})
					return;
				} else {
					this.wait--;
				}
				this.waitTimer=setTimeout(() => {
					this.setTime();
				}, 1000);
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
						content: "+";
						display: block;
						height: 0;
						position: absolute;
						top: 0px;
						left: -12px;
					}
				}
			}
		}
		.second-step {
			width: 1200px;
			margin: 0 auto;
			padding-bottom: 49px;
			box-sizing: border-box;
			.el-form {
				border: 1px solid rgb(240, 240, 240);
				padding: 30px 0;
				box-sizing: border-box;
				background: #fff;
				.el-form-item {
					padding: 0 30px;
					box-sizing: border-box;
				}
				.address {
					/deep/ {
						.el-select {
							margin-right: 16px;
						}
					}
				}
				.people {
					margin-bottom: 30px;
					/deep/ {
						.el-input {
							width: 128px;
							margin-right: 20px;
						}
					}
				}
				.grey-line {
					height: 8px;
					background: rgb(250, 250, 250);
					margin-bottom: 29px;
				}
				.upload-license,
				.upload-agreement {
					.upload-wrap {
						margin-right: 10px;
						p {
							font-size: 8px;
							color: #999999;
						}
					}
					/deep/ {
						.el-upload--picture-card {
							width: 98px;
							height: 139px;
							background: rgba(250, 250, 250, 1);
							border: 1px solid rgba(240, 240, 240, 1);
						}
						.avatar-uploader .el-upload {
							width: 98px;
							height: 139px;
							line-height: 139px;
							background: rgb(250, 250, 250, );
							border: 1px solid rgb(240, 240, 240);
							cursor: pointer;
							position: relative;
							overflow: hidden;
						}
						.avatar-uploader .el-upload:hover {
							border-color: #409EFF;
						}
						.avatar-uploader-icon {
							font-size: 28px;
							color: #8c939d;
							width: 32px;
							height: 32px;
							text-align: center;
						}
						.avatar {
							width: 178px;
							height: 178px;
							display: block;
						}
					}
					.message-tip {
						p {
							line-height: 25px;
							.color-word {
								color: #FF641F;
							}
						}
						p:nth-child(2) {
							margin-bottom: 29px;
						}
						p:last-child {
							color: #1D7AD2;
							span {
								margin-right: 10px;
								cursor: pointer;
							}
						}
					}
				}
				.upload-license {
					margin-bottom: 62px;
					/deep/ {
						.el-form-item__label {
							padding-right: 0;
						}
					}
				}
				.bottom-btn {
					padding-left: 36px;
					box-sizing: border-box;
					.el-button:first-child {
						background: #5A1BE5;
						color: #fff;
						border-radius: 0;
					}
					.el-button:last-child {
						color: #999;
					}
				}
				/deep/ {
					.el-form-item {
						.el-form-item__label {
							width: 100px!important;
							text-align: left;
						}
						.el-form-item__content {
							margin-left: 100px!important;
							display: flex;
						}
					}
					.el-input__inner {
						background: #F0F0F0;
					}
				}
			}
		}

	}
	
	.productInfo {
		color: #666;
		width: 1200px;
		margin: 0px auto;
		.studioInfo {
			margin-bottom: 20px;
		}
		.mainInfo {
			padding: 20px 70px 20px 20px;
			border: 1px solid #F0F0F0;
			background: #fff;
			display: flex;
			justify-content:space-between;
			/*align-items:center;*/
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
	/*第二个步骤样式*/
	
	.payType {
		display: flex;
		align-items: center;
		ul {
			margin-left: 20px;
			display: flex;
			li {
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				border: 1px solid #F0F0F0;
				margin-right: 20px;
				padding: 10px;
				&.active {
					border-color: #3a7f9f;
				}
				.svg-icon{
					width:50px;
					height:30px;
				}
			}
		}
	}
	
	.code {
		margin-top: 40px;
		width: 200px;
		margin-left: 150px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		p {
			margin-top: 10px;
		}
		.price{
			span{
				color:#D4282D;
				font-size:18px;
				font-weight:600;
			}
		}
	}
	
	.back {
		margin: 20px 0px;
		display: flex;
		justify-content: flex-end;
		.backBtn {
			border: 1px solid #F0F0F0;
		}
	}
	.noOrder,.third-step{
		width:1200px;
		margin:100px auto;
		text-align:center;
		font-size:20px;
	}
	.noOrder{
		.timeCount{
			font-size:16px;
			color:#999;
		}
		.time{
			color: #EA001F;
			margin-bottom:10px;
		}
	}
	.selectMode{
		margin-bottom:20px;
	}
	
	/*优惠券样式*/
	.coupon{
		margin-top:20px;
		.mainInfo{
			ul{
				display:flex;
				/*justify-content:center;*/
				align-items:center;
				flex-wrap: wrap;
				li{
					margin-right:48px;
					&:nth-child(4n){
						margin-right:0px;
					}
					&.use{
						opacity:1;
						&:hover{
							opacity:.5;
						}
					}
					&:hover{
						opacity:1;
					}
					opacity:.5;
					width:240px;
					cursor:pointer;
					margin-bottom:20px;
					.info{
						border:2px solid #D4282D;
						border-bottom:none;
						padding:10px 15px 0px;
						div{
							color:#333;
							padding-bottom:7px;
						}
						p{
							margin-bottom:10px;
						}
					}
					.money{
						font-size:30px;
						color:#D4282D;
					}
					.canUse{
						color:#FF6A6E;
						background:rgba(255,194,72,.1);
						padding:3px 10px;
					}
					.time{
						padding:10px 15px;
						color:#fff;
						background:#FF6A6E;
						display:flex;
						span{
							width:43px;
						}
						p{
							flex:1;
						}
					}
				}
			}
			
		}
	}
	.discount{
		display:flex;
		justify-content:flex-end;
		padding-top:23px;
		padding-bottom:23px;
		border-bottom:1px solid #F0F0F0;
		span{
			margin-right:115px;
		}
		p{
			color:#D4282D;
		}
	}
	.coupon{
		.mainInfo{
			justify-content:flex-start;
			align-items:center;
			ul{
				li{
					margin-right:30px;
				}
			}
		}
	}
</style>
