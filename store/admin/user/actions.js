import qs from "qs"

export default {
  async fetchListData({state, commit, rootState}) {
    try {
      commit('SET_LOADING', true)
      const queryString = qs.stringify(state.query, {arrayFormat: 'repeat', encode: false})
      const response = await this.$axios.get('/users?' + queryString, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      commit('SET_PAGINATION', {
        total: response.data.data.total, 
        current: response.data.data.page, 
        pageSize: parseInt(state.query.limit)
      })
      commit('SET_LIST', response.data.data.data)
      commit('SET_LOADING', false)
    } catch (err) {
      commit('SET_LOADING', false)
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

  async editRole({commit, rootState, dispatch }, {id, value}) {
    try {
      commit('SET_LOADING', true)
      const response = await this.$axios.put(`/users/${id}`,{ 
        roleId: value
        }, 
        {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      commit('SET_QUERY', {page: 1})
      dispatch('fetchListData');
    } catch (err) {
      commit('SET_LOADING', false)
      throw err
    }
  },

  async create({commit, rootState, dispatch }, data) {
    console.log(data);
    try {
      commit('SET_LOADING_CREATE', true)
      const response = await this.$axios.post('/users', {
        roleId: parseInt(data.roleId),
        email: data.email, 
        password: data.password,
      }, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      commit('SET_QUERY', {page: 1})
      dispatch('fetchListData');
      commit('SET_LOADING_CREATE', false)
    } catch (err) {
      commit('SET_LOADING_CREATE', false)
      throw err
    }
  },

  async delete({ rootState, dispatch }, id) {
    try {
      const response = await this.$axios.delete(`/users/${id}`, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      dispatch('fetchListData');
    } catch (err) {
      throw err
    }
  },

  async identify({state, commit, rootState, dispatch }, id) {
    try {
      const response = await this.$axios.put(`/users/identify/${id}`, {id}, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      dispatch('fetchListData');
    } catch (err) {
      throw err
    }
  },
}