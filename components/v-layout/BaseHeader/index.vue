/* eslint-disable vue/html-self-closing */
<template>
  <header class="d-flex justify-content-between align-items-center py-1 px-2 edit-header">

    <div class="d-flex align-items-center">
      <img src="/images/logo_career_network2.png" class="logo" alt="">
      <span class="brand-title ml-3 mx-3 al-text-color">Career Network</span>

      <a-divider type="vertical" style="height: 2rem"/>

      <div class="mx-3">
        <a-input-search placeholder="Search" style="width: 300px" @search="onSearch" />
      </div>
    </div> <!-- logo trang chủ và thanh tìm kiếm -->

    <div v-if="isLogin" class="d-flex justify-content-between align-items-center mr-3">
      <div class="al-text-color mr-1">
        <h4>Cô Bé Bán Diêm</h4>
      </div>
      <a-divider type="vertical" style="height: 2rem"/>
      <a-dropdown>
        <a-menu slot="overlay">
          <a-menu-item key="2"> <a-icon type="user" />Trang cá nhân</a-menu-item>
          <a-menu-item key="1" @click="logOut"> <a-icon type="logout" />Đăng xuất </a-menu-item>
        </a-menu>
          <div>
            <a-avatar style="border: 1.5px solid purple;" size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <a-icon type="down" />
          </div>
      </a-dropdown>    
    </div>
    
    <div v-else class="d-flex justify-content-between align-items-center">
      <div>
        <i class="fas fa-sign-in-alt mx-1" style="color: #513F83;"></i>
        <nuxt-link to="/login"  class="al-text-color">Đăng nhập</nuxt-link>
      </div>

      <a-divider type="vertical" style="height: 2rem"/>

      <div>
        <nuxt-link to="/register"  class="al-text-color">Đăng ký</nuxt-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
@import url("./style.scss");
</style>

<script>
export default {
  name: 'BaseHeader',
  data() {
    return {
      isLogin: false,
    }
  },
  created() {
    if(localStorage.getItem("currentUser")) {
      this.isLogin = true
    }
  },
  watch: {
    '$store.state.auth.currentUser' : function(value) {
      if(value == null) {
        this.isLogin = false
        this.$router.push(this.$route.query.redirect || '/');
      }
    },
  },
  methods: {
    logOut () {
      localStorage.removeItem("currentUser")
      this.$store.commit('auth/SET_CURRENT_USER', null )
    },
    onSearch(value) {
      //Tìm kiếm nội dung trong này
      console.log(value);
    },
  }
}
</script>
