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
      let arr = []
      console.log(response);
      response.data.data.forEach(e => {
        if(e.appliedBy.length > 0) {
          e.appliedBy.forEach(p => {
            arr.push(p.user)
          })
        }
      });
      console.log(arr);
      commit('SET_LIST', arr)
      commit('auth/SET_LOADING', false, { root: true })
    } catch (err) {
      commit('auth/SET_LOADING', false, { root: true })
      throw err
    }
  }, 

  async fetchByJob({state, commit, rootState}, data) {
    try {
      commit('auth/SET_LOADING', true, { root: true })
      const response = await this.$axios.get(`/jobs/applied/${data.id}`, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      console.log(response);
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