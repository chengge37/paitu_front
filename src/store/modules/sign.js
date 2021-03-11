

const sign= {
  state: {
      sign_info: JSON.parse(localStorage.getItem('sign_info')),
  },
  mutations: {
      SET_SIGN: (state, data) => {
          localStorage.setItem("sign_info", JSON.stringify(data));
          state.sign_info=data
      },
      REMOVE_SIGN: (state, data) => {
          localStorage.removeItem('sign_info');
          state.sign_info=data
      },
  },
  actions: {
      setSign({ commit }, data) {
          return new Promise((resolve, reject) => {
              console.log(data)
              commit('SET_SIGN', data)
              resolve()
          })
      },
      removeSign({ commit }) {
          return new Promise((resolve, reject) => {
              commit('REMOVE_SIGN', '')
              resolve()
          })
      },
  }
}
export default sign