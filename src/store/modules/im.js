

const im= {
    state: {
        initChatObj: localStorage.getItem('initChatObj')
    },
    mutations: {
        SET_CHAT_OBJ: (state, data) => {
            localStorage.setItem("initChatObj", JSON.stringify(data));
            state.initChatObj=data
        },
        REMOVE_CHAT_OBJ: (state, data) => {
            localStorage.removeItem('initChatObj');
            state.initChatObj=data
        }
    },
    actions: {
        setInitChatObj({ commit }, data) {
            return new Promise((resolve, reject) => {
                console.log(data)
                commit('SET_CHAT_OBJ', data)
                resolve()
            })
        },
        removeInitChatObj({ commit }) {
            return new Promise((resolve, reject) => {
                commit('REMOVE_CHAT_OBJ', '')
                resolve()
            })
        }
    }
}
export default im