import EditableCell from '@/components/table/EditableCell';
import { mapState } from 'vuex'
export default {
  components: {
    EditableCell,
  },
  layout: "admin",

  middleware({store, query}) {
    store.commit('admin/user/SET_URL', '/users?')
    store.commit('admin/user/SET_QUERY', query)
  },

  async fetch() {
    this.fetchData()
  },

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
      profile: {},
      visible: false, 
      visibleDrawerCreate: false,
      formCreate: {
        email: '',
        password: '',
        confirmPassword: '',
        roleId: undefined,
      },
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
      params: (state) => state.admin.user.query, 
      listRole: (state) => state.admin.role.list, 
      data: (state) => state.admin.user.list, 
      loading: (state) => state.admin.user.loading, 
      pagination: (state) => state.admin.user.pagination, 
      loadingCreate: (state) => state.admin.user.loadingCreate
    }),
  },

  created() {
    this.$store.commit("admin/SET_BREADCRUMB", ["User", "List"]);
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
        await this.$store.dispatch('admin/user/fetchListData')
        await this.$store.dispatch('admin/role/fetchListData')
      }
      catch(error) {
        this.handleError(error)
      }
    },

    async handleTableChange(pagination, filters, sorter) {
      try {
        await this.$store.dispatch('admin/user/handleTableChange', { pagination, filters, sorter })
        this.$router.push({name: this.$route.name, query: {...this.params} })
      } catch (error) {
        this.handleError(error)
      }
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
        await this.$store.dispatch('admin/user/delete', id)
        this.$notification["success"]({
          message: 'SUCCESS',
          description:
          `Đã xóa thành công!`
        });
      } catch (error) {
        this.handleError(error)
      }
    }, 

    showDrawerCreate() {
      this.visibleDrawerCreate = true;
    }, 

    onCloseCreate() {
      this.visibleDrawerCreate = false;
    },

    async confirmContributor(id) {
      try {
        await this.$store.dispatch('admin/user/identify', id)
      } catch (error) {
        this.handleError(error)
      }
    }, 

    async createUser() {
      this.$refs.formCreate.validate(async valid => {
        if(valid) {
          try {
            if(this.formCreate.confirmPassword != undefined) {
              delete this.formCreate.confirmPassword
              await this.$store.dispatch('admin/user/create', this.formCreate)
              this.visibleDrawerCreate = false;
            }
            else {
              throw {
                message: "You must confirm password!"
              }
            }
          }
          catch(error) {
            this.loadingCreate = false
            this.handleError(error)
          }
        }
        else {
          return false
        }
      });
    }, 

    async changeRole(object, value) {
      try {
        if(object.roleId != value) {
          await this.$store.dispatch('admin/user/editRole', {id: object.id, value})
          this.$router.push({name: this.$route.name, query: {...this.params} })
        }
      }
      catch(error) {
        this.handleError(error)
      }
    },

    async onSearch(value) {
      try {
        let query = {...this.params}
        if(value != '') {
          query.filter = `profile.name||$contL||${value}`
          query.or = `email||$contL||${value}`
        }
        else {
          query.filter = undefined
          query.or = undefined
        }
        query.page = 1
        this.$store.commit('admin/user/SET_QUERY', query)
        await this.$store.dispatch('admin/user/fetchListData')
        this.$router.push({name: this.$route.name, query: {...this.params} })
      } catch (error) {
        this.handleError(error)
      }
    }, 
  }
};