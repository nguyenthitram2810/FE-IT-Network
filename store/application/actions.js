import qs from "qs"

export default {
  async fetchListData({state, commit, rootState}) {
    try {
      commit('auth/SET_LOADING', true, { root: true })
      const response = await this.$axios.get(`/jobs/applied`, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      commit('SET_LIST', response.data.data)
      commit('auth/SET_LOADING', false, { root: true })
    } catch (err) {
      commit('auth/SET_LOADING', false, { root: true })
      throw err
    }
  }, 

  async fetchByJob({state, commit, rootState}, data) {
    try {
      commit('auth/SET_LOADING', true, { root: true })
      const response = await this.$axios.get(`/jobs/applied`, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      commit('SET_LIST', response.data.data)
      commit('auth/SET_LOADING', false, { root: true })
    } catch (err) {
      commit('auth/SET_LOADING', false, { root: true })
      throw err
    }
  }, 

  async accept({state, commit, rootState}, data) {
    try {
      commit('auth/SET_LOADING', true, { root: true })
      const response = await this.$axios.post(`/jobs`, data, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      commit('auth/SET_LOADING', false, { root: true })
    } catch (err) {
      commit('auth/SET_LOADING', false, { root: true })
      throw err
    }
  },  

  async reject({ rootState }, data) {
    try {
      commit('auth/SET_LOADING', true, { root: true })
      const response = await this.$axios.delete(`/jobs`, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      commit('auth/SET_LOADING', false, { root: true })
    } catch (err) {
      commit('auth/SET_LOADING', false, { root: true })
      throw err
    }
  }, 
}