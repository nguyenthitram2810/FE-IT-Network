<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <a-button type="primary" @click="showDrawerCreate"> <a-icon type="plus" /> New User </a-button>

      <a-table class="pt-4 admin-table" @change="handleTableChange" :columns="columns" :data-source="data" :loading="loading" :pagination="pagination" bordered>
        <span v-if="record.profile && record.profile.name" slot="name" slot-scope="text, record">
          <span >{{ record.profile.name }}</span>
        </span>

        <span slot="role" slot-scope="text, record">
           <editable-cell :permisson="listPermisson" :text="record.role" @change="onCellChange(record.key, 'name', $event)"></editable-cell>
        </span>

        <span slot="active" slot-scope="text, record">
          <span v-if="record.roleId == 4 && record.active != true">
            <a-popconfirm
              class="mr-2"
              title="Are you sure cancel this order?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirmContributor(record.id)"
            >
              <a-button class="cn-btn-success" type="success">
                Accept
              </a-button>
            </a-popconfirm>
          </span>

          <span v-else> Active</span>
        </span>

        <span slot="profile" slot-scope="text, record">
          <a-button @click="viewProfile(record)"  type="primary">
            View Profile
          </a-button>
        </span>

        <span class="d-flex justify-content-between" slot="action" slot-scope="text, record">
          <a-popconfirm
            v-if="record.roleId != 1"
            class="mr-2"
            title="Are you sure delete this user?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirmDelete(record.id)"
          >
            <a-button type="danger">
              Delete
            </a-button>
          </a-popconfirm>
        </span>
      </a-table>

      <div>
        <a-modal width="450px" v-model="visible" title="Profile Detail" cancelText="">
          <template slot="header" style="background-color: black;">

          </template>
          <template slot="footer">
            <a-button key="back" @click="handleCancel">
              Back
            </a-button>
            <a-button key="submit" type="primary" style="display: none;">
              Submit
            </a-button>
          </template>

          <div class="d-flex align-items-center justify-content-center avatar-modal">
            <a-avatar style="border: 2px solid purple;" shape="square" :size="128" :src="profile.profileUrl" />
          </div>

          <div class="d-flex flex-column mt-3 px-4">
            <div class="row">
              <p class="col-4 font--bold">Name:</p>
              <p class="col-8"> {{ profile.name }}</p>
            </div>

            <div v-if="profile.pageURL" class="row">
              <p class="col-4 font--bold">Website:</p>
              <p class="col-8"> <a :href="profile.pageURL" target="_blank">{{ profile.pageURL }}</a></p>
            </div>

            <div v-if="profile.cvURL" class="row">
              <p class="col-4 font--bold">CV:</p>
              <p class="col-8"> <a :href="profile.cvURL" target="_blank">{{ profile.cvURL }}</a></p>
            </div>

            <div v-if="profile.experience" class="row">
              <p class="col-4 font--bold">Experience:</p>
              <p class="col-8"> {{ profile.experience }}</p>
            </div>

            <div v-if="profile.quantity" class="row">
              <p class="col-4 font--bold">Quantity:</p>
              <p class="col-8"> {{ profile.quantity }}</p>
            </div>

            <div v-if="profile.introduction" class="row">
              <p class="col-4 font--bold">Introduction:</p>
              <p class="col-8"> {{ profile.introduction }}</p>
            </div>
          </div>
        </a-modal>
      </div>

      <a-drawer
        title="Create new user"
        placement="right"
        :width="360"
        :visible="visibleDrawerCreate"
        @close="onCloseCreate"
      >
        <a-form-model
          ref="formCreate"
          :model="formCreate"
          :rules="rules"
        >
          <a-form-model-item has-feedback prop="email" class="mb-2 form-validate">
            <a-input placeholder="Email" v-model="formCreate.email"/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="roleId" class="mb-2  form-validate">
            <a-select v-model="formCreate.roleId" placeholder="Role">
              <template v-for="(role, index) in listPermisson">
                <a-select-option v-if="(user.roleId == 1 && role.id != 1) || (user.roleId != 1 && role.id != 1 && role.id != 2)" :key="index" :value="`${role.id}`">
                  {{role.role}}
                </a-select-option> 
              </template> 
            </a-select>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="password" class="mb-2  form-validate" >
            <a-input type="password" v-model="formCreate.password" autocomplete="off" placeholder="Password"/>
          </a-form-model-item>

          <a-form-model-item has-feedback prop="confirmPassword" class="mb-2  form-validate" >
            <a-input type="password" v-model="formCreate.confirmPassword" autocomplete="off" placeholder="Confirm password"/>
          </a-form-model-item>
        </a-form-model>

        <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
        >
          <a-button :style="{ marginRight: '8px' }" @click="onCloseCreate">
            Cancel
          </a-button>
          <a-button :loading="loadingCreate"  type="primary" @click="createUser">
            Submit
          </a-button>
        </div>
      </a-drawer>
    </a-layout-content>
  </div>
</template>

<script>
import EditableCell from '@/components/table/EditableCell';
export default {
  components: {
    EditableCell,
  },
  layout: "admin",
  middleware: "adminAuth",
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
            scopedSlots: { customRender: 'name' },
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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
      user: JSON.parse(localStorage.getItem('currentUser')),
      params: {},
      profile: {},
      visible: false, 
      visibleDrawerCreate: false,
      listPermisson: [],
      formCreate: {
        email: '',
        password: '',
        confirmPassword: '',
        roleId: undefined,
      },
      loadingCreate: false,
      editAble: false,
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
  created() {
    this.getQueryParams()
    this.$store.commit("admin/SET_BREADCRUMB", ["User", "List"]);
    this.getListUser()
    this.getListPermisson()
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
      this.params = {...queryParams}
      this.$router.push({name: this.$route.name, query: {...this.params} })
    }, 

    async getListPermisson() {
      try {
        const response = await this.$axios.get('permission/role/all', {
          headers: {
            Authorization: 'Bearer ' + this.user.token,
          }
        })
        this.listPermisson = response.data.data
      }
      catch(e) {
        if(e.response) {
          this.$notification["error"]({
            message: 'GET LIST PERMISSION ERROR',
            description:
              e.response.data.message
          });
        }
        else {
          this.$notification["error"]({
            message: 'GET LIST PERMISSION ERROR',
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

    editUser(role) {
      this.editAble = true
    }, 

    onCellChange(key, dataIndex, value) {
      
    },
  }
};
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>>