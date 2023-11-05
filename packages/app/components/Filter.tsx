import React, { useContext } from 'react'
import { Button, Input, Label, Sheet, Slider, Text, XStack, YStack } from 'tamagui'
import { FilterX } from '@tamagui/lucide-icons'
import AnimatedButton from './AnimatedButton'
import { FilterContext } from 'app/provider/FilterContext'
import { ActivityType } from 'app/modals'

export default function Filter({ open, setOpen }) {
  const activityTypeArray = Object.keys(ActivityType)

  const { filter, updateFilter, clearFilter } = useContext(FilterContext)

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal={true}
      open={open}
      onOpenChange={setOpen}
      dismissOnSnapToBottom
    >
      <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
      <Sheet.Handle />
      <Sheet.Frame padding="$4" paddingTop="$8">
        <YStack space="$6">
          <XStack justifyContent="flex-end">
            <AnimatedButton onClick={() => clearFilter()}>
              <FilterX size="$1" />
            </AnimatedButton>
            {/* <
            <Button icon={'FilterX'} chromeless>Clear</Button> */}
          </XStack>

          <RangeSlider label={'Price'} id="price" onChange={updateFilter} filter={filter} />
          <RangeSlider
            label={'Difficulty'}
            id="accessibility"
            onChange={updateFilter}
            filter={filter}
          />
          <XStack alignItems="flex-start" space="$2">
            <Label
              size={'$2'}
              width={80}
              // htmlFor={`participants`}
            >
              Participants
            </Label>
            <XStack width={200}>
              <Input
                // id="participants"
                flex={1}
                size={'$2'}
                placeholder={`Number of participants`}
                onChange={(e) => {
                  updateFilter('participants', e?.nativeEvent?.text)
                }}
              />
            </XStack>
          </XStack>
          <XStack space="$2">
            <Label size={'$2'} width={80}>
              Type
            </Label>
            <XStack flexWrap="wrap" flex={1} space={'$3'}>
              {activityTypeArray.map((activity) => {
                return (
                  <Button
                    theme={`${activity === filter.type ? 'active' : 'light'}`}
                    key={activity}
                    size="$2"
                    style={{ marginBottom: '$3' }}
                    onPress={() => {
                      updateFilter('type', activity)
                    }}
                  >
                    {activity}
                  </Button>
                )
              })}
            </XStack>
          </XStack>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  )
}

function RangeSlider({ label, onChange, id, filter }) {
  return (
    <YStack>
      <XStack alignItems="flex-start" space="$1">
        <Label size={'$2'} width={80}>
          {label}
        </Label>

        <YStack space="$3">
          <XStack justifyContent="space-between">
            <Text fontSize={10}>{id === 'price' ? 'Free' : 'Low'}</Text>
            <Text fontSize={10}>{id === 'price' ? 'Costly' : 'High'}</Text>
          </XStack>
          <XStack justifyContent="space-between">
            <Text fontSize={10}>0</Text>
            <Text fontSize={10}>{filter[id]}</Text>
          </XStack>
          <XStack space="$2" alignItems="center">
            <Slider
              id={`${id}`}
              name={`${id}`}
              value={[filter[id]]}
              onValueChange={(value) => {
                onChange(id, value)
              }}
              max={1}
              min={0}
              step={0.05}
              width={200}
              size={'$2'}
              orientation="horizontal"
            >
              <XStack>
                <Slider.Track>
                  <Slider.TrackActive />
                </Slider.Track>
                <Slider.Thumb index={0} circular elevate />
              </XStack>
            </Slider>
          </XStack>
        </YStack>
      </XStack>
    </YStack>
  )
}
