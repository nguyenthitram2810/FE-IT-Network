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
                <a-form-model-item has-feedback prop="username"  class="m-0 form-validate">
                  <a-input :disabled="isDisabled" v-model="loginForm.username" autocomplete="off" placeholder="Địa chỉ Email"/>
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
const Cookie = process.client ? require('js-cookie') : undefined

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
        username: '',
        password: '',
      },
      rules: {
        username:  [
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
          // Khi rules đúng hết => dispatch store để gọi API và xử lý
          // Store sẽ mất dữ liệu khi F5 -> cần cập nhật lại dữ liệu cho store ở middleware
          // Store lưu một vài thông tin cần thiết
          // Store k dùng localStorage => Store. thay đổi state trong store
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
