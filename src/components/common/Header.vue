<script setup lang="ts">
const { $firebaseApp } = useNuxtApp()
const colorMode = useColorMode()

const iconName = computed(() => {
  return colorMode.value === 'dark'
    ? 'i-heroicons-sun'
    : 'i-heroicons-moon-solid'
})

function onClickChangePreference() {
  colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
  colorMode.preference = colorMode.value
}
</script>

<template>
  <header class="p-4 border-b border-gray-200 dark:border-gray-800">
    <div class="container mx-auto flex justify-between items-center">
      <NuxtLink to="/">
        <CommonLogoText />
      </NuxtLink>
      <div class="space-x-3">
        <ClientOnly>
          <UButton
            :icon="iconName"
            sqaure
            variant="ghost"
            :padded="false"
            size="xl"
            color="gray"
            @click="onClickChangePreference"
          />
          <AuthProfile />
          <template #fallback>
            <div class="space-x-2">
              <USkeleton class="rounded-full w-6 h-6 inline-block" />
              <USkeleton class="rounded-full w-6 h-6 inline-block" />
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </header>
</template>
