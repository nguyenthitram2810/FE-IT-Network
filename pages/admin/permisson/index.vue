<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <a-tabs @change="getRole">
        <a-tab-pane v-for="e in listPermisson" :key="e.id" :tab="e.role">
        </a-tab-pane>
      </a-tabs>
    </a-layout-content>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: "adminAuth",
  data() {
    return {
      listPermisson: [],
      user: JSON.parse(localStorage.getItem('currentUser')),
    }
  }, 

  created() {
    this.$store.commit("admin/SET_BREADCRUMB", ["Permisson", "List"]);
    this.getListPermisson()
  }, 

  methods: {
    async getListPermisson() {
      try {
        const response = await this.$axios.get('permission/role/all', {
          headers: {
            Authorization: 'Bearer ' + this.user.token,
          }
        })
        this.listPermisson = response.data.data
      }
      catch(e) {
        if(e.response) {
          this.$notification["error"]({
            message: 'GET LIST PERMISSION ERROR',
            description:
              e.response.data.message
          });
        }
        else {
          this.$notification["error"]({
            message: 'GET LIST PERMISSION ERROR',
            description:
              e.message
          });
        }
      }
    }, 

    getRole(key) {
      console.log(key)
    },
  }
}
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>