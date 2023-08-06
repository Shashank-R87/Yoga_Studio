import { View, Text, Image, Pressable, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import AnimatedLottieView from 'lottie-react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FlashList } from '@shopify/flash-list'

const CreateWorkout = () => {

    const [loggedIn, setloggedIn] = useState(false);
    const [userdisplayName, setuserdisplayName] = useState();

    const firebase_auth = auth;

    const getUser = async () => {
        await onAuthStateChanged(firebase_auth, (response) => {
            if (response) {
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
        setLoading(true)
        await fetch("https://pqxc11fj.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%22asana%22%5D%7B%0A++_id%2C+en_name%2C+imgUrl%0A%7D")
            .then((response) => response.json())
            .then((result) => {
                setPoses(result.result)
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            })
    }

    let selectedPoses = []
    const getSelected = (id) =>{
        if (!selectedPoses.includes(id)){
            selectedPoses.push(id)
        }
        else{
            
        }
    }


    useEffect(() => {
        getUser();
        poseNames()
    }, [])

    const [selectAsanasVisible, setSelectAsanasVisible] = useState(false)

    return (
        <SafeAreaView style={{ paddingHorizontal: 25, paddingVertical: 25, gap: 30, paddingBottom: 75, borderRadius: 20 }} className="flex-1 justify-center items-center">
            {
                !loggedIn ?
                    <View className="flex items-center justify-center">
                        <AnimatedLottieView
                            className="justify-center items-center"
                            style={{ width: "70%", height: "70%" }}
                            autoPlay
                            source={require("../assets/lottie/newScene.json")}
                        />
                    </View>
                    :
                    <View style={{ gap: 30, width: "100%", height: "100%" }} className="flex items-start justify-start">
                        <View style={{ gap: -5 }} className="flex items-start justify-start">
                            <Text style={{ fontFamily: "PoppinsLightItalic", fontSize: 20 }}>Hello</Text>
                            <Text style={{ fontFamily: "PoppinsBold", fontSize: 28 }}>{userdisplayName}!</Text>
                        </View>
                        <View style={{ width: "100%", height: "85%" }} className="flex justify-center items-center">
                            <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 16 }} className="text-[#565656] absolute top-0 left-0">Create Yoga Workouts</Text>
                            <Pressable className="rounded-full" onPress={() => { setSelectAsanasVisible(true) }}>
                                <Image source={require("../assets/icons/create.png")} />
                            </Pressable>
                        </View>
                    </View>
            }

            <Modal
                transparent={true}
                statusBarTranslucent={true}
                visible={selectAsanasVisible}>
                <View style={{ height: "100%", width: "100%" }} className="bg-[#00000035]">
                    <View style={{ height: "83%", width: "100%", gap: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingTop: 30 }} className=" bg-white absolute bottom-0 flex items-center">
                        <Pressable onPress={() => { setSelectAsanasVisible(false) }} style={{ top: 20, right: 20 }} className="absolute">
                            <Image style={{ width: 24, height: 24 }} source={require("../assets/icons/Close-Square.png")} />
                        </Pressable>
                        <Text style={{ fontFamily: "PoppinsRegular", fontSize: 18 }}>
                            Select Asanas
                        </Text>
                        <View style={{ width: "100%", height: "95%", padding: 25, paddingLeft: 45 }} className="">
                            <FlashList
                                showsVerticalScrollIndicator={false}
                                data={poses}
                                numColumns={2}
                                renderItem={({ item }) =>
                                    <Pressable activeOpacity={0.5} onLongPress={() => { console.log(item._id) }} onPress={() => { console.log(item.en_name) }} style={{ width: 150, height: 150, marginBottom: 20 }} className="bg-white rounded-xl">
                                        <Image className="absolute rounded-xl" style={{ width: 150, height: 150 }} source={{ uri: item.imgUrl }} />
                                        <View className="rounded-xl flex items-start justify-end" style={{backgroundColor: "#0000003e", padding: 20, marginBottom: 20, width: 150, height: 150 }}>
                                            {
                                                item.en_name.length > 13 ?
                                                    <Text className="color-white" style={{ fontFamily: "PoppinsBold", fontSize: 18, textAlign: "left" }}>{item.en_name.slice(0, 13)} ...</Text>
                                                    :
                                                    <Text className="color-white" style={{ fontFamily: "PoppinsBold", fontSize: 18, textAlign: "left" }}>{item.en_name}</Text>
                                            }
                                        </View>
                                    </Pressable>
                                }
                                estimatedItemSize={poses.length}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            <StatusBar style='dark' />
        </SafeAreaView>
    )
}

export default CreateWorkout