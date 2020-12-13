import { mapState } from 'vuex'
import moment from 'moment'

export default {
  layout: "admin",

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
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
        },
        {
          title: 'Created At',
          dataIndex: 'createdat',
          key: 'createdat',
          scopedSlots: { customRender: 'createdat' },
        }, 
        {
          title: 'Updated At',
          dataIndex: 'updatedat',
          key: 'updatedat',
          scopedSlots: { customRender: 'updatedat' },
        },
        {
          title: 'Permission',
          key: 'permission',
          scopedSlots: { customRender: 'permission' },
          className: 'text-center',
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          className: 'text-center',
        }
      ],
    };
  }, 

  computed: {
    ...mapState({
      data: (state) => state.admin.role.list, 
      loading: (state) => state.admin.role.loading, 
    }),
  },

  created() {
    this.$store.commit("admin/SET_BREADCRUMB", ["Role", "List"]);
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
        await this.$store.dispatch('admin/role/fetchListData')
      }
      catch(error) {
        this.handleError(error)
      }
    }, 

    changeStringToTime(valueToChange){
      return moment(String(valueToChange)).format('MM/DD/YYYY hh:mm')
    },

    createRole() {
      this.$router.push({path: "/admin/role/create"})
    },

    confirmDelete(id) {
      
    }, 

    getPermission(record) {
      
    }
  }
}