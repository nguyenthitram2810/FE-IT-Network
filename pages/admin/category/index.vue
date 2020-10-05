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
      pagination: {
        curent: 1,
        total: 0,
      },
      visible: false, 
      formEdit: {
        id: '',
        name: '',
      },
      pagination: {
        total: 0,
        current: 1,
      },
    };
  }, 
  created() {
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
        const response  = await this.$axios.get('/categories')
        console.log(response.data.data)
        this.data = response.data.data
      } catch (error) {
        console.log(error)
      }
    },
    async getAllproduct(params) {
      try {
        const response = await this.$axios.get('/categories',
        {
          params: params,
          headers: {
            Authorization: 'Bearer ' + this.token,
          }
        })
        if(response.data.status == "200") {
          this.data = response.data.data.rows
          let pagination = { ...this.pagination }
          pagination.total = response.data.data.count
          pagination.current = params.page
          this.pagination = pagination
          console.log(this.pagination)
        }
        else {
          this.$notification["error"]({
            message: 'GET INFORMATION ERROR',
            description:
              response.data.message
          });
        }
      }
      catch(e) {
        this.$notification["error"]({
          message: 'GET INFORMATION ERROR',
          description:
            e.message
        });
      }
    },
    changeStringToTime(valueToChange){
      return moment(String(valueToChange)).format('MM/DD/YYYY hh:mm')
    },
    handleTableChange(pagination, filters, sorter) {
      // this.loading = true
      // let pager = { ...this.pagination }
      // pager.current = pagination.current
      // this.pagination = pager
      // let params = this.$route.query
      // params.page = this.pagination.current
      // console.log(this.pagination);
      
      // this.$router.push({ query: params })
      // this.getAllproduct(params)
      // this.loading = false
      console.log(pagination)
    }
  },
  // async fetch(){
  //   //Nap du lieu tu api
  //   try {
  //     const response  = await this.$axios.get('/categories')
  //     console.log(response)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },
};
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>>