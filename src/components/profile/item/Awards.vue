<script setup lang="ts">
import { profileSymbol } from '~/hooks/profiles'

interface Props {
  tab: Tab
}

const props = defineProps<Props>()
const defaultAwardsItem: Awards = {
  description: '',
  name: '',
  type: 'awards',
  awardsDate: undefined,
  endDate: undefined,
  isActivating: false,
  startDate: undefined,
  where: undefined,
  url: ''
}
const userProfile = inject<Ref<UserProfile>>(profileSymbol) as Ref<UserProfile>
const { $dayjs } = useNuxtApp()
const isOpenAddAwardsItemModal = ref(false)
const isUpdatingAwardsItemModal = ref(false)
const updatingIdx = ref<number>(-1)
const awardsForm = ref({ ...defaultAwardsItem })
const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)
const formattedStartDate = computed(() =>
  startDate.value ? $dayjs(startDate.value).format('YYYY-MM') : ''
)
const formattedEndDate = computed(() =>
  endDate.value ? $dayjs(endDate.value).format('YYYY-MM') : ''
)

const toast = useToast()

const validateAwardsForm = () => {
  const rules = [
    {
      if: !awardsForm.value.name,
      message: '수상 및 활동명을 입력해주세요.'
    },
    {
      if: awardsForm.value.type === 'awards' && !startDate.value,
      message: '수상일시를 확인해주세요.'
    },
    {
      if:
        awardsForm.value.type === 'activity' &&
        (!startDate.value || !endDate.value),
      message: '활동 시작일 혹은 종료일을 확인해주세요.'
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
  return [true, props.tab.field]
}

const resetForm = () => {
  awardsForm.value = { ...defaultAwardsItem }
  startDate.value = null
  endDate.value = null
  isUpdatingAwardsItemModal.value = false
  updatingIdx.value = -1
}

const onClickSaveAwardsItem = () => {
  if (!validateAwardsForm()) return

  if (isUpdatingAwardsItemModal.value) {
    userProfile.value.awards![updatingIdx.value] = { ...awardsForm.value }
  } else {
    userProfile.value.awards = userProfile.value.awards
      ? [...userProfile.value.awards, awardsForm.value]
      : [{ ...awardsForm.value }]
  }

  resetForm()
  isOpenAddAwardsItemModal.value = false
}

watch(
  () => isOpenAddAwardsItemModal.value,
  (active) => {
    if (!active) resetForm()
  }
)

watch(
  () => startDate.value,
  (date) => {
    awardsForm.value.startDate = date ? date.getTime() : undefined
  }
)

watch(
  () => endDate.value,
  (date) => {
    awardsForm.value.endDate = date ? date.getTime() : undefined
  }
)

/**
 * 삭제, 변경
 */
const onChangeAwardsItem = (award: Awards, index: number) => {
  if (userProfile.value.awards) {
    awardsForm.value = userProfile.value.awards[index]
    isOpenAddAwardsItemModal.value = true
    isUpdatingAwardsItemModal.value = true
    startDate.value = award.startDate ? new Date(award.startDate) : null
    endDate.value = award.endDate ? new Date(award.endDate) : null
    updatingIdx.value = index
  }
}

const onDeleteAwardsItem = (award: Awards, index: number) => {
  if (userProfile.value.awards) {
    userProfile.value.awards.splice(index, 1)
  }
}

defineExpose({
  validateForm
})
</script>

<template>
  <ProfileItemBase :label="$props.tab.name">
    <UAlert
      title="참고"
      description="수상 및 활동 정보가 없다면, 항목을 비워두면 됩니다. 템플릿에는 해당 항목이 보이지 않아요."
      icon="i-heroicons-information-circle"
      variant="soft"
      color="primary"
      class="mb-4"
    />

    <UFormGroup label="수상 및 활동 정보">
      <UButton
        color="primary"
        variant="solid"
        @click="isOpenAddAwardsItemModal = !isOpenAddAwardsItemModal"
      >
        수상 및 활동 정보 추가하기
      </UButton>
    </UFormGroup>

    <div v-if="userProfile.awards?.length" class="my-6 space-y-2">
      <ProfileListItem
        v-for="(award, awardIdx) in userProfile.awards"
        :key="awardIdx"
        :item="award"
        @change="() => onChangeAwardsItem(award, awardIdx)"
        @delete="() => onDeleteAwardsItem(award, awardIdx)"
      >
        <template #description="{ item }">
          <div class="truncate">
            {{ item.name }}
          </div>
        </template>
      </ProfileListItem>
    </div>

    <CommonEmptyArea v-else label="수상 및 활동 정보를 추가해주세요." />

    <UModal v-model="isOpenAddAwardsItemModal">
      <UCard :ui="{ ring: '' }">
        <template #header>
          <div class="text-xl font-bold">수상 및 활동 정보 입력</div>
        </template>

        <div class="space-y-4">
          <UFormGroup label="수상 및 활동" required>
            <div class="space-y-2 py-2">
              <URadio
                v-model="awardsForm.type"
                label="수상"
                value="awards"
                help="직무 관련 경진대회 입상 및 경력 관련 표창 등"
              />
              <URadio
                v-model="awardsForm.type"
                label="활동"
                value="activity"
                help="직무 관련 온/오프라인 활동 등"
              />
            </div>
          </UFormGroup>

          <UFormGroup label="수상 및 활동명" required>
            <UInput
              v-model="awardsForm.name"
              type="text"
              size="lg"
              :maxlength="50"
              placeholder="수상 및 활동명을 입력하세요."
            />
          </UFormGroup>

          <UFormGroup
            label="소속 및 기관"
            help="경진대회 주최 기관, 표창 수여 기관, 활동 소속 이름 등"
          >
            <UInput
              v-model="awardsForm.where"
              type="text"
              size="lg"
              :maxlength="50"
              placeholder="소속 및 기관을 입력하세요."
            />
          </UFormGroup>

          <UFormGroup label="수상 및 활동일시" required>
            <div class="flex flex-nowrap [&>*]:flex-auto space-x-3">
              <template v-if="awardsForm.type === 'awards'">
                <UPopover>
                  <UButton leading-icon="i-heroicons-calendar-solid" block>
                    수상일자
                    <span v-if="formattedStartDate">
                      {{ formattedStartDate }}
                    </span>
                  </UButton>

                  <template #panel="{ close }">
                    <DatePicker v-model="startDate" @close="close" />
                  </template>
                </UPopover>
              </template>
              <template v-else-if="awardsForm.type === 'activity'">
                <UPopover>
                  <UButton leading-icon="i-heroicons-calendar-solid" block>
                    시작일
                    <span v-if="formattedStartDate">
                      {{ formattedStartDate }}
                    </span>
                  </UButton>

                  <template #panel="{ close }">
                    <DatePicker v-model="startDate" @close="close" />
                  </template>
                </UPopover>
                <UPopover>
                  <UButton leading-icon="i-heroicons-calendar-solid" block>
                    종료일
                    <span v-if="formattedEndDate">
                      {{ formattedEndDate }}
                    </span>
                  </UButton>

                  <template #panel="{ close }">
                    <DatePicker v-model="endDate" @close="close" />
                  </template>
                </UPopover>
              </template>
            </div>
          </UFormGroup>

          <UFormGroup
            label="내용"
            help="수상 및 활동 내용에 더 기입하고 싶은 내용이 있다면 작성합니다."
          >
            <UTextarea
              v-model="awardsForm.description"
              :rows="5"
              :maxlength="500"
              placeholder="수상 및 활동 내용을 입력하세요."
            />
          </UFormGroup>

          <UFormGroup
            label="외부 링크"
            help="참고할 만한 링크가 있다면 첨부해주세요."
          >
            <UInput
              v-model="awardsForm.url"
              type="text"
              size="lg"
              :maxlength="5000"
              placeholder="https://example.com"
            />
          </UFormGroup>
        </div>

        <template #footer>
          <div class="mx-auto text-center space-x-2">
            <UButton
              color="primary"
              variant="solid"
              @click="onClickSaveAwardsItem"
            >
              저장
            </UButton>
            <UButton
              color="gray"
              variant="solid"
              @click="isOpenAddAwardsItemModal = false"
            >
              취소
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </ProfileItemBase>
</template>
