<script setup lang="ts">
import { useTemplateStore } from '~/store/template'

const templateStore = useTemplateStore()
const { userProfileData, templateTheme } = storeToRefs(templateStore)

let io: IntersectionObserver

onMounted(() => {
  // Standard Dark 템플릿인 경우 hero 페이지가 보일 때와
  // 보이지 않을 때 헤더의 스타일을 다르게 적용
  if (templateTheme.value === 'dark') {
    const hero = document.querySelector('.hero')
    if (hero && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          const changeHeaderColor = (color: string) => {
            const header = document.querySelector('header')
            if (header) {
              header.style.color = color
            }
          }
          if (entries.every((entry) => entry.intersectionRatio <= 0)) {
            changeHeaderColor('white')
          } else {
            changeHeaderColor('black')
          }
        },
        { threshold: 0.001 }
      )
      io.observe(hero)
    }
  }
})

onBeforeUnmount(() => {
  if (templateTheme.value === 'dark') {
    io.disconnect()
  }
})
</script>

<template>
  <div
    class="hero pt-12 pb-4 bg-primary-200 dark:bg-primary-300 dark:text-black"
  >
    <div class="container mx-auto my-6">
      <div class="flex flex-wrap justify-between">
        <div class="block">
          <div class="space-y-1">
            <div class="text-3xl font-bold">
              {{ userProfileData!.name }}
            </div>
            <div class="text-xl">
              {{ userProfileData?.position }}
            </div>
            <div class="text-lg">
              {{ userProfileData?.email }}
            </div>
          </div>
          <div class="divider"></div>
          <div class="text-lg whitespace-pre-line">
            {{ userProfileData?.intro }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.divider {
  &::before {
    content: '';

    @apply block w-[100px] h-px bg-gray-800 my-5 dark:bg-gray-700;
  }
}
</style>
