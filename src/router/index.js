import Vue from 'vue'
import Router from 'vue-router'
const notfound = () => import( /* webpackChunkName: "notfound" */ '../views/notfound/notfound.vue');
// 后台管理
import serve_admin from './serve'
import front_admin from './front'
Vue.use(Router);
// export const router = new Router({
//     mode: 'history',
//     routes: [

//         //前台页面
//         ...front_admin,

//         // 后台界面
//         ...serve_admin,
//         {
//             path: '/404',
//             component: notfound
//         },
//         {
//             path: '/:foo',
//             component: () => import('FrontPage/redirect'),
//             meta: {
//                 roles: "front" 
//             },
//         },
//         {
//             path: '*',
//             component: notfound
//         }
//     ],
//     scrollBehavior(to, from, savedPosition) {
//         if (savedPosition) {
//             return savedPosition
//         } else {
//             return {
//                 x: 0,
//                 y: 0
//             }
//         }
//     }
// });
// export const asyncRoutes = asyncRouterMap

const createRouter = () => new Router({
    mode: 'history',
    routes: [

        //前台页面
        ...front_admin,

        // 后台界面
        ...serve_admin,
        {
            path: '/404',
            component: notfound
        },
        {
            path: '/:foo',
            component: () => import('FrontPage/redirect'),
            meta: {
                roles: "front" 
            },
        },
        {
            path: '*',
            component: notfound
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})
// const createRouter = () => new Router({
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
const router = createRouter()
export default router