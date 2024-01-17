<script setup lang="ts">
definePageMeta({
  layout: 'default',
  name: 'my-page',
  breadcrumbsLabel: '내 프로필 관리',
  middleware: 'auth'
})

const formRef = ref<any>(null)
</script>

<template>
  <AuthGuard>
    <ProfileForm ref="formRef" />
    <TemplatesMyContainer :form-ref="formRef" />
    <AuthAccountsSignOut />
  </AuthGuard>
</template>
