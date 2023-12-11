<script setup lang="ts">
import { useUserProfile } from '~/hooks/profiles'
import { useTabs } from '~/hooks/tabs'

interface FormUser {
  name: string // 이름
}

const { tabs } = useTabs()
const { userProfile, loading: isLoadingProfile } = useUserProfile()
</script>

<template>
  <div class="w-full rounded py-2 px-4 lg:py-4 lg:px-8 area">
    <div class="block lg:grid lg:grid-cols-[300px_1fr] lg:gap-5">
      <div class="mb-5 lg:mb-0">
        <h3
          class="text-lg font-bold text-ellipsis whitespace-nowrap overflow-hidden"
        >
          기본 정보
        </h3>
        <ProfileBasicUserInfo />
      </div>
      <div>
        <h3 class="text-lg font-bold">asdf</h3>
      </div>
    </div>
  </div>
</template>
