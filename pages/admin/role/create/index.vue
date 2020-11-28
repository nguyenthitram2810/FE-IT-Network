<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <div class="text-center font---text font--bold font-style{">
        CREATE NEW ROLE
      </div>

      <div>
        <div style="width: 60%;" class="mx-auto mb-4">
          <a-input v-model="name" placeholder="Role name" allow-clear/>
        </div>
        
        <a-row style="width: 80%;" class="mt-3 m-auto">
          <a-col style="border-bottom: 0.1px solid gray;" class="mb-3" :span="12" v-for="(e, index) in data" :key="index">
            <div class="d-flex flex-column">
              <a-row class="mb-3">
                <a-col :span="8"> <span> {{ e.scope }}:</span></a-col>
                <a-col :span="8"> <a-switch @change="onChange(e)" /></a-col>
              </a-row>

              <a-row class="mb-3">
                <a-col :span="8"> <span>Possession: </span></a-col>
                <a-col :span="8"> 
                  <a-select class="mb-3" default-value="ANY" style="width: 120px" @change="handleChange">
                    <a-select-option value="ANY">
                      ANY
                    </a-select-option>
                    <a-select-option value="OWNER">
                      OWNER
                    </a-select-option>
                  </a-select>
                </a-col>
              </a-row>
            </div>
          </a-col>
        </a-row>

        <a-button type="primary" @click="create">
          Create
        </a-button>
      </div>
    </a-layout-content>
  </div>
</template>

<script src="./script.js"></script>

<style scoped>

</style>