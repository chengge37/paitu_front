// 后台界面
/**
 * hidden: true                 如果在模板中使用该选项,则不会在侧栏显示该路由(例如：Dashboard),如果是在第一个子路由中使用,侧栏则只显示第一个子路由的名字和图标(例如: Form)
 * alwaysShow: true             如果设置为true它则会始终显示根菜单,无视自路由长度,没有设置的话,就会折叠起来(不清楚为什么没有作用,可能是我写错位置了?)
 * redirect: noredirect         若设置为noredirect则顶部面包屑不能够为其重定向.
 * onlyShowfirst: false         若该设置为true时，将会无视其有多少个孩子路由，只会显示第一个子路由并将其设置为根菜单
 * name:'router-name'           路由名称,此项为必须填写项
 * meta : {
    title: 'title'               这里的名字决定了面包屑和侧栏的名字
    icon: 'svg-name'             当你在svg文件夹内加入了你的图标,那么在这里填写图标名他就会显示在侧栏
  }
 **/
const WorkBench = () => import('ServePage/work/index')
const WorkList = () => import('ServePage/work/work_list')
const Order = () => import('ServePage/order/index')
const Question = () => import('ServePage/question/index')
const Day = () => import('ServePage/day/index')
const Device = () => import('ServePage/device/index')
const DeviceDetails = () => import('ServePage/device/device_details')
const Active = () => import('ServePage/active/index')
const ActiveOrder = () => import('ServePage/activeOrder/index')
const ActiveOrderDetail = () => import('ServePage/activeOrder/actOrderDetail')
const Employee = () => import('ServePage/employee/index')
const EmployeeDetails = () => import('ServePage/employee/employee_detail')
const Finance = () => import('ServePage/finance/index')
const FinanceDetail = () => import('ServePage/finance/detail')
const rent = () => import('ServePage/basic/index')
const modelCompany = () => import('ServePage/basic/modelCompany')
const mcnCompany = () => import('ServePage/basic/mcnCompany')
const photoerCompany = () => import('ServePage/basic/photoerCompany')
const perModel = () => import('ServePage/basic/model')
const photographer = () => import('ServePage/basic/photographer')
const Studio = () => import('ServePage/studio/index')
const StudioDetails = () => import('ServePage/studio/studio_details')
const OrderDetails = () => import('ServePage/order/order_details')
const ActiveDetails = () => import('ServePage/active/active_details')
const AddUser = () => import('ServePage/active/adduser')
const Customer = () => import('ServePage/customer/index')
const CustomerDetails = () => import('ServePage/customer/customer_detail')
const Msm = () => import('ServePage/msm/index')
const Msm_message = () => import('ServePage/msm/message/index')
const Msm_charge = () => import('ServePage/msm/message/charge')
const Msm_history = () => import('ServePage/msm/message/history')
const smallProIndex = () => import('ServePage/msm/smallpro/index')
// const smallShopInfo = () => import('ServePage/msm/smallpro/ShopInfo')
// const smallWxPay = () => import('ServePage/msm/smallpro/wxpay')
const Worklist = () => import('ServePage/day/worklist')
const WorklistDetails = () => import('ServePage/day/worklist_details')
const Coupon = () => import('ServePage/coupon/index')
const CouponDetail = () => import('ServePage/coupon/coupon_detail')
const Store = () => import('ServePage/store/index')
const AccountDetail = () => import('ServePage/store/account_detail')
const Product = () => import('ServePage/product/index')
const ProductDetail = () => import('ServePage/product/detail')
const MoveData = () => import('ServePage/analysis/move_data')
const CategoryData = () => import('ServePage/analysis/category_data')
const UserAnalysis = () => import('ServePage/analysis/user_analysis')
const FinancialAnalysis = () => import('ServePage/analysis/financial_analysis')
const OrderAnalysis = () => import('ServePage/analysis/order_analysis')
const AccountList = () => import('ServePage/order/accountList')
const cameraTable = () => import('ServePage/analysis/camera_table')
const studioTable = () => import('ServePage/analysis/studio_table')
const Template = () => import('ServePage/template/index')
const Permission = () => import('ServePage/permission/index')
const DataShow = () => import('ServePage/finance/dataShow')
const Package = () => import('ServePage/package/index')
const PackageDetail = () => import('ServePage/package/packageDetail')
const Code = () => import('ServePage/code/index')
const Model = () => import('ServePage/model/index')
const ModelDetail = () => import('ServePage/model/modelDetail')
const ModelOrder = () => import('ServePage/modelOrder/index')
const ModelOrderDetail = () => import('ServePage/modelOrder/detail')
const Photoer = () => import('ServePage/photoer/index')
const PhotoerDetail = () => import('ServePage/photoer/photoerDetail')
const ServiceOrder = () => import('ServePage/serviceOrder/index')
const ServiceOrderDetail = () => import('ServePage/serviceOrder/detail')
const TeamOrder = () => import('ServePage/teamOrder/index')
const TeamOrderDetail = () => import('ServePage/teamOrder/detail')
const pindan = () => import('ServePage/pindan/index')
const pindanDetail = () => import('ServePage/pindan/pindanDetail')
const PhotoAlbum = () => import('ServePage/photoalbum/photo')
const VideoAlbum = () => import('ServePage/photoalbum/video')
const AlbumSet = () => import('ServePage/photoalbum/index')
const Assistant = () => import('ServePage/assistant/index')
const AssistantDetail = () => import('ServePage/assistant/detail')
const AssistantOrder = () => import('ServePage/assistantOrder/index')
const AssistantOrderDetail = () => import('ServePage/assistantOrder/detail')
const PackOrder = () => import('ServePage/packOrder/index')
const PackOrderDetail = () => import('ServePage/packOrder/detail')

const BiddingOrder = () => import('ServePage/bidding/index')
const BiddingDetail = () => import('ServePage/bidding/detail')

import Layout from '@/views/pages/serve_page/layout'

export default [
    {
        path: '/serve',
        component: Layout,
        hidden: true,
        redirect: '/serve/order/rent',
        meta: {
            roles: "serve",
            userRole: '2,4',
        },
    },
    {
        path: '/serve/order',
        component: Layout,
        // onlyShowfirst: true,
        meta: {
            roles: 'serve',
            permission: false,
            title: '订单管理',
            icon: 'order',

        },
        children: [{
            path: 'rent',
            name: 'Order',
            component: Order,
            meta: {
                userRole: '2,4',
                title: '租赁订单',
                icon: 'order',
            }
        },
        {
            path: 'rentDetails',
            name: 'rentDetails',
            hidden: true,
            component: OrderDetails,
            meta: {
                userRole: '2,4',
                activeMenu: "/serve/order/rent"
            }
        },
        {
            path: 'accountList',
            name: 'accountList',
            hidden: true,
            component: AccountList,
            meta: {
                userRole: '2,4',
                activeMenu: "/serve/order/rent"
            }
        },

		{
            path: 'bidding',
            name: 'bidding',
            component: BiddingOrder,
            meta: {
                userRole: '2,8',
                title: '竞标订单',
                icon: 'order',
            }
        },
        {
            path: 'biddingDetail',
            name: 'biddingDetail',
            hidden: true,
            component: BiddingDetail,
            meta: {
                userRole: '2,8',
                activeMenu: "/serve/order/bidding"
            }
        },

        {
            path: 'serviceOrderIndex',
            name: 'serviceOrder',
            component: ServiceOrder,
            meta: {
                title: '服务订单',
                userRole: '4,8,64',
                icon: 'chanpin',
            }
        }, {
            path: 'serviceOrderDetail',
            name: 'serviceOrderDetail',
            hidden: true,
            component: ServiceOrderDetail,
            meta: {
                userRole: '4,8,64',
                activeMenu: "/serve/order/serviceOrderIndex"
            }
        },
        
        
        {
            path: 'assistantOrder',
            name: 'assistantOrder',
            component: AssistantOrder,
            meta: {
                title: '助理订单',
                userRole: '2,4',
//              userRole: '4',
                icon: 'chanpin',
            }
        }, {
            path: 'assistantOrderDetail',
            name: 'assistantOrderDetail',
            hidden: true,
            component: AssistantOrderDetail,
            meta: {
                userRole: '2,4',
                activeMenu: "/serve/order/assistantOrder"
            }
        },
        

        {
            path: 'teamOrderIndex',
            name: 'teamOrder',
            component: TeamOrder,
            meta: {
                userRole: '4,8,64',
                title: '拼拍订单',
                icon: 'chanpin',
            }
        }, {
            path: 'teamOrderDetail',
            name: 'teamOrderDetail',
            hidden: true,
            component: TeamOrderDetail,
            meta: {
                userRole: '4,8,64',
                activeMenu: "/serve/order/teamOrderIndex"
            }
        },
        
        {
            path: 'packOrder',
            name: 'packOrder',
            component: PackOrder,
            meta: {
                userRole: '2,4',
                title: '套餐订单',
                icon: 'chanpin',
            }
        }, {
            path: 'PackOrderDetail',
            name: 'PackOrderDetail',
            hidden: true,
            component: PackOrderDetail,
            meta: {
                userRole: '2,4',
                activeMenu: "/serve/order/packOrder"
            }
        },
        
        {
            path: 'active',
            name: 'Active_order',
            component: ActiveOrder,
            meta: {
                userRole: '2,4',
                title: '活动订单',
                icon: 'active_order',
            }
        },
        {
            path: 'activeDetail',
            name: 'Active_detail',
            hidden: true,
            component: ActiveOrderDetail,
            meta: {
                userRole: '2,4',
                activeMenu: "/serve/order/active",
            }
        },
        {
            path: 'modelOrder',
            name: 'modelOrder',
            component: ModelOrder,
            meta: {
                title: '模特订单',
                userRole: '4,16,128',
                icon: 'chanpin',
            }
        }, {
            path: 'modelOrderDetail',
            name: 'modelOrderDetail',
            hidden: true,
            component: ModelOrderDetail,
            meta: {
                userRole: '4,16,128',
                activeMenu: "/serve/order/modelOrder"
            }
        }
        ]
    },
    {
        path: '/serve/manage',
        component: Layout,
        meta: {
            roles: 'serve',
            userRole: '2,4',
            permission: false,
            title: '产品管理',
            icon: 'active',
        },
        children: [{
            path: 'activeIndex',
            name: 'Active_set',
            component: Active,
            meta: {
                title: '活动管理',
                userRole: '2,4',
                icon: 'active',
            }
        }, {
            path: 'activeDetails',
            name: 'Active_details',
            hidden: true,
            component: ActiveDetails,
            meta: {
                userRole: '2,4',
                activeMenu: "/serve/manage/activeIndex"
            }
        }, {
            path: 'adduser',
            name: 'Active_adduser',
            hidden: true,
            component: AddUser,
            meta: {
                userRole: '2,4',
                activeMenu: "/serve/manage/activeIndex"
            }
        },
        {
            path: 'deviceIndex',
            name: 'Device_set',
            component: Device,
            meta: {
                title: '器材管理',
                userRole: '2,4',
                icon: 'device',
            }
        }, {
            path: 'device_details',
            name: 'Device_details',
            hidden: true,
            component: DeviceDetails,
            meta: {
                userRole: '2,4',
                activeMenu: "/serve/manage/deviceIndex"
            }
        },
        {
            path: 'studioIndex',
            name: 'Studio_set',
            component: Studio,
            meta: {
                userRole: '2,4',
                title: '影棚管理',
                icon: 'studio',
            }
        }, {
            path: 'studio_details',
            name: 'Studio_details',
            hidden: true,
            component: StudioDetails,
            meta: {
                userRole: '2,4',
                activeMenu: "/serve/manage/studioIndex"
            }
        },
        {
            path: 'modelIndex',
            name: 'model',
            component: Model,
            meta: {
                title: '模特管理',
                userRole: '4,16,128',
                icon: 'chanpin',
            }
        }, {
            path: 'modelDetail',
            name: 'modelDetail',
            hidden: true,
            component: ModelDetail,
            meta: {
                userRole: '4,16,128',
                activeMenu: "/serve/manage/modelIndex"
            }
        },
        {
            path: 'AlbumSetIndex',
            name: 'AlbumSet',
            component: AlbumSet,
            meta: {
                title: "相册管理",
                userRole: '4,16,128',
                icon: 'chanpin',
            }
        },
        {
            path: 'managealbums',
            name: 'managealbums',
            hidden: true,
            component: PhotoAlbum,
            meta: {
                userRole: '4,16,128',
                activeMenu: "/serve/manage/AlbumSetIndex"
            }
        }, {
            path: 'managevideo',
            name: 'managevideo',
            hidden: true,
            component: VideoAlbum,
            meta: {
                userRole: '4,16,128',
                activeMenu: "/serve/manage/AlbumSetIndex"
            }
        },
        {
            path: 'serviceIndex',
            name: 'photoer',
            component: Photoer,
            meta: {
                userRole: '4,8,64',
                title: '服务管理',
                icon: 'chanpin',
            }
        }, {
            path: 'serviceDetail',
            name: 'photoerDetail',
            hidden: true,
            component: PhotoerDetail,
            meta: {
                userRole: '4,8,64',
                activeMenu: "/serve/manage/serviceIndex"
            }
        }, {
            path: 'teamIndex',
            name: 'pindan',
            component: pindan,
            meta: {
                title: '拼单管理',
                userRole: '4,8,64',
                icon: 'chanpin',
            }
        }, {
            path: 'pindanDetail',
            name: 'pindanDetail',
            hidden: true,
            component: pindanDetail,
            meta: {
                userRole: '4,8,64',
                activeMenu: "/serve/manage/teamIndex"
            }
        },{
            path: 'assistant',
            name: 'assistant',
            component: Assistant,
            meta: {
                title: '助理管理',
                userRole: '2,4,16,128',
//              userRole: '4',
                icon: 'chanpin',
            }
        }, {
            path: 'assistantDetail',
            name: 'assistantDetail',
            hidden: true,
            component: AssistantDetail,
            meta: {
                userRole: '2,4,16,128',
//              userRole: '4',
                activeMenu: "/serve/manage/assistant"
            }
        },{
            path: 'package',
            name: 'package',
            component: Package,
            meta: {
                title: '套餐管理',
                userRole: '2,4,16,128',
//              userRole: '4',
                icon: 'chanpin',
            }
        }, {
            path: 'packageDetail',
            name: 'packageDetail',
            hidden: true,
            component: PackageDetail,
            meta: {
                userRole: '2,4,16,128',
//              userRole: '4',
                activeMenu: "/serve/manage/package"
            }
        },]
    },
    {
        path: '/serve/finance_set',
        component: Layout,
        onlyShowfirst: true,
        meta: {
            roles: 'serve',
            userRole: '2,4,8,16,64,128',
            permission: false
        },
        children: [{
            path: 'index',
            name: 'Finance_set',
            component: Finance,
            meta: {
                title: '财务管理',
                userRole: '2,4,8,16,64,128',
                icon: 'finance',
            }
        }, {
            path: 'detail',
            name: 'Finance_detail',
            component: FinanceDetail,
            meta: {
                userRole: '2,4,8,16,64,128',
                activeMenu: "/serve/finance_set/index"
            }
        }, {
            path: 'dataShow',
            name: 'dataShow',
            component: DataShow,
            meta: {
                userRole: '2,4,8,16,64,128',
                activeMenu: "/serve/finance_set/index"
            }
        }]
    },
    {
        path: '/serve/pop_set',
        component: Layout,
        onlyShowfirst: true,
        name: "pop_set",
        redirect: "/serve/pop_set/index",
        meta: {
            roles: 'serve',
            permission: false,
            userRole: '2,4',
            title: "推广"
        },
        children: [{
            path: 'index',
            name: 'Msm',
            component: Msm,
            meta: {
                userRole: '2,4',
                title: '推广中心',
                icon: 'broadcast',
            }
        }, {
            path: 'smallpro',
            name: 'smallProIndex',
            component: smallProIndex,
            meta: {
                userRole: '2,4',
                title: '小程序申请',
                activeMenu: '/serve/pop_set/index'
            }
        }, {
            path: 'message',
            name: 'Msm_message',
            component: Msm_message,
            meta: {
                userRole: '2,4',
                activeMenu: "/serve/pop_set/index"
            }
        }, {
            path: 'charge',
            name: 'Msm_charge',
            component: Msm_charge,
            meta: {
                userRole: '2,4',
                activeMenu: "/serve/pop_set/index"
            }
        }, {
            path: 'history',
            name: 'Msm_history',
            component: Msm_history,
            meta: {
                userRole: '2,4',
                activeMenu: "/serve/pop_set/index"
            }
        }, {
            path: 'coupon',
            name: 'coupon_set',
            component: Coupon,
            meta: {
                userRole: '2,4',
                activeMenu: "/serve/pop_set/index"
            }
        }, {
            path: 'couponDetail',
            name: 'coupon_detail',
            component: CouponDetail,
            meta: {
                userRole: '2,4',
                activeMenu: "/serve/pop_set/index"
            }
        }]
    },
    {
        path: '/serve/customer_set',
        component: Layout,
        onlyShowfirst: true,
        meta: {
            roles: 'serve',
            userRole: '2,4',
            permission: false
        },
        children: [{
            path: 'index',
            name: 'Customer_set',
            component: Customer,
            meta: {
                userRole: '2,4',
                title: '客户管理',
                icon: 'customer',
            }
        }, {
            path: 'details',
            name: 'customer_details',
            component: CustomerDetails,
            meta: {
                userRole: '2,4',
                activeMenu: "/serve/customer_set/index"
            }
        }]
    },


    {
        path: '/serve/question_set',
        component: Layout,
        onlyShowfirst: true,
        meta: {
            roles: 'serve',
            userRole: '2,4',
            permission: false
        },
        children: [{
            path: 'index',
            name: 'Question_set',
            component: Question,
            meta: {
                title: '问题管理',
                userRole: '2,4',
                icon: 'wenti',
            }
        }]
    },


    // {
    //     path: '/serve/package_set',
    //     component: Layout,
    //     onlyShowfirst: true,
    //     meta: {
    //         roles:'serve',
    //         userRole:'2,4,16,128',
    //         permission: false
    //     },
    //     children: [{
    //         path: 'index',
    //         name: 'Package_set',
    //         component: Package,
    //         meta: {
    //             title: '套餐管理',
    //             icon: 'studio',
    //         }
    //     }, {
    //         path: 'packageDetail',
    //         name: 'packageDetail',
    //         component: PackageDetail,
    //         meta: {
    //             activeMenu: "/serve/package_set/index"
    //         }
    //     }]
    // },
    //{
    //  path: '/serve/employee_set',
    //  component: Layout,
    //  onlyShowfirst: true,
    //  meta: {
    //      roles:'serve',
    //      permission: false
    //  },
    //  children: [{
    //      path: 'index',
    //      name: 'Employee_set',
    //      component: Employee,
    //      meta: {
    //          title: '团队管理',
    //          icon: 'employee',
    //      }
    //  }, {
    //      path: 'details',
    //      name: 'Employee_details',
    //      component: EmployeeDetails,
    //      meta: {
    //          activeMenu: "/serve/employee_set/index"
    //      }
    //  }, {
    //      path: 'AccountDetail',
    //      name: 'Account_details',
    //      component: AccountDetail,
    //      meta: {
    //          activeMenu: "/serve/employee_set/index"
    //      }
    //  }]
    //},
    //可能需要多个基本设置
    {
        path: '/serve/basic_set',
        component: Layout,
        meta: {
            roles: 'serve',
            userRole: '2,4',
            title: '基本设置',
            permission: false,
            icon: 'active',
        },
        children: [{
            path: 'rent',
            name: 'Rent',
            component: rent,
            meta: {
                userRole: '2,4',
                title: '商家基本设置',
                icon: 'basic',
            }
        }, {
            path: 'perModel',
            name: 'PerModel',
            component: perModel,
            meta: {
                userRole: '128',
                title: '个人模特基本设置',
                icon: 'basic',
            }
        }, {
            path: 'modelCompany',
            name: 'ModelCompany',
            component: modelCompany,
            meta: {
                userRole: '16',
                title: '模特公司基本设置',
                icon: 'basic',
            }
        }, {
            path: 'mcnCompany',
            name: 'McnCompany',
            component: mcnCompany,
            meta: {
                userRole: '32',
                title: 'mcn公司基本设置',
                icon: 'basic',
            }
        }, {
            path: 'photoerCompany',
            name: 'PhotoerCompany',
            component: photoerCompany,
            meta: {
                userRole: '8',
                title: '摄影公司基本设置',
                icon: 'basic',
            }
        }, {
            path: 'proPhotoer',
            name: 'ProPhotoer',
            component: photographer,
            meta: {
                userRole: '64',
                title: '个人摄影师基本设置',
                icon: 'basic',
            }
        }]
    },
    {
        path: '/serve/product_set',
        component: Layout,
        onlyShowfirst: true,
        meta: {
            roles: 'serve',
            userRole: '2,4',
            permission: false
        },
        children: [{
            path: 'index',
            name: 'product_set',
            component: Product,
            meta: {
                userRole: '2,4',
                title: '增值服务',
                icon: 'chanpin',
            }
        }, {
            path: 'detail',
            name: 'product_set',
            component: ProductDetail,
            meta: {
                userRole: '2,4',
                activeMenu: "/serve/product_set/index"
            }
        }]
    },
    //{
    //  path: '/serve/analysis',
    //  component: Layout,
    //  redirect: "/serve/analysis/move",
    //  name:"analysis",
    //  meta: {
    //      roles:'serve',
    //      userRole:'2,4',
    //      permission: false,
    //      title: '数据分析',
    //      icon: 'shuju',
    //  },
    //  children: [{
    //      path: 'move',
    //      name: 'MoveData',
    //      component: MoveData,
    //      meta: {
    //          activeMenu: "/serve/analysis/move",
    //          icon: 'dongxiao',
    //          title: '动销数据',
    //      }
    //  }, {
    //      path: 'category',
    //      name: 'CategoryData',
    //      component: CategoryData,
    //      meta: {
    //          activeMenu: "/serve/analysis/category",
    //          icon: 'pinglei',
    //          title: '品类数据',
    //      }
    //  }, 
    //  {
    //      path: 'cameraTable',
    //      name: 'cameraTable',
    //      hidden: true,
    //      component: cameraTable,
    //      meta: {
    //          activeMenu: "/serve/analysis/category",
    //          title: '品类数据',
    //      }
    //  }, 
    //  {
    //      path: 'studioTable',
    //      name: 'studioTable',
    //      hidden: true,
    //      component: studioTable,
    //      meta: {
    //          activeMenu: "/serve/analysis/category",
    //          title: '品类数据',
    //      }
    //  }, 
    // {
    //     path: 'user',
    //     name: 'UserAnalysis',
    //     component: UserAnalysis,
    //     meta: {
    //         activeMenu: "/serve/analysis/user",
    //         title: '用户分析',
    //     }
    // },
    //   {
    //  },
    // {
    //     path: 'user',
    //     name: 'UserAnalysis',
    //     component: UserAnalysis,
    //     meta: {
    //         activeMenu: "/serve/analysis/user",
    //         title: '用户分析',
    //     }
    // },
    //  {
    //      path: 'financial',
    //      name: 'FinancialAnalysis',
    //      component: FinancialAnalysis,
    //      meta: {
    //          activeMenu: "/serve/analysis/financial",
    //          title: '财务分析',
    //      }
    //  }, {
    //      path: 'order',
    //      name: 'OrderAnalysis',
    //      component: OrderAnalysis,
    //      meta: {
    //          activeMenu: "/serve/analysis/order",
    //          title: '订单分析',
    //      }
    //  }
    //  ]
    //},
    {
        path: '/serve/template_set',
        component: Layout,
        meta: {
            roles: 'serve',
            userRole: '2,4',
            permission: false
        },
        children: [{
            path: 'index',
            name: 'index',
            component: Template,
            meta: {
                userRole: '2,4',
                title: '模板管理',
                icon: 'chanpin',
            }
        }]
    },

    //{
    //  path: '/serve/permission',
    //  component: Layout,
    //  meta: {
    //      roles:'serve',
    //      permission: false
    //  },
    //  children: [{
    //      path: 'index',
    //      name: 'index',
    //      component: Permission,
    //      meta: {
    //          title: '权限管理',
    //          icon: '权限',
    //      }
    //  }]
    //},

    // {
    //     path: '/serve/code',
    //     component: Layout,
    //     meta: {
    //         roles:'serve',
    //         userRole:'2,4',
    //         permission: false
    //     },
    //     children: [{
    //         path: 'index',
    //         name: 'index',
    //         component: Code,
    //         meta: {
    //             title: '码上出入库',
    //             icon: 'chanpin',
    //         }
    //     }]




]
