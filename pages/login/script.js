import { mapState, mapActions } from 'vuex'

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
      return {
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
      ...mapActions('auth', ['login']),

      async loginSubmit(event) {
        this.$refs.loginForm.validate(async valid => {
          if (valid) {
            try {
              await this.login(this.loginForm)
              this.$router.push('/')
            }
            catch(e) {
              if(e.response) {
                this.$notification["error"]({
                  message: 'LOGIN ERROR',
                  description:
                    e.response.data.message
                });
              }
              else {
                this.$notification["error"]({
                  message: 'LOGIN ERROR',
                  description:
                    e.message
                });
              }
            }
          } else {
            return false;
          }
        });
      }
    },
  }