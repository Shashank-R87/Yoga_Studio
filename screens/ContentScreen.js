import { View, Text, Image, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as NavigationBar from 'expo-navigation-bar';
import { useNavigation, useRoute } from '@react-navigation/native'
import LottieView from 'lottie-react-native'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase';
import AsanaCard from '../components/AsanaCard';
import AsanaCardLarge from '../components/AsanaCardLarge';
import { StatusBar } from 'expo-status-bar';

const ContentScreen = () => {
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
                setTimeout(() => {
                    setloggedIn(true);
                }, 1000)
            }
        })
    }

    const [loading, setLoading] = useState(true);
    const [poses, setPoses] = useState([]);
    const poseNames = async () => {
        await fetch("https://pqxc11fj.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22asana%22%5D%7B%0A++_id%2C+en_name%2C+imgUrl%0A%7D")
            .then((response) => response.json())
            .then((result) => {
                setPoses(result.result)
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
            })
    }

    const [showModal, setshowModal] = useState(false);
    const [gotData, setgotData] = useState(false);
    const [poseData, setposeData] = useState({})
    const getId = async (id) => {
        setshowModal(true);
        // console.log(id);
        await fetch(`https://pqxc11fj.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_id+%3D%3D+%22${id}%22%5D%0A`)
            .then((response) => response.json())
            .then((result) => {
                // console.log(result.result)
                setTimeout(() => {
                    setposeData(result.result[0]);
                    setgotData(true);
                    // console.log(poseData);
                }, 2000)
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
                    <View style={{ gap: 30, width: "100%" }} className="flex-1 items-start justify-start">
                        <View style={{ gap: -5 }} className="flex items-start justify-start">
                            <Text style={{ fontFamily: "PoppinsLightItalic", fontSize: 20 }}>Hello</Text>
                            <Text style={{ fontFamily: "PoppinsBold", fontSize: 28 }}>{userdisplayName}!</Text>
                        </View>
                        <View style={{ gap: 10, height: "85%", width: "100%" }} className="flex-col justify-start items-start">
                            <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14 }} className="text-[#565656]">Yoga Asanas</Text>
                            <ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 10, alignItems: 'center', width: "100%" }} className="rounded-[10px]">
                                {loading ?
                                    <View style={{ width: "100%", height: "100%" }} className="flex items-center justify-center">
                                        <LottieView
                                            style={{ width: 100, height: 100 }}
                                            autoPlay
                                            source={require("../assets/lottie/newScene.json")}
                                        />
                                    </View>
                                    :
                                    poses.map(pose =>
                                        // <AsanaCardLarge key={pose._id} id={pose._id} title={pose.en_name} img={pose.imgUrl} />
                                        <TouchableOpacity key={pose._id} activeOpacity={0.8} onPress={() => { getId(pose._id) }} style={{ width: "100%", height: 150 }} className="bg-[#000] flex-col justify-end items-start rounded-[10px]" >
                                            <Image className="rounded-[10px]" style={{ width: 362, height: 150, position: 'absolute', top: 0, right: 0, overflow: 'hidden' }} resizeMode='center' source={{ uri: pose.imgUrl }} />
                                            <View style={{ width: "100%", height: 150, paddingHorizontal: 20, paddingVertical: 20 }} className="bg-[#00000047] flex-col justify-end items-start rounded-[10px]">
                                                {
                                                    pose.en_name.length > 24 ?
                                                        <Text className="color-white" style={{ fontFamily: "PoppinsMedium", fontSize: 18, textAlign: "left" }}>{pose.en_name.slice(0, 24)} ...</Text>
                                                        :
                                                        <Text className="color-white" style={{ fontFamily: "PoppinsMedium", fontSize: 18, textAlign: "left" }}>{pose.en_name}</Text>
                                                }
                                            </View>
                                        </TouchableOpacity >
                                    )
                                }
                            </ScrollView>
                        </View>
                    </View>
            }
            <Modal
                animationType='slide'
                transparent={true}
                statusBarTranslucent={true}
                onRequestClose={() => { setshowModal(false); setgotData(false) }}
                visible={showModal}
            >
                <View style={{ width: "100%", height: "100%" }} className="bg-[#00000028] flex-1">
                    {
                        !gotData ?
                            <View style={{ width: "100%", height: "83%", padding: 25, borderTopLeftRadius: 20, borderTopRightRadius: 20, gap: 30 }} className="bg-white absolute bottom-0 justify-center items-center">
                                <LottieView
                                    className="justify-center items-center"
                                    style={{ width: "50%", height: "50%" }}
                                    autoPlay
                                    source={require("../assets/lottie/newScene.json")}
                                />
                            </View>
                            :
                            <View style={{ width: "100%", height: "83%", padding: 25, borderTopLeftRadius: 20, borderTopRightRadius: 20, gap: 30, paddingTop: 30, paddingBottom: 0 }} className="bg-white absolute bottom-0 justify-start items-center">
                                <Pressable onPress={() => { setshowModal(false); setgotData(false) }} style={{ top: 20, right: 20 }} className="absolute">
                                    <Image style={{ width: 24, height: 24 }} source={require("../assets/icons/Close-Square.png")} />
                                </Pressable>
                                <View style={{ gap: 0 }} className="flex justify-start items-center">
                                    <Text style={{ fontFamily: "PoppinsMedium", fontSize: 22, textAlign: 'center' }}>{poseData.en_name}</Text>
                                    <Text style={{ fontFamily: "PoppinsRegular", fontSize: 16, textAlign: 'center' }} className="text-[#565656]">Utkatasana</Text>
                                </View>
                                <Image style={{ width: "100%", height: 200, borderRadius: 10 }} resizeMode='center' source={{ uri: "https://cdn.yogajournal.com/wp-content/uploads/2021/11/Chair-Pose_Andrew-Clark_2400x1350.jpg" }} />
                                <ScrollView style={{ height: 200 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 30 }}>
                                    <View style={{ gap: 10 }}>
                                        <Text style={{ fontFamily: "PoppinsRegular", fontSize: 16 }}>Description</Text>
                                        <Text className="text-[#565656]" style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>Utkatasana (Chair Pose) is sometimes translated from Sanskrit to English as “Fierce Seat” or “Powerful Pose.” It is a strengthening and heat-building asana that brings all parts of your body together into a cohesive and powerful whole.
                                            This asana is a meditation on determination and perseverance, as well as commitment. To successfully perform Chair Pose, you must seamlessly unite the strength of the legs, arms, and torso as you lift your core muscles and lengthen your spine.</Text>
                                    </View>
                                    <View style={{ gap: 10 }}>
                                        <Text style={{ fontFamily: "PoppinsRegular", fontSize: 16 }}>Benefits</Text>
                                        <Text className="text-[#565656]" style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>Chair Pose improves balance and can build cardiovascular health and resilience. It particularly strengthens your core, thighs, and ankles.</Text>
                                    </View>
                                    <View style={{ gap: 10 }}>
                                        <Text style={{ fontFamily: "PoppinsRegular", fontSize: 16 }}>Step by step instructions</Text>
                                        <View style={{ maxWidth: "95%" }} className="flex-row justify-start items-start">
                                            <Text className="text-[#565656]" style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>1. </Text>
                                            <Text className="text-[#565656]" style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>Stand in Tadasana. Inhale and raise your arms overhead so that your biceps are just slightly in front of your ears. Either keep the arms parallel, palms facing inward, or join the palms.</Text>
                                        </View>
                                        <View style={{ maxWidth: "95%" }} className="flex-row justify-start items-start">
                                            <Text className="text-[#565656]" style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>1. </Text>
                                            <Text className="text-[#565656]" style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>Stand in Tadasana. Inhale and raise your arms overhead so that your biceps are just slightly in front of your ears. Either keep the arms parallel, palms facing inward, or join the palms.</Text>
                                        </View>
                                        <View style={{ maxWidth: "95%" }} className="flex-row justify-start items-start">
                                            <Text className="text-[#565656]" style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>1. </Text>
                                            <Text className="text-[#565656]" style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>Stand in Tadasana. Inhale and raise your arms overhead so that your biceps are just slightly in front of your ears. Either keep the arms parallel, palms facing inward, or join the palms.</Text>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                    }
                </View>
            </Modal>
            <StatusBar style='dark' />
        </SafeAreaView>
    )
}

export default ContentScreen