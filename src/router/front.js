// 前台界面
const Home = () => import(/* webpackChunkName: "home" */ 'FrontPage/home')
const User = () => import(/* webpackChunkName: "gosetstore" */ 'FrontPage/user')
const Equip = () => import(/* webpackChunkName: "equip" */'FrontPage/equip/index')
const EquipDetail = () => import('FrontPage/equip/detail')
const FrontStudio = () => import('FrontPage/studio/index')
const StudioDetail = () => import('FrontPage/studio/detail')
const FrontStore = () => import('FrontPage/store/index')
const Activity = () => import('FrontPage/activity/index')
const FActiveDetails = () => import('FrontPage/activity/active_details')
const Personal = () => import('FrontPage/personal/index')
const Hire = () => import('FrontPage/hire/index')
const Cart = () => import('FrontPage/cart/index')
const Person = () => import('FrontPage/personal/person/index')
const BaseInfo = () => import('FrontPage/personal/person/baseInfo')
const Address = () => import('FrontPage/personal/person/address')
const SafePassword = () => import('FrontPage/personal/person/safePassword')
const SafePhone = () => import('FrontPage/personal/person/safePhone')
const SafeEmail = () => import('FrontPage/personal/person/safeEmail')
const Certificate = () => import('FrontPage/personal/person/certificate')

const Collect = () => import('FrontPage/personal/collection/index')
const CollectStore = () => import('FrontPage/personal/collection/store')
const CollectStudio = () => import('FrontPage/personal/collection/studio')
const CollectEquip = () => import('FrontPage/personal/collection/equip')
const CollectActivity = () => import('FrontPage/personal/collection/activity')
const CollectCourse = () => import('FrontPage/personal/collection/course')
const CollectModel = () => import('FrontPage/personal/collection/model')
const CollectServer = () => import('FrontPage/personal/collection/server')
const ActivityIndex = () => import('FrontPage/personal/myActivity/index')
const JoinActivity = () => import('FrontPage/personal/myActivity/join')
const ActivityOrder = () => import('FrontPage/personal/myActivity/order')
const ActivityEvaluate = () => import('FrontPage/personal/myActivity/activityEvaluate')
const ActivityOrderDetail = () => import('FrontPage/personal/myActivity/activityOrderDetail')
const ActivityDetail = () => import('FrontPage/personal/myActivity/activityDetail')
const AllNotice = () => import('FrontPage/personal/myMessage/allNotice')
const AllMessage = () => import('FrontPage/personal/myMessage/allMessage')
const ActivityEva = () => import('FrontPage/personal/evaluate/activityEva')
const GoodsEva = () => import('FrontPage/personal/evaluate/goodsEva')
const EditEva = () => import('FrontPage/personal/evaluate/editEva')
const AddEva = () => import('FrontPage/personal/evaluate/addEva')
const MyOrder = () => import('FrontPage/personal/order/myOrder')
const ModelOrder = () => import('FrontPage/personal/order/modelOrder')
const ServerOrder = () => import('FrontPage/personal/order/serverOrder')
const pindanOrder = () => import('FrontPage/personal/order/pindanOrder')
const OrderDetail = () => import('FrontPage/personal/order/orderDetail')
const OrderAccountList = () => import('FrontPage/personal/order/accountList')
const Refund = () => import('FrontPage/personal/order/refund')
const ToEvaluate = () => import('FrontPage/personal/order/toEvaluate')
const Shop = () => import('FrontPage/shop/index')
const ShopHome = () => import('FrontPage/shop/ShopHome')
const ShopStudio = () => import('FrontPage/shop/studio')
const ShopEquip = () => import('FrontPage/shop/equip')
const ShopActivity = () => import('FrontPage/shop/activity')
const Coupon = () => import('FrontPage/coupon/index')
const PersonCoupon = () => import('FrontPage/personal/coupon/index')
const Product = () => import('FrontPage/personal/product/index')

const wxAgree = () => import('ServePage/msm/smallpro/wxappAgreement')

const CheckGood = () => import('FrontPage/check/checkGood')
const OpMan = () => import('FrontPage/OpMan')
const Pay = () => import('FrontPage/pay')
const PaySuccess = () => import('FrontPage/pay/paySuccess')
const WxUser = () => import('FrontPage/redirect/wxuser')

const Eleven = () => import('FrontPage/eleven/index')//双十一活动页面

const Report = () => import('FrontPage/yearReport/index')//年终报告

const Support = () => import('FrontPage/support/index')//商家扶持计划
// const chat = () => import( /* webpackChunkName: "footAbout" */ '@/views/pages/front_page/components/src/chat.vue');

const Propaganda = () => import('FrontPage/propaganda')
const FromUs = () => import('FrontPage/formus')
const Login = () => import('FrontPage/user/login')
const publicity = () => import('FrontPage/propaganda/publicity')
const productList = () => import('FrontPage/propaganda/productList')
const JumpLogin = () => import('FrontPage/user/Jumplogin')
const feedback = () => import('FrontPage/feedback/feedback')
const BecomeModel = () => import('FrontPage/becomeModel/index')
const BecomePhotoer = () => import('FrontPage/becomePhotoer/index')
const Model = () => import('FrontPage/model/index')
const ModelDetail = () => import('FrontPage/model/detail')
const Service = () => import('FrontPage/service/index')
const ServiceDetail = () => import('FrontPage/service/detail')
const Team = () => import('FrontPage/team/index')
const TeamDetail = () => import('FrontPage/team/detail')
const RedMan = () => import('FrontPage/redMan/index')
const RedManDetail = () => import('FrontPage/redMan/detail')
const Broker = () => import('FrontPage/broker/index')
const Sign = () => import('FrontPage/sign/index')
const FirstCategory = () => import('FrontPage/sign/firstCategory')
const SecondCategory = () => import('FrontPage/sign/secondCategory')
const PersonSign = () => import('FrontPage/sign/personSign')
const CompanySign = () => import('FrontPage/sign/companySign')
const ServiceOrder = () => import('FrontPage/serviceOrder/index')
const ServiceBuyOrder = () => import('FrontPage/serviceOrder/buyOrder')
const CompanyHome = () => import('FrontPage/roleHome/companyHome')
const ModelHome = () => import('FrontPage/roleHome/modelHome')
const PhotographerHome = () => import('FrontPage/roleHome/photographerHome')
const Assistant = () => import('FrontPage/assistant/index')
const AssistantDetail = () => import('FrontPage/assistant/detail')
const AssistantOrder = () => import('FrontPage/personal/order/assistantOrder')

const Demand = () => import('FrontPage/demand/index')
const DemandDetail = () => import('FrontPage/demand/detail')

const MyDemand = () => import('FrontPage/personal/demand/myDemand')
const EvaluateDemand = () => import('FrontPage/personal/demand/evaluateDemand')
const DemandReplyList = () => import('FrontPage/personal/demand/replyList')

const PackDetail = () => import('FrontPage/pack/detail')

const Clipper = () => import('../views/pages/front_page/components/photoClipper')

const SendNeed = () => import('FrontPage/need/SendNeed')
const Deposit = () => import('FrontPage/need/Deposit')
const Competitive = () => import('FrontPage/need/Competitive')

const DemandSuccess = () => import('FrontPage/demand/success')
const ModelSearchHistory = () => import('FrontPage/model/searchHistory')

const Appeal = () => import('FrontPage/appeal/index')

import frontLayout from 'FrontComponents/frontLayout'

export default [{
	path: '/',
	component: frontLayout,
	meta: {
		roles: "front"
	},
	children: [{
		path: '',
		name: 'Home',
		component: Home,
		params: {
			allScreen: true,
		}
	}]
},
//测试路由
{
	path: '(/^[\/][0-9a-zA-Z_]{1,}[\/]{0,}$/)',
	//	path: '/111',
	component: frontLayout,
	meta: {
		roles: "front",
		page: "hire"
	},
	children: [{
		path: 'index',
		name: 'Hire',
		component: Hire,
		params: {
			showBackground: true,
			allScreen: true
		}
	}]
},

// 发布需求招标
{
	path: '/need',
	component: frontLayout,
	redirect: '/need/sendneed',
	meta: {
		roles: 'front',
	},
	children: [{
		path: 'sendneed',
		name: 'SendNeed',
		component: SendNeed,
	},{
		path:'deposit',
		name:'Deposit',
		component:Deposit
	},{
		path:'competitive',
		name:'Competitive',
		component:Competitive
	}]
},


//前台商家扶持计划模块路由
{
	path: '/support',
	component: frontLayout,
	meta: {
		roles: "front",
	},
	children: [{
		path: 'index',
		name: 'Support',
		component: Support,
	}]
},

// 图片裁剪测试路由
{
	path: '/clipper',
	component: Clipper
},
// 双十一活动页面
{
	path: '/eleven/index',
	component: Eleven
},
// 年终报告
{
	path: '/report/index',
	component: Report
},

// 前台成为租赁商模块路由
{
	path: '/hire',
	component: frontLayout,
	redirect: '/hire/index',
	meta: {
		roles: "front",
		page: "hire"
	},
	children: [{
		path: 'index',
		name: 'Hire',
		component: Hire,
		params: {
			showBackground: true,
			allScreen: true
		}
	}]
},

//支付页面
{
	path: '/pay',
	component: Pay
},

//支付成功页面
{
	path: '/paySuccess',
	component: PaySuccess
},

//前台购物车模块路由
{
	path: '/cart',
	component: frontLayout,
	redirect: '/cart/index',
	meta: {
		roles: "front",
		page: "cart"
	},
	children: [{
		path: 'index',
		name: 'Cart',
		component: Cart,
		params: {
			showBackground: true,
			allScreen: true
		}
	}]
},
// 前台器材模块路由
{
	path: '/equip',
	component: frontLayout,
	redirect: '/equip/index',
	meta: {
		roles: "front"
	},
	children: [{
		path: 'index',
		name: 'Equip',
		component: Equip,
	}, {
		path: 'detail',
		name: 'EquipDetail',
		component: EquipDetail,
		params: {
			showBackground: true,
		}
	}]
},
// 前台影棚模块路由
{
	path: '/studio',
	component: frontLayout,
	redirect: '/studio/index',
	meta: {
		roles: "front"
	},
	children: [{
		path: 'index',
		name: 'FrontStudio',
		component: FrontStudio,
	}, {
		path: 'detail',
		name: 'StudioDetail',
		component: StudioDetail,
		params: {
			showBackground: true,
		}
	}]
},
// 前台套餐模块路由
{
	path: '/pack',
	component: frontLayout,
	redirect: '/pack/detail',
	meta: {
		roles: "front"
	},
	children: [{
		path: 'detail',
		name: 'packDetail',
		component: PackDetail,
		params: {
			showBackground: true,
		}
	}]
},
// 前台店铺首页路由
{
	path: '/store',
	component: frontLayout,
	redirect: '/store/index',
	meta: {
		roles: "front"
	},
	children: [{
		path: 'index',
		name: 'FrontStore',
		component: FrontStore,
	}]
},
// 前台活动模块路由
{
	path: '/activity',
	component: frontLayout,
	redirect: '/activity/index',
	meta: {
		roles: "front"
	},
	children: [{
		path: 'index',
		name: 'activity',
		component: Activity,

	}, {
		path: "active_details",
		name: "ActiveDetails",
		component: FActiveDetails,
		params: {
			showBackground: true

		}
	}]
},

//前台店铺页面模块
{
	path: '/shop',
	component: frontLayout,
	redirect: '/shop/index',
	meta: {
		roles: "front"
	},
	children: [{
		path: 'index',
		name: 'Shop',
		component: Shop,
		params: {
			allScreen: true,
			showBackground: true
		}
	}, {
		path: 'home',
		name: 'ShopHome',
		component: ShopHome,
		params: {
			allScreen: true,
			showBackground: true,
		}
	}, {
		path: 'studio',
		name: 'ShopStudio',
		component: Shop,
		params: {
			allScreen: true
		}
	}, {
		path: 'equip',
		name: 'ShopEquip',
		component: Shop,
		params: {
			allScreen: true
		}
	}, {
		path: 'activity',
		name: 'ShopActivity',
		component: Shop,
		params: {
			allScreen: true
		}
	}]
},

// 个人中心模块路由
{
	path: '/personal',
	component: frontLayout,
	redirect: '/personal/index',
	meta: {
		roles: "personal",
	},
	children: [{
		path: 'index',
		name: 'Personal',
		component: Personal,
		params: {
			menu: true
		}
	}]
},
{
	path: '/personal/order',
	component: frontLayout,
	meta: {
		roles: "personal",
		list: '0'
	},
	children: [
		{
			path: 'myOrder',
			name: 'MyOrder',
			component: MyOrder,
			params: {
				title: '商品订单',
				menu: true
			}
		},
		{
			path: 'modelOrder',
			name: 'ModelOrder',
			component: ModelOrder,
			params: {
				title: '模特订单',
				menu: true
			}
		},
		{
			path: 'serverOrder',
			name: 'ServerOrder',
			component: ServerOrder,
			params: {
				title: '服务订单',
				menu: true
			}
		},
		{
			path: 'pindanOrder',
			name: 'pindanOrder',
			component: pindanOrder,
			params: {
				title: '拼拍订单',
				menu: true
			}
		},{
			path: 'assistantOrder',
			name: 'assistantOrder',
			component: AssistantOrder,
			params: {
				title: '助理订单',
				menu: true
			}
		},
		{
			path: 'evaluate',
			name: 'Evaluate',
			component: ToEvaluate,
			params: {
				title: '评价商品'
			}
		}
	]
},
// 个人中心订单退款模块
// {
// 	path: '/personal/order/myOrder',
// 	component: frontLayout,
// 	meta: {
// 		roles: "personal",
// 		list: '3'
// 	},
// 	children: [
// 		{
// 			path: 'refund',
// 			name: 'Refund',
// 			component: Refund,
// 			params: {
// 				title: '退款',
// 				// menu: true
// 			}
// 		}
// 	]
// },
// 个人中心详情模块
{
	path: '/personal/order/myOrder',
	component: frontLayout,
	meta: {
		roles: "personal",
		list: '3'
	},
	children: [
		{
			path: 'detail',
			name: 'orderDetail',
			component: OrderDetail,
			params: {
				title: '订单详情',
			}
		},
		{
			path: 'accountList',
			name: 'accountList',
			component: OrderAccountList,
			params: {
				title: '核验单',
			}
		},
		{
			path: 'refund',
			name: 'Refund',
			component: Refund,
			params: {
				title: '退款',
			}
		}
	]
},

// {
// 	path: '/personal/collection',
// 	component: frontLayout,
// 	meta: {
// 		roles: "personal",
// 		list: '1'
// 	},
// 	children: [{
// 		path: 'index',
// 		name: 'Collect',
// 		component: Collect,
// 		params: {
// 			title: '收藏店铺',
// 			menu: true
// 		}
// 	}]
// },
{
	path: '/personal/collection',
	component: frontLayout,
	meta: {
		roles: "personal",
		list: '1'
	},
	children: [
		{
			path: 'collectstudio',
			name: 'CollectStudio',
			component: Collect,
			params: {
				title: '商品收藏',
				menu: true
			}
		},
		{
		path: 'collectstore',
		name: 'CollectStore',
		component: Collect,
		params: {
			title: '店铺收藏',
			menu: true
		}
	},
	{
		path: 'collectequip',
		name: 'CollectEquip',
		component: Collect,
		params: {
			title: '影棚收藏',
			menu: false
		}
	},
	{
		path: 'collectequip',
		name: 'CollectEquip',
		component: Collect,
		params: {
			title: '器材收藏',
			menu: false
		}
	},
	{
		path: 'collectactivity',
		name: 'CollectActivity',
		component: Collect,
		params: {
			title: '活动收藏',
			menu: true
		}
	},
	{
		path: 'collectcourse',
		name: 'CollectCourse',
		component: Collect,
		params: {
			title: '课程收藏',
			menu: true
		}
	},
	{
		path: 'collectmodel',
		name: 'CollectModel',
		component: Collect,
		params: {
			title: '模特收藏',
			menu: true
		}
	},
	{
		path: 'collectserver',
		name: 'CollectServer',
		component: Collect,
		params: {
			title: '服务收藏',
			menu: true
		}
	},
]
},
{
	path: '/personal/myActivity',
	component: frontLayout,
	meta: {
		roles: "personal",
		list: '2'
	},
	children: [
		{
			path: 'join',
			name: 'JoinActivity',
			component: ActivityIndex,
			params: {
				title: '参与活动',
				menu: true
			}
		},
		{
			path: 'activityDetail',
			name: 'ActivityDetail',
			component: ActivityDetail,
			params: {
				title: '活动详情',
				bread: true
			}
		},{
			path: 'order',
			name: 'ActivityOrder',
			component: ActivityIndex,
			params: {
				title: '活动订单',
				menu: true
			}
		},
		{
			path: 'orderDetail',
			name: 'ActivityOrderDetail',
			component: ActivityOrderDetail,
			params: {
				title: '活动订单详情',
			}
		},
		{
			path: 'activityEvaluate',
			name: 'ActivityEvaluate',
			component: ActivityEvaluate,
			params: {
				title: '评价活动'
			}
		}
	]
},

{
	path: '/personal/person',
	component: frontLayout,
	meta: {
		roles: "personal",
		list: '3'
	},
	children: [{
		path: 'base',
		name: 'BaseInfo',
		component: Person,
		params: {
			title: '基本信息',
			menu: true
		}
	},{
		path: 'address',
		name: 'Address',
		component: Person,
		params: {
			title: '地址管理',
			menu: true
		}
	},{
		path: 'security',
		name: 'Security',
		component: Person,
		params: {
			title: '安全管理',
			menu: true
		}
	},{
		path: 'certificate',
		name: 'Certificate',
		component: Person,
		params: {
			title: '实名认证',
			menu: true
		}
	},{
		path: 'binding',
		name: 'Binding',
		component: Person,
		params: {
			title: '账号绑定',
			menu: true
		}
	}]
},
{
	path: '/personal/person/security',
	component: frontLayout,
	meta: {
		roles: "personal",
		list: '3'
	},
	children: [
		{
			path: 'password',
			name: 'SafePassword',
			component: SafePassword,
			params: {
				title: '重置密码',
				menu: true
			}
		},
		{
			path: 'phone',
			name: 'SafePhone',
			component: SafePhone,
			params: {
				title: '重置手机',
				menu: true
			}
		},
		{
			path: 'email',
			name: 'SafeEmail',
			component: SafeEmail,
			params: {
				title: '重置邮箱',
				menu: true
			}
		}
	]
},
{
	path: '/personal/myMessage',
	component: frontLayout,
	meta: {
		roles: "personal",
		list: '4'
	},
	children: [
		{
			path: 'notice',
			name: 'AllNotice',
			component: AllNotice,
			params: {
				title: '通知',
				menu: true
			}
		},
		{
			path: 'message',
			name: 'AllMessage',
			component: AllMessage,
			params: {
				title: '消息',
				menu: true
			}
		}
	]
},
{
	path: '/personal/evaluate',
	component: frontLayout,
	meta: {
		roles: "personal",
	},
	children: [{
		path: 'goodsEvaluate',
		name: 'GoodsEva',
		component: GoodsEva,
		params: {
			title: '我的评价',
			menu: true
		}
	},{
		path: 'editEvaluate',
		name: 'editEva',
		component: EditEva,
		params: {
			title: '修改评价',
			menu: true
		}
	},{
		path: 'addEvaluate',
		name: 'addEva',
		component: AddEva,
		params: {
			title: '追加评价',
			menu: true
		}
	},{
		path: 'activityEvaluate',
		name: 'ActivityEva',
		component: ActivityEva,
		params: {
			title: '活动评价',
			menu: true
		}
	}]
},
// {
// 	path: '/personal/evaluate',
// 	component: frontLayout,
// 	meta: {
// 		roles: "personal",
// 	},
// 	children: [{
// 		path: 'editEvaluate',
// 		name: 'editEva',
// 		component: EditEva,
// 		params: {
// 			title: '修改评价',
// 			menu: true
// 		}
// 	},{
// 		path: 'addEvaluate',
// 		name: 'addEva',
// 		component: AddEva,
// 		params: {
// 			title: '追加评价',
// 			menu: true
// 		}
// 	},{
// 		path: 'activityEvaluate',
// 		name: 'ActivityEva',
// 		component: ActivityEva,
// 		params: {
// 			title: '活动评价',
// 			menu: true
// 		}
// 	}]
// },
// {
// 	path: '/personal/evaluate',
// 	component: frontLayout,
// 	meta: {
// 		roles: "personal",
// 	},
// 	children: [{
// 		path: 'addEvaluate',
// 		name: 'addEva',
// 		component: AddEva,
// 		params: {
// 			title: '追加评价',
// 			menu: true
// 		}
// 	},{
// 		path: 'activityEvaluate',
// 		name: 'ActivityEva',
// 		component: ActivityEva,
// 		params: {
// 			title: '活动评价',
// 			menu: true
// 		}
// 	}]
// },
// {
// 	path: '/personal/evaluate',
// 	component: frontLayout,
// 	meta: {
// 		roles: "personal",
// 	},
// 	children: [{
// 		path: 'activityEvaluate',
// 		name: 'ActivityEva',
// 		component: ActivityEva,
// 		params: {
// 			title: '活动评价',
// 			menu: true
// 		}
// 	}]
// },
{
	path: '/personal/coupon',
	component: frontLayout,
	meta: {
		roles: "personal",
	},
	children: [{
		path: 'index',
		name: 'PersonCoupon',
		component: PersonCoupon,
		params: {
			title: '优惠券',
			menu: true
		}
	}]
},
{
	path: '/personal/product',
	component: frontLayout,
	meta: {
		roles: "personal",
	},
	children: [{
		path: 'index',
		name: 'Product',
		component: Product,
		params: {
			title: '我的产品',
			menu: true
		}
	}]
},

{
	path: '/login',
	component: frontLayout,
	meta: {
		roles: "front"
	},
	children: [{
		path: '',
		name: 'login',
		component: Login,
	}]
},



{
	path: '/coupon',
	component: frontLayout,
	redirect: '/coupon/index',
	meta: {
		roles: "front"
	},
	children: [{
		path: 'index',
		name: 'coupon',
		component: Coupon,
		params: {
			allScreen: true
		}
	}]
},
{
	path: '/publicity',
	component: frontLayout,
	redirect: '/publicity/index',
	meta: {
		roles: "front"
	},
	children: [{
		path: 'index',
		name: 'publicity_index',
		component: publicity,
		params: {
			allScreen: true
		}
	}, {
		path: 'productList',
		name: 'product_list',
		component: productList,
		params: {
			allScreen: true
		}
	}]
},
// {
// 	path: '/formus',
// 	component: frontLayout,
	
// 	meta: {
// 		roles: "front"
// 	},
// 	children: [{
// 		path: 'index',
// 		name: 'formus',
// 		component: FromUs,
// 		params: {
// 			allScreen: true
// 		}
// 	}]
// },
{
	path: '/gosetstore',
	component: frontLayout,
	meta: {
		roles: "front",
		page: "hire"
	},
	children: [{
		path: '',
		name: 'gosetstore',
		component: User,
		params: {
			showBackground: true
		}
	}]
},
{
	path: '/check',
	component: frontLayout,
	redirect: '/check/index',
	meta: {
		roles: "front"
	},
	children: [{
		path: 'index',
		name: 'checkGood',
		component: CheckGood,
	}]
},
{
	path: '/propaganda',
	component: frontLayout,
	redirect: '/propaganda/index',
	meta: {
		roles: "front"
	},
	children: [{
		path: 'index',
		name: 'propaganda',
		component: Propaganda,
		params: {
			allScreen: true
		}
	}]
},

{
	path: '/opman',
	component: frontLayout,
	redirect: '/opman/index',
	meta: {
		roles: 'front',
	},
	children: [{
		path: 'index',
		name: 'OpMan',
		component: OpMan,
		params: {
			allScreen: true
		}
	}]
},
{
	path: '/feedback',
	component: frontLayout,
	redirect: '/feedback/index',
	meta: {
		roles: 'front',
	},
	children: [{
		path: 'index',
		name: 'feedback',
		component: feedback,
		params: {
			allScreen: true
		}
	}]
},
{
	path: '/serve/wxappAgree',
	component: frontLayout,
	meta: {
		roles: 'front',
		page: "hire"
	},
	children: [{
		path: 'index',
		name: 'wxAgree',
		component: wxAgree,
	}]
},
{
	path: '/jumplogin',
	component: frontLayout,
	redirect: '/jumplogin/index',
	meta: {
		roles: 'front'
	},
	children: [{
		path: 'index',
		name: 'jumplogin',
		component: JumpLogin,
	}]
}, {
	path: '/WxAuto',
	component: frontLayout,
	redirect: '/WxAuto/index',
	meta: {
		roles: "front"
	},
	children: [{
		path: 'index',
		name: 'WxAuto',
		component: WxUser,
		params: {
			allScreen: true,
			showBackground: true
		}
	}]
},{
	path: '/becomeModel',
	component: frontLayout,
	redirect: '/becomeModel/index',
	meta: {
		roles: 'front',
	},
	children: [{
		path: 'index',
		name: 'becomeModel',
		component: BecomeModel,
		params: {
			allScreen: true
		}
	}]
},{
	path: '/becomePhotoer',
	component: frontLayout,
	redirect: '/becomePhotoer/index',
	meta: {
		roles: 'front',
	},
	children: [{
		path: 'index',
		name: 'becomePhotoer',
		component: BecomePhotoer,
		params: {
			allScreen: true
		}
	}]
},{
	path: '/model',
	component: frontLayout,
	redirect: '/model/index',
	meta: {
		roles: 'front',
	},
	children: [{
		path: 'index',
		name: 'model',
		component: Model,
	}, {
		path: 'detail',
		name: 'modelDetail',
		component: ModelDetail,
		params: {
			showBackground: true,
		}
	}, {
		path: 'searchHistory',
		name: 'modelSearchHistory',
		component: ModelSearchHistory,
	}]
},{
	path: '/service',
	component: frontLayout,
	redirect: '/service/index',
	meta: {
		roles: 'front',
	},
	children: [{
		path: 'index',
		name: 'service',
		component: Service,
	}, {
		path: 'detail',
		name: 'serviceDetail',
		component: ServiceDetail,
		params: {
			showBackground: true,
		}
	}]
},{
	path: '/team',
	component: frontLayout,
	redirect: '/team/index',
	meta: {
		roles: 'front',
	},
	children: [{
		path: 'index',
		name: 'team',
		component: Team,
	}, {
		path: 'detail',
		name: 'TeamDetail',
		component: TeamDetail,
		params: {
			showBackground: true,
		}
	}]
},{
	path: '/redMan',
	component: frontLayout,
	redirect: '/redMan/index',
	meta: {
		roles: 'front',
	},
	children: [{
		path: 'index',
		name: 'redMan',
		component: RedMan,
	}, {
		path: 'detail',
		name: 'redManDetail',
		component: RedManDetail,
		params: {
			showBackground: true,
		}
	}]
},{
	path: '/broker',
	component: frontLayout,
	redirect: '/broker/index',
	meta: {
		roles: 'front',
	},
	children: [{
		path: 'index',
		name: 'broker',
		component: Broker,
	}]
},
{
	path: '/sign',
	component: frontLayout,
	redirect: '/sign/firstCategory',
	meta: {
		roles: 'front',
		page: 'category'
	},
	children: [{
		path: 'firstCategory',
		name: 'firstCategory',
		component: FirstCategory,
	},{
		path: 'secondCategory',
		name: 'secondCategory',
		component: SecondCategory,
	},{
		path: 'personSign',
		name: 'personSign',
		component: PersonSign,
		params: {
			allScreen: true
		}
	},{
		path: 'companySign',
		name: 'companySign',
		component: CompanySign,
		params: {
			allScreen: true
		}
	}]
},

{
	path: '/serviceOrder',
	component: frontLayout,
	redirect: '/sign/index',
	meta: {
		roles: 'front',
	},
	children: [{
		path: 'index',
		name: 'serviceOrder',
		component: ServiceOrder,
		params: {
			showBackground: true,
			allScreen: true
		}
	},{
		path: 'buyOrder',
		name: 'serviceBuyOrder',
		component: ServiceBuyOrder,
		params: {
			showBackground: true,
			allScreen: true
		}
	}]
},
{
	path: '/roleHome',
	component: frontLayout,
	meta: {
		roles: "front",
		page:"category"
	},
	children: [{
		path: 'companyHome',
		name: 'CompanyHome',
		component: CompanyHome,
	},
	{
		path: 'modelHome',
		name: 'ModelHome',
		component: ModelHome,
	},
	{
		path: 'photographerHome',
		name: 'PhotographerHome',
		component: PhotographerHome,
	}]
},{
	path: '/assistant',
	component: frontLayout,
	redirect: '/assistant/index',
	meta: {
		roles: 'front',
	},
	children: [{
		path: 'index',
		name: 'assistant',
		component: Assistant,
	}, {
		path: 'detail',
		name: 'AssistantDetail',
		component: AssistantDetail,
		params: {
			showBackground: true,
		}
	}]
},{
	path: '/demand',
	component: frontLayout,
	redirect: '/demand/index',
	meta: {
		roles: 'front',
	},
	children: [{
		path: 'index',
		name: 'demand',
		component: Demand,
	}, {
		path: 'detail',
		name: 'demandDetail',
		component: DemandDetail,
		params: {
//			showBackground: true,
		}
	}, {
		path: 'success',
		name: 'demandSuccess',
		component: DemandSuccess,
		params: {
//			showBackground: true,
		}
	}]
},{
	path: '/personal/demand',
	component: frontLayout,
	meta: {
		roles: "personal",
		list: '4'
	},
	children: [
		{
			path: 'myDemand',
			name: 'MyDemand',
			component: MyDemand,
			params: {
				title: '我的需求',
				menu: true
			}
		},
		{
			path: 'replyList',
			name: 'ReplyList',
			component: DemandReplyList,
			params: {
				title: '回复列表',
				menu: true
			}
		},
		{
			path: 'evaluateDemand',
			name: 'evaluateDemand',
			component: EvaluateDemand,
			params: {
				menu: true
			}
		}
	]
},
{
	path: '/appeal',
	component: frontLayout,
	redirect: '/appeal/index',
	meta: {
		roles: 'front',
	},
	children: [{
		path: 'index',
		name: 'appeal',
		component: Appeal,
		params: {
			allScreen: true
		}
	}]
},
]