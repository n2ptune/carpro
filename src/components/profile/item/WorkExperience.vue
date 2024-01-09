<script setup lang="ts">
import { profileSymbol } from '~/hooks/profiles'

interface Props {
  tab: Tab
}

const defaultWorkItem: WorkItem = {
  children: [],
  position: '',
  companyName: '',
  description: '',
  endDate: undefined,
  isCurrently: false,
  startDate: undefined
}

const props = defineProps<Props>()
const { $dayjs } = useNuxtApp()
/** form */
const isOpenWorkItemModal = ref(false)
const isUpdateWorkItemModal = ref(false)
const updatingIdx = ref<number>(-1)
const workItem = ref({ ...defaultWorkItem })
const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)
const formattedStartDate = computed(() =>
  startDate.value ? $dayjs(startDate.value).format('YYYY-MM') : ''
)
const formattedEndDate = computed(() =>
  endDate.value ? $dayjs(endDate.value).format('YYYY-MM') : ''
)

const validateForm = () => {
  return [true, props.tab.field]
}

const resetForm = () => {
  workItem.value = { ...defaultWorkItem, children: [] }
  startDate.value = null
  endDate.value = null
  isUpdateWorkItemModal.value = false
  updatingIdx.value = -1
}

const onClickDeleteWorkItemChild = (child: WorkItemChild, idx: number) => {
  workItem.value.children.splice(idx, 1)
}

const onClickAddWorkItemChild = () => {
  workItem.value.children.push({ text: '' })
}

const toast = useToast()

const validateWorkItem = () => {
  const rules = [
    {
      if: workItem.value.isCurrently && !startDate.value,
      message: '입사일자를 선택해주세요.'
    },
    {
      if: !workItem.value.isCurrently && (!startDate.value || !endDate.value),
      message: '입사일자 혹은 퇴사일자를 확인해주세요.'
    },
    {
      if:
        !workItem.value.isCurrently &&
        startDate.value &&
        endDate.value &&
        startDate.value > endDate.value,
      message: '입사일자는 퇴사일자보다 미래가 될 수 없습니다.'
    },
    {
      if: !workItem.value.companyName,
      message: '회사 이름을 입력해주세요.'
    },
    {
      if: workItem.value.children.some((t) => !t.text),
      message: '경력 세부 사항을 입력해주세요.'
    }
  ]

  const rule = rules.find((r) => r.if)
  if (rule) {
    toast.add({ title: '알림', description: rule.message })
    return false
  }
  return true
}

const onClickSaveExperience = () => {
  if (!validateWorkItem()) return

  if (isUpdateWorkItemModal.value) {
    if (userProfile.value.workItem && updatingIdx.value !== -1) {
      userProfile.value.workItem[updatingIdx.value] = workItem.value
    }
  } else {
    userProfile.value.workItem = userProfile.value.workItem
      ? [...userProfile.value.workItem, workItem.value]
      : [workItem.value]
  }

  resetForm()
  isOpenWorkItemModal.value = false
}

watch(
  () => isOpenWorkItemModal.value,
  (active) => {
    if (!active) resetForm()
  }
)

watch(
  () => workItem.value.isCurrently,
  (isCurrently) => {
    if (isOpenWorkItemModal.value && !isCurrently) {
      workItem.value.endDate = undefined
    }
  }
)

watch(
  () => startDate.value,
  (date) => {
    workItem.value.startDate = date ? date.getTime() : undefined
  }
)

watch(
  () => endDate.value,
  (date) => {
    workItem.value.endDate = date ? date.getTime() : undefined
  }
)
/*********/
const userProfile = inject<Ref<UserProfile>>(profileSymbol) as Ref<UserProfile>

const onChangeWorkItem = (item: WorkItem, itemIdx: number) => {
  if (userProfile.value.workItem) {
    workItem.value = userProfile.value.workItem[itemIdx]
    isOpenWorkItemModal.value = true
    isUpdateWorkItemModal.value = true
    startDate.value = item.startDate ? new Date(item.startDate) : null
    endDate.value = item.endDate ? new Date(item.endDate) : null
    updatingIdx.value = itemIdx
  }
}

const onDeleteWorkItem = (item: WorkItem, itemIdx: number) => {
  if (userProfile.value.workItem) {
    userProfile.value.workItem.splice(itemIdx, 1)
  }
}

const transformDateFilter = (date?: number) => {
  if (!date || typeof date !== 'number') return date

  return $dayjs(date).format('YYYY-MM')
}

defineExpose({
  validateForm
})
</script>

<template>
  <ProfileItemBase :label="props.tab.name">
    <UAlert
      title="참고"
      description="경력 사항이 없다면, 항목을 비워두면 됩니다. 템플릿에는 해당 항목이 보이지 않아요."
      icon="i-heroicons-information-circle"
      variant="soft"
      color="primary"
      class="mb-4"
    />

    <UFormGroup label="경력 사항">
      <UButton
        color="primary"
        variant="solid"
        @click="isOpenWorkItemModal = !isOpenWorkItemModal"
      >
        경력 사항 추가하기
      </UButton>
    </UFormGroup>

    <div v-if="userProfile.workItem" class="my-6 space-y-2">
      <ProfileListItem
        v-for="(workItem, workItemIdx) in userProfile.workItem"
        :key="workItemIdx"
        :item="workItem"
        @change="() => onChangeWorkItem(workItem, workItemIdx)"
        @delete="() => onDeleteWorkItem(workItem, workItemIdx)"
      >
        <template #description="{ item }">
          <div>{{ transformDateFilter(item.startDate) }}</div>
          <span>~</span>
          <div>
            {{
              item.isCurrently ? '재직중' : transformDateFilter(item.endDate)
            }}
          </div>
          <div class="truncate max-w-[130px] lg:max-w-[450px]">
            {{ item.companyName }}
          </div>
        </template>
      </ProfileListItem>
    </div>

    <CommonEmptyArea v-else label="경력 사항을 추가해주세요." />

    <UModal v-model="isOpenWorkItemModal">
      <UCard
        :ui="{
          ring: ''
        }"
      >
        <template #header>
          <div class="text-xl font-bold">경력 사항 입력</div>
        </template>

        <div class="space-y-4">
          <UFormGroup label="재직 기간" required>
            <div class="flex flex-nowrap space-x-3">
              <UPopover class="flex-1">
                <UButton leading-icon="i-heroicons-calendar-solid" block>
                  입사일자
                  <span v-if="formattedStartDate">
                    {{ formattedStartDate }}
                  </span>
                </UButton>

                <template #panel="{ close }">
                  <DatePicker v-model="startDate" @close="close" />
                </template>
              </UPopover>
              <template v-if="!workItem.isCurrently">
                <span class="align-sub inline-block">~</span>
                <UPopover class="flex-1">
                  <UButton leading-icon="i-heroicons-calendar-solid" block>
                    퇴사일자
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
          <UCheckbox v-model="workItem.isCurrently" label="현재 재직중" />

          <UFormGroup label="회사 이름" required>
            <UInput
              v-model="workItem.companyName"
              type="text"
              size="lg"
              :maxlength="100"
            />
          </UFormGroup>

          <UFormGroup label="담당한 포지션 혹은 직책">
            <UInput
              v-model="workItem.position"
              type="text"
              size="lg"
              :maxlength="100"
            />
          </UFormGroup>

          <UFormGroup
            label="경력 세부 사항"
            help="회사에서 어떤 업무를 담당했는지 세부 사항을 기록합니다. (최대 5개 등록 가능)"
          >
            <div class="space-y-3">
              <div
                v-for="(child, childIdx) in workItem.children"
                :key="childIdx"
                class="flex flex-nowrap"
              >
                <UInput
                  v-model="child.text"
                  type="text"
                  size="lg"
                  :ui="{
                    wrapper: `w-full ${
                      workItem.children.length > 1 ? 'mr-2' : ''
                    }`
                  }"
                  :maxlength="500"
                />
                <UButton
                  v-if="workItem.children.length > 1"
                  variant="ghost"
                  color="gray"
                  icon="i-heroicons-x-mark"
                  @click="onClickDeleteWorkItemChild(child, childIdx)"
                />
              </div>
              <UButton
                v-if="workItem.children.length < 5"
                block
                leading-icon="i-heroicons-plus"
                variant="solid"
                color="primary"
                @click="onClickAddWorkItemChild()"
              >
                세부 사항 추가
              </UButton>
            </div>
          </UFormGroup>
        </div>

        <template #footer>
          <div class="mx-auto text-center space-x-2">
            <UButton
              color="primary"
              variant="solid"
              @click="onClickSaveExperience"
            >
              저장
            </UButton>
            <UButton
              color="gray"
              variant="solid"
              @click="isOpenWorkItemModal = false"
            >
              취소
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </ProfileItemBase>
</template>
