import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar';
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Speech from 'expo-speech';

const ProfileScreen = () => {
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
        <SafeAreaView style={{ paddingHorizontal: 24 }} className="flex-1 justify-center items-center">
            <View style={{ gap: 20, minWidth: "100%" }} className="flex items-start justify-start">
                <Text>Display Name: {userdisplayName}</Text>
                <Text>UID: {userUID}</Text>
                <Text>Email: {userEmail}</Text>
                {(loggedIn) ?
                    <TouchableOpacity onPress={() => { usersignOut() }} activeOpacity={0.7} style={{ paddingVertical: 16, minWidth: "100%" }} className="flex cursor-pointer justify-center items-center bg-[white] rounded-[100px] border-[#E63946] border-[1px]" >
                        <Text style={{ fontFamily: "PoppinsMedium", fontSize: 16 }} className="text-[#E63946] pt-[4px]">SIGN OUT</Text>
                    </TouchableOpacity>
                    :
                    <View></View>
                }
            </View>
            <StatusBar style='dark' />
        </SafeAreaView>
    )
}

export default ProfileScreen