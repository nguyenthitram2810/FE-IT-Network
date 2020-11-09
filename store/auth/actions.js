export default {
  async login({ commit }, data ) {
    commit('SET_DISABLED', true)
    try {
      const response = await this.$axios.post('/auth', data)
      localStorage.setItem('currentUser', JSON.stringify(response.data.data))
      commit('SET_CURRENT_USER', JSON.parse(localStorage.getItem('currentUser')))
    }
    catch(err) {
      commit('SET_DISABLED', false)
      throw err;
    }
  }
}