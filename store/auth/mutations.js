export default {
  SET_CURRENT_USER (state, currentUserData) {
    state.currentUser = currentUserData
  },

  SET_DISABLED(state, disabled) {
    state.isDisabled = disabled
  },
}