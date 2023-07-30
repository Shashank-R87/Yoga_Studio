import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar';
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigation, useRoute } from '@react-navigation/native'

const HomeScreen = () => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");

    const navigation = useNavigation();
    const route = useRoute();

    const [loggedIn, setloggedIn] = useState(false);

    const [userEmail, setuserEmail] = useState();
    const [userUID, setuserUID] = useState();
    const [userdisplayName, setuserdisplayName] = useState();

    const firebase_auth = auth;

    const getUser = async () => {
        await onAuthStateChanged(firebase_auth, (response) => {
            if (response) {
                setloggedIn(true);
                setuserEmail(response.email);
                setuserUID(response.uid);
                setuserdisplayName(response.displayName);
            }
        })
    }

    //Sign Out Function
    const usersignOut = () => {
        signOut(firebase_auth)
            .then(() => {
                // Alert.alert("SignOut", "Successfully signed out", ["Ok"]);
                navigation.replace("LoginSignup");
            })
            .catch(() => {
                Alert.alert("Failed", "Sign out failed", ["Ok"]);
            })
    }

    useEffect(() => {
        getUser();
        console.log("Current Screen Name: ", route.name);
    }, [])

    return (
        <SafeAreaView style={{ paddingHorizontal: 25, paddingVertical: 25 }} className="flex-1 justify-start items-start">
            <View style={{gap: -5}} className="flex items-start justify-start">
                <Text style={{fontFamily: "PoppinsLightItalic", fontSize: 20}}>Hello</Text>
                <Text style={{fontFamily: "PoppinsBold", fontSize: 28}} className="text-blue-700">{userdisplayName}</Text>
            </View>
            <StatusBar style='dark' />
        </SafeAreaView>
    )
}

export default HomeScreen