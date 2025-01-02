<template>
  <div v-show="Object.keys(observable).length > 0" class="debug-container font-weight-medium">
    <div class="debug-wrapper rounded-lg pa-4">
      <treeview-template v-model="observable" />
    </div>
  </div>
  <slot name="default"> </slot>
</template>

<script lang="ts" setup>
import MouseDraggable from '@/models/draggable/MouseDraggable'
import TouchDraggable from '@/models/draggable/TouchDraggable'
import { onMounted, provide, ref } from 'vue'

const observable = ref<object>({})

onMounted(() => {
  const el = document.querySelector('.debug-container') as HTMLElement
  MouseDraggable.create(el)
  TouchDraggable.create(el)
})

provide('debug', function (o: object) {
  observable.value = o
})
</script>

<style scoped>
.debug-container {
  touch-action: none;
  position: fixed;
  display: flex;
  flex-direction: row;
  width: 40%;
  max-width: 40%;
  min-height: 5rem;
  right: 2%;
  top: 2%;
  z-index: 1100;
  filter: drop-shadow(5px 10px 15px rgba(var(--v-theme-primary, 0.1)));
  color: aliceblue;
  opacity: 0.8;
  user-select: none;

  @media (max-width: 768px) {
    width: 80%;
    max-width: 80%;
  }
}

.debug-wrapper {
  touch-action: none;
  background: black;
  padding-top: 2%;
  flex-grow: 1;
  width: 40%;
  max-width: 40%;

  @media (max-width: 768px) {
    width: 81%;
    max-width: 81%;
  }
}
</style>
