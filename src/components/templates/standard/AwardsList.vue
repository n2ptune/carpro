<script setup lang="ts">
interface Props {
  items: Awards[]
}

defineProps<Props>()
</script>

<template>
  <TemplatesStandardContent>
    <TemplatesCommonFlexContainer v-for="item in items">
      <TemplatesCommonFlexContent :currently="false">
        <template #sub-label="{ util }">
          <span class="text-base">
            <span>
              {{ util.transformDate(item.startDate!) }}
            </span>
            <span v-if="item.type === 'activity'">
              ~ {{ util.transformDate(item.endDate!) }}
            </span>
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
          <p v-if="item.url" class="mt-2">
            <CommonLinkButton :label="item.url" :url="item.url" />
          </p>
        </template>
      </TemplatesCommonFlexContent>
    </TemplatesCommonFlexContainer>
  </TemplatesStandardContent>
</template>
