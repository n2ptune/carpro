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
  <header class="p-4">
    <div class="container mx-auto flex justify-between">
      <div class="text-2xl font-black">
        {{ 'CARPRO' }}
      </div>
      <div>
        <ClientOnly>
          <UButton
            :icon="iconName"
            sqaure
            variant="ghost"
            size="md"
            color="gray"
            @click="onClickChangePreference"
          />
          <AuthPopover />
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
