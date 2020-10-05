<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <a-table class="pt-4 admin-table" @change="handleTableChange" :columns="columns" :data-source="data" :loading="loading" :pagination="pagination" bordered>
        <span slot="action">
          <a-popconfirm placement="top" ok-text="Yes" cancel-text="No" @confirm="confirmDelete">
            <template slot="title">
              <p><b>Are you sure to DELETE this?</b></p>
            </template>
            <a-button type="danger" shape="round">DEL</a-button>
          </a-popconfirm>

          <a-divider type="vertical" />

          <a-button @click="showModal" type="primary" shape="round">EDIT</a-button>
          <a-modal v-model="visible" title="Edit Infomation" @ok="handleOkEdit" :ok-button-props="{ props: { disabled: true } }">
            <template>
              <a-form-model :model="formEdit">
                <a-form-model-item label="ID">
                  <a-input v-model="formEdit.id"/>
                </a-form-model-item>
                <a-form-model-item label="Name">
                  <a-input v-model="formEdit.name"/>
                </a-form-model-item>
              </a-form-model>
            </template>
          </a-modal>
        </span><!-- slot action here -->

        <span slot="createdAt" slot-scope="text, record">
          {{ changeStringToTime(record.createdAt) }}
        </span><!-- slot createAt is here -->

        <span slot="updatedAt" slot-scope="text, record">
          {{ changeStringToTime(record.updatedAt) }}
        </span><!-- slot createAt is here -->
      </a-table>
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
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
          },
          {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
          },
          {
            title: 'Parent ID',
            dataIndex: 'parentId',
            key: 'parentId',
            scopedSlots: { customRender: 'parentId' },
          },
          {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            scopedSlots: { customRender: 'createdAt' },
          }, 
          {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            scopedSlots: { customRender: 'updatedAt' },
          },
          {
            title: 'Action',
            key: 'action',
            scopedSlots: { customRender: 'action' },
          }
      ],
      data: [],
      loading: false,
      visible: false, 
      formEdit: {
        id: '',
        name: '',
      },
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
      params: {},
    };
  }, 
  created() {
    this.getQueryParams()
    this.$store.commit("admin/SET_BREADCRUMB", ["Category", "List"]);
    this.getListCategory();
  },
  methods: {
    confirmDelete() {
      message.info('Deleted successfully!');
    },
    showModal() {
      this.visible = true;
    },
    handleOkEdit(e) {
      //take du lieu da edit
      this.visible = false;
    },
    async getListCategory() {
      try {
        this.loading = true
        const response  = await this.$axios.get('/categories', {params: this.params})
        //console.log(response)
        this.data = response.data.data.data
        this.loading = false
        this.pagination.total = response.data.data.total
        this.pagination.current = response.data.data.page
        this.pagination.pageSize = response.data.data.count
      } catch (e) {
        if(e.response) {
          this.$notification["error"]({
            message: 'GET CATEGORY ERROR',
            description:
              e.response.data.message
          });
        }
        else {
          this.$notification["error"]({
            message: 'GET CATEGORY',
            description:
              e.message
          });
        }
      }
    },
    changeStringToTime(valueToChange){
      return moment(String(valueToChange)).format('MM/DD/YYYY hh:mm')
    },
    handleTableChange(pagination, filters, sorter) {
      //console.log(pagination)  
      let temp = {...this.params, page: pagination.current}
      console.log(temp)
      this.params = {...temp}
      this.$router.push({name: this.$route.name, query: {...this.params} })
      this.getListCategory()
    },
    getQueryParams() {
      const query = this.$route.query
      let queryParams = {...this.$route.query}
      if(!query.page) {
        queryParams.page = "1"
      }
      if(!query.limit) {
        queryParams.limit = "10"
      }
      this.params = {...queryParams}
      this.$router.push({name: this.$route.name, query: {...this.params} })
    }
  // async fetch(){
  //   //Nap du lieu tu api
  //   try {
  //     const response  = await this.$axios.get('/categories')
  //     console.log(response)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },
  }
}
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>