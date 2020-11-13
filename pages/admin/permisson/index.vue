<template>
  <div>
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '100vh' }"
    >
      <a-tabs @change="getRole">
        <a-tab-pane v-for="e in listRole" :key="e.role" :tab="e.role">
        </a-tab-pane>
      </a-tabs>
      <a-row class="mt-3">
        <a-col style="border-bottom: 0.1px solid gray;" class="mb-3" :span="12" v-for="(e, index) in listPermission" :key="index">
          <div class="d-flex flex-column">
            <a-row class="mb-3">
              <a-col :span="8"> <span> {{ e.scope }}:</span></a-col>
              <a-col :span="8"> <a-switch @change="onChange(e)" /></a-col>
            </a-row>
            
            <a-row class="mb-3">
              <a-col :span="8"> <span>Possession: </span></a-col>
              <a-col :span="8"> 
                <a-select class="mb-3" default-value="lucy" style="width: 120px" @change="handleChange">
                  <a-select-option value="any">
                    ANY
                  </a-select-option>
                  <a-select-option value="owner">
                    OWNER
                  </a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
    </a-layout-content>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
@import url("./style.scss");
</style>