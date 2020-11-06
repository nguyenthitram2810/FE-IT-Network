<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
    <a-input-search placeholder="Search name, email" style="width: 300px" allow-clear @search="onSearch" :loading="loading" />
    <!-- Table -->
      <a-table class="pt-4 admin-table" @change="handleTableChange" :columns="columns" :data-source="data" :loading="loading" :pagination="pagination" bordered>
      <!-- Slot action -->
        <span slot="action" slot-scope="text, record">
          <!-- Delete button  -->
          <a-popconfirm placement="top" ok-text="Yes" cancel-text="No" @confirm="confirmDelete(record.slug)">
            <template slot="title">
              <p><b>Are you sure to DELETE this?</b></p>
            </template>
            <a-button type="danger"><a-icon type="delete" /></a-button>
          </a-popconfirm>
          <!-- detail button -->
          <a-button @click="viewDetail(record)"  type="primary">
            View Detail
          </a-button>
        </span>

        <span slot="createdat" slot-scope="text, record">
          {{ changeStringToTime(record.createdat) }}
        </span><!-- slot createAt is here -->

        <span slot="updatedat" slot-scope="text, record">
          {{ changeStringToTime(record.updatedat) }}
        </span><!-- slot createAt is here -->
      </a-table>
      
      <!-- modal detail information-->
      <div>
        <a-modal width="1000px" v-model="visible" title="Detail information">
          <template slot="header" style="background-color: black;">

          </template>
          <template slot="footer">
            <a-button key="close" @click="handleCancel">
              Close
            </a-button>
            <a-button key="submit" type="primary" style="display: none;">
              Submit
            </a-button>
          </template>

          <!-- Entire information of record -->
          <div class="d-flex flex-column mt-3 px-4">
            <div class="row">
              <p class="col-4 font--bold">Name:</p>
              <p class="col-8"> {{ detailInfo.name }}</p>
            </div>

            <div v-if="detailInfo.slug" class="row">
              <p class="col-4 font--bold">Slug:</p>
              <p class="col-8"> {{ detailInfo.slug }}</p>
            </div>

            
            <div v-if="detailInfo.content" class="row">
              <p class="col-4 font--bold">Content:</p>
              <div class="col-8">{{ detailInfo.content }}</div>
            </div>           

            <div v-if="detailInfo.description" class="row">
              <p class="col-4 font--bold">Description:</p>
              <div class="col-8">{{ detailInfo.description }}</div>
            </div>

            <div v-if="detailInfo.experience" class="row">
              <p class="col-4 font--bold">Experience:</p>
              <p class="col-8"> {{ detailInfo.experience }}</p>
            </div>

            <div v-if="detailInfo.type" class="row">
              <p class="col-4 font--bold">Type:</p>
              <p class="col-8"> {{ detailInfo.type }}</p>
            </div>

            <div v-if="detailInfo.lowestWage" class="row">
              <p class="col-4 font--bold">Lowest Wage:</p>
              <p class="col-8"> {{ detailInfo.lowestWage }}</p>
            </div>

            <div v-if="detailInfo.highestWage" class="row">
              <p class="col-4 font--bold">Highest Wage:</p>
              <p class="col-8"> {{ detailInfo.highestWage }}</p>
            </div>
          </div>
        </a-modal>
      </div>
    </a-layout-content>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  layout: "admin",
  middleware: 'adminAuth',
  data() {
    return {
      columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'User\'s email',
            dataIndex: 'user.email',
            key: 'usersEmail',
            scopedSlots: { customRender: 'parentId' },
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
            title: 'Action',
            key: 'action',
            scopedSlots: { customRender: 'action' },
          }
      ],
      data: [],
      params: {},
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
      loading: false,
      visible: false,
      detailInfo: {},
    };
  }, 
  created() {
    this.getQueryParams()
    this.$store.commit("admin/SET_BREADCRUMB", ["Category", "List"]);
    this.getListJobs()
  },
  methods: {
    getQueryParams(){
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
    async getListJobs(){
      try {
        this.loading = true
        const response  = await this.$axios.get('/jobs', {
          params: this.params,
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token,
          }
        })
        
        this.data = response.data.data.data

        this.loading = false
        this.pagination.total = response.data.data.total
        this.pagination.current = response.data.data.page
        this.pagination.pageSize = parseInt(this.params.limit)
      } catch (e) {
        if(e.response) {
          this.$notification["error"]({ 
            message: 'GET JOBS ERROR',
            description:
              e.response.data.message
          });
          console.log(response)
        }
        else {
          this.$notification["error"]({
            message: 'GET JOBS ERROR (RESPONE)',
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
      this.getListJobs()
    },
    async confirmDelete(slug){
      try {
        const response  = await this.$axios.delete(`/jobs/${slug}`, {
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token,
          }
        })

        //Nếu delete thành công
        this.$notification.open({
          message: 'Notification',
          description:
            'Deleted Successfully!',
          icon: <a-icon type="smile" style="color: #FA41CC" />,
        });

        this.getListJobs();

      } catch (e) {
        if(e.response) {
          this.$notification["error"]({ 
            message: 'DELETE JOBS ERROR',
            description:
              e.response.data.message
          });
          console.log(response)
        }
        else {
          this.$notification["error"]({
            message: 'DELETE JOBS',
            description:
              e.message
          });
        }
      }
    },
    changeStringToTime(valueToChange){
      return moment(String(valueToChange)).format('MM/DD/YYYY hh:mm')
    },
    viewDetail(record){
      this.detailInfo = record
      this.visible = true
    },
    handleCancel(){
      this.visible = false;
    },
    onSearch(value) {
      if(value != '') {
        this.params.filter = `name||$contL||${value}`
        this.params.or = `user.email||$contL||${value}`
      }
      else {
        delete this.params.filter
        delete this.params.or
      }
      this.$router.push({name: this.$route.name, query: {...this.params} })
      this.getListJobs()
    }, 
  },
}
</script>

<style lang="scss" scoped>
@import url("./style.scss");

</style>