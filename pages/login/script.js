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
              const response = await this.$axios.post('/auth', this.loginForm)
              console.log(response)
              localStorage.setItem('currentUser', JSON.stringify(response.data.data))
              this.$store.commit('auth/SET_CURRENT_USER', JSON.parse(localStorage.getItem('currentUser')))
              this.$router.push('/')
            }
            catch(e) {
              this.isDisabled = false
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