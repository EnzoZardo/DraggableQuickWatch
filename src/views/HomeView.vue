<template>
  <v-btn @click="counter++">
    {{ counter }}
  </v-btn>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue'

const counter = ref(0)
const debug = inject('debug') as (o: object) => void
debug({ counter })
</script>

<style scoped></style>
