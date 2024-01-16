<script setup lang="ts">
interface Props {
  photoUrl?: string
  name?: string
  email?: string
  loading: boolean
}

const props = defineProps<Props>()
const fileRef = ref<HTMLInputElement | null>(null)

const onClickUserPhoto = () => {
  if (fileRef.value) {
    fileRef.value.click()
  }
}
</script>

<template>
  <div class="py-4 space-y-4">
    <div class="w-full">
      <div class="text-base font-bold mb-2">사진</div>
      <div
        v-if="!props.photoUrl"
        class="w-full h-[400px] border-dashed border-2 bg-gray-200 border-gray-300 dark:bg-gray-900 dark:border-gray-500 rounded cursor-pointer"
        @click="onClickUserPhoto"
      >
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          class="w-full h-[400px] hidden"
          ref="fileRef"
        />
        <div
          class="flex justify-center items-center h-full text-xl lg:text-2xl font-bold dark:text-gray-700 text-gray-400"
        >
          3x4
        </div>
      </div>
    </div>
    <div class="space-y-2">
      <div class="text-base font-bold">이름</div>
      <div class="text-base text-ellipsis whitespace-nowrap overflow-hidden">
        {{ props.name || '-' }}
      </div>
    </div>
    <div class="space-y-2">
      <div class="text-base font-bold">이메일</div>
      <div class="text-base text-ellipsis whitespace-nowrap overflow-hidden">
        {{ props.email || '-' }}
      </div>
    </div>
  </div>
</template>
