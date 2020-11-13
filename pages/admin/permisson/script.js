import { mapState } from 'vuex'

export default {
    layout: "admin",

    middleware({store, query}) {
      store.commit('admin/permission/SET_QUERY', query)
    },

    data() {
      return {
        listRole: [],
        listPermission: [],
        user: JSON.parse(localStorage.getItem('currentUser')),
        params: {},
        rolePermisson: {}
      }
    }, 

    computed: {
      ...mapState({
        user: (state) => state.auth.currentUser,
        params: (state) => state.admin.permission.query, 
        listRole: (state) => state.admin.role.list, 
        data: (state) => state.admin.user.list, 
        loading: (state) => state.admin.user.loading, 
        pagination: (state) => state.admin.user.pagination, 
        loadingCreate: (state) => state.admin.user.loadingCreate
      }),
    },
  
    created() {
      this.$store.commit("admin/SET_BREADCRUMB", ["Permisson", "List"]);
      this.$router.push({name: this.$route.name, query: {...this.params} })
      this.getlistRole()
      this.getlistPermission()
    }, 
  
    methods: {
      async getlistRole() {
        try {
          const response = await this.$axios.get('permission/role/all', {
            headers: {
              Authorization: 'Bearer ' + this.user.token,
            }
          })
          this.listRole = response.data.data
        }
        catch(e) {
          if(e.response) {
            this.$notification["error"]({
              message: 'GET LIST ROLE ERROR',
              description:
                e.response.data.message
            });
          }
          else {
            this.$notification["error"]({
              message: 'GET LIST ROLE ERROR',
              description:
                e.message
            });
          }
        }
      }, 
  
      async getlistPermission() {
        try {
          const response = await this.$axios.get('permission/all', {
            headers: {
              Authorization: 'Bearer ' + this.user.token,
            }
          })
          this.listPermission = response.data.data
        }
        catch(e) {
          if(e.response) {
            this.$notification["error"]({
              message: 'ERROR',
              description:
                e.response.data.message
            });
          }
          else {
            this.$notification["error"]({
              message: 'ERROR',
              description:
                e.message
            });
          }
        }
      }, 
  
      getRole(key) {
        console.log(key)
      },
  
      onChange(e) {
  
      }
    }
  }