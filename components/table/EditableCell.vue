<template>
    <div class="editable-cell">
      <div v-if="editable" class="editable-cell-input-wrapper">
        <a-input :value="value.role" @change="handleChange" @pressEnter="check" /><a-icon
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
    permisson: Array,
	},
	data() {
    return {
      value: this.text,
      editable: false,
    };
	},
	
	methods: {
    handleChange(e) {
      const value = e.target.value;
      this.value = value;
    },
    check() {
      this.editable = false;
      this.$emit('change', this.value);
    },
    editUser() {
      this.editable = true;
      console.log(this.permisson)
    },
  },
}
</script>

<style scoped>
@import url('./style.scss');
</style>