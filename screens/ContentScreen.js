import { View, Text, Image, ScrollView, TouchableOpacity, Modal, Pressable, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as NavigationBar from 'expo-navigation-bar';
import { useNavigation, useRoute } from '@react-navigation/native'
import LottieView from 'lottie-react-native'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, database } from '../firebase';
import { StatusBar } from 'expo-status-bar';
import { FlashList } from '@shopify/flash-list';
import { ref } from 'firebase/database';

const ContentScreen = () => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");

    const [loggedIn, setloggedIn] = useState(false);

    const [userdisplayName, setuserdisplayName] = useState();

    const firebase_auth = auth;
    const firebase_db = database;
    const firebase_db_ref = ref(firebase_db);

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
                }, 1000)
            })
    }

    const [showFilter, setshowFilter] = useState(false)

    const [showType, setshowType] = useState(false)
    const [typeData, setTypeData] = useState([]);
    const getTypeData = async () => {
        await fetch("https://pqxc11fj.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D%22poses_type%22%5D%7B%0A++_id%2C+typeName%0A%7D%0A")
            .then((response) => response.json())
            .then((result) => {
                setTypeData(result.result)
            })
    }

    const [showAnatomy, setshowAnatomy] = useState(false)
    const [anatomyData, setanatomyData] = useState([]);
    const getanatomyData = async () => {
        await fetch("https://pqxc11fj.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D%22poses_anatomy%22%5D%7B%0A++_id%2C+anatomyName%0A%7D%0A")
            .then((response) => response.json())
            .then((result) => {
                setanatomyData(result.result)
            })
    }

    const [filterSelected, setfilterSelected] = useState(false)
    const [filteredData, setfilteredData] = useState([])
    const getFilteredData = async (id, filterType) => {
        setLoading(true)
        if (filterType == "type") {
            await fetch(`https://pqxc11fj.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D%22poses_type%22+%26%26+_id%3D%3D%22${id}%22%5D%7B%0A++_id%2C+typeName%2C%0A++asanas%5B%5D-%3E%7B_id%2Cen_name%2C+imgUrl%7D%0A%7D`)
                .then((response) => response.json())
                .then((result) => {
                    setfilteredData(result.result[0].asanas);
                    setfilterSelected(true);
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000)
                })
        } else if (filterType == "anatomy") {
            await fetch(`https://pqxc11fj.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D%22poses_anatomy%22+%26%26+_id%3D%3D%22${id}%22%5D%7B%0A++_id%2C+anatomyName%2C%0A++asanas%5B%5D-%3E%7B_id%2Cen_name%2C+imgUrl%7D%0A%7D`)
                .then((response) => response.json())
                .then((result) => {
                    setfilteredData(result.result[0].asanas);
                    setfilterSelected(true);
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000)
                })
        }

    }

    useEffect(() => {
        getUser();
        poseNames();
        getTypeData();
        getanatomyData();
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
                    <View style={{ gap: 30, width: "100%", height: "100%" }} className="flex items-start justify-start">
                        <View style={{ gap: -5 }} className="flex items-start justify-start">
                            <Text style={{ fontFamily: "PoppinsLightItalic", fontSize: 20 }}>Hello</Text>
                            <Text style={{ fontFamily: "PoppinsBold", fontSize: 28 }}>{userdisplayName}!</Text>
                        </View>
                        <View style={{ gap: 20, height: "85%", width: "100%" }} className="flex-col justify-start items-start">
                            <View style={{ width: "100%" }} className="flex-row justify-between items-center">
                                <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14 }} className="text-[#565656]">Available Yoga Asanas</Text>
                                <Pressable onPress={() => { setshowFilter(true) }} style={{ width: 42, height: 42 }} className="flex rounded-full items-center justify-center">
                                    <Image source={require("../assets/icons/filter.png")} />
                                </Pressable>
                            </View>
                            {loading ?
                                <View style={{ width: "100%", height: "100%" }} className="flex items-center justify-center">
                                    <LottieView
                                        style={{ width: 100, height: 100 }}
                                        autoPlay
                                        source={require("../assets/lottie/newScene.json")}
                                    />
                                </View>
                                :
                                <View style={{ height: "90%", paddingLeft: 20, width: "100%" }}>
                                    {
                                        filteredData == null ?
                                            <View style={{ marginLeft: -20 }} className="flex-1 justify-center items-center">
                                                <Image style={{ width: 250, height: 250 }} source={require("../assets/icons/nothing_found.png")} />
                                                <Text style={{ fontFamily: "PoppinsBold", fontSize: 48 }} className="text-[#565656]">Oops!</Text>
                                                <Text style={{ fontFamily: "PoppinsMedium", fontSize: 20 }} className="text-[#565656]">Nothing here</Text>
                                            </View>
                                            :
                                            <FlashList
                                                numColumns={2}
                                                showsVerticalScrollIndicator={false}
                                                data={filterSelected ? filteredData : poses}
                                                renderItem={({ item }) =>
                                                    <TouchableOpacity activeOpacity={0.5} onPress={() => { getId(item._id) }} className="bg-[#1B2A41] rounded-xl" style={{ marginBottom: 20, width: 150, height: 150 }}>
                                                        <Image className="absolute rounded-xl" style={{ width: 150, height: 150 }} resizeMode='cover' source={{ uri: item.imgUrl }} />
                                                        <View className="bg-[#0000003e] rounded-xl flex items-start justify-end" style={{ padding: 20, marginBottom: 20, width: 150, height: 150 }}>
                                                            {
                                                                item.en_name.length > 13 ?
                                                                    <Text className="color-white" style={{ fontFamily: "PoppinsBold", fontSize: 18, textAlign: "left" }}>{item.en_name.slice(0, 13)} ...</Text>
                                                                    :
                                                                    <Text className="color-white" style={{ fontFamily: "PoppinsBold", fontSize: 18, textAlign: "left" }}>{item.en_name}</Text>
                                                            }
                                                        </View>
                                                    </TouchableOpacity>
                                                }
                                                estimatedItemSize={(filterSelected ? filteredData : poses).length}
                                            />
                                    }
                                </View>
                            }
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
                                    <Text style={{ fontFamily: "PoppinsMedium", fontSize: 22, textAlign: 'center', maxWidth: "80%" }}>{poseData.en_name}</Text>
                                    <Text style={{ fontFamily: "PoppinsRegular", fontSize: 16, textAlign: 'center', maxWidth: "80%" }} className="text-[#565656]">{poseData.san_name}</Text>
                                </View>
                                <Image style={{ width: "100%", height: 200, borderRadius: 10 }} resizeMode='center' source={{ uri: poseData.imgUrl }} />
                                <ScrollView style={{ height: 200 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 30 }}>
                                    <View className="justify-start items-start" style={{ gap: 10, maxWidth: "100%", minWidth: "100%" }}>
                                        <Text style={{ fontFamily: "PoppinsRegular", fontSize: 16 }}>Description</Text>
                                        <Text className="text-[#565656]" style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>{poseData.desc}</Text>
                                    </View>
                                    <View className="justify-start items-start" style={{ gap: 10, maxWidth: "100%", minWidth: "100%" }}>
                                        <Text style={{ fontFamily: "PoppinsRegular", fontSize: 16 }}>Benefits</Text>
                                        <Text className="text-[#565656]" style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>{poseData.benefits}</Text>
                                    </View>
                                    <View className="justify-start items-start" style={{ gap: 10, maxWidth: "100%", minWidth: "100%" }}>
                                        <Text style={{ fontFamily: "PoppinsRegular", fontSize: 16, textAlign: 'left' }}>Step by step instructions</Text>
                                        {
                                            poseData.steps ?
                                                poseData.steps.map(step =>
                                                    <View key={poseData.steps.indexOf(step)} style={{ maxWidth: "95%" }} className="flex-row justify-start items-start">
                                                        <Text className="text-[#565656]" style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>{poseData.steps.indexOf(step) + 1}. </Text>
                                                        <Text className="text-[#565656]" style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>{step}</Text>
                                                    </View>
                                                )
                                                :
                                                <View></View>
                                        }
                                    </View>
                                </ScrollView>
                            </View>
                    }
                </View>
            </Modal>
            <Modal
                visible={showFilter}
                onRequestClose={() => { setshowFilter(false) }}
                statusBarTranslucent={true}
                transparent={true}>
                <View style={{ padding: 25 }} className="flex-1 bg-[#00000028] justify-center items-center">
                    <View style={{ width: "100%", padding: 20, gap: 10, maxHeight: "80%" }} className="flex bg-white rounded-[10px] justify-center items-start">
                        <View style={{ maxHeight: "100%" }}>
                            <Pressable onPress={() => { setshowAnatomy(false); setshowType(false); setfilterSelected(false); setshowFilter(false); setfilteredData({}) }} style={{ width: "100%" }} className="flex-row justify-between items-center">
                                <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14, paddingTop: 3 }} className="text-[#565656]">All</Text>
                            </Pressable>
                            <Pressable onPress={() => { setshowType(!showType); setshowAnatomy(false) }} style={{ width: "100%" }} className="flex-row justify-between items-center">
                                <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14, paddingTop: 3 }} className="text-[#565656]">Poses by Type</Text>
                                {
                                    showType ?
                                        <Image source={require("../assets/icons/arrowUp.png")} />
                                        :
                                        <Image source={require("../assets/icons/arrowDown.png")} />
                                }
                            </Pressable>
                            {
                                showType ?
                                    <View style={{ maxHeight: "100%", width: "100%" }}>
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            data={typeData}
                                            numColumns={2}
                                            contentContainerStyle={{
                                                padding: 10
                                            }}
                                            renderItem={({ item }) =>
                                                <Pressable onPress={() => { getFilteredData(item._id, "type"); setshowFilter(false); setshowType(false); setshowAnatomy(false) }} style={{ marginRight: 20, width: "45%", padding: 3 }}>
                                                    <Text key={item._id} style={{ fontFamily: "PoppinsRegular", fontSize: 14, paddingTop: 3 }} className="text-[#565656]">{item.typeName}</Text>
                                                </Pressable>
                                            }
                                            estimatedItemSize={typeData.length}
                                        />
                                    </View>
                                    :
                                    <View></View>
                            }
                            <Pressable onPress={() => { setshowAnatomy(!showAnatomy) }} style={{ width: "100%" }} className="flex-row justify-between items-center">
                                <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14, paddingTop: 3 }} className="text-[#565656]">Poses by Anatomy</Text>
                                {
                                    showAnatomy ?
                                        <Image source={require("../assets/icons/arrowUp.png")} />
                                        :
                                        <Image source={require("../assets/icons/arrowDown.png")} />
                                }
                            </Pressable>
                            {
                                showAnatomy ?
                                    <View style={{ maxHeight: "100%", width: "100%" }}>
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            data={anatomyData}
                                            numColumns={2}
                                            contentContainerStyle={{
                                                padding: 10
                                            }}
                                            renderItem={({ item }) =>
                                                <Pressable onPress={() => { getFilteredData(item._id, "anatomy"); setshowType(false); setshowAnatomy(false); setshowFilter(false); }} style={{ marginRight: 20, width: "45%", padding: 3 }}>
                                                    <Text key={item._id} style={{ fontFamily: "PoppinsRegular", fontSize: 14, paddingTop: 3 }} className="text-[#565656]">{item.anatomyName}</Text>
                                                </Pressable>
                                            }
                                            estimatedItemSize={anatomyData.length}
                                        />
                                    </View>
                                    :
                                    <View></View>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
            <StatusBar style='dark' />
        </SafeAreaView>
    )
}

export default ContentScreen

//Get Asana details for specific filter

// *[_type=="poses_type" && _id=="33358354-bcc9-4eb5-8f86-d0fc9ee8e6c2"]{
//     _id, typeName,
//     asanas[]->
//   }