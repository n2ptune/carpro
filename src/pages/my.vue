<script setup lang="ts">
definePageMeta({
  layout: 'default',
  name: 'my-page',
  breadcrumbsLabel: '내 프로필 관리'
})
</script>

<template>
  <AuthGuard>
    <ProfileForm />
    <TemplatesMyContainer />
  </AuthGuard>
</template>
