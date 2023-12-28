<script setup lang="ts">
import type { Tab } from '~/hooks/tabs'
import dayjs from 'dayjs'
import { profileSymbol } from '~/hooks/profiles'

interface Props {
  tab: Tab
}

const defaultWorkItem: Partial<Omit<WorkItem, 'children'>> &
  Pick<WorkItem, 'children'> = {
  children: [{ text: '' }],
  companyName: '',
  description: '',
  endDate: undefined,
  isCurrently: false,
  startDate: undefined
}

const props = defineProps<Props>()
/** form */
const isOpenWorkItemModal = ref(false)
const workItem = ref({ ...defaultWorkItem })
const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)
const formattedStartDate = computed(() =>
  startDate.value ? dayjs(startDate.value).format('YYYY-MM') : ''
)
const formattedEndDate = computed(() =>
  endDate.value ? dayjs(endDate.value).format('YYYY-MM') : ''
)

const validateForm = () => {
  return [true, props.tab.field]
}

const resetForm = () => {
  workItem.value = { ...defaultWorkItem, children: [{ text: '' }] }
  startDate.value = null
  endDate.value = null
}

const onClickDeleteWorkItemChild = (child: WorkItemChild, idx: number) => {
  workItem.value.children.splice(idx, 1)
}

const onClickAddWorkItemChild = () => {
  workItem.value.children.push({ text: '' })
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
    workItem.value.startDate = date ? date.getDate() : undefined
  }
)

watch(
  () => endDate.value,
  (date) => {
    workItem.value.endDate = date ? date.getDate() : undefined
  }
)
/*********/
const registeredWorkItem = ref<WorkItem[]>([])
const userProfile = inject<Ref<UserProfile>>(profileSymbol) as Ref<UserProfile>

onMounted(() => {
  if (userProfile.value && userProfile.value.workItem) {
    registeredWorkItem.value = [...userProfile.value.workItem]
  }
})

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
                <UButton block>
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
                  <UButton block>
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
            <UInput type="text" size="lg" :maxlength="100" />
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
            <UButton color="primary" variant="solid"> 저장 </UButton>
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
