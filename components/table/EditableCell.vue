<template>
    <div class="editable-cell">
      <div v-if="editable" class="editable-cell-input-wrapper">
          <a-select v-model="value.id">
            <template v-for="(role, index) in role">
              <a-select-option v-if="(user.roleId == 1) || (user.roleId != 1 && role.id != 1 && role.id != 2)" :key="index" :value="`${role.id}`">
                {{role.role}}
              </a-select-option> 
            </template> 
          </a-select>

          <a-icon
            type="check"
            class="editable-cell-icon-check"
            @click="check"
          />
      </div>
      
      <div v-else class="editable-cell-text-wrapper d-flex">
        <span>{{ value.role }}</span>
        <a-icon type="edit" class="editable-cell-icon" @click="editUser()" />
      </div>
    </div>
</template>

<script>
export default {
	name: 'EditableCell',
  props: {
    text: Object,
    role: Array,
    user: Object,
	},
	data() {
    return {
      value: {
        id: String(this.text.id), 
        role: this.text.role
      },
      editable: false,
    };
  },
  
  watch: {
    'text': function(value) {
      this.value = value
    }
  },
	
	methods: {
    check() {
      this.editable = false;
      this.$emit('change', this.value.id);
    },
    editUser() {
      console.log(this.value)
      this.editable = true;
    },
  },
}
</script>

<style scoped>
@import url('./style.scss');
</style>