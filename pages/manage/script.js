import { mapState } from 'vuex'

export default {
  layout: 'manage',

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
      data: (state) => state.application.list,
      listJob: (state) => state.job.list
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
        await this.$store.dispatch('application/fetchListData')
        this.$store.commit('job/SET_QUERY', { filter: `user.id||$eq||${this.user.id}`})
        await this.$store.dispatch('job/fetchListData')
      }
      catch(error) {
        this.handleError(error)
      }
    },

    acceptApplication() {
      try {
        this.$confirm({
          title: 'Do you want to accept this application?',
          onOk() {
            this.$notification["success"]({
              message: 'SUCCESS',
              description:
              `Accepted successfully!`
            });
          },
          onCancel() {
          },
        });
      } catch (error) {
        this.handleError(error)
      }
    },

    rejectApplication() {
      try {
        this.$confirm({
          title: 'Are you sure reject this application?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          async onOk() {
            this.$notification["success"]({
              message: 'SUCCESS',
              description:
              `Rejected successfully!`
            });
          },
          onCancel() {
            
          },
        });
      } catch (error) {
        this.handleError(error)
      }
    },

    changeJob(value) {
      try {
        console.log(value);
      } catch (error) {
        this.handleError(error)
      }
    }
  }
}