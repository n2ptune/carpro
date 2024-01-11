<script setup lang="ts">
interface Props {
  items: WorkItem[]
}

defineProps<Props>()
</script>

<template>
  <TemplatesStandardContent>
    <TemplatesCommonFlexContainer
      v-for="(item, itemIdx) in items"
      :key="itemIdx"
    >
      <TemplatesCommonFlexContent
        :main-label="item.companyName"
        :sub-label="item.position"
        :currently="item.isCurrently"
        :start-date="item.startDate"
        :end-date="item.endDate"
        view-date
      >
        <template #content>
          <ul class="list-outside list-disc">
            <li v-for="detail in item.children">
              {{ detail.text }}
            </li>
          </ul>
        </template>
      </TemplatesCommonFlexContent>
    </TemplatesCommonFlexContainer>
  </TemplatesStandardContent>
</template>
