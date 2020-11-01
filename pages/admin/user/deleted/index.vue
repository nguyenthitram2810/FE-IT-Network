<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <a-table class="pt-4 admin-table" @change="handleTableChange" :columns="columns" :data-source="data" :loading="loading" :pagination="pagination" bordered>
        <span slot="role" slot-scope="text, record">
          <span >{{ record.role.role}}</span>
        </span>

        <span slot="deletedat" slot-scope="text, record">
          <span v-if="record.deletedat != null"> {{ changeStringToTime(record.deletedat) }} </span>
        </span>

        <span class="d-flex justify-content-between" slot="action" slot-scope="text, record">
          <a-popconfirm
            v-if="record.roleId != 1"
            class="mr-2"
            title="Are you sure restore this user?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirmRestore(record.id)"
          >
            <a-button type="danger">
              Restore
            </a-button>
          </a-popconfirm>
        </span>
      </a-table>
    </a-layout-content>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  layout: "admin",
  middleware: "adminAuth",
  data() {
    return {
      loading: false,
      columns: [
          {
            title: 'ID',
            key: 'id',
            dataIndex: 'id',
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
            title: 'Deleted At',
            dataIndex: 'deletedat',
            key: 'deletedat',
            scopedSlots: { customRender: 'deletedat' },
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
      listPermisson: [],
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
      // if(!query.sort) {
      //   queryParams.sort = "updatedat,DESC"
      // }
      this.params = {...queryParams}
      this.$router.push({name: this.$route.name, query: {...this.params} })
    }, 

    async getListUser() {
      try {
        this.loading = true
        const response = await this.$axios.get('/users/inactive', {
          params: this.params,
          headers: {
            Authorization: 'Bearer ' + this.user.token,
          }
        })
        console.log(response)
        this.data = response.data.data
        this.loading = false
        // this.pagination.total = response.data.data.total
        // this.pagination.current = response.data.data.page
        // this.pagination.pageSize = parseInt(this.params.limit)
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

    async confirmRestore(id) {
      try {
        const response = await this.$axios.put(`/users/restore/${id}`, { id: id,} ,{
          headers: {
            Authorization: 'Bearer ' + this.user.token,
          }
        })
        console.log(response)
        this.getListUser()
        this.$notification["success"]({
          message: 'DELETE USER SUCCESS',
          description:
          `Khôi phục thành công!`
        });
      } catch (e) {
        if(e.response) {
          this.$notification["error"]({
            message: 'RESTORE USER ERROR',
            description:
              e.response.data.message
          });
        }
        else {
          this.$notification["error"]({
            message: 'RESTORE USER ERROR',
            description:
              e.message
          });
        }
      }
    }, 

    changeStringToTime(valueToChange){
      return moment(String(valueToChange)).format('MM/DD/YYYY hh:mm')
    },
  }
}
</script>


<style lang="scss" scoped>
@import url("./style.scss");
</style>