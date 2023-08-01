import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar';
import { useNavigation } from '@react-navigation/native'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import LottieView from 'lottie-react-native'
import InitialLoader from '../components/InitialLoader';

const MainScreen = () => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");

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
                navigation.replace("MainHome");
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
            <InitialLoader />
            <StatusBar style='light' />
        </SafeAreaView>
    )
}

export default MainScreen