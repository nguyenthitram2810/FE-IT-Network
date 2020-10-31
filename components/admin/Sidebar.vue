<template>
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo d-flex align-items-center">
        <img src="/images/logo_career_network2.png" :width="getWidthLogo" alt="" height="100%">
        <div v-if="showNameCompany" class="pl-3 font--bold color-white font---text text-spacing">CAREER NETWORK</div>
      </div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys= [getSelectedKey] @click="handleClick" >
        
        
        <a-sub-menu key="user">
          <span slot="title"><a-icon type="user" /> <span>User</span></span>
          <a-menu-item key="/admin/user">
            <span>List User</span>
          </a-menu-item>

          <a-menu-item key="/admin/user/request">
            <span>Company Request</span>
          </a-menu-item>

          <a-menu-item key="/admin/user/deleted">
            <span>Deleted User</span>
          </a-menu-item>
        </a-sub-menu>

        <a-menu-item key="/admin/category">
          <a-icon type="appstore" />
          <span>Category</span>
        </a-menu-item>

        <a-menu-item key="/admin/permisson">
          <a-icon type="key" />
          <span>Permisson</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
</template>

<script>
export default {
  props: ["collapsed"],
  computed: {
    getSelectedKey() {
      return this.$route.path
    },

    showNameCompany() {
      if(this.collapsed) {
        return false;
      }
      else{
        return true;
      }
    }, 
    getWidthLogo() {
      if(this.collapsed) {
        return "100%";
      }
      else{
        return "";
      }
    }
  },
  methods: {
    handleClick(e) {
      this.$router.push({path: e.key, query: { page: 1, limit: 10}})
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  height: 64.25px;
  padding: 16px;
}
</style>