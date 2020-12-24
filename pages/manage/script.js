import { mapState } from 'vuex'

export default {
  layout: 'manage',

  async fetch() {
    this.fetchData()
  },

  data() {
    return {
      application: [],
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      loading: (state) => state.auth.loading,
      data: (state) => state.application.list,
      listJob: (state) => state.job.list,
      allApplication: (state) => state.application.list
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
        await this.$store.dispatch('application/fetchListData')
        this.mappingData();
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

    async changeJob(value) {
      try {
        if(value == "all") await this.$store.dispatch('application/fetchListData')
        else await this.$store.dispatch('application/fetchByJob', { id: parent(value)})
      } catch (error) {
        this.handleError(error)
      }
    }, 

    mappingData() {
      this.allApplication.forEach(e => {
        if(e.appliedBy.length > 0) {
          application.add(e.appliedBy);
        }
      });
    }
  }
}