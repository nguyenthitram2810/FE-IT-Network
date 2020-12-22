import qs from "qs"

export default {
  async fetchListData({state, commit, rootState}) {
    try {
      commit('auth/SET_LOADING', true, { root: true })
      const queryString = qs.stringify(state.query, {arrayFormat: 'repeat', encode: false})
      const response = await this.$axios.get(`/jobs?${queryString}`)
      commit('SET_LIST', response.data.data)
      commit('auth/SET_LOADING', false, { root: true })
    } catch (err) {
      commit('auth/SET_LOADING', false, { root: true })
      throw err
    }
  }, 

  async create({state, commit, rootState}, data) {
    try {
      if(data.experience == null || data.experience == '') delete data.experience
      else data.experience = parseInt(data.experience)
      data.city = parseInt(data.city)
      data.lowestWage = String(data.lowestWage)
      data.highestWage = String(data.highestWage)
      console.log(data);
      const response = await this.$axios.post(`/jobs`, data, {
        headers: {
          Authorization: 'Bearer ' + rootState.auth.currentUser.token,
        }
      })
      console.log(response);
    } catch (err) {
      throw err
    }
  }, 
}