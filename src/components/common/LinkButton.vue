<script setup lang="ts">
interface Props {
  label: string
  url: string
}

defineProps<Props>()
</script>

<template>
  <a :href="url" target="_blank">
    <UButton color="gray" variant="ghost" class="underline">
      <template #leading>
        <UIcon name="i-heroicons-link-solid" />
      </template>
      {{ label }}
    </UButton>
  </a>
</template>
