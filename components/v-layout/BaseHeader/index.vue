/* eslint-disable vue/html-self-closing */
<template>
  <header class="d-flex justify-content-between align-items-center my-1 mx-2 edit-header">

    <div class="d-flex align-items-center">
      <img src="/images/logo_career_network2.png" class="logo" alt="">
      <span class="brand-title ml-3 mx-3 al-text-color">Career Network</span>

      <a-divider type="vertical" style="height: 2rem"/>

      <div class="mx-3">
        <a-input-search placeholder="Search" style="width: 300px" @search="onSearch" />
      </div>
    </div> <!-- logo trang chủ và thanh tìm kiếm -->

    <div class="d-flex justify-content-between align-items-center mr-3">
      <div class="al-text-color mr-1">
        <h4>Cô Bé Bán Diêm</h4>
      </div>
      <a-divider type="vertical" style="height: 2rem"/>
      <a-dropdown>
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="2"> <a-icon type="user" />Trang cá nhân</a-menu-item>
          <a-menu-item key="1"> <a-icon type="logout" />Đăng xuất </a-menu-item>
        </a-menu>
          <div>
            <a-avatar style="border: 1.5px solid purple;" size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <a-icon type="down" />
          </div>
      </a-dropdown>    
    </div>
    
    <!-- <div class="d-flex justify-content-between align-items-center">
      <div>
        <i class="fas fa-sign-in-alt mx-1" style="color: #513F83;"></i>
        <nuxt-link to="/login"  class="al-text-color">Đăng nhập</nuxt-link>
      </div>

      <a-divider type="vertical" style="height: 2rem"/>

      <div>
        <nuxt-link to="/register"  class="al-text-color">Đăng ký</nuxt-link>
      </div>
    </div>button đăng nhập và đăng ký -->

  </header>
</template>

<style scoped>
@import url("./style.scss");
</style>

<script>
export default {
  name: 'BaseHeader',
  props: {},

  methods: {
    loggOut () {
      this.$store.dispatch('auth/signOut', {vue: this})
    },
    onSearch(value) {
      //Tìm kiếm nội dung trong này
      console.log(value);
    },
  }
}
</script>
