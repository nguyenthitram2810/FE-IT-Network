export default {
    async fetchData({state, commit, rootState}) {
        const queryString = qs.stringify(state.query)
        const response = await this.$axios.get('/users?' + queryString, {
            headers: {
              Authorization: 'Bearer ' + rootState.auth.currentUser.token,
            }
        })
        commit('SET_TOTAL', response.data.total)
        commit('SET_DATA', response.data.data)
    }
}