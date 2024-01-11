<script setup lang="ts">
interface Props {
  items: Certificate[]
}

defineProps<Props>()
</script>

<template>
  <TemplatesStandardContent>
    <TemplatesCommonFlexContainer v-for="item in items">
      <TemplatesCommonFlexContent></TemplatesCommonFlexContent>
    </TemplatesCommonFlexContainer>
  </TemplatesStandardContent>
</template>
