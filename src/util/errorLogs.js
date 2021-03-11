import Vue from 'vue'
import store from '@/store'
import { isString, isArray } from '@/util/validate'

// you can set in settings.js
// errorLog:'production' | ['production', 'development']
const needErrorLog = ['production', 'development']

function checkNeed() {
    const env = process.env.NODE_ENV
    console.log(env)
    if (isString(needErrorLog)) {
        return env === needErrorLog
    }
    if (isArray(needErrorLog)) {
        return needErrorLog.includes(env)
    }
    return false
}
console.log(checkNeed())
if (checkNeed()) {
    Vue.config.errorHandler = function (error, vm, info, a) {

        // Don't ask me why I use Vue.nextTick, it just a hack.
        // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
        Vue.nextTick(() => {
            store.dispatch('addErrorLog', {
                error,
                vm,
                info,
                url: window.location.href
            })
            console.error(error)
            console.log(error)
        })
    }
}
