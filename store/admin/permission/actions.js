export default {
  async fetchListData({state, commit, rootState}) {
    try {
      commit('SET_LOADING', true)
      const response = await this.$axios.get('permission/all', {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      console.log(response);
      commit('SET_LIST', response.data.data)
      commit('SET_LOADING', false)
    }
    catch(err) {
      throw err;
    }
  }, 
}