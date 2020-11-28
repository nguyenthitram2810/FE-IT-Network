<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <a-table 
        class="pt-4 admin-table" 
        :columns="columns" 
        :data-source="data" 
        :loading="loading" 
        :row-key="record => record.id"
        bordered
      >
        <span slot="action" slot-scope="text, record">
          <a-button @click="showModalEdit(record)" type="primary"><a-icon type="edit" /></a-button>

          <a-popconfirm
            v-if="record.roleId != 1"
            class="mr-2"
            title="Are you sure delete this permission?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirmDelete(record.id)"
          >
            <a-button type="danger">
              <a-icon type="delete" />
            </a-button>
          </a-popconfirm>
        </span>
      </a-table>
    </a-layout-content>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>