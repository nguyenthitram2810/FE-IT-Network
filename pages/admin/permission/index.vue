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
        <span slot="edit" slot-scope="text, record">
          <a-button @click="showModalEdit(record)" type="primary"><a-icon type="edit" /></a-button>
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
      <a-modal v-model="visibleModalEdit" title="Edit Infomation" @ok="edit()">
        <template>
          <a-form-model 
            :model="formEdit"
            ref="formEdit"
            :rules="rules"
          >      
            <a-form-model-item has-feedback prop="scope" label="Scope">
              <a-input v-model="formEdit.scope"/>
            </a-form-model-item>
          </a-form-model>
        </template>
      </a-modal>
    </a-layout-content>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>