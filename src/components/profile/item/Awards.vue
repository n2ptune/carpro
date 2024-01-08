<script setup lang="ts">
import { profileSymbol } from '~/hooks/profiles'

interface Props {
  tab: Tab
}

type OrderAwards = {
  canToNext: boolean
  canToPrev: boolean
} & Awards

defineProps<Props>()

const defaultAwardsItem: Awards = {
  description: '',
  name: '',
  type: 'awards',
  awardsDate: undefined,
  endDate: undefined,
  isActivating: false,
  startDate: undefined,
  where: undefined
}

const userProfile = inject<Ref<UserProfile>>(profileSymbol) as Ref<UserProfile>
const awards = ref<OrderAwards[]>([])
const setOrderAwards = (awards: Awards[]) => {
  return awards.map((award, index) => {
    return {
      ...award,
      canToNext: index !== userProfile.value.awards!.length - 1,
      canToPrev: index !== 0
    }
  })
}

if (userProfile.value.awards) {
  // awards.value = [...userProfile.value.awards]
  awards.value = setOrderAwards(userProfile.value.awards)
} else {
  awards.value = []
  userProfile.value.awards = []
}

const onClickAddAwards = () => {
  awards.value = setOrderAwards([
    ...awards.value,
    toReactive({ ...defaultAwardsItem })
  ])
}
const onClickDeleteAwards = (index: number) => {
  awards.value.splice(index, 1)
}
const onChangeAwardsType = (type: AwardsType, index: number) => {
  awards.value[index].type = type
}
const toPrev = (item: OrderAwards, index: number) => {
  awards.value.splice(index - 1, 0, awards.value.splice(index, 1)[0])
}
const toNext = (item: OrderAwards, index: number) => {
  awards.value.splice(index + 1, 0, awards.value.splice(index, 1)[0])
}

watch(
  () => awards.value,
  () => {
    if (awards.value) {
      const omits: Awards[] = []
      awards.value.forEach((award) => {
        const { canToNext, canToPrev, ...data } = award
        omits.push(data)
      })
      userProfile.value.awards = toRaw(omits)
    }
  }
)

const { $dayjs } = useNuxtApp()
const formatDate = (date: any) => {
  return $dayjs(date).format('YYYY-MM')
}

const validateForm = () => {
  return true
}

defineExpose({
  validateForm
})
</script>

<template>
  <ProfileItemBase :label="$props.tab.name">
    <UFormGroup label="수상 및 활동 정보">
      <div class="space-y-4 py-3">
        <div v-for="(item, index) in awards">
          <div class="ml-auto text-right">
            <UButtonGroup size="xs" orientation="horizontal">
              <UButton
                icon="i-heroicons-chevron-up"
                color="gray"
                :disabled="!item.canToPrev"
                @click="toPrev(item, index)"
              >
              </UButton>
              <UButton
                icon="i-heroicons-chevron-down"
                color="gray"
                :disabled="!item.canToNext"
                @click="toNext(item, index)"
              >
              </UButton>
              <UButton
                icon="i-heroicons-x-mark"
                color="gray"
                @click="onClickDeleteAwards(index)"
              ></UButton>
            </UButtonGroup>
          </div>
          <div class="mt-2 space-y-3">
            <UFormGroup label="수상 및 활동" required>
              <URadioGroup
                class="[&>fieldset]:space-y-1"
                @change="(val) => onChangeAwardsType(val, index)"
                :model-value="item.type"
                :options="[
                  { label: '수상', value: 'awards' },
                  { label: '활동', value: 'activity' }
                ]"
              />
            </UFormGroup>

            <UFormGroup label="수상 및 활동명" required>
              <UInput
                v-model="item.name"
                placeholder="수상 및 활동명을 입력하세요."
              />
            </UFormGroup>

            <UFormGroup label="소속 및 기관">
              <UInput v-model="item.where" placeholder="소속 및 기관" />
            </UFormGroup>

            <div class="flex flex-nowrap [&>*]:flex-1 space-x-2">
              <UFormGroup label="시작일 (수상일)">
                <UPopover>
                  <UButton block>
                    시작일
                    <span v-if="item.startDate">
                      {{ formatDate(item.startDate) }}
                    </span>
                  </UButton>

                  <template #panel="{ close }">
                    <DatePicker
                      :model-value="
                        item.startDate ? new Date(item.startDate) : null
                      "
                      @update:model-value="
                        (val) => (item.startDate = val.getTime())
                      "
                      @close="close"
                    />
                  </template>
                </UPopover>
              </UFormGroup>

              <UFormGroup v-if="item.type === 'activity'" label="종료일">
                <UPopover>
                  <UButton block>
                    종료일
                    <span v-if="item.endDate">
                      {{ formatDate(item.endDate) }}
                    </span>
                  </UButton>

                  <template #panel="{ close }">
                    <DatePicker
                      :model-value="
                        item.endDate ? new Date(item.endDate) : null
                      "
                      @update:model-value="
                        (val) => (item.endDate = val.getTime())
                      "
                      @close="close"
                    />
                  </template>
                </UPopover>
              </UFormGroup>
            </div>
          </div>
        </div>
      </div>
    </UFormGroup>

    <UButton
      leading-icon="i-heroicons-plus-solid"
      size="lg"
      block
      color="gray"
      @click="onClickAddAwards"
    >
      수상 및 활동 추가하기
    </UButton>
  </ProfileItemBase>
</template>
