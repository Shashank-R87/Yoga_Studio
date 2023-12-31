import { View, Text, Image, TextInput, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { auth, database } from '../firebase'
import { updateProfile } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { ref, set } from 'firebase/database'

const AboutYou = () => {

    const navigation = useNavigation();

    const firebase_auth = auth;
    const firebase_db = database;

    const [name, setName] = useState(null);
    const [age, setAge] = useState(null);
    const [cont, contEnable] = useState(false);

    useEffect(() => {
        if (name && age) {
            contEnable(true);
        }
        else {
            contEnable(false);
        }
    }, [name, age])


    //Update user's profile with Display_Name
    const setDisplayname = () => {
        updateProfile(firebase_auth.currentUser, {
            displayName: name
        })
            .then(() => {
                set(ref(firebase_db, "users/"+firebase_auth.currentUser.uid),{
                    displayName: firebase_auth.currentUser.displayName,
                    email : firebase_auth.currentUser.email,
                    userAge: age
                })
                navigation.replace("MainHome");
            })
            .catch((e) => {
                Alert.alert(e.code, e.message, ["Ok"]);
            })
    }



    return (
        <SafeAreaView style={{ paddingHorizontal: 25, paddingVertical: 87 }} className="flex-1 justify-center items-center">
            <View className="flex-col items-center justify-start" style={{ paddingVertical: 10, gap: 50 }}>
                <Image source={require("../assets/icons/icon_dark.png")} />
                <View style={{ gap: 24 }} className="flex-col justify-center items-center">
                    <View className="flex items-center justify-center">
                        <Text style={{ fontFamily: "PoppinsMedium", fontSize: 24 }}>Tell us about you</Text>
                    </View>
                    <View style={{ gap: 20 }} className="flex-col justify-center items-center">
                        <TextInput onChangeText={(value) => { setName(value) }} returnKeyType='done' inputMode='text' style={{ fontFamily: "PoppinsRegular", fontSize: 16, minWidth: "100%", height: 60, paddingHorizontal: 24 }} className="border-2 border-[#E5E6EB] rounded-full pt-[4px] focus:border-[#383838]" cursorColor={"grey"} placeholderTextColor={"#92979E"} placeholder='Name' />
                        <TextInput onChangeText={(value) => { setAge(value) }} returnKeyType='done' inputMode='numeric' keyboardType='number-pad' style={{ fontFamily: "PoppinsRegular", fontSize: 16, minWidth: "100%", height: 60, paddingHorizontal: 24 }} className="border-2 border-[#E5E6EB] rounded-full pt-[4px] focus:border-[#383838]" cursorColor={"grey"} placeholderTextColor={"#92979E"} placeholder='Age' />
                        {
                            cont ?
                                <Pressable onPress={() => { setDisplayname(); }} style={{ paddingHorizontal: 24, minWidth: "100%", height: 60 }} className="flex items-center justify-center bg-[#E63946] rounded-full">
                                    <Text style={[{ color: "#fff" }, { fontFamily: "PoppinsRegular", fontSize: 16 }]} className="pt-[4px]">Continue</Text>
                                </Pressable>
                                :
                                <Pressable style={{ paddingHorizontal: 24, minWidth: "100%", height: 60 }} className="flex items-center justify-center bg-[#E5E6EB] rounded-full">
                                    <Text style={[{ color: "#92979E" }, { fontFamily: "PoppinsRegular", fontSize: 16 }]} className="pt-[4px]">Continue</Text>
                                </Pressable>
                        }
                    </View>
                </View>
            </View>
            <StatusBar style='dark' />
        </SafeAreaView>
    )
}

export default AboutYou