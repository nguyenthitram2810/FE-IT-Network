<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <a-button class="create-button" @click="createRole" type="primary"><a-icon type="plus" /> CREATE</a-button>

      <a-table class="pt-4 admin-table" :columns="columns" :data-source="data" :loading="loading" bordered :row-key="record => record.id">
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

      <div>
        <a-modal width="450px" v-model="modalVisible" title="Permission">
          <template slot="footer">
            <a-button key="back" @click="handleCancelModal">
              Back
            </a-button>
            <a-button key="submit" type="primary" style="display: none;">
              Submit
            </a-button>
          </template>

          <!-- <a-tree
            :show-icon="showIcon"
            :default-expanded-keys="['0-0-0', '0-0-1', '0-0-2']"
            @select="onSelect"
          >
            <a-icon slot="icon" type="carry-out" />
            <a-tree-node key="0-0">
              <a-icon slot="icon" type="carry-out" />
              <span slot="title" style="color: #1890ff">USER</span>
              <a-tree-node key="0-0-2" title="parent 1-2">
                <a-icon slot="switcherIcon" type="form" />
                <a-tree-node key="0-0-2-0" title="leaf">
                  <a-icon slot="switcherIcon" type="form" />
                  <a-icon slot="icon" type="carry-out" />
                </a-tree-node>
                <a-tree-node key="0-0-2-1" title="leaf">
                  <a-icon slot="icon" type="carry-out" />
                  <a-icon slot="switcherIcon" type="form" />
                </a-tree-node>
              </a-tree-node>
            </a-tree-node>
          </a-tree> -->
        </a-modal>
      </div>
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