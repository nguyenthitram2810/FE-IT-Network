import EditableCell from '@/components/table/EditableCell';
import {mapState} from 'vuex'
export default {
  components: {
    EditableCell,
  },
  layout: "admin",
  // middleware({store, query}) {
  //   if (Object.keys(query).length > 0) {
  //     store.commit('admin/user/SET_QUERY', query)
  //   }
  // },
  // async fetch({store}) {
  //   await store.dispatch('admin/user/fetchData')
  // },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Nhập mật khẩu'));
      } else {
        callback();
      }
    };

    let validatePassConfirm = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Nhập xác nhận mật khẩu'));
      } else if (value !== (this.formCreate.password)) {
        callback(new Error("Mật khẩu xác nhận sai"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      columns: [
          {
            title: 'Name',
            key: 'name',
            sorter: true,
            scopedSlots: { customRender: 'name' },
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: true,
          },
          {
            title: 'Role',
            key: 'role',
            scopedSlots: { customRender: 'role' },
          },
          {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            scopedSlots: { customRender: 'active' },
          },
          {
            title: 'Profile',
            key: 'profile',
            scopedSlots: { customRender: 'profile' },
          },
          {
            title: 'Action',
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
      ],
      data: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
      }, 
      params: {},
      profile: {},
      visible: false, 
      visibleDrawerCreate: false,
      listRole: [],
      formCreate: {
        email: '',
        password: '',
        confirmPassword: '',
        roleId: undefined,
      },
      loadingCreate: false,
      rules: {
        roleId: [{ required: true, message: 'Chọn vai trò của người dùng', trigger: 'change'}],
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

        confirmPassword: [
          {
            required: true,
            validator: validatePassConfirm
          }
        ], 
      },
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.currentUser,
      // users: (state) => state.admin.user.data
    }),
  },
  created() {
    this.getQueryParams()
    this.$store.commit("admin/SET_BREADCRUMB", ["User", "List"]);
    this.getListUser()
    this.getlistRole()
  },
  methods: {
    getQueryParams() {
      const query = this.$route.query
      let queryParams = {...this.$route.query}
      if(!query.page) {
        queryParams.page = 1
      }
      if(!query.limit) {
        queryParams.limit = 10
      }
      console.log(query)
      if(!query.sort) {
        queryParams.sort = "updatedat,DESC"
      }
      this.params = {...queryParams}
      this.$router.push({name: this.$route.name, query: {...this.params} })
    }, 

    async getlistRole() {
      try {
        const response = await this.$axios.get('permission/role/all', {
          headers: {
            Authorization: 'Bearer ' + this.user.token,
          }
        })
        this.listRole = response.data.data
      }
      catch(e) {
        if(e.response) {
          this.$notification["error"]({
            message: 'GET LIST ROLE ERROR',
            description:
              e.response.data.message
          });
        }
        else {
          this.$notification["error"]({
            message: 'GET LIST ROLE ERROR',
            description:
              e.message
          });
        }
      }
    },

    async getListUser() {
      try {
        this.loading = true
        const response = await this.$axios.get('/users', {
          params: this.params,
          headers: {
            Authorization: 'Bearer ' + this.user.token,
          }
        })
        this.data = response.data.data.data
        this.loading = false
        this.pagination.total = response.data.data.total
        this.pagination.current = response.data.data.page
        this.pagination.pageSize = parseInt(this.params.limit)
      }
      catch(e) {
        this.loading = false
        if(e.response) {
          this.$notification["error"]({
            message: 'GET USERS ERROR',
            description:
              e.response.data.message
          });
        }
        else {
          this.$notification["error"]({
            message: 'GET USERS ERROR',
            description:
              e.message
          });
        }
      }
    }, 

    handleTableChange(pagination, filters, sorter) {
      console.log(sorter)
      let temp = {...this.params, page: pagination.current}
      this.params = {...temp}
      this.$router.push({name: this.$route.name, query: {...this.params} })
      this.getListUser()
    },

    viewProfile(record) {
      this.profile = record.profile
      this.visible = true;
    }, 

    handleCancel(e) {
      this.visible = false;
    },

    async confirmDelete(id) {
      try {
        const response = await this.$axios.delete(`/users/${id}`, {
          headers: {
            Authorization: 'Bearer ' + this.user.token,
          }
        })
        console.log(response)
        this.getListUser()
        this.$notification["success"]({
          message: 'DELETE USER SUCCESS',
          description:
          `Đã xóa thành công!`
        });
      } catch (e) {
        if(e.response) {
          this.$notification["error"]({
            message: 'DELETE USER ERROR',
            description:
              e.response.data.message
          });
        }
        else {
          this.$notification["error"]({
            message: 'DELETE USER ERROR',
            description:
              e.message
          });
        }
      }
    }, 

    showDrawerCreate() {
      this.visibleDrawerCreate = true;
    }, 

    onCloseCreate() {
      this.visibleDrawerCreate = false;
    },

    confirmContributor(id) {
      console.log(id)
    }, 

    async createUser() {
      try {
        delete this.formCreate.confirmPassword
        console.log(this.formCreate)
        this.loadingCreate = true
        const response = await this.$axios.post('/users', {
          roleId: parseInt(this.formCreate.roleId),
          email: this.formCreate.email, 
          password: this.formCreate.password,
        }, {
          headers: {
            Authorization: 'Bearer ' + this.user.token,
          }
        })
        console.log(response)
        this.params.page = 1
        this.getListUser()
        this.loadingCreate = false
        this.visibleDrawerCreate = false;
      }
      catch(e) {
        this.loadingCreate = false
        if(e.response) {
          this.$notification["error"]({
            message: 'CREATE USERS ERROR',
            description:
              e.response.data.message
          });
        }
        else {
          this.$notification["error"]({
            message: 'CREATE USERS ERROR',
            description:
              e.message
          });
        }
      }
    }, 

    async changeRole(object, value) {
      try {
        this.loading = true
        const response = await this.$axios.put(`/users/${object.id}`,{ 
          roleId: value
          }, 
          {
          headers: {
            Authorization: 'Bearer ' + this.user.token,
          }
        })
        console.log(response)
        this.params.page = 1
        this.getListUser()
      }
      catch(e) {
        this.loading = false
        if(e.response) {
          this.$notification["error"]({
            message: 'CHANGE ROLE USER ERROR',
            description:
              e.response.data.message
          });
        }
        else {
          this.$notification["error"]({
            message: 'CHANGE ROLE USER ERROR',
            description:
              e.message
          });
        }
      }
    },

    onSearch(value) {
      if(value != '') {
        this.params.filter = `profile.name||$contL||${value}`
        this.params.or = `email||$contL||${value}`
      }
      else {
        delete this.params.filter
        delete this.params.or
      }
      this.$router.push({name: this.$route.name, query: {...this.params} })
      this.getListUser()
    }, 
  }
};