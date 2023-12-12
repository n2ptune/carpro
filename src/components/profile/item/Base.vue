<script setup lang="ts">
interface Props {
  label: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="">
    <ProfileItemTitle :label="props.label" />
    <div class="">
      <slot />
    </div>
  </div>
</template>
