import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AnimatedLottieView from 'lottie-react-native'
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar';
import { useNavigation } from '@react-navigation/native'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

const MainScreen = () => {
    NavigationBar.setBackgroundColorAsync("#E63946");

    const navigation = useNavigation();

    const firebase_auth = auth;

    const getUser = async () => {
        await onAuthStateChanged(firebase_auth, (response) => {
            if (response) {
                // // setloggedIn(true);
                // console.log("\n\nChecking if the user persists");
                // console.log("UID: ", response.uid);
                // console.log("Email: ", response.email);
                // console.log("Email Verified: ", response.emailVerified);
                navigation.replace("HomeScreen");
            }
            else {
                navigation.replace("LoginSignup");
            }
        })
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-[#E63946] items-center justify-center">
            <AnimatedLottieView className="w-[300px]" autoPlay source={require("../assets/lottie/loading.json")} />
            <StatusBar style='light' />
        </SafeAreaView>
    )
}

export default MainScreen