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
            sorter: true,
            scopedSlots: { customRender: 'parentId' },
          },
          {
            title: 'Created At',
            dataIndex: 'createdat',
            key: 'createdat',
            sorter: true,
            scopedSlots: { customRender: 'createdat' },
          }, 
          {
            title: 'Updated At',
            dataIndex: 'updatedat',
            key: 'updatedat',
            sorter: true,
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
      formE: {
        name: '',
        parentId:'',
      },
      parentOptions: [],
      disabledCreateOK: true,
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
      params: {},
      slug: '',
    };
  }, 
  created() {
    this.getQueryParams()
    this.$store.commit("admin/SET_BREADCRUMB", ["Category", "List"]);
    this.getListCategory()
  },
  methods: {
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
      if(!query.sort) {
        queryParams.sort = "id,ASC"
      }
      this.params = {...queryParams}
      this.$router.push({name: this.$route.name, query: {...this.params} })
    },
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
    async showModalEdit(record) {
      this.formE.parentId = record.parentId;
      this.formE.name = record.name;
      this.slug = record.slug
      //console.log(record.slug)
      this.getListParent();
      this.visible = true;
    },
    async getListParent(){
      const response  = await this.$axios.get("/categories/all")
      const categories = response.data.data;
      this.parentOptions = this.mappingData(response.data.data)
      this.parentOptions.unshift({
        value: '', 
        label: "NULL", 
        children: []
      });
    },
    mappingData(data) {
      var reformattedArray = data.map(obj =>{ 
        var rObj = {};
        rObj["value"] = obj.id
        rObj["label"] = obj.name
        if(rObj["label"] == this.formE.name){
          rObj["disabled"] = true
        }
        if(obj.children) {
          rObj["children"] = this.mappingData(obj.children)
        }
        return rObj;
      });
      return reformattedArray
    },

    onChooseParentInEdit(id) {
      this.formE.parentId = id[id.length-1]
    },

    async handleOkEdit(slug) {
      //take du lieu da edit
      this.visible = false;
      // console.log(this.slug)
      // console.log(this.formE)
      try{
        if(this.formE.parentId != ''){
          const response  = await this.$axios.patch(`/categories/${this.slug}`, 
          this.formE,
          {
            headers: {
              Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token,
            }
          })
        }else{
          const response  = await this.$axios.patch(`/categories/${this.slug}`, 
          {name: this.formE.name},
          {
            headers: {
              Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token,
            }
          })
        }

        this.getListCategory();
        
        //Nếu edit thành công
        this.$notification.open({
          message: 'Notification',
          description:
            'Edited Successfully!',
          icon: <a-icon type="smile" style="color: #FA41CC" />,
        });
        
      }catch(e){
        if(e.response) {
          this.$notification["error"]({ 
            message: 'UPDATE CATEGORY ERROR',
            description:
              e.response.data.message
          });
        }
        else {
          this.$notification["error"]({
            message: 'UPDATE CATEGORY',
            description:
              e.message
          });
        }
      }
    },

    async showCreateModal() {
      this.visibleCreate = true;
      this.formE.parentId = ''
      this.formE.name = ''
      this.getListParent()
    },

    async handleOkCreate(e) {
      this.visibleCreate = false;
      try{
        if(this.formE.parentId != ''){
          const response  = await this.$axios.post('/categories', 
          this.formE,
          {
            headers: {
              Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token,
            }
          })
        }else{
          const response  = await this.$axios.post('/categories', 
          {name: this.formE.name},
          {
            headers: {
              Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token,
            }
          })
        }

        this.getListCategory();
        
        //Nếu create thành công
        this.$notification.open({
          message: 'Notification',
          description:
            'Created Successfully!',
          icon: <a-icon type="smile" style="color: #FA41CC" />,
        });
        
      }catch(e){
        if(e.response) {
          this.$notification["error"]({ 
            message: 'CREATE CATEGORY ERROR',
            description:
              e.response.data.message
          });
        }
        else {
          this.$notification["error"]({
            message: 'CREATE CATEGORY',
            description:
              e.message
          });
        }
      }
    },
    displayCreateOk(e){
      if(this.formE.name != ''){
        this.disabledCreateOK = false;
      }else{
        this.disabledCreateOK = true;
      }
    },
    onChooseParentInCreate(id)
    {
      this.formE.parentId = id[id.length-1]
      this.displayCreateOk()
    },
    onSearch(value) {
      if(value != '') {
        this.params.filter = `name||$contL||${value}`
      }
      else {
        delete this.params.filter
      }
      this.$router.push({name: this.$route.name, query: {...this.params} })
      this.getListCategory()
    }, 
  },
}