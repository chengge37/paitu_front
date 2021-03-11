import router from '../router'
import Store from '../store'
import {
	getFirstPermissPath
} from '@/common/function/util'
import {
	Message
} from 'element-ui'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'
router.beforeEach((to, from, next) => {
	console.log(to)
	console.log(from);
	// 获取登录信息
	let user = localStorage.getItem('user');
	if (to.matched.some(record => record.meta.roles == 'serve')) {
		//判断是否是子账号登录，是否有相关权限
		// if (user) {
		// 	user = JSON.parse(user);
		// 	if (user.hasOwnProperty('cid') && user.hasOwnProperty('menu_role')) {
		// 			let menuList = JSON.parse(localStorage.getItem('menuList'));

		// 			let menu;
		// 			menuList.forEach((item, index) => {
		// 				if (to.matched.some(v => v.path == item.path)) {
		// 					menu = item;
		// 				}
		// 			})
		// 				NProgress.start()
		// 				next();
		// 				return;
		// 	}
		// }
		if (user) {
			let role = Store.getters.user_data.role;
			if (role != 0) {
				let list = JSON.parse(localStorage.getItem('allMenu'));
				let menuList = [];
				list=list.filter(item => {
					if (item.meta && item.children) {
						return item.meta.roles == "serve";
					}
				});
				console.log(list,'list');
				list.forEach(item=>{
					if(item.children){
						item.children=item.children.filter(item=>{
							return item.meta.userRole.split(',').some(item=>role&Number(item))
						})
						if(item.children.length!==0){
							menuList.push(item)
						}
					}
				})
				//获取子账号第一个有权限的路径
				let url = menuList[0].path + '/' + menuList[0].children[0].path;
				console.log("url---------", url,to,menuList);
				let flag = false;
				menuList.forEach(item=>{
					item.children.forEach(item=>{
						if(to.path.indexOf(item.path) >= 0){
							flag = true;
						}
					})
				})
				if (flag) {
					next();
				} else {
					next({
						path: url
					});
				}

			} else {
				// 当不是商家权限进入时
				next({
					path: '/sign/firstCategory'
				})
				return
			}
		} else {
			// 未登录则跳转到登录
			next({
				path: '/login',
				query: {
					to: "server"
				}
			});
		}

	} else if (to.matched.some(record => record.meta.roles == 'personal')) {
		if (user) {
			next();
			return;
		}
		// 未登录则跳转到登录
		next({
			path: '/login',
			query: {
				to: "parsonal"
			}
		});
	} else if (to.matched.some(record => record.meta.page == 'hire')) {
		if (user) {
			next();
			return;
		}
		// 未登录则跳转到登录
		next({
			path: '/login',
			query: {
				to: "hire"
			}
		});
	} else if (to.matched.some(record => record.meta.page == 'cart')) {
		if (user) {
			next();
			return;
		}
		// 未登录则跳转到登录
		next({
			path: '/login',
			query: {
				to: "cart"
			}
		});
	} else {
		next()
	}
})
router.afterEach((to, from) => {
	NProgress.done() // 结束Progress
})