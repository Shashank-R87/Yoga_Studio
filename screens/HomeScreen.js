import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar';
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsanaCard from '../components/AsanaCard';
import WorkoutCard from '../components/WorkoutCard';
import LottieView from "lottie-react-native";

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
                setuserEmail(response.email);
                setuserUID(response.uid);
                setuserdisplayName(response.displayName.split(" ")[0]);
                setTimeout(()=>{
                    setloggedIn(true);
                }, 1000)
            }
        })
    }

    const [loading, setLoading] = useState(true);
    const [poses, setPoses] = useState([]);
    const poseNames = async () => {
        await fetch("https://pqxc11fj.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22asana%22%5D%7B%0A++_id%2C+en_name%0A%7D")
            .then((response) => response.json())
            .then((result) => {
                setPoses(result.result)
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
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
        poseNames();
    }, [])

    return (
        <SafeAreaView style={{ paddingHorizontal: 25, paddingVertical: 25, gap: 30, paddingBottom: 75, borderRadius: 20 }} className="flex-1 justify-center items-center">
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
                    <View style={{gap:30}} className="flex-1 items-start justify-start">
                        <View style={{ gap: -5 }} className="flex items-start justify-start">
                            <Text style={{ fontFamily: "PoppinsLightItalic", fontSize: 20 }}>Hello</Text>
                            <Text style={{ fontFamily: "PoppinsBold", fontSize: 28 }}>{userdisplayName}!</Text>
                        </View>
                        <ScrollView className="rounded-[10px]" showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 30, justifyContent: "flex-start", alignItems: 'flex-start' }}>
                            <View style={{ gap: 10, height: 190 }} className="flex-col justify-start items-start">
                                <Text className="text-[#565656]" style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>Few of the Yoga Asanas</Text>
                                <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, alignItems: 'center' }} horizontal className="rounded-[10px]">
                                    {loading ?
                                        <View style={{ width: "100%" }} className="flex items-center justify-center">
                                            <LottieView
                                                style={{ width: 100, height: 100 }}
                                                autoPlay
                                                source={require("../assets/lottie/newScene.json")}
                                            />
                                        </View>
                                        :
                                        poses.map(pose =>
                                            <AsanaCard key={pose._id} title={pose.en_name} />
                                        )
                                    }
                                </ScrollView>
                            </View>
                            <View style={{ gap: 10, height: 240 }} className="flex-col justify-start items-start">
                                <Text className="text-[#565656]" style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>Available Yoga Workouts</Text>
                                <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15, alignItems: 'center' }} horizontal className="rounded-[10px]">
                                    <WorkoutCard title="Surya Namaskar" time={6} pcount={12} />
                                    <WorkoutCard title="Beginners'" time={10} pcount={10} />
                                    <WorkoutCard title="Yoga for Back Pain" time={12} pcount={5} />
                                </ScrollView>
                            </View>
                        </ScrollView>
                    </View>
            }

            <StatusBar style='dark' />
        </SafeAreaView>
    )
}

export default HomeScreen