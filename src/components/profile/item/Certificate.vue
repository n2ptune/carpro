<script setup lang="ts">
import { profileSymbol } from '~/hooks/profiles'

interface Props {
  tab: Tab
}

const props = defineProps<Props>()
const userProfile = inject<Ref<UserProfile>>(profileSymbol) as Ref<UserProfile>
const toast = useToast()
const { $dayjs } = useNuxtApp()

const defaultCertificate: Certificate = {
  date: Date.now(),
  where: '',
  description: '',
  name: ''
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

const saveHook = () => {
  if (userProfile.value.certificates) {
    userProfile.value.certificates = userProfile.value.certificates.map(
      (cert) => ({
        ...cert,
        date:
          typeof cert.date === 'object'
            ? (cert.date as Date).getTime()
            : (cert.date as number)
      })
    )
  }
}

defineExpose({
  validateForm,
  saveHook
})
</script>

<template>
  <ProfileItemBase :label="$props.tab.name">
    <UFormGroup v-if="userProfile.certificates" class="item-wrapper space-y-3">
      <div
        v-for="(cert, certIdx) in userProfile.certificates"
        class="item py-2 space-y-4"
      >
        <div class="flex flex-nowrap [&>*]:flex-auto space-x-3">
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
        <div class="block">
          <UFormGroup
            label="비고"
            help="자격증에 대한 덧붙이고 싶은 내용이 있으면 입력합니다."
          >
            <UInput
              v-model="cert.description"
              size="lg"
              :maxlength="100"
              placeholder="비고를 입력하세요."
            />
          </UFormGroup>
        </div>
      </div>
    </UFormGroup>

    <CommonEmptyArea v-else label="자격증 정보를 추가해주세요." />

    <UButton
      class="mt-2"
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

<style lang="postcss" scoped>
.item-wrapper {
  & .item + .item {
    @apply border-dashed border-t border-t-gray-300
    dark:border-t-gray-700 pt-3 mt-3;
  }
}
</style>
