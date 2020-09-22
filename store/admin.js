export const state = () => ({
  breadcrumb: [], 
  activeMenu: null, 
})
    
export const mutations = {
  SET_BREADCRUMB (state, breadcrumb) {
    state.breadcrumb = breadcrumb
  },

  SET_ACTIVE_MENU (state, activeMenu) {
    state.activeMenu = activeMenu
  },
}

export const actions = {
}
  