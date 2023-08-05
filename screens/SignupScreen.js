import { View, Text, Image, TextInput, Pressable, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar';
import { useNavigation } from '@react-navigation/native';
import { app, auth } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

NavigationBar.setBackgroundColorAsync("white");

const SignupScreen = () => {

    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");

    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordEnable, setpasswordEnable] = useState(false);
    const [continueEnable, setcontinueEnable] = useState(false);

    const printEmailPassword = () => {
        console.log("Email: ", email, "| Password: ", password);
    }

    const firebase_auth = auth;

    const signUp = () => {
        createUserWithEmailAndPassword(firebase_auth, email, password)
            .then((response) => {
                const user = response.user;
                navigation.replace("AboutYou");
            })
            .catch((error) => {
                Alert.alert(error.code, error.message, ["Ok"]);
            })
    }

    useEffect(() => {
        if (email) {
            setpasswordEnable(true);
        }
        if (email && password) {
            setcontinueEnable(true);
        }
    }, [email, password])

    const [secure, setSecure] = useState(true);

    return (
        <SafeAreaView style={{ paddingHorizontal: 25, paddingVertical: 58 }} className="flex-1 justify-center items-center">
            <View style={{ paddingVertical: 6.67, gap: 50 }} className="flex-col items-center">
                <Image source={require("../assets/icons/icon_dark.png")} />
                <View style={{ gap: 16 }} className="flex-col items-center justify-center">
                    <View style={{ gap: 13.3, paddingVertical: 10 }} className="flex-col items-center">
                        <Text style={{ fontFamily: "PoppinsMedium", fontSize: 24 }} >Create your account</Text>
                        <View className="flex-col items-center">
                            <View style={{ gap: 10 }} className="flex-col items-center justify-center">
                                <TextInput returnKeyType='done' onChangeText={(text) => { setEmail(text) }} cursorColor={"grey"} textContentType='emailAddress' inputMode='email' style={{ paddingHorizontal: 24, fontFamily: "PoppinsRegular", minWidth: "100%", height: 60, fontSize: 16 }} placeholderTextColor={"#92979E"} className="text-[#383838] pt-[4px] border-[2px] border-[#E5E6EB] rounded-full focus:border-[#383838]" placeholder='Email address' />
                                {passwordEnable ?
                                    <View style={{ maxWidth: "100%", minWidth: "100%" }} className="flex-row items-center justify-start">
                                        <TextInput secureTextEntry={secure} returnKeyType='done' onChangeText={(text) => { setPassword(text) }} cursorColor={"grey"} textContentType='password' style={{ paddingHorizontal: 24, fontFamily: "PoppinsRegular", minWidth: "100%", height: 60, fontSize: 16 }} placeholderTextColor={"#92979E"} className="text-[#383838] pt-[4px] border-[2px] border-[#E5E6EB] rounded-full focus:border-[#383838]" placeholder='Password' />
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
                                    :
                                    <View></View>
                                }
                                {
                                    continueEnable ?
                                        <Pressable onPress={() => { signUp(); }} style={[{
                                            backgroundColor: "#E63946",
                                        }, { minWidth: "100%", height: 60, display: "flex", alignItems: "center", justifyContent: 'center', borderRadius: 100 }]}>
                                            <Text style={[{ color: "white" }, { fontFamily: "PoppinsRegular", fontSize: 16, paddingTop: 4 }]}>Continue</Text>
                                        </Pressable>
                                        :
                                        <Pressable style={[{
                                            backgroundColor: "#E5E6EB",
                                        }, { minWidth: "100%", height: 60, display: "flex", alignItems: "center", justifyContent: 'center', borderRadius: 100 }]}>
                                            <Text style={[{ color: "#92979E" }, { fontFamily: "PoppinsRegular", fontSize: 16, paddingTop: 4 }]}>Continue</Text>
                                        </Pressable>
                                }
                            </View>
                            <View style={{ paddingHorizontal: 10, paddingVertical: 10, gap: 10 }} className="flex-row justify-center items-center">
                                <Text style={{ fontFamily: "PoppinsLight", fontSize: 14, color: "black" }}>Already have an account?</Text>
                                <Text onPress={() => { navigation.replace("LogIn") }} style={{ fontFamily: "PoppinsLight", fontSize: 14, color: "#E63946" }}>Log in</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 10, gap: 10 }} className="flex-row items-center justify-center">
                        <Text style={{ color: "#92979E", fontFamily: "PoppinsLight", fontSize: 14 }}>OR</Text>
                    </View>
                    <View style={{ gap: 13.3 }} className="flex-col justify-center items-center">
                        <TouchableOpacity activeOpacity={0.5} onPress={() => { console.log("Continue with google pressed") }} style={{ minWidth: "100%", paddingHorizontal: 24, paddingVertical: 10, gap: 10 }} className="flex-row border-[2px] border-[#E5E6EB] rounded-full items-center">
                            <Image source={require("../assets/icons/Google.png")} />
                            <Text className="pt-[4px]" style={{ fontFamily: "PoppinsLight", fontSize: 14 }}>Continue with Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => { console.log("Continue with microsoft pressed") }} style={{ minWidth: "100%", paddingHorizontal: 24, paddingVertical: 10, gap: 10 }} className="flex-row border-[2px] border-[#E5E6EB] rounded-full items-center">
                            <Image source={require("../assets/icons/Microsoft.png")} />
                            <Text className="pt-[4px]" style={{ fontFamily: "PoppinsLight", fontSize: 14 }}>Continue with Microsoft Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <StatusBar style='dark' />
        </SafeAreaView>
    )
}

export default SignupScreen