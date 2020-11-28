import { mapState } from 'vuex'

export default {
  layout: "admin",
  middleware({store, query}) {
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
          title: 'Scope',
          dataIndex: 'scope',
          key: 'scope',
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ], 
    }
  }, 
  computed: {
    ...mapState({
    }),
  },

  created() {
  }, 

  methods: {
    confirmDelete(id) {
      
    }
  }
}