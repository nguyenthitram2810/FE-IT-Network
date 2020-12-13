import { mapState } from 'vuex'

export default {
  layout: "admin",

  async fetch() {
    this.fetchData()
  },

  data() {
    return {
      name: '',
    };
  }, 

  created() {
    this.$store.commit("admin/SET_BREADCRUMB", ["Role", "Create"]);
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.currentUser,
      data: (state) => state.admin.permission.list, 
      loading: (state) => state.admin.permission.loading, 
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
        await this.$store.dispatch('admin/permission/fetchListData')
      }
      catch(error) {
        this.handleError(error)
      }
    },

    create() {
      
    }
  }
}