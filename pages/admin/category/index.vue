<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <a-table class="pt-4 admin-table" :columns="columns" :data-source="data" :loading="loading" :pagination="pagination" bordered>
      </a-table>
    </a-layout-content>
  </div>
</template>

<script>
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
            dataIndex: 'createdAt',
            key: 'createdAt',
            scopedSlots: { customRender: 'createdAt' },
          }, 
          {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            scopedSlots: { customRender: 'updatedAt' },
          }
      ],
      data: [],
      loading: false,
      pagination: {
        curent: 1,
        total: 0,
      }, 
    };
  }, 
  created() {
    this.getQueryParams()
    this.$store.commit("admin/SET_BREADCRUMB", ["Category", "List"]);
  },
  methods: {
    getQueryParams() {
      const query = this.$route.query
      let queryParams = {...this.$route.query}
      if(!query.page) {
        queryParams.page = "1"
      }
      if(!query.limit) {
        queryParams.limit = "10"
      }
      this.$router.push({name: this.$route.name, query: {...queryParams} })
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>>