export default {
  async login({ commit, dispatch }, data ) {
    commit('SET_DISABLED', true)
    try {
      const response = await this.$axios.post('/auth', data)
      dispatch('setUser', response.data.data)
      commit('SET_DISABLED', false)
    }
    catch(err) {
      commit('SET_DISABLED', false)
      throw err;
    }
  },

  async register({ commit, dispatch }, data) {
    commit('SET_DISABLED', true)
    try {
      const response = await this.$axios.post('/auth/register', data)
      dispatch('setUser', response.data.data)
      commit('SET_DISABLED', false)
    }
    catch(err) {
      commit('SET_DISABLED', false)
      throw err;
    }
  },

  async registerCompany({ commit }, data) {
    commit('SET_DISABLED', true)
    try {
      const response = await this.$axios.post('/auth/newlead', data)
      commit('SET_DISABLED', false)
    }
    catch(err) {
      commit('SET_DISABLED', false)
      throw err;
    }
  },

  async loginAdmin({ commit, dispatch }, data) {
    commit('SET_DISABLED', true)
    try {
      const response = await this.$axios.post('/auth', data)
      if(response.data.data.roleId == 1 || response.data.data.roleId == 2) {
        dispatch('setUser', response.data.data)
      }
      else {
        throw {
          message: "You do not have permission to access admin!"
        }
      }
      commit('SET_DISABLED', false)
    }
    catch(err) {
      commit('SET_DISABLED', false)
      throw err;
    }
  },

  setUser({ commit }, data) {
    localStorage.setItem('currentUser', JSON.stringify(data))
    commit('SET_CURRENT_USER', JSON.parse(localStorage.getItem('currentUser')))
  }, 

  async getFullInfo({commit, rootState}, data) {
    try {
      commit('SET_LOADING', true)
      const response = await this.$axios.get(`/auth/me`, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      commit('SET_USER', response.data.data[0])
      commit('SET_LOADING', false)
    } catch (error) {
      commit('SET_LOADING', false)
      throw error
    }
  }
}