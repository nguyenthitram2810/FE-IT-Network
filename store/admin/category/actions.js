import qs from "qs"

export default {
  async fetchListData({state, commit, rootState}) {
    try {
      commit('SET_LOADING', true)
      const queryString = qs.stringify(state.query, {arrayFormat: 'repeat', encode: false})
      const response = await this.$axios.get('/categories?' + queryString, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      console.log(response);
      commit('SET_PAGINATION', {
        total: response.data.data.total, 
        current: parseInt(state.query.page), 
        pageSize: parseInt(state.query.limit)
      })
      commit('SET_LIST', response.data.data.data)
      commit('SET_LOADING', false)
    } catch (err) {
      commit('SET_LOADING', false)
      throw err
    }
	}, 

	async fetchListAll({ rootState, commit}) {
    try {
      const response = await this.$axios.get('/categories/all', {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
			})
			commit('SET_LIST_ALL', response.data.data)
    } catch (err) {
      throw err
    }
	}, 
	
	handleTableChange({ commit, dispatch }, { pagination, filters, sorter }) {
    try {
      commit('SET_QUERY', {page: pagination.current})
      dispatch('fetchListData');
    } catch (err) {
      throw err
    }
	},
	
	async delete({ rootState, dispatch }, slug) {
    try {
      const response = await this.$axios.delete(`/categories/${slug}`, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      dispatch('fetchListData');
    } catch (err) {
      throw err
    }
  },
  
  async edit({ rootState, dispatch }, {data, slug}) {
    try {
      const response  = await this.$axios.patch(`/categories/${slug}`, 
      data,
      {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      dispatch('fetchListData');
    } catch (err) {
      throw err
    }
  },
  
  async getOneCategory({ commit, rootState },id){
    try {
      const response  = await this.$axios.get(`/categories/getone/${id}`, 
      {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      commit('SET_ONE_CATEGORY', response.data.data)
    } catch (err) {
      throw err
    }
  }
}