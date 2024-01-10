<script setup lang="ts">
import { useTemplateStore } from '~/store/template'

const PUBLIC_URL = 'carpro.imkh.dev'

const templateStore = useTemplateStore()
const { userProfileData, templateData } = storeToRefs(templateStore)
const url = computed(() => {
  return `https://${PUBLIC_URL}/w/${templateData.value?.uid}`
})
const { copy } = useClipboard({ legacy: true, source: url.value })
const router = useRouter()
const toast = useToast()
const headerMenus = [
  [
    {
      label: 'URL 복사하기',
      icon: 'i-heroicons-link',
      click: () => {
        copy(url.value)
        toast.add({ title: '알림', description: 'URL을 복사하였습니다.' })
      }
    }
  ],
  [
    {
      label: '메인으로 이동하기',
      icon: 'i-heroicons-home-solid',
      click: () => router.push({ path: '/' })
    }
  ]
]
</script>

<template>
  <header class="fixed top-0 left-0 w-full p-3 backdrop-blur-lg">
    <div class="flex justify-between items-center">
      <div class="text-sm">
        {{ userProfileData?.name }}
        <span v-if="userProfileData?.position" class="position">
          {{ userProfileData.position }}
        </span>
      </div>
      <div class="text-sm">
        <UDropdown :items="headerMenus">
          <UButton
            icon="i-heroicons-ellipsis-vertical"
            :padded="false"
            variant="ghost"
            color="current"
            size="sm"
          />
        </UDropdown>
      </div>
    </div>
  </header>
</template>

<style lang="postcss" scoped>
.position::before {
  content: '\2022';
  @apply mx-1 text-lg;
}
</style>
