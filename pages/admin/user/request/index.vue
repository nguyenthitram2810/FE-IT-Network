<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <a-table class="pt-4 admin-table" @change="handleTableChange" :columns="columns" :data-source="data" :loading="loading" :pagination="pagination" bordered>
        <span v-if="record.profile && record.profile.name" slot="name" slot-scope="text, record">
          <span >{{ record.profile.name }}</span>
        </span>

        <span slot="role" slot-scope="text, record">
          <span >{{ record.role.role}}</span>
        </span>

        <span slot="createdat" slot-scope="text, record">
          <span v-if="record.createdat != null"> {{ changeStringToTime(record.createdat) }} </span>
        </span>

        <span slot="profile" slot-scope="text, record">
          <a-button v-if="record.profile != null" @click="viewProfile(record)"  type="primary">
            View Profile
          </a-button>
          <span v-else>Null</span>
        </span>

        <span class="d-flex justify-content-between" slot="action" slot-scope="text, record">
          <a-popconfirm
            v-if="record.roleId != 1"
            class="mr-2"
            title="Are you sure accept this user?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirm(record.id)"
          >
            <a-button type="primary">
              Accept
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

            <div v-if="profile.phone" class="row">
              <p class="col-4 font--bold">Phone:</p>
              <p class="col-8"> {{ profile.phone }}</p>
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
    </a-layout-content>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: "adminAuth",
  data() {
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
            title: 'Created At',
            dataIndex: 'createdat',
            key: 'createdat',
            scopedSlots: { customRender: 'createdat' },
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
    };
  }, 
  created() {
    this.getQueryParams()
    this.$store.commit("admin/SET_BREADCRUMB", ["User", "Deleted List"]);
    this.getListUser()
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
      if(!query.sort) {
        queryParams.sort = "updatedat,DESC"
      }
      this.params = {...queryParams}
      this.$router.push({name: this.$route.name, query: {...this.params} })
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

    async confirm(id) {
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

    changeStringToTime(valueToChange){
      return moment(String(valueToChange)).format('MM/DD/YYYY hh:mm')
    },

    handleCancel(e) {
      this.visible = false;
    },
  }
}
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>