<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <a-table class="pt-4 admin-table" :columns="columns" :data-source="data" :loading="loading" :pagination="pagination" bordered>
        <span slot="status" slot-scope="text, record">
          <a-switch v-if="admin.id != record.id" v-model="record.status" @change="onChange(record)"/>
          <span v-else>{{ String(record.status)}}</span>
        </span>
      </a-table>
    </a-layout-content>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: "adminAuth",
  data() {
    return {
      columns: [
          {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Ảnh đại diện',
            dataIndex: 'avatar',
            key: 'avatar',
            scopedSlots: { customRender: 'avatar' },
          },
          {
            title: 'Email',
            dataIndex: 'username',
            key: 'email',
          },
          {
            title: 'Trạng thái hoạt động',
            dataIndex: 'status',
            key: 'status',
            scopedSlots: { customRender: 'status' },
          },
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
    this.$store.commit("admin/SET_BREADCRUMB", ["User", "List"]);
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