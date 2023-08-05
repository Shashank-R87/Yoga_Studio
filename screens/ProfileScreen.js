import { View, Text, TouchableOpacity, Alert, Modal, TextInput, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar';
import { auth, database } from '../firebase'
import { EmailAuthProvider, deleteUser, onAuthStateChanged, reauthenticateWithCredential, sendEmailVerification, signOut } from 'firebase/auth'
import { useNavigation, useRoute } from '@react-navigation/native'
import LottieView from "lottie-react-native"
import { child, get, ref, remove } from 'firebase/database';

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
    const [userAge, setuserAge] = useState();

    const [deletePassword, setDeletePassword] = useState();

    const [modalVisible, setModalVisible] = useState(false);

    const firebase_auth = auth;
    const user = firebase_auth.currentUser;
    const firebase_db = database;
    const firebase_db_ref = ref(firebase_db);

    const getUser = async () => {
        await onAuthStateChanged(firebase_auth, (response) => {
            if (response) {
                setuserEmail(response.email);
                setuserdisplayName(response.displayName);
                setusershortName(response.displayName.split(" ")[0]);
                setEmailverification(response.emailVerified);
                get(child(firebase_db_ref, `users/${response.uid}`))
                    .then((snapshot) => {
                        if (snapshot.exists()){
                            setuserAge(snapshot.val().userAge)
                        }
                        else{
                            Alert.alert("No User Data", "User data not found", ["Ok"])
                        }
                    })
                    .catch((e)=>{
                        Alert.alert(e.code, e.message, ["Ok"])
                    })
                setTimeout(() => {
                    setloggedIn(true);
                }, 1000)
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

    const [deleting, setDeleting] = useState(false);
    const delete_User = async () => {
        setDeleting(true);
        const cred = EmailAuthProvider.credential(user.email, deletePassword)

        await reauthenticateWithCredential(user, cred)
            .then(() => {
                remove(ref(firebase_db, 'users/' + user.uid))
                deleteUser(user)
                    .then(() => {
                        navigation.replace("LoginSignup");
                    })
                    .catch((e) => {
                        setDeleting(false);
                        setModalVisible(false);
                        Alert.alert(e.code, e.message, ["Ok"]);
                    })
            })
            .catch((e) => {
                setDeleting(false);
                setModalVisible(false);
                Alert.alert(e.code, e.message, ["Ok"])
            })
    }

    const getPassword = () => {
        delete_User();
    }

    useEffect(() => {
        getUser();
    }, [])

    const [secure, setSecure] = useState(true);

    return (
        <SafeAreaView style={{ paddingHorizontal: 25, paddingVertical: 25 }} className="flex-1 justify-start items-center">
            {
                !loggedIn ?

                    <View className="flex items-center justify-center">
                        <LottieView
                            className="justify-center items-center"
                            style={{ width: "70%", height: "70%" }}
                            autoPlay
                            source={require("../assets/lottie/newScene.json")}
                        />
                    </View>
                    :
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
                            <View style={{ gap: 10, maxWidth: "70%" }} className="flex-row justify-start items-start">
                                <Text style={{ fontFamily: "PoppinsRegular", fontSize: 16 }} className="text-[#565656]">Your age :</Text>
                                <Text style={{ fontFamily: "PoppinsRegular", fontSize: 16 }} className="text-black">{userAge}</Text>
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
            }

            <Modal animationType='fade' statusBarTranslucent={true} transparent={true} visible={modalVisible}>
                <View className="flex-1 justify-center items-center bg-[#00000032]">
                    {
                        !deleting ?

                            <View style={{ minHeight: "30%", maxHeight: "40%", minWidth: "90%", maxWidth: "90%", gap: 20, padding: 20, paddingTop: 80 }} className="bg-[#fff] items-center justify-center rounded-[20px]" >
                                <Pressable onPress={() => { setModalVisible(false) }} style={{ position: 'absolute', top: 20, right: 20 }}>
                                    <Image source={require("../assets/icons/close.png")} />
                                </Pressable>
                                <View>
                                    <Text style={{ textAlign: 'center', fontFamily: "PoppinsRegular", fontSize: 14, paddingHorizontal: 30 }}>To delete your account, enter the password for</Text>
                                    <Text style={{ textAlign: 'center', fontFamily: "PoppinsMedium", fontSize: 14, paddingHorizontal: 30 }}>{user.email}</Text>
                                </View>
                                <View className="flex justify-center">
                                    <TextInput secureTextEntry={secure} onChangeText={(text) => { setDeletePassword(text) }} returnKeyType='done' cursorColor={"grey"} textContentType='password' style={{ paddingHorizontal: 24, fontFamily: "PoppinsRegular", minWidth: "90%", height: 60, fontSize: 16 }} placeholderTextColor={"#92979E"} className="text-[#383838] pt-[4px] border-[2px] border-[#E5E6EB] rounded-full focus:border-[#383838]" placeholder='Password' />
                                    {
                                        secure ?
                                            <Pressable onPress={() => { setSecure(false) }} className="absolute right-[30px]">
                                                <Image style={{ width: 24, height: 24 }} source={require("../assets/icons/eye.png")} />
                                            </Pressable>
                                            :
                                            <Pressable onPress={() => { setSecure(true) }} className="absolute right-[30px]">
                                                <Image style={{ width: 24, height: 24 }} source={require("../assets/icons/closed-eye.png")} />
                                            </Pressable>
                                    }
                                </View>
                                <TouchableOpacity onPress={() => { getPassword() }} activeOpacity={0.7} style={{ paddingVertical: 16, minWidth: "90%" }} className="flex cursor-pointer justify-center items-center bg-[#E63946] rounded-full">
                                    <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14 }} className="text-[#fff] pt-[4px]">Continue</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{ minHeight: "30%", maxHeight: "40%", minWidth: "90%", maxWidth: "90%", gap: 10, padding: 20 }} className="bg-[#fff] items-center justify-center rounded-[20px]" >
                                <View className="justify-center items-center">
                                    <Text style={{ textAlign: 'center', fontFamily: "PoppinsRegular", fontSize: 14, paddingHorizontal: 30 }}>Reauthenticating and deleting your account</Text>
                                    <LottieView
                                        className="justify-center items-center"
                                        style={{ width: "60%", height: "60%" }}
                                        autoPlay
                                        source={require("../assets/lottie/newScene.json")}
                                    />
                                    <Text style={{ textAlign: 'center', fontFamily: "PoppinsMedium", fontSize: 14, paddingHorizontal: 30 }}>You will be redirected automatically</Text>
                                </View>
                            </View>
                    }
                </View>

            </Modal>
            <StatusBar style='dark' />
        </SafeAreaView>
    )
}

export default ProfileScreen