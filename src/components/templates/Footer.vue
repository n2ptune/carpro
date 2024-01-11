<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<template>
  <footer class="mt-24 py-12 border-t border-gray-100 dark:border-gray-800">
    <div class="container mx-auto">
      <div class="flex justify-between items-start">
        <div class="text-xl space-y-1">
          <p class="font-bold text-gray-400 dark:text-gray-600">
            <a :href="runtimeConfig.public.PUBLIC_URL" target="_blank">
              {{ runtimeConfig.public.SERVICE_NAME }}
            </a>
          </p>
          <p class="text-sm text-gray-300 dark:text-gray-600">
            Copyright 2024. {{ runtimeConfig.public.SERVICE_NAME }} All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
