<script setup lang="ts">
import { getTemplate } from '~/lib/template'

// import { useTemplate } from '~/hooks/templates'

definePageMeta({
  layout: 'default'
})

// const { isLoadingTemplate, templateData } = useTemplate()
const route = useRoute()
const { data, error } = await useAsyncData(async () => {
  try {
    const slug = route.params.slug as string
    const result = await getTemplate(slug)
    if (!result) throw new Error('템플릿이 존재하지 않습니다.')
    return { result }
  } catch (error: any) {
    if (error?.message) {
      showError({ fatal: true, statusCode: 404, message: error?.message })
    } else {
      showError({
        fatal: true,
        statusCode: 500,
        message: '템플릿 조회에 실패하였습니다.'
      })
    }
  }
})

if (error.value) {
  throw createError({ statusCode: 404, message: '템플릿이 존재하지 않습니다.' })
}
</script>

<template>
  <div>test {{ $route.params.slug }}</div>
</template>
