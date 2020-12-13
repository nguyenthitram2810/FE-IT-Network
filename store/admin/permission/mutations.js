export default {
    SET_LIST(state, data) {
      state.list = data
    },
  
    SET_LOADING(state, status) {
      state.loading = status
    },

    SET_QUERY(state, query) {
      state.query = { ...query}
    },
  }