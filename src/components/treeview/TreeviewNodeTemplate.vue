<template>
  <ul
    :style="`margin-left: ${props.padding * 5}px`"
    :class="{
      treeview: root,
      nested: !root,
    }"
  >
    <template v-if="props.obj != null">
      <template v-for="([key, value], idx) in Object.entries(props.obj)" :key="idx">
        <template v-if="typeof value == 'object'">
          <li @click="toggle" class="caret">
            {{ key }}:
            <treeview-node-template :obj="value" :padding="props.padding + 1" />
          </li>
        </template>
        <li v-else>{{ key }}: {{ value }}</li>
      </template>
    </template>
  </ul>
</template>

<script lang="ts" setup>
const props = defineProps({
  obj: { type: Object, required: true },
  padding: { type: Number, required: true },
  root: { type: Boolean, default: false },
})

const toggle = (event: MouseEvent) => {
  const me = event.target as HTMLElement
  me.querySelector('.nested')?.classList.toggle('active')
  me.classList.toggle('caret-down')
}
</script>
