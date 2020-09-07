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
              <h3>Đăng ký với Career Network</h3>
              <p>Tìm kiếm cơ hội công việc</p>

              <div class="page-links">
                  <nuxt-link to="/login">Đăng nhập</nuxt-link>
                  <nuxt-link to="/register" class="active">Đăng ký</nuxt-link>
              </div>

              <a-form-model ref="registerForm" :model="registerForm" :rules="rules">
                <a-form-model-item class="form-validate">
                  <a-radio-group v-model="type" @change="changeType">
                    <a-radio value="employee">
                      Người xin việc
                    </a-radio>
                    <a-radio value="company">
                      Nhà tuyển dụng
                    </a-radio>
                  </a-radio-group>
                </a-form-model-item>

                <a-form-model-item  has-feedback prop="name" class="m-0 form-validate">
                  <a-input :disabled="isDisabled" v-model="registerForm.name" autocomplete="off" placeholder="Tên công ty"/>
                </a-form-model-item>

                <a-form-model-item class="m-0 form-validate" prop="city">
                  <a-select v-model="registerForm.city" placeholder="Thành phố" mode="multiple">
                    <a-select-option value="shanghai">
                      Zone one
                    </a-select-option>
                    <a-select-option value="beijing">
                      Zone two
                    </a-select-option>
                  </a-select>
                </a-form-model-item>

                <a-form-model-item has-feedback prop="email"  class="m-0 form-validate">
                  <a-input :disabled="isDisabled" v-model="registerForm.email" autocomplete="off" placeholder="Địa chỉ Email"/>
                </a-form-model-item>

                <a-form-model-item has-feedback prop="password" class="m-0 form-validate" >
                  <a-input :disabled="isDisabled" type="password" v-model="registerForm.password" autocomplete="off" placeholder="Mật khẩu"/>
                </a-form-model-item>
                <a-form-model-item has-feedback prop="confirmPass" class="m-0 form-validate" >
                  <a-input :disabled="isDisabled" type="password" v-model="registerForm.confirmPass" autocomplete="off" placeholder="Xác nhận mật khẩu"/>
                </a-form-model-item>

                <a-form-model-item  class="form-button mb-0 mt-2">
                  <a-button  :loading="isDisabled" class="ibtn" @click="registerSubmit">
                   Đăng ký
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

    let validateName = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Nhập tên công ty'));
      } else {
        callback();
      }
    };

    let validatePassConfirm = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Nhập xác nhận mật khẩu'));
      } else if (value !== (this.registerForm.password)) {
        callback(new Error("Mật khẩu xác nhận sai"));
      } else {
        callback();
      }
    };

    return {
      isDisabled: false,
      type: 'company',
      registerForm: {
        name: '',
        email: '',
        password: '',
        confirmPass: '',
        city: undefined,
      },
      rules: {
        name:  [{ required: true, validator: validateName }],
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

        confirmPass: [
          {
            required: true,
            validator: validatePassConfirm
          }
        ], 

        city: [
          {
            required: true, 
            message: "Chọn thành phố"
          }
        ]
      }
    }
  },
  methods: {
    async registerSubmit(event) {
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          this.isDisabled = true
          try {
          
          }
          catch(e) {
            this.isDisabled = false
            this.$notification["error"]({
              message: 'REGISTER ERROR',
              description:
                e.message
            });
          }
        } else {
          return false;
        }
      });
    },

    changeType(e) {
      if(e.target.value == "employee") {
        this.$router.push('/register')
      }
    }
  },
}
</script>

<style lang='scss' scoped>
@import url("./style.scss");
.ant-radio-wrapper {
  color: white;
  font-size: 15px;
}
</style>
