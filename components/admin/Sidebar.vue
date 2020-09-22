<template>
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo d-flex align-items-center">
        <img src="/images/logo_career_network2.png" :width="getWidthLogo" alt="" height="100%">
        <div v-if="showNameCompany" class="pl-3 font--bold color-white font---text text-spacing">CAREER NETWORK</div>
      </div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys= [getSelectedKey] @click="handleClick">
        <a-menu-item key="/admin/user">
          <a-icon type="user" /> 
          <span>User</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
</template>

<script>
import collapse from 'ant-design-vue/lib/collapse'
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
      this.$router.push({path: e.key, query: { page: 1, amount: 10}})
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