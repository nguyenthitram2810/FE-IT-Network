export default {
  layout: 'fullpage',
  middleware: 'adminNotAuth',
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
            //chỗ này đáng phải có status trả về là thành công hay lỗi nhưng hiện tại thấy k có status bọc kèm nếu lỗi hoặc thành công á
            //nên làm tiếp theo kiểu thành công
            if(response.data.data.roleId == 1 || response.data.data.roleId == 2) {
              localStorage.setItem('currentUser', JSON.stringify(response.data.data))
              this.$store.commit('auth/SET_CURRENT_USER', JSON.parse(localStorage.getItem('currentUser')))
              this.$router.push('/admin/user')
            }
            else {
                this.$notification["error"]({
                message: 'LOGIN ERROR',
                description:
                  "Bạn không có quyền vào trang quản lý!"
              });
            }
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