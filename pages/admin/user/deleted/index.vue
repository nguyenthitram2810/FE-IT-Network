<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <a-table class="pt-4 admin-table" @change="handleTableChange" :columns="columns" :data-source="data" :loading="loading" :pagination="pagination" bordered>
        <span slot="role" slot-scope="text, record">
          <span >{{ record.role.role}}</span>
        </span>

        <span slot="deletedat" slot-scope="text, record">
          <span v-if="record.deletedat != null"> {{ changeStringToTime(record.deletedat) }} </span>
        </span>

        <span class="d-flex justify-content-between" slot="action" slot-scope="text, record">
          <a-popconfirm
            v-if="record.roleId != 1"
            class="mr-2"
            title="Are you sure restore this user?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirmRestore(record.id)"
          >
            <a-button type="danger">
              Restore
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