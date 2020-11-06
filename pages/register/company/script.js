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