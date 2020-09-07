export const state = () => ({
    currentUser: null
})
    
export const mutations = {
  SET_CURRENT_USER (state, currentUserData) {
    state.currentUser = currentUserData
  },
}

export const actions = {
  setCurrent({ commit }, { currentUser }) {
    try {
      commit('SET_CURRENT_USER', currentUser)
    }
    catch(e) {
      throw e
    }
  }
}
  