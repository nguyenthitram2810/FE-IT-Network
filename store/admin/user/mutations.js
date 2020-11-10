export default {
  SET_LIST(state, data) {
    state.list = data
  },

  SET_LOADING(state, status) {
    state.loading = status
  },

  SET_LOADING_CREATE(state, status) {
    state.loadingCreate = status
  },

  SET_PAGINATION(state, data) {
    state.pagination = { ...state.pagination, ...data}
  },

  SET_QUERY(state, query) {
    state.query = { ...state.query, ...query }
  },
}