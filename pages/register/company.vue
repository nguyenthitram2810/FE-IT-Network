<template>
  <div class="form-body height-bg-auth">
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

                <a-form-model-item has-feedback prop="email"  class="m-0 form-validate">
                  <a-input :disabled="isDisabled" v-model="registerForm.email" autocomplete="off" placeholder="Địa chỉ Email"/>
                </a-form-model-item>

                <a-form-model-item has-feedback prop="phone"  class="m-0 form-validate">
                  <a-input :disabled="isDisabled" v-model="registerForm.phone" autocomplete="off" placeholder="Điện thoại"/>
                </a-form-model-item>

                <a-form-model-item has-feedback prop="city" class="m-0 form-validate">
                  <a-select mode="multiple" size="large" class="city-select" :disabled="isDisabled" v-model="registerForm.city" placeholder="Thành phố">
                    <a-select-option v-for="(el, index) in listCity" :key="index" :value="`${el.province_id}`">
                      {{ el.province_name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>

                <a-form-model-item has-feedback prop="website"  class="m-0 form-validate">
                  <a-input :disabled="isDisabled" v-model="registerForm.website" autocomplete="off" placeholder="Website"/>
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
  middleware: 'notAuth',
  data() {
    let validateName = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Nhập tên người dùng'));
      } else {
        callback();
      }
    };

    return {
      isDisabled: false,
      type: 'company',
      listCity: [],
      registerForm: {
        name: '',
        email: '',
        phone: '',
        city: [],
        website: undefined,
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
            message: 'Nhập địa chỉ email công ty',
          },
        ],
        phone: [{
          required: true, message: 'Nhập số điện thoại công ty'
        }],
        city: [{
          required: true, message: 'Chọn thành phố trụ sở công ty'
        }]
      }
    }
  },
  created() {
    this.getListCity();
  },
  methods: {
    async getListCity() {
      try {
        const response = await this.$axios.get('https://vapi.vnappmob.com/api/province');
        this.listCity = response.data.results
      }
      catch(e) {
        if(e.response) {
          this.$notification["error"]({
            message: 'GET CITY ERROR',
            description:
              e.response.data.message
          });
        }
        else {
          this.$notification["error"]({
            message: 'GET CITY ERROR',
            description:
              e.message
          });
        }
      }
    },

    async registerSubmit(event) {
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          this.isDisabled = true
          try {
            if(this.registerForm.city == undefined) {
              delete this.registerForm.city
            }
            console.log(this.registerForm)
            const response = await this.$axios.post('/auth/newlead', this.registerForm)
            console.log(response)
            this.$notification["success"]({
              message: 'REGISTER',
              description:
                "Tài khoản sẽ được tiến hành xác nhận và phản hồi sớm đến quý công ty"
            });
            this.$router.push("/")
          }
          catch(e) {
            this.isDisabled = false
            if(e.response) {
              this.$notification["error"]({
                message: 'REGISTER ERROR',
                description:
                  e.response.data.message
              });
            }
            else {
              this.$notification["error"]({
                message: 'REGISTER ERROR',
                description:
                  e.message
              });
            }
          }
        } else {
          return false;
        }
      });
    },

    changeType(e) {
      if(e.target.value == "company") {
        this.$router.push("/register/company");
      }
      if(e.target.value == "employee") {
        this.$router.push("/register");
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
