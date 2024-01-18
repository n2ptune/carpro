<script setup lang="ts">
interface Props {
  src: string
}

const props = defineProps<Props>()
const isLoaded = ref(false)
const tick = ref(false)

onMounted(() => {
  if (process.client) {
    const image = new Image()

    image.onload = function () {
      isLoaded.value = true

      nextTick(() => {
        tick.value = true
      })
    }
    image.src = props.src
  }
})
</script>

<template>
  <div
    class="flex items-center justify-center rounded min-h-[300px] min-w-[250px] bg-gray-200 dark:bg-gray-900 relative"
    :class="isLoaded && '!min-h-full !min-w-full animate-none'"
  >
    <img
      :src="src"
      class="rounded min-h-[300px] transition-opacity duration-500 ease"
      :class="isLoaded ? 'opacity-100' : 'opacity-0'"
    />
    <Transition name="fade">
      <div v-if="!isLoaded" class="absolute flex justify-around space-x-5">
        <div
          v-for="_ in 3"
          class="w-4 h-4 bg-gray-300 dark:bg-gray-800 rounded-full"
        ></div>
      </div>
    </Transition>
  </div>
</template>

<style lang="postcss" scoped>
.fade {
  &-enter-active,
  &-leave-active {
    @apply transition-opacity;
  }

  &-enter-to,
  &-leave {
    @apply opacity-100;
  }

  &-enter,
  &-leave-to {
    @apply opacity-0;
  }
}
</style>
