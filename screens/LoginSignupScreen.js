import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar';
import { useNavigation } from '@react-navigation/native';

NavigationBar.setBackgroundColorAsync("white");

const LoginSignupScreen = () => {
    
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1 justify-center items-center">
            <View style={{minWidth: "100%", height:"32%"}} className="absolute items-center justify-center bg-[#E63946] rounded-[10px] top-0">
                <Image source={require("../assets/icons/icon_light.png")}/>
            </View>
            <View style={{paddingHorizontal:10, paddingVertical:33, gap:36}} className="flex-col items-center justify-center">
                <View className="flex-col gap-[16px] pl-[16px] pr-[16px] pt-[1px] pb-[1px] items-center justify-center">
                    <Text style={{fontFamily:"PoppinsMedium", fontSize:20}}>Welcome to Yoga Studio .</Text>
                    <Text style={{fontFamily:"PoppinsLight", fontSize:14}}>Login with your account to continue</Text>
                </View>
                <View style={{paddingVertical:10, paddingHorizontal:33, gap:24}} className="flex-col items-center justify-center">
                    <TouchableOpacity onPress={()=>{navigation.navigate("LogIn")}} activeOpacity={0.8} style={{paddingVertical:16, minWidth: "100%"}} className="flex cursor-pointer justify-center items-center bg-[#E63946] rounded-[100px]">
                        <Text style={{fontFamily:"PoppinsMedium", fontSize:16}} className="text-white pt-[4px]">LOG IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate("SignUp")}} activeOpacity={0.7} style={{paddingVertical:16, minWidth: "100%"}} className="flex cursor-pointer justify-center items-center bg-[white] rounded-[100px] border-[#E63946] border-[1px]" >
                        <Text style={{fontFamily:"PoppinsMedium", fontSize:16}} className="text-[#E63946] pt-[4px]">SIGN UP</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <StatusBar style='dark'/>
        </SafeAreaView>
    )
}

export default LoginSignupScreen