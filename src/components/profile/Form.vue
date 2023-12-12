<script setup lang="ts">
import { useUserProfile } from '~/hooks/profiles'
import { useTabs, type TabField } from '~/hooks/tabs'
import WorkExperience from './item/WorkExperience.vue'
import BasicInformation from './item/BasicInformation.vue'

type FormExpose = {
  validateForm: () => [boolean, TabField]
}

const { tabs, onActiveTab, activeTab } = useTabs()
const { userProfile, loading: isLoadingProfile } = useUserProfile()
const getComponent = (field: TabField) => {
  return {
    'work-experience': WorkExperience,
    'basic-information': BasicInformation
  }[field]
}
const tabCompRef = ref<Record<string, FormExpose>>({})
const toast = useToast()

/**
 * 프로필 저장
 */
const onClickSaveProfile = () => {
  let flag = false

  // 탭별로 validateForm 호출
  tabs.forEach((tab) => {
    if (flag) return
    if (tabCompRef.value[tab.field]) {
      const tabRef = tabCompRef.value[tab.field]
      const [validated, field] = tabRef.validateForm()

      if (!validated) {
        flag = true
        toast.add({
          title: '-',
        })
        onActiveTab(tab.field)
      }
    }
  })

  if (flag) return
}
</script>

<template>
  <div class="w-full rounded py-2 px-4 lg:py-4 lg:px-8 area">
    <div
      v-if="!isLoadingProfile && userProfile"
      class="block lg:grid lg:grid-cols-[300px_1fr] lg:gap-12"
    >
      <div class="mb-5 lg:mb-0">
        <h3
          class="text-lg font-bold text-ellipsis whitespace-nowrap overflow-hidden"
        >
          프로필
        </h3>
        <ProfileBasicUserInfo
          :email="userProfile?.email"
          :name="userProfile?.name"
          :photo-url="userProfile?.userPhotoUrl"
          :loading="isLoadingProfile"
        />
        <ProfileTabMenu
          :tabs="tabs"
          :active-tab="activeTab"
          @change="onActiveTab"
        />
      </div>
      <div>
        <Component
          v-for="tab in tabs"
          v-show="activeTab.field === tab.field"
          :key="tab.field"
          :is="getComponent(tab.field)"
          :tab="activeTab"
          :ref="(el) => (tabCompRef[tab.field] = el as any)"
        />
      </div>
    </div>
    <div v-else class="space-x-4 flex py-4">
      <div class="">
        <USkeleton
          class="h-12 w-12 rounded-full"
          :ui="{ background: 'bg-gray-200 dark:bg-gray-900' }"
        />
      </div>
      <div class="space-y-4">
        <USkeleton
          class="h-6 w-[350px]"
          :ui="{ background: 'bg-gray-200 dark:bg-gray-900' }"
        />
        <USkeleton
          class="h-6 w-[280px]"
          :ui="{ background: 'bg-gray-200 dark:bg-gray-900' }"
        />
        <USkeleton
          class="h-6 w-[420px]"
          :ui="{ background: 'bg-gray-200 dark:bg-gray-900' }"
        />
      </div>
    </div>
    <div class="flex justify-center space-x-2 mt-2 lg:mt-4">
      <UButton
        variant="solid"
        size="lg"
        color="primary"
        @click="onClickSaveProfile"
      >
        프로필 저장
      </UButton>
      <UButton variant="solid" size="lg" color="gray"> 프로필 초기화 </UButton>
    </div>
  </div>
</template>
