import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar';
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigation, useRoute } from '@react-navigation/native'

const ProfileScreen = () => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");

    const navigation = useNavigation();
    const route = useRoute();

    const [loggedIn, setloggedIn] = useState(false);

    const [userEmail, setuserEmail] = useState();
    const [userdisplayName, setuserdisplayName] = useState();
    const [usershortName, setusershortName] = useState();

    const firebase_auth = auth;

    const getUser = async () => {
        await onAuthStateChanged(firebase_auth, (response) => {
            if (response) {
                setloggedIn(true);
                setuserEmail(response.email);
                setuserdisplayName(response.displayName);
                setusershortName(response.displayName.split(" ")[0])
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

    const deleteUser = () => {
        const user = firebase_auth.currentUser;
        if (user){
            deleteUser(user)
            .then(() => { 
                navigation.replace("LoginSignup");
            })
            .catch((e)=>{
                Alert.alert(e.code, e.message, ["Ok"]);
            })
        }
    }

    useEffect(() => {
        getUser();
        // console.log("Current Screen Name: ", route.name);
    }, [])

    return (
        <SafeAreaView style={{ paddingHorizontal: 24, paddingVertical: 24 }} className="flex-1 justify-start items-center">
            <View style={{ gap: 30, minWidth: "100%" }} className="flex items-start justify-start">
                <View style={{ gap: -5 }} className="flex items-start justify-start">
                    <Text style={{ fontFamily: "PoppinsLightItalic", fontSize: 20 }}>Hello</Text>
                    <Text style={{ fontFamily: "PoppinsBold", fontSize: 28 }}>{usershortName}!</Text>
                </View>
                <View style={{ gap: 10 }} className="flex-col justify-start items-start">
                    <View style={{ gap: 10, maxWidth: "70%" }} className="flex-row justify-start items-start">
                        <Text style={{ fontFamily: "PoppinsRegular", fontSize: 16 }} className="text-[#565656]">Your name :</Text>
                        <Text style={{ fontFamily: "PoppinsRegular", fontSize: 16 }} className="text-black">{userdisplayName}</Text>
                    </View>
                    <View style={{ gap: 10, maxWidth: "70%" }} className="flex-row justify-start items-start">
                        <Text style={{ fontFamily: "PoppinsRegular", fontSize: 16 }} className="text-[#565656]">Your email :</Text>
                        <Text style={{ fontFamily: "PoppinsRegular", fontSize: 16 }} className="text-black">{userEmail}</Text>
                    </View>
                    {/* <View style={{ gap: 10, maxWidth: "70%" }} className="flex-row justify-start items-start">
                        <Text style={{ fontFamily: "PoppinsRegular", fontSize: 16 }} className="text-[#565656]">Email verification :</Text>
                        {
                            emailVerified ?
                                <Text style={{ fontFamily: "PoppinsRegular", fontSize: 16 }} className="text-[#008000]">Verified</Text>
                                :
                                <View>
                                    <Text style={{ fontFamily: "PoppinsRegular", fontSize: 16 }} className="text-[#ff2020]">Not Verified</Text>
                                </View>
                        }
                    </View> */}
                </View>
                {/* <TouchableOpacity onPress={() => { deleteUser() }} activeOpacity={0.7} style={{ paddingVertical: 16, minWidth: "100%" }} className="flex cursor-pointer justify-center items-center bg-[#E63946] rounded-[10px]" >
                    <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14 }} className="text-[#fff] pt-[4px]">Delete Account</Text>
                </TouchableOpacity> */}
                {(loggedIn) ?
                    <TouchableOpacity onPress={() => { usersignOut() }} activeOpacity={0.7} style={{ paddingVertical: 16, minWidth: "100%" }} className="flex cursor-pointer justify-center items-center bg-black rounded-[10px]" >
                        <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14 }} className="text-[#fff] pt-[4px]">LOG OUT</Text>
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