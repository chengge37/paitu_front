import { postRequest, getRequest } from '@/util/httpUtil'
import { store as storeApi,frontPersonal } from "@config/api.js"
import $Vm from '../../main'
import store from '../../store';

// import { initIM } from "@util/initIM"
const user = {
    state: {
        user_data: JSON.parse(localStorage.getItem('user')),
        no_login_notice_time: 0,
        loginOver: "false",
    },
    mutations: {
        update_user_data(state, data) {
            localStorage.setItem("user", JSON.stringify(data));
            state.user_data = data;
            console.error('登录后更新用户信息,重连SOCKET')
            $Vm.$connect( process.env.SOCKET_URL, {
                store:store,
                protocol: data.token,
                reconnection: true, 
                reconnectionAttempts: 20, 
                reconnectionDelay: 3000,
                connectManually: true,
            });
        },
        remove_user_data(state, data) {
            localStorage.removeItem("user");
            localStorage.removeItem("allMenu");
            state.user_data = data
        },
        update_no_login_notice_time(state, data) {
            localStorage.setItem("no_login_notice_time", data);
            state.no_login_notice_time = data;
        },
        update_loginOver(state, data) {
            localStorage.setItem("loginOver", data);
            state.loginOver = data;
        }
    },
    actions: {
        Login({ commit,dispatch }, userInfo) {
            return new Promise((resolve, reject) => {
                postRequest("/user/ajaxLogin", userInfo).then(res => {
                    if (res instanceof Error || res == undefined) {
                        commit('remove_user_data')

                        reject(new Error('玄学问题'))
                    } else {
                        console.log('user 登录成功', res)
                        commit('update_user_data', res)
                        commit('update_loginOver', false)
                        // 登录成功后拿到用户的ID以及头像信息创建即时聊天
                        // Vue.$children[0].$refs.chat.showIM=true
                        //设置相关路由权限
                        resolve(true)
                    }

                }).catch(err => {
                    commit('remove_user_data')
                    reject(err)
                })
            })
        },
        StaffLogin({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                postRequest(storeApi.accountLogin, userInfo).then(res => {
                    if (res instanceof Error || res == undefined) {
                        commit('remove_user_data')
                        reject(new Error('玄学问题'))
                    } else {
                        console.log('staff 登录成功', res)
                        commit('update_user_data', res)
                        resolve(res)
                    }

                }).catch(err => {
                    commit('remove_user_data')
                    reject(err)
                })
            })
        },
        CodeLogin({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                postRequest("/user/ajaxLoginByCode", userInfo).then(res => {
                    if (res instanceof Error || res == undefined) {
                        commit('remove_user_data')
                        reject(new Error('玄学问题'))
                    } else {
                        console.log('user 登录成功', res)
                        commit('update_user_data', res)
                        commit('update_loginOver', false)
                        resolve(true)
                    }

                }).catch(err => {
                    commit('remove_user_data')
                    reject(false)
                })
            })
        },
        GetUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getRequest(frontPersonal.getUserInfo).then(res => {
                    commit('update_user_data', res)
                    resolve(res)
                }).catch(err => {
                    commit('remove_user_data')
                    reject(err)
                })
            })
        },
        LogOut({ commit }) {
            return new Promise((resolve, reject) => {
                postRequest("/user/ajaxLogout").then(() => {
                    // 退出登录同时退出聊天IM
                    // Vue.$children[0].$refs.chat.showIM=false
                    commit('remove_user_data', null)
                    resolve()
                }).catch(err => reject(err))
            })
        }
    }
}
export default user