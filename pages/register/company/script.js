import {mapActions, mapState} from 'vuex'

export default {
    layout: 'fullpage',
    middleware: 'notAuth',
    
    async fetch({store}) {
      try {
        await store.dispatch('city/getCity')
      }
      catch(err) {
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

    data() {
      let validateName = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error('Nhập tên người dùng'));
        } else {
          callback();
        }
      };
  
      return {
        type: 'company',
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

    computed: {
      ...mapState ({
        listCity: (state) => state.city.listCity,
        isDisabled: (state) => state.auth.isDisabled,
      }),
    },

    methods: {
      ...mapActions('auth', ['registerCompany']),

      registerSubmit(event) {
        this.$refs.registerForm.validate(async valid => {
          if (valid) {
            try {
              if(this.registerForm.city == undefined) {
                delete this.registerForm.city
              }
              await this.registerCompany(this.registerForm)
              this.$notification["success"]({
                message: 'REGISTER',
                description:
                  "Tài khoản sẽ được tiến hành xác nhận và phản hồi sớm đến quý công ty"
              });
              this.$router.push("/")
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