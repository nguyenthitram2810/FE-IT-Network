<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <a-tabs @change="getRole">
        <a-tab-pane v-for="e in listRole" :key="e.role" :tab="e.role">
        </a-tab-pane>
      </a-tabs>
      <a-row class="mt-3">
        <a-col style="border-bottom: 0.1px solid gray;" class="mb-3" :span="12" v-for="(e, index) in listPermission" :key="index">
          <div class="d-flex flex-column">
            <a-row class="mb-3">
              <a-col :span="8"> <span> {{ e.scope }}:</span></a-col>
              <a-col :span="8"> <a-switch @change="onChange(e)" /></a-col>
            </a-row>
            
            <a-row class="mb-3">
              <a-col :span="8"> <span>Possession: </span></a-col>
              <a-col :span="8"> 
                <a-select class="mb-3" default-value="lucy" style="width: 120px" @change="handleChange">
                  <a-select-option value="jack">
                    ANY
                  </a-select-option>
                  <a-select-option value="lucy">
                    OWNER
                  </a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
    </a-layout-content>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: "adminAuth",
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
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>