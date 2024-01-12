<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

interface Props {
  modelValue: Date | number | null
}

const props = defineProps<Props>()

const emit = defineEmits(['update:model-value', 'close'])

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const date = computed({
  get: () =>
    typeof props.modelValue === 'number'
      ? new Date(props.modelValue)
      : props.modelValue,
  set: (value) => {
    emit('update:model-value', value)
    emit('close')
  }
})

const attrs = [
  {
    key: 'today',
    highlight: {
      color: 'primary',
      fillMode: 'outline',
      class: '!bg-gray-100 dark:!bg-gray-900'
    },
    dates: new Date()
  }
]
</script>

<template>
  <VCalendarDatePicker
    v-model="date"
    color="primary"
    :attributes="attrs"
    :is-dark="isDark"
    title-position="left"
    trim-weeks
    :first-day-of-week="2"
  />
</template>

<style lang="postcss">
.vc-primary {
  --vc-accent-50: theme('colors.rose.50');
  --vc-accent-100: theme('colors.rose.100');
  --vc-accent-200: theme('colors.rose.200');
  --vc-accent-300: theme('colors.rose.300');
  --vc-accent-400: theme('colors.rose.400');
  --vc-accent-500: theme('colors.rose.500');
  --vc-accent-600: theme('colors.rose.600');
  --vc-accent-700: theme('colors.rose.700');
  --vc-accent-800: theme('colors.rose.800');
  --vc-accent-900: theme('colors.rose.900');
  --vc-gray-50: theme('colors.gray.50');
  --vc-gray-100: theme('colors.gray.100');
  --vc-gray-200: theme('colors.gray.200');
  --vc-gray-300: theme('colors.gray.300');
  --vc-gray-400: theme('colors.gray.400');
  --vc-gray-500: theme('colors.gray.500');
  --vc-gray-600: theme('colors.gray.600');
  --vc-gray-700: theme('colors.gray.700');
  --vc-gray-800: theme('colors.gray.800');
  --vc-gray-900: theme('colors.gray.900');
}

.vc-light {
  --vc-focus-ring: theme('colors.rose.300');
  --vc-bg: theme('colors.white');
  --vc-popover-content-bg: theme('colors.white');
  --vc-popover-content-border: theme('colors.gray.200');
  --vc-border: theme('colors.gray.200');
  --vc-header-arrow-color: theme('colors.gray.500');
  --vc-header-arrow-hover-bg: theme('colors.gray.100');
  --vc-nav-hover-bg: theme('colors.gray.100');
}

.vc-dark {
  --vc-focus-ring: theme('colors.rose.900');
  --vc-bg: theme('colors.gray.900');
  --vc-popover-content-bg: theme('colors.gray.900');
  --vc-popover-content-border: theme('colors.gray.700');
  --vc-border: theme('colors.gray.700');
  --vc-header-arrow-color: theme('colors.white');
  --vc-header-arrow-hover-bg: theme('colors.gray.800');
  --vc-nav-hover-bg: theme('colors.gray.800');
}
</style>
