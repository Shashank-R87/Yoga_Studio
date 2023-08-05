import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const WorkoutScreen = () => {

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Text>Workouts</Text>
      </View>
    </SafeAreaView>
  )
}

export default WorkoutScreen