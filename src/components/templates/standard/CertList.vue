<script setup lang="ts">
interface Props {
  items: Certificate[]
}

defineProps<Props>()
</script>

<template>
  <TemplatesStandardContent>
    <TemplatesCommonFlexContainer v-for="item in items">
      <TemplatesCommonFlexContent :currently="false">
        <template #sub-label="{ util }">
          <span class="text-base">
            {{ util.transformDate(item.date) }}
          </span>
        </template>
        <template #label-more>
          <div class="text-sm text-gray-400 dark:text-gray-500">
            {{ item.where }}
          </div>
        </template>
        <template #content>
          <h3 class="text-xl font-bold">
            {{ item.name }}
          </h3>
          <p class="mt-2 text-base truncate">
            {{ item.description }}
          </p>
        </template>
      </TemplatesCommonFlexContent>
    </TemplatesCommonFlexContainer>
  </TemplatesStandardContent>
</template>
