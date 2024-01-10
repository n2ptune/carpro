<script setup lang="ts">
import { profileSymbol } from '~/hooks/profiles'

interface Props {
  tab: Tab
}

type UICertificate = { date: number | null } & Partial<Certificate>

const props = defineProps<Props>()
const userProfile = inject<Ref<UserProfile>>(profileSymbol) as Ref<UserProfile>
const toast = useToast()
const { $dayjs } = useNuxtApp()

const defaultCertificate: UICertificate = {
  date: Date.now(),
  name: '',
  where: ''
}

const onClickAddCert = () => {
  if (!userProfile.value.certificates) userProfile.value.certificates = []
  userProfile.value.certificates.push({ ...defaultCertificate })
}
const onClickDeleteCert = (index: number) => {
  if (!userProfile.value.certificates) userProfile.value.certificates = []
  userProfile.value.certificates.splice(index, 1)
}

const formatDateFilter = (date: number) => $dayjs(date).format('YYYY-MM')

const validateCertificates = () => {
  if (!userProfile.value.certificates || !userProfile.value.certificates.length)
    return true

  const rules = [
    {
      if: userProfile.value.certificates.some((cert) => !cert.name),
      message: '자격증 이름을 확인해주세요.'
    },
    {
      if: userProfile.value.certificates.some((cert) => !cert.where),
      message: '취득 기관명을 확인해주세요.'
    },
    {
      if: userProfile.value.certificates.some((cert) => !cert.date),
      message: '취득일자를 확인해주세요.'
    }
  ]

  const rule = rules.find((r) => r.if)
  if (rule) {
    toast.add({ title: '알림', description: rule.message })
    return false
  }
  return true
}

const validateForm = () => {
  if (!validateCertificates()) return [false, props.tab.field]
  return [true, props.tab.field]
}

defineExpose({
  validateForm
})
</script>

<template>
  <ProfileItemBase :label="$props.tab.name">
    <UFormGroup v-if="userProfile.certificates" class="space-y-3">
      <div
        v-for="(cert, certIdx) in userProfile.certificates"
        class="flex flex-nowrap [&>*]:flex-auto space-x-3 py-2"
      >
        <UFormGroup label="자격증 이름" required>
          <UInput
            v-model="cert.name"
            size="lg"
            :maxlength="50"
            placeholder="자격증 이름을 입력하세요."
          />
        </UFormGroup>

        <UFormGroup label="취득 기관명" required>
          <UInput
            v-model="cert.where"
            size="lg"
            :maxlength="50"
            placeholder="취득 기관명을 입력하세요."
          />
        </UFormGroup>

        <UFormGroup label="취득일자" required>
          <!-- <UInput v-model="cert.date" size="lg" /> -->
          <div class="flex flex-nowrap space-x-2">
            <UPopover>
              <UButton block>
                취득일자
                <span v-if="cert.date">
                  {{ formatDateFilter(cert.date) }}
                </span>
              </UButton>

              <template #panel="{ close }">
                <DatePicker v-model="cert.date" @close="close" />
              </template>
            </UPopover>
            <UButton
              icon="i-heroicons-trash"
              color="gray"
              @click="onClickDeleteCert(certIdx)"
            ></UButton>
          </div>
        </UFormGroup>
      </div>
    </UFormGroup>

    <CommonEmptyArea v-else label="자격증 정보를 추가해주세요." />

    <UButton
      class="mt-4"
      block
      variant="solid"
      color="primary"
      size="lg"
      @click="onClickAddCert"
    >
      자격증 정보 추가하기
    </UButton>
  </ProfileItemBase>
</template>
