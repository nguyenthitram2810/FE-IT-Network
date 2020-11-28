import { mapState } from 'vuex'

export default {
  layout: "admin",

  middleware({store, query}) {
    store.commit('admin/permission/SET_QUERY', {})
  },

  async fetch() {
    this.fetchData()
  },

  data() {
    return {
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Scope',
          dataIndex: 'scope',
          key: 'scope',
        },
        {
          title: 'Edit',
          key: 'edit',
          scopedSlots: { customRender: 'edit' },
          align: 'center'
        },

        {
          title: 'Delete',
          key: 'delete',
          scopedSlots: { customRender: 'delete' },
          align: 'center'
        },
      ], 

      visibleDrawerCreate: false,
      formCreate: {
        scope: '',
      },
      rules: {
        scope: [{ required: true, message: 'Please fill permission name', trigger: 'change'}],
      },
    }
  }, 
  computed: {
    ...mapState({
      data: (state) => state.admin.permission.list,
      loading: (state) => state.admin.permission.loading,
      params: (state) => state.admin.permission.query
    }),
  },

  created() {
    this.$store.commit("admin/SET_BREADCRUMB", ["Permission", "List"]);
    this.$router.push({name: this.$route.name, query: {...this.params} })
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

    confirmDelete(id) {
      
    }, 

    showModalEdit(id) {

    }, 

    showDrawerCreate() {
      this.visibleDrawerCreate = true;
    }, 

    onCloseCreate() {
      this.visibleDrawerCreate = false
      this.$refs.formCreate.resetFields();
    }, 

    createPermission() {
      this.$refs.formCreate.validate(async valid => {
        if(valid) {
          try {
            
          }
          catch(error) {
            this.handleError(error)
          }
        }
        else {
          return false
        }
      });
    }
  }
}