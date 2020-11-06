export default {
    SET_DATA(state, data) {
        state.data = data
    },
    SET_TOTAL(state, total) {
        state.total = total
    },
    SET_QUERY(state, query) {
        state.query = {...state.query, ...query}
    },
}