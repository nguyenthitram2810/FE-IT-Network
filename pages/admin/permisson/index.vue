<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <a-button class="create-button" @click="showDrawerCreate" type="primary"><a-icon type="plus" /> CREATE</a-button>
      
      <a-table 
        class="pt-4 admin-table" 
        :columns="columns" 
        :data-source="data" 
        :loading="loading" 
        :row-key="record => record.id"
        bordered
      >
        <span slot="edit" slot-scope="text, record">
          <a-button @click="showModalEdit(record.id)" type="primary"><a-icon type="edit" /></a-button>
        </span>

        <span slot="delete" slot-scope="text, record">
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

      <a-drawer
        title="Create new permission"
        placement="right"
        :width="360"
        :visible="visibleDrawerCreate"
        @close="onCloseCreate"
      >
        <a-form-model
          ref="formCreate"
          :model="formCreate"
          :rules="rules"
        >
          <a-form-model-item has-feedback prop="scope" class="mb-2 form-validate">
            <a-input placeholder="Name permission" v-model="formCreate.scope"/>
          </a-form-model-item>
        </a-form-model>

        <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
        >
          <a-button :style="{ marginRight: '8px' }" @click="onCloseCreate">
            Cancel
          </a-button>
          <a-button  type="primary" @click="createPermission">
            Submit
          </a-button>
        </div>
      </a-drawer>
    </a-layout-content>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>