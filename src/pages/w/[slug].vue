<script setup lang="ts">
definePageMeta({
  layout: false
})

const route = useRoute()

console.log(route.params.slug)
</script>

<template>
  <div>test</div>
</template>
