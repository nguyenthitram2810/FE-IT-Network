<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
    <!-- Button Create -->
    <a-button class="create-button" @click="showCreateModal" type="primary">+ CREATE</a-button>
    <a-modal v-model="visibleCreate" title="CREATE ONE USER" @ok="handleOkCreate" :ok-button-props="{ props: { disabled: disabledCreateOK } }">
      <template>
        <a-form-model :model="formCreate">
          <a-form-model-item label="Parent ID">
            <a-input v-model="formCreate.id" @change="displayCreateOk"/>
          </a-form-model-item>
          <a-form-model-item label="Name">
            <a-input v-model="formCreate.name" @change="displayCreateOk"/>
          </a-form-model-item>
        </a-form-model>
      </template>
    </a-modal>
    
    <!-- Table -->
      <a-table class="pt-4 admin-table" @change="handleTableChange" :columns="columns" :data-source="data" :loading="loading" :pagination="pagination" bordered>
        <span slot="action" slot-scope="text, record">
          <a-popconfirm placement="top" ok-text="Yes" cancel-text="No" @confirm="confirmDelete(record.slug)">
            <template slot="title">
              <p><b>Are you sure to DELETE this?</b></p>
            </template>
            <a-button type="danger">DEL</a-button>
          </a-popconfirm>
          
          <!-- Edit button -->
          <a-button @click="showModal(record)" type="primary">EDIT</a-button>
          <a-modal v-model="visible" title="Edit Infomation" @ok="handleOkEdit(record.slug)">
            <template>
              <a-form-model :model="formEdit">      
                <a-form-model-item label="Name">
                  <a-input v-model="formEdit.name"/>
                </a-form-model-item>

                <a-form-model-item has-feedback label="Parent ID">
                  <template>
                    <a-cascader :options="parentOptions" change-on-select @change="onChooseParent" />
                  </template>
                </a-form-model-item>
              </a-form-model>
            </template>
          </a-modal>
        </span><!-- slot action here -->

        <span slot="createdat" slot-scope="text, record">
          {{ changeStringToTime(record.createdat) }}
        </span><!-- slot createAt is here -->

        <span slot="updatedat" slot-scope="text, record">
          {{ changeStringToTime(record.updatedat) }}
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
      loading: false,
      visible: false, 
      visibleCreate: false,
      formEdit: {
        name: '',
        parentId:'',
      },
      parentOptions: [],
      formCreate: {
        parentID: '',
        name: '',
      },
      disabledCreateOK: true,
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
    this.getListCategory()
  },
  methods: {
    async confirmDelete(slug) {
      try {
        const response  = await this.$axios.delete(`/categories/${slug}`, {
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

        this.getListCategory();

      } catch (e) {
        if(e.response) {
          this.$notification["error"]({ 
            message: 'DELETE CATEGORY ERROR',
            description:
              e.response.data.message
          });
          console.log(response)
        }
        else {
          this.$notification["error"]({
            message: 'DELETE CATEGORY',
            description:
              e.message
          });
        }
      }
    },
    async showModal(record) {
      this.formEdit.id = record.id;
      this.formEdit.name = record.name;
      this.formEdit.slug = record.slug;
      const response  = await this.$axios.get("/categories/all")
      // this.parentOptions = response.data.data
      const categories = response.data.data;
      this.parentOptions = this.mappingData(response.data.data)
        //console.log(this.parentOptions)
      this.visible = true;
    },
    
    mappingData(data) {
      var reformattedArray = data.map(obj =>{ 
        var rObj = {};
        rObj["value"] = obj.id
        rObj["label"] = obj.name
        if(rObj["label"] == this.formEdit.name){
          rObj["disabled"] = true
        }
        if(obj.children) {
          rObj["children"] = this.mappingData(obj.children)
        }
        return rObj;
      });
      return reformattedArray
    },

    showCreateModal() {
      this.visibleCreate = true;
    },
    handleOkEdit(slug) {
      //take du lieu da edit
      this.visible = false;

      //Nếu edit thành công
      this.$notification.open({
        message: 'Notification',
        description:
          'Edited Successfully!',
        icon: <a-icon type="smile" style="color: #FA41CC" />,
      });
      
      //Set form về rỗng sau khi edit thành công
      for(var key in this.formEdit){
        this.formEdit[key] = null;
      }
    },
    handleChangePEdit(e){
      console.log("ok")
    },
    handleOkCreate(e) {
      this.visibleCreate = false;

      //Nếu create thành công
      this.$notification.open({
        message: 'Notification',
        description:
          'Created Successfully!',
        icon: <a-icon type="smile" style="color: #FA41CC" />,
      });
      //Thông báo thất bại nếu create thất bại

      //Set form về rỗng sau khi add thành công
      for(var key in this.formCreate){
        this.formCreate[key] = null;
      }
    },
    displayCreateOk(e){
      if(this.formCreate.id != '' && this.formCreate.name != '' && this.formCreate.slug != ''){
        this.disabledCreateOK = false;
      }else{
        this.disabledCreateOK = true;
      }
    },
    async getListCategory() {
      try {
        this.loading = true
        const response  = await this.$axios.get('/categories', {
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
            message: 'GET CATEGORY ERROR',
            description:
              e.response.data.message
          });
          console.log(response)
        }
        else {
          this.$notification["error"]({
            message: 'GET CATEGORY ERROR',
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
      let temp = {...this.params, page: pagination.current}
      this.params = {...temp}
      this.$router.push({name: this.$route.name, query: {...this.params} })
      this.getListCategory()
    },
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

    onChooseParent() {

    }
  },
}
</script>

<style lang="scss" scoped>
@import url("./style.scss");

.create-button {
  background-color: #6B5B95;
  border-color: #6B5B95;
  width: 200px;
  height: 40px;
}
</style>