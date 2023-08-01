import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const SmallLoading = () => {
    return (
        <View className="flex items-center justify-center">
            <LottieView
                autoPlay={true}
                style={{width: 100, height: 100}}
                source={require("../assets/lottie/LoadingSmall.json")} />
        </View>
    )
}

export default SmallLoading