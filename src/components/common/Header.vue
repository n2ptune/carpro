<script setup lang="ts">
const { $firebaseApp } = useNuxtApp()
const colorMode = useColorMode()

const iconName = computed(() => {
  return colorMode.preference === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon-solid'
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
      <div class="space-x-4">
        <ClientOnly>
          <UButton
            :icon="iconName"
            sqaure
            variant="link"
            size="xl"
            color="black"
            @click="onClickChangePreference"
          />
        </ClientOnly>
      </div>
    </div>
  </header>
</template>
