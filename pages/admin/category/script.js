import moment from 'moment'
import { mapState } from 'vuex'

export default {
  layout: "admin",

  middleware({store, query}) {
    store.commit('admin/category/SET_QUERY', query)
  },

  async fetch() {
    this.fetchData()
  },

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
      visible: false, 
      visibleCreate: false,
      formE: {
        name: '',
        parentId:'',
      },
      disabledCreateOK: true,
      slug: '',
    };
  }, 

  computed: {
    ...mapState({
      user: (state) => state.auth.currentUser,
      params: (state) => state.admin.category.query, 
      data: (state) => state.admin.category.list, 
      loading: (state) => state.admin.category.loading, 
      pagination: (state) => state.admin.category.pagination, 
      parentOptions: (state) => state.admin.category.listAll, 
      category: (state) => state.admin.category.category,
    }),
  },

  created() {
    this.$store.commit("admin/SET_BREADCRUMB", ["Category", "List"]);
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
        await this.$store.dispatch('admin/category/fetchListData')
      }
      catch(error) {
        this.handleError(error)
      }
    },

    changeStringToTime(valueToChange){
      return moment(String(valueToChange)).format('MM/DD/YYYY hh:mm')
    },

    async handleTableChange(pagination, filters, sorter) {
      try {
        await this.$store.dispatch('admin/category/handleTableChange', { pagination, filters, sorter })
        this.$router.push({name: this.$route.name, query: {...this.params} })
      } catch (error) {
        this.handleError(error)
      }
    },

    async confirmDelete(slug) {
      try {
        await this.$store.dispatch('admin/category/delete', slug)
        this.$notification["success"]({
          message: 'SUCCESS',
          description:
          `Deleted successfully!`
        });
      } catch (error) {
          this.handleError(error)
      }
    },

    async showModalEdit(record) {
      await this.$store.dispatch('admin/category/getOneCategory', record.id)

      this.formE.parentId = this.category.parentId;
      this.formE.name = this.category.name;
      this.slug = this.category.slug;

      await this.$store.dispatch('admin/category/fetchListAll')
      let listAll = this.mappingData(this.parentOptions, record.name)
      listAll.unshift({
        value: '', 
        label: "NULL", 
        children: []
      });
      this.$store.commit('admin/category/SET_LIST_ALL', listAll)
      this.visible = true;
    },

    onChooseParentInEdit(id) {
      this.formE.parentId = id[id.length-1]
    },

    async handleOkEdit() {
      this.visible = false
      var slug = this.slug
      try{
        if(this.formE.parentId == '') {
          delete this.formE.parentId
        }
        await this.$store.dispatch(('admin/category/edit'), {data: this.formE, slug})
        this.$notification["success"]({
          message: 'SUCCESS',
          description:
          'Edited Successfully!'
        });    
      }catch(error){
        this.handleError(error)
      }
    },

    async showCreateModal() {
      this.visibleCreate = true;
      this.formE.parentId = ''
      this.formE.name = ''  
      // this.getListParent()
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

        // this.getListCategory();
        
        //Nếu create thành công
        this.$notification["success"]({
          message: 'Notification',
          description:
            'Created Successfully!',
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
      // this.getListCategory()
    }, 

    mappingData(data, name) {
      var reformattedArray = data.map(obj =>{ 
        var rObj = {};
        rObj["value"] = obj.id
        rObj["label"] = obj.name
        if(rObj["label"] == name){
          rObj["disabled"] = true
        }
        if(obj.children) {
          rObj["children"] = this.mappingData(obj.children, name)
        }
        return rObj;
      });
      return reformattedArray
    },
  },
}