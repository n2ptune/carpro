<script setup lang="ts">
definePageMeta({
  name: 'home',
  breadcrumbsLabel: ''
})

useHead({
  title: 'Home'
})
</script>

<template>
  <div class="text-center mt-24 lg:mt-48">
    <div
      class="[&>*]:text-4xl [&>*]:lg:text-6xl [&>*]:font-black [&>*]:!leading-[1.175]"
    >
      <div>
        <span class="text-primary-500">Car</span>eer
        <span class="text-primary-500">Pro</span>file
      </div>
      <div>나의 커리어</div>
      <div>나의 이력서 관리</div>
    </div>
    <div>
      <UButton
        size="xl"
        class="mt-4 lg:mt-8"
        variant="solid"
        @click="$router.push({ path: '/my' })"
      >
        이력서 만들러 가기
        <template #trailing>
          <UIcon name="i-heroicons-arrow-right-20-solid" class="text-lg" />
        </template>
      </UButton>
    </div>
  </div>
</template>
