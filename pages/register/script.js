import { mapActions, mapState } from 'vuex'

export default {
    layout: 'fullpage',
    middleware: 'notAuth',
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
          callback(new Error('Nhập tên người dùng'));
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
        type: 'employee',
        registerForm: {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
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
            }
          ],
  
          confirmPassword: [
            {
              required: true,
              validator: validatePassConfirm
            }
          ], 
        }
      }
    },

    computed: {
      ...mapState ({
        isDisabled: (state) => state.auth.isDisabled,
      }),
    },

    methods: {
      ...mapActions('auth', ['register']),

      async registerSubmit(event) {
        this.$refs.registerForm.validate(async valid => {
          if (valid) {
            try {
              await this.register(this.registerForm)
              this.$router.push('/')
            }
            catch(e) {
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