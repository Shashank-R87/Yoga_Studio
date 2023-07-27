import { View, Text, Image, TextInput, Pressable, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

NavigationBar.setBackgroundColorAsync("white");

const LoginScreen = () => {

    const navigation = useNavigation();

    const firebase_auth = auth;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordEnable, setpasswordEnable] = useState(false);
    const [continueEnable, setcontinueEnable] = useState(false);

    const printEmailPassword = () => {
        console.log("LOGIN | Email: ", email, "| Password: ", password);
    }

    const logIn = () => {
        signInWithEmailAndPassword(firebase_auth, email, password)
        .then((response)=>{
            console.log("Logged In");
            const user = response.user;
            console.log(user);
        })
        .catch((error)=>{
            Alert.alert(error.code, error.message, ["Ok"]);
        })
    }

    return (
        <SafeAreaView style={{ paddingHorizontal: 25, paddingVertical: 58 }} className="flex-1 justify-center items-center">
            <View style={{ paddingVertical: 6.67, gap: 50 }} className="flex-col items-center">
                <Image source={require("../assets/icons/icon_dark.png")} />
                <View style={{ gap: 16 }} className="flex-col items-center justify-center">
                    <View style={{ gap: 13.3, paddingVertical: 10 }} className="flex-col items-center">
                        <Text style={{ fontFamily: "PoppinsMedium", fontSize: 24 }} >Log into your account</Text>
                        <View className="flex-col items-center">
                            <View style={{ gap: 10 }} className="flex-col items-center justify-center">
                                <TextInput returnKeyType='done' onEndEditing={() => { email ? setpasswordEnable(true) : setpasswordEnable(false) }} onChangeText={(text) => { setEmail(text) }} cursorColor={"grey"} textContentType='emailAddress' inputMode='email' style={{ paddingHorizontal: 24, fontFamily: "PoppinsRegular", minWidth: "100%", height: 60, fontSize: 16 }} placeholderTextColor={"#92979E"} className="text-[#383838] pt-[4px] border-[2px] border-[#E5E6EB] rounded-full focus:border-[#383838]" placeholder='Email address' />
                                {passwordEnable ?
                                    <TextInput returnKeyType='done' onEndEditing={() => { password ? setcontinueEnable(true) : setcontinueEnable(false) }} onChangeText={(text) => { setPassword(text) }} cursorColor={"grey"} textContentType='password' style={{ paddingHorizontal: 24, fontFamily: "PoppinsRegular", minWidth: "100%", height: 60, fontSize: 16 }} placeholderTextColor={"#92979E"} className="text-[#383838] pt-[4px] border-[2px] border-[#E5E6EB] rounded-full focus:border-[#383838]" placeholder='Password' />
                                    :
                                    <View></View>
                                }
                                {/* <Pressable onPress={() => { console.log(email) }} style={({ pressed }) => [{
                                    backgroundColor: pressed ? "#E63946" : "#E5E6EB",
                                }, { minWidth: "100%", height: 60, display: "flex", alignItems: "center", justifyContent: 'center', borderRadius: 100 }]}>
                                    {({ pressed }) => (
                                        <Text style={[{ color: pressed ? "white" : "#92979E" }, { fontFamily: "PoppinsRegular", fontSize: 16, paddingTop: 4 }]}>Continue</Text>
                                    )}
                                </Pressable> */}
                                {
                                    continueEnable ?
                                        <Pressable onPress={() => { logIn() }} style={[{
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
                                <Text style={{ fontFamily: "PoppinsLight", fontSize: 14, color: "black" }}>Don't have an account?</Text>
                                <Text onPress={() => { navigation.replace("SignUp") }} style={{ fontFamily: "PoppinsLight", fontSize: 14, color: "#E63946" }}>Sign Up</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 10, gap: 10 }} className="flex-row items-center justify-center">
                        <Text style={{ color: "#92979E", fontFamily: "PoppinsLight", fontSize: 14 }}>OR</Text>
                    </View>
                    <View style={{ gap: 13.3 }} className="flex-col justify-center items-center">
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>{console.log("Continue with google pressed")}} style={{ minWidth: "100%", paddingHorizontal: 24, paddingVertical: 10, gap: 10 }} className="flex-row border-[2px] border-[#E5E6EB] rounded-full items-center">
                            <Image source={require("../assets/icons/Google.png")} />
                            <Text className="pt-[4px]" style={{ fontFamily: "PoppinsLight", fontSize: 14 }}>Continue with Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>{console.log("Continue with microsoft pressed")}} style={{ minWidth: "100%", paddingHorizontal: 24, paddingVertical: 10, gap: 10 }} className="flex-row border-[2px] border-[#E5E6EB] rounded-full items-center">
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

export default LoginScreen