export default {
  SET_BREADCRUMB (state, breadcrumb) {
    console.log("test")
    state.breadcrumb = breadcrumb
  },

  SET_ACTIVE_MENU (state, activeMenu) {
    state.activeMenu = activeMenu
  },
}