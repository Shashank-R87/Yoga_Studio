import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'

const ContentScreen = () => {

    const route = useRoute();

    useEffect(()=>{
        // console.log("Current Screen Name: ", route.name);
    },[])

    return (
        <SafeAreaView className="flex-1 justify-center items-center">
            <View>
                <Text>Asanas List</Text>
            </View>
        </SafeAreaView>
    )
}

export default ContentScreen