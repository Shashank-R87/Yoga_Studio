import { View, Text, TouchableOpacity, Alert, Modal, TextInput, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar';
import { auth } from '../firebase'
import { EmailAuthProvider, deleteUser, onAuthStateChanged, reauthenticateWithCredential, sendEmailVerification, signOut } from 'firebase/auth'
import { useNavigation, useRoute } from '@react-navigation/native'
import AlertFunction from '../components/AlertFunction';

const ProfileScreen = () => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");

    const navigation = useNavigation();
    const route = useRoute();

    const [loggedIn, setloggedIn] = useState(false);

    const [userEmail, setuserEmail] = useState();
    const [userdisplayName, setuserdisplayName] = useState();
    const [usershortName, setusershortName] = useState();
    const [emailVerified, setEmailverification] = useState();

    const [deletePassword, setDeletePassword] = useState();

    const [modalVisible, setModalVisible] = useState(false);

    const firebase_auth = auth;
    const user = firebase_auth.currentUser;

    const getUser = async () => {
        await onAuthStateChanged(firebase_auth, (response) => {
            if (response) {
                setloggedIn(true);
                setuserEmail(response.email);
                setuserdisplayName(response.displayName);
                setusershortName(response.displayName.split(" ")[0]);
                setEmailverification(response.emailVerified);
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
                Alert.alert("Failed", "Log out failed", ["Ok"]);
            })
    }

    // const verifyEmail = () => {
    //     sendEmailVerification(user)
    //     .then(()=>{
    //         Alert.alert("Verification Sent","Email Verification sent to "+user.email, ["Ok"]);
    //     })
    //     .catch((e)=>{
    //         Alert.alert(e.code, e.message, ["Ok"]);
    //     })
    // }

    const delete_User = async () => {

        const cred = EmailAuthProvider.credential(user.email, deletePassword)

        await reauthenticateWithCredential(user, cred)
            .then(() => {
                console.log("Reauthenticated");
            })
            .catch((e) => {
                Alert.alert(e.code, e.message, ["Ok"])
            })
        // deleteUser(user)
        //     .then(() => {
        //         navigation.replace("LoginSignup");
        //     })
        //     .catch((e) => {
        //         Alert.alert(e.code, e.message, ["Ok"]);
        //     })
    }

    const getPassword = () => {
        setModalVisible(false);
        delete_User();
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
                                    <Text onPress={()=>{verifyEmail()}} style={{ fontFamily: "PoppinsRegular", fontSize: 16 }} className="text-[#2058ff]">Verify</Text>
                                </View>
                        }
                    </View> */}
                </View>
                {(loggedIn) ?
                    <TouchableOpacity onPress={() => { setModalVisible(true) }} activeOpacity={0.7} style={{ paddingVertical: 16, minWidth: "100%" }} className="flex cursor-pointer justify-center items-center bg-[#E63946] rounded-[10px]" >
                        <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14 }} className="text-[#fff] pt-[4px]">Delete Account</Text>
                    </TouchableOpacity>
                    :
                    <View></View>
                }
                {(loggedIn) ?
                    <TouchableOpacity onPress={() => { usersignOut() }} activeOpacity={0.7} style={{ paddingVertical: 16, minWidth: "100%" }} className="flex cursor-pointer justify-center items-center bg-black rounded-[10px]" >
                        <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14 }} className="text-[#fff] pt-[4px]">LOG OUT</Text>
                    </TouchableOpacity>
                    :
                    <View></View>
                }
            </View>
            <Modal animationType='fade' onRequestClose={() => { setModalVisible(false) }} statusBarTranslucent={true} transparent={true} visible={modalVisible}>
                <View className="flex-1 justify-center items-center bg-[#00000032]">
                    <View style={{ minHeight: "30%", maxHeight: "40%", minWidth: "90%", maxWidth: "90%", gap: 20, padding: 20, paddingTop: 80 }} className="bg-[#fff] items-center justify-center rounded-[20px]" >
                        <Pressable onPress={() => { setModalVisible(false) }} style={{ position: 'absolute', top: 20, right: 20 }}>
                            <Image source={require("../assets/icons/close.png")} />
                        </Pressable>
                        <Text style={{ textAlign: 'center', fontFamily: "PoppinsRegular", fontSize: 14, paddingHorizontal: 30 }}>To delete your account, enter the password for {user.email}</Text>
                        <TextInput onChangeText={(text) => { setDeletePassword(text) }} returnKeyType='done' cursorColor={"grey"} textContentType='password' style={{ paddingHorizontal: 24, fontFamily: "PoppinsRegular", minWidth: "90%", height: 60, fontSize: 16 }} placeholderTextColor={"#92979E"} className="text-[#383838] pt-[4px] border-[2px] border-[#E5E6EB] rounded-full focus:border-[#383838]" placeholder='Password' />
                        <TouchableOpacity onPress={() => { getPassword() }} activeOpacity={0.7} style={{ paddingVertical: 16, minWidth: "90%" }} className="flex cursor-pointer justify-center items-center bg-[#E63946] rounded-full">
                            <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14 }} className="text-[#fff] pt-[4px]">Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <StatusBar style='dark' />
        </SafeAreaView>
    )
}

export default ProfileScreen