export default {
    layout: "admin",
    data() {
      return {
        listRole: [],
        listPermission: [],
        user: JSON.parse(localStorage.getItem('currentUser')),
        params: {},
        rolePermisson: {}
      }
    }, 
  
    created() {
      this.getQueryParams()
      this.$store.commit("admin/SET_BREADCRUMB", ["Permisson", "List"]);
      this.getlistRole()
      this.getlistPermission()
    }, 
  
    methods: {
      getQueryParams() {
        const query = this.$route.query
        let queryParams = {...this.$route.query}
        if(!query.role) {
          queryParams.role = 'ADMIN'
        }
        
        this.params = {...queryParams}
        this.$router.push({name: this.$route.name, query: {...this.params} })
      }, 
  
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
              message: 'GET LIST PERMISSON ERROR',
              description:
                e.response.data.message
            });
          }
          else {
            this.$notification["error"]({
              message: 'GET LIST PERMISSON ERROR',
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