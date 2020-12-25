import { mapState } from 'vuex'

export default {
  layout: 'profile',
  
  async fetch() {
    this.fetchData()
  },

  data() {
    return {
      editPhone: false,
      phone: ''
    }
  },

  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser,
      user: (state) => state.auth.user,
      loading: (state) => state.auth.loading,
    }),
  },

  methods: {
    handleError(err) {
      if(err.response) {
        this.$notification["error"]({
          message: 'ERROR',
          description:
            err.response.data.message
        });
      }
      else {
        this.$notification["error"]({
          message: 'ERROR',
          description:
            err.message
        });
      }
    },
    
    async fetchData() {
      try {
        await this.$store.dispatch('auth/getFullInfo')
      }
      catch(error) {
        this.handleError(error)
      }
    },

    editPhoneClick() {
      this.phone = this.user.profile.phone
      this.editPhone = true
    },

    addPhone() {
      this.editPhone = true
    },

    cancelPhone() {
      this.editPhone = false
      this.phone = ''
    }, 

    async submitPhone() {
      try {
        if(this.validatePhone(this.phone)) {
          const response = await this.$axios.patch('/auth/me/phone', {  phone: this.phone }, {
            headers: {
              Authorization: 'Bearer ' + this.currentUser.token,
            }
          })
          this.fetchData()
          this.editPhone = false
        }
        else {
          throw {
            message: "Phone number is invalid"
          }
        }
      } catch (error) {
        this.handleError(error)
      }
    }, 

    validatePhone(value) {
      let regexPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
      if(regexPhone.test(value)) return true
      else return false
    }
  }
}