<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <a-button class="create-button" @click="createRole" type="primary"><a-icon type="plus" /> CREATE</a-button>

      <a-table class="pt-4 admin-table" :columns="columns" :data-source="data" :loading="loading" bordered>
        <span slot="createdat" slot-scope="text, record">
          <span v-if="record.createdat != null"> {{ changeStringToTime(record.createdat) }} </span>
        </span>

        <span slot="updatedat" slot-scope="text, record">
          <span v-if="record.createdat != null"> {{ changeStringToTime(record.updatedat) }} </span>
        </span>

        <span slot="permission" slot-scope="text, record">
          <a-button  type="primary" @click="getPermission(record)">
            <a-icon type="eye" /> Permission
          </a-button>
        </span>

        <span slot="action" slot-scope="text, record">
          <a-popconfirm
            v-if="record.id != 1"
            class="mr-2"
            title="Are you sure delete this role?"
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
.create-button {
  background-color: #6B5B95;
  border-color: #6B5B95;
  width: 200px;
  height: 40px;
}
</style>