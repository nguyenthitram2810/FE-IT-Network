import { mapState } from 'vuex'
import moment from 'moment'

export default {
  layout: 'profile',
  
  async fetch() {
    this.fetchData()
  },

  data() {
    return {
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      loading: (state) => state.auth.loading,
      data: (state) => state.job.list
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
        console.log(this.user);
        this.$store.commit('job/SET_QUERY', { filter: `user.id||$eq||${this.user.id}`})
        await this.$store.dispatch('job/fetchListData')
      }
      catch(error) {
        this.handleError(error)
      }
    },

    changeStringToTime(valueToChange){
      return moment(String(valueToChange)).format('MM/DD/YYYY')
    },

    showDeleteConfirm(id) {
      try {
        this.$confirm({
          title: 'Are you sure delete this job?',
          content: 'Employee can not see this job if you delete it!',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          async onOk() {
            await this.$store.dispatch('job/delete', id)
            await this.$store.dispatch('job/fetchListData')
            this.$notification["success"]({
              message: 'SUCCESS',
              description:
              `Deleted successfully!`
            });
          },
          onCancel() {
            
          },
        });
      } catch (error) {
        this.handleError(error)
      }
    }
  }
}