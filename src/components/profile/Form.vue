<script setup lang="ts">
import { useUserProfile } from '~/hooks/profiles'
import { useTabs } from '~/hooks/tabs'
import WorkExperience from './item/WorkExperience.vue'
import BasicInformation from './item/BasicInformation.vue'
import Awards from './item/Awards.vue'
import Certificate from './item/Certificate.vue'

type FormExpose = {
  validateForm: () => [boolean, TabField]
  saveHook?: () => void
}

const { tabs, onActiveTab, activeTab } = useTabs()
const {
  userProfile,
  loading: isLoadingProfile,
  updating: isUpdatingProfile,
  updateProfile
} = useUserProfile()
const getComponent = (field: TabField) => {
  const componentMap: Record<string, any> = {
    'work-experience': WorkExperience,
    'basic-information': BasicInformation,
    awards: Awards,
    certificate: Certificate
  }
  if (!Object.keys(componentMap).includes(field)) return null
  return componentMap[field]
}
const tabCompRef = ref<Record<string, FormExpose>>({})
const toast = useToast()

/**
 * 프로필 저장
 */
const onClickSaveProfile = () => {
  for (const tab of tabs) {
    if (tabCompRef.value[tab.field]) {
      const tabRef = tabCompRef.value[tab.field]
      const [validated, field] = tabRef.validateForm()

      if (!validated) {
        toast.add({ title: '알림', description: '항목을 확인해주세요.' })
        onActiveTab(tab.field)
        return
      }

      // 이벤트 수신용 함수 호출 (탭 내 데이터 변환 등)
      if (typeof tabRef.saveHook === 'function') {
        tabRef.saveHook()
      }
    }
  }

  updateProfile()
}

defineExpose({
  onClickSaveProfile
})
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
      <div class="truncate pl-1 pr-2 !overflow-y-auto max-h-[950px]">
        <Component
          v-for="tab in tabs"
          v-show="activeTab.field === tab.field"
          :key="tab.field"
          :is="getComponent(tab.field)"
          :tab="activeTab"
          :ref="(el: any) => (tabCompRef[tab.field] = el as any)"
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
    <div
      class="flex justify-center space-x-2 mt-2 lg:mt-4 pt-2 lg:pt-4 border-t border-gray-200 dark:border-gray-700"
    >
      <UButton
        variant="solid"
        size="lg"
        color="primary"
        @click="onClickSaveProfile"
        :disabled="isUpdatingProfile"
        :loading="isUpdatingProfile"
      >
        프로필 저장
      </UButton>
      <UButton
        variant="solid"
        size="lg"
        color="gray"
        :disabled="isUpdatingProfile"
        :loading="isUpdatingProfile"
      >
        프로필 초기화
      </UButton>
    </div>
  </div>
</template>
