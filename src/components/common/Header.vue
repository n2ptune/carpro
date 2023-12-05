<script setup lang="ts">
const { $firebaseApp } = useNuxtApp()
const colorMode = useColorMode()

const iconName = computed(() => {
  return colorMode.value === 'dark'
    ? 'i-heroicons-sun'
    : 'i-heroicons-moon-solid'
})

function onClickChangePreference() {
  colorMode.value =
    colorMode.value === 'light' ? 'dark' : 'light'
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
            variant="link"
            size="md"
            color="black"
            @click="onClickChangePreference"
          />
          <AuthPopover />
        </ClientOnly>
      </div>
    </div>
  </header>
</template>
