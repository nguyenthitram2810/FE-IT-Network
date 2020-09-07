<template>
  <div class="form-body">
      <div class="website-logo">
        <nuxt-link to="/">
          <div class="logo">
            <img class="logo-size" src="/images/logo_career_network.png" alt="">
          </div>
        </nuxt-link>
      </div>

      <div class="row">
        <div class="img-holder">
            <div class="bg"></div>
        </div>

        <div class="form-holder">
          <div class="form-content">
            <div class="form-items">
              <h3>Đăng nhập với Career Network</h3>
              <p>Tìm kiếm cơ hội công việc</p>

              <div class="page-links">
                  <nuxt-link to="/login" class="active">Đăng nhập</nuxt-link>
                  <nuxt-link to="/register">Đăng ký</nuxt-link>
              </div>

              <a-form-model ref="loginForm" :model="loginForm" :rules="rules">
                <a-form-model-item has-feedback prop="email"  class="m-0 form-validate">
                  <a-input :disabled="isDisabled" v-model="loginForm.email" autocomplete="off" placeholder="Địa chỉ Email"/>
                </a-form-model-item>

                <a-form-model-item has-feedback prop="password" class="m-0 form-validate" >
                  <a-input :disabled="isDisabled" type="password" v-model="loginForm.password" autocomplete="off" placeholder="Mật khẩu"/>
                </a-form-model-item>

                <a-form-model-item  class="form-button mb-0 mt-2">
                  <a-button  :loading="isDisabled" class="ibtn" @click="loginSubmit">
                   Đăng nhập
                  </a-button>
                </a-form-model-item>
              </a-form-model>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  layout: 'fullpage',
  data() {
    let validatePass = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Nhập mật khẩu'));
      } else {
        callback();
      }
    };
    return {
      isDisabled: false,
      error: '',
      loginForm: {
        email: '',
        password: '',
      },
      rules: {
        email:  [
          {
            type: 'email',
            message: 'Email không hợp lệ',
          },
          {
            required: true,
            message: 'Nhập địa chỉ email',
          },
        ],
        password: [
          { 
            required: true,
            validator: validatePass, 
          },
          {
            min: 6,
            message: 'Độ dài mật khẩu > 6 ký tự(không kể ký tự trắng)'
          }
        ],
      }
    }
  },
  methods: {
    async loginSubmit(event) {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.isDisabled = true
          try {
            
            
          }
          catch(e) {
            this.isDisabled = false
            this.$notification["error"]({
              message: 'LOGIN ERROR',
              description:
                e.message
            });
          }
        } else {
          return false;
        }
      });
    }
  },
}
</script>

<style lang='scss' scoped>
@import url("./style.scss");

</style>
