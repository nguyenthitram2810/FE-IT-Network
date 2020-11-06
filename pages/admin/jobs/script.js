import moment from 'moment'
export default {
  layout: "admin",
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