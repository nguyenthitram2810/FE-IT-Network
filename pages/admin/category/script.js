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
          },

      ],
      visible: false, 
      visibleCreate: false,
      formE: {
        name: '',
        parentId:'',
      },
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
      return moment(String(valueToChange)).format('MM/DD/YYYY HH:mm')
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
          this.formE.parentId = null
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
      this.formE.parentId = []
      this.formE.name = ''  
      await this.$store.dispatch('admin/category/fetchListAll')
      let listAll = this.mappingData(this.parentOptions)
      listAll.unshift({
        value: '', 
        label: "NULL", 
        children: []
      });
      this.$store.commit('admin/category/SET_LIST_ALL', listAll)
      this.visibleCreate = true;
    },

    async handleOkCreate(e) {
      this.visibleCreate = false;
      try{
        if(this.formE.parentId[this.formE.parentId.length -1].value == '') {
          delete this.formE.parentId
        }
        await this.$store.dispatch('admin/category/createOne',this.formE)
        //Nếu create thành công
        this.$notification["success"]({
          message: 'Notification',
          description:
            'Created Successfully!',
        }); 
      }catch(error){
        this.handleError(error)
      }
    },

    async onSearch(value) {
      let query = {...this.params}
      if(value != '') {
        query.filter = `name||$contL||${value}`
      }
      else {
        query.filter = undefined
      }
      query.page = 1
      this.$store.commit('admin/category/SET_QUERY', query)
      await this.$store.dispatch('admin/category/fetchListData')
      this.$router.push({name: this.$route.name, query: {...this.params} })
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