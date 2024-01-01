import type { LayoutKey } from '#build/types/layouts'
import { useTemplate } from '~/hooks/templates'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { templateData } = await useTemplate(to.params.slug as string)

  if (!templateData.value) {
    throw createError({ statusCode: 404, fatal: true })
  }

  const layoutMap = {
    '1': 'standard-light',
    '2': 'standard-dark'
  }[templateData.value.metaUid]

  setPageLayout(layoutMap as LayoutKey)
})
