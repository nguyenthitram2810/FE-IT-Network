export default {
  async fetchListData({state, commit, rootState}) {
    try {
      const response = await this.$axios.get('permission/all', {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      commit('SET_LIST', response.data.data)
    }
    catch(err) {
      throw err;
    }
  }
}