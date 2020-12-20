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

    PUSH_PERMISSION_ROLE(state, data) {
      state.permissionPosession.push(data)
    },

    SET_PERMISSION_ROLE(state, object) {
      let element = state.permissionPosession.find(e => e.id == object.id)
      if(element) {
        element.possession = object.possession
      }
    }, 
    
    REMOVE_PERMISSION_ROLE(state, object) {
      state.permissionPosession = state.permissionPosession.filter(e => e.id != object.id)
    }, 

    RESET_PERMISSION_ROLE(state) {
      state.permissionPosession = []
    }
  }