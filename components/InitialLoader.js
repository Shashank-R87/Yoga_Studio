import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const InitialLoader = () => {
    return (
        <View className="flex-1 justify-center items-center">
            <LottieView
                style={{ width: 300, height: 300 }}
                source={require("../assets/lottie/loading.json")}
                autoPlay={true}
            />
        </View>
    )
}

export default InitialLoader