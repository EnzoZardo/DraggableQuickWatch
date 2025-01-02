<template>
  <div v-if="Object.keys(model).length > 0" class="treeview-root">
    <treeview-node-template :obj="model" :padding="1" :root="true" />
  </div>
</template>

<script lang="ts" setup>
const model = defineModel({
  type: Object,
  required: true,
})
</script>

<style scoped>
:deep(.treeview) * {
  list-style-type: none;
  text-align: start;
  overflow-wrap: break-word;
  overflow: hidden;
}

:deep(.treeview .caret) {
  cursor: pointer;
  user-select: none;
  text-wrap: wrap;
}

:deep(.treeview .caret::before) {
  content: '\25B6';
  color: rgb(255, 255, 255);
  display: inline-block;
  margin-right: 6px;
}

:deep(.treeview .caret-down::before) {
  transform: rotate(90deg);
}

:deep(.treeview .nested) {
  display: none;
}

:deep(.treeview .active) {
  display: block;
}
</style>
