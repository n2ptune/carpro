<script setup lang="ts">
definePageMeta({
  layout: 'default',
  name: 'my-page',
  breadcrumbsLabel: '내 프로필 관리'
})

const route = useRoute()
</script>

<template>
  <AuthGuard>
    <ProfileForm />
  </AuthGuard>
</template>
