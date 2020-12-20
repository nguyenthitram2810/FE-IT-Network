import { mapState } from 'vuex'
import moment from 'moment'

export default {
  layout: "admin",

  async fetch() {
    this.fetchData()
  },

  data() {
    const treeData = [
      {
        title: 'parent 1',
        key: '0-0',
        slots: {
          icon: 'smile',
        },
        children: [
          { title: 'leaf', key: '0-0-0', slots: { icon: 'meh' } },
          { title: 'leaf', key: '0-0-1', scopedSlots: { icon: 'custom' } },
        ],
      },
    ]

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
      modalVisible: false,
      permissionRole: [],
      treeData,
    };
  }, 

  computed: {
    ...mapState({
      user: (state) => state.auth.currentUser,
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

    async getPermission(record) {
      try {
        const response = await this.$axios.get(`/permission/${record.role}`, {
          headers: {
            Authorization: 'Bearer ' + this.user.token,
          }
        })
        console.log(response.data.data);
        this.modalVisible = true;
      } catch (error) {
        this.handleError(error)
      }
    },

    handleCancelModal() {
      this.modalVisible = false;
    }
  }
}