import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const MainScreen = () => {
    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 bg-white items-center justify-center">
                <Text className="text-[24px]">MainScreen</Text>
            </View>
        </SafeAreaView>
    )
}

export default MainScreen