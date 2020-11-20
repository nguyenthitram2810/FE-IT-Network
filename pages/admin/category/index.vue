<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
    <div class="d-flex justify-content-between">
      <!-- Button Create -->
      <a-button class="create-button" @click="showCreateModal" type="primary"><a-icon type="plus" /> CREATE</a-button>
      <!-- Search infomation   -->
      <a-input-search placeholder="Search name" style="width: 300px" allow-clear @search="onSearch" :loading="loading" />
    </div>

    <a-modal v-model="visibleCreate" title="CREATE ONE USER" @ok="handleOkCreate" :ok-button-props="{ props: { disabled: disabledCreateOK } }">
      <template>
        <a-form-model :model="formE">
          <a-form-model-item has-feedback label="Parent ID">
            <template>
              <a-cascader v-model="formE.parentId" :options="parentOptions" change-on-select />
            </template>
          </a-form-model-item>

          <a-form-model-item label="Name">
            <a-input v-model="formE.name" @change="displayCreateOk"/>
          </a-form-model-item>
        </a-form-model>
      </template>
    </a-modal>
    
    <!-- Table -->
      <a-table class="pt-4 admin-table" @change="handleTableChange" :columns="columns" :data-source="data" :loading="loading" :pagination="pagination" bordered>
        <!-- Slot action -->
        <span slot="action" slot-scope="text, record">
          <!-- Delete button  -->
          <a-popconfirm placement="top" ok-text="Yes" cancel-text="No" @confirm="confirmDelete(record.slug)">
            <template slot="title">
              <p><b>Are you sure to DELETE this?</b></p>
            </template>
            <a-button type="danger"><a-icon type="delete" /></a-button>
          </a-popconfirm>

          <!-- Edit button -->
          <a-button @click="showModalEdit(record)" type="primary"><a-icon type="edit" /></a-button>
          
        </span><!-- slot action here -->

        <span slot="createdat" slot-scope="text, record">
          {{ changeStringToTime(record.createdat) }}
        </span><!-- slot createAt is here -->

        <span slot="updatedat" slot-scope="text, record">
          {{ changeStringToTime(record.updatedat) }}
        </span><!-- slot createAt is here -->
      </a-table>
      
      <!-- modal edit  -->
          <a-modal v-model="visible" title="Edit Infomation" @ok="handleOkEdit()">
            <template>
              <a-form-model :model="formE">      
                <a-form-model-item label="Name">
                  <a-input v-model="formE.name"/>
                </a-form-model-item>

                <a-form-model-item has-feedback label="Parent ID">
                  <template>
                    <a-cascader :options="parentOptions" change-on-select @change="onChooseParentInEdit" />
                  </template>
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

.create-button {
  background-color: #6B5B95;
  border-color: #6B5B95;
  width: 200px;
  height: 40px;
}
</style>