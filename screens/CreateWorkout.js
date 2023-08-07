import { View, Text, Image, Pressable, Modal, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { auth, database } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import AnimatedLottieView from 'lottie-react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { FlashList } from '@shopify/flash-list'
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist'
import { ref, set } from 'firebase/database'

const CreateWorkout = () => {

    const [loggedIn, setloggedIn] = useState(false);
    const [userdisplayName, setuserdisplayName] = useState();

    const firebase_auth = auth;
    const firebase_db = database;

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

    const addisSelected = () => {
        poses.map((data) => {
            data.isSelected = false
        })
    }

    const [selectedIDs, setSelectedIDs] = useState([]);
    const [selectedData, setselectedData] = useState([]);
    const [gotSD, setgotSD] = useState(false);
    const setisSelected = (id) => {
        const copySelectedIDs = [...selectedIDs];
        const index = copySelectedIDs.indexOf(id);
        if (index === -1)
            copySelectedIDs.push(id);
        else
            copySelectedIDs.splice(index, 1);
        setSelectedIDs(copySelectedIDs);
    }

    const getselectedDatafromID = () => {
        poses.map((data) => {
            if (selectedIDs.includes(data._id)) {
                if (!selectedData.some(item => item._id == data._id)) {
                    setselectedData(prevData => [...prevData, data])
                }
            }
        })
    }

    const deleteSelectedData = (id) => {
        const copySelectedIDs = [...selectedIDs];
        const index = copySelectedIDs.indexOf(id);
        copySelectedIDs.splice(index, 1);
        setSelectedIDs(copySelectedIDs);

        let indexData = 0;
        const copySelectedData = [...selectedData]
        for (let i = 0; i < selectedData.length; ++i) {
            if (copySelectedData[i]._id == id) {
                indexData = i
            }
        }
        copySelectedData.splice(indexData, 1)
        setselectedData(copySelectedData)

    }

    useEffect(() => {
        selectedData.map((data) => {
            console.log(data.en_name)
        })
        console.log("\n\n\n")
    }, [selectedData])

    useEffect(() => {
        getUser();
        poseNames();
        addisSelected();
    }, [])

    const [selectAsanasVisible, setSelectAsanasVisible] = useState(false)

    const [saveWorkoutModal, setsaveWorkoutModal] = useState(false)
    const [workoutName, setworkoutName] = useState();
    const [restTime, setrestTime] = useState()
    const [saveWorkout, setsaveWorkout] = useState(false)

    useEffect(() => {
        if (workoutName && restTime && restTime != "0") {
            setsaveWorkout(true);
        }
        else {
            setsaveWorkout(false);
        }
    }, [workoutName, restTime])

    const SaveWorkoutOnline = () => {
        set(ref(firebase_db, "users/" + firebase_auth.currentUser.uid + "/workouts/" + workoutName), {
            workoutname: workoutName,
            workoutdata: selectedData,
        })
            .then(() => {
                setSelectedIDs([]);
                setselectedData([]);
                setgotSD(false)
                setsaveWorkoutModal(false)
            })
    }

    const renderItem = ({ drag, item, isActive }) => {
        return (
            <ScaleDecorator activeScale={1.02}>
                <View style={{ marginBottom: 20, paddingLeft: 20, width: "91.5%", height: 100, marginLeft: 15 }} className="bg-white flex-row justify-between items-center rounded-xl">
                    <Text style={{ fontFamily: "PoppinsRegular", paddingTop: 3, fontSize: 14, maxWidth: "60%" }}>{item.en_name}</Text>
                    <View className="flex-row">
                        <Pressable onPress={() => { deleteSelectedData(item._id) }} style={{ padding: 10, marginRight: 10 }} className="">
                            <Image style={{ width: 20, height: 22 }} source={require("../assets/icons/delete.png")} />
                        </Pressable>
                        <Pressable onPressIn={drag} disabled={isActive} style={{ padding: 10, marginRight: 10 }} className="">
                            <Image style={{ width: 22, height: 22 }} source={require("../assets/icons/dragdrop.png")} />
                        </Pressable>
                    </View>
                </View>
            </ScaleDecorator>
        )
    }

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
                            {
                                !gotSD ?
                                    <Pressable className="rounded-full" onPress={() => { setSelectAsanasVisible(true) }}>
                                        <Image source={require("../assets/icons/create.png")} />
                                    </Pressable>
                                    :
                                    <View style={{ width: "100%", height: "85%", marginTop: -30, paddingTop: 20 }} className=" flex justify-center items-center">
                                        <DraggableFlatList
                                            showsVerticalScrollIndicator={false}
                                            data={selectedData}
                                            onDragEnd={({ data }) => { setselectedData(data) }}
                                            keyExtractor={(item) => item._id}
                                            renderItem={renderItem}
                                            extraData={selectedData}
                                        />
                                        <Pressable style={{ bottom: 0, right: 0 }} className="rounded-full absolute" onPress={() => { setSelectAsanasVisible(true) }}>
                                            <Image style={{ width: 60, height: 60 }} source={require("../assets/icons/create.png")} />
                                        </Pressable>
                                    </View>
                            }
                            {
                                gotSD ?
                                    <View style={{ bottom: 5 }} className="flex justify-center items-center absolute">
                                        <Pressable
                                            onPress={() => {
                                                if (selectedData.length > 1) {
                                                    setsaveWorkoutModal(true)
                                                }
                                                else if (selectedData.length == 1) {
                                                    Alert.alert("Selected One", "Please select more than one asanas to save as workout", ["Ok"])
                                                }
                                                else {
                                                    Alert.alert("Selected None", "Please select asanas to save as workout", ["Ok"])
                                                }
                                            }}
                                            style={{ paddingVertical: 10, paddingHorizontal: 20 }} className="bg-[#E63946] flex justify-center items-center rounded-full">
                                            <Text className="text-white pt-[3px]" style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>Create Workout</Text>
                                        </Pressable>
                                    </View>
                                    :
                                    <View></View>
                            }
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
                                refreshing={true}
                                numColumns={2}
                                renderItem={({ item }) =>
                                    <Pressable activeOpacity={0.5} onLongPress={() => { console.log(item._id) }} onPress={() => { setisSelected(item._id) }} style={{ width: 150, height: 150, marginBottom: 20 }} className="bg-white rounded-xl">
                                        <Image className="absolute rounded-xl" style={{ width: 150, height: 150 }} source={{ uri: item.imgUrl }} />
                                        <View className="rounded-xl flex items-start justify-end" style={{ backgroundColor: "#0000003e", padding: 20, marginBottom: 20, width: 150, height: 150 }}>
                                            {
                                                item.en_name.length > 13 ?
                                                    <Text className="color-white" style={{ fontFamily: "PoppinsBold", fontSize: 18, textAlign: "left" }}>{item.en_name.slice(0, 13)} ...</Text>
                                                    :
                                                    <Text className="color-white" style={{ fontFamily: "PoppinsBold", fontSize: 18, textAlign: "left" }}>{item.en_name}</Text>
                                            }
                                            <View style={{ backgroundColor: selectedIDs.includes(item._id) ? "#fff" : "#00000000", width: 20, height: 20, top: 20, right: 20 }} className="absolute rounded-full">
                                                {
                                                    selectedIDs.includes(item._id) ?
                                                        <Image style={{ width: 20, height: 20 }} source={require("../assets/icons/checkmark.png")} />
                                                        :
                                                        <View></View>
                                                }
                                            </View>
                                        </View>
                                    </Pressable>
                                }
                                estimatedItemSize={poses.length}
                                extraData={selectedIDs}
                            />
                        </View>
                        <Pressable onPress={() => { getselectedDatafromID(); setgotSD(true); setSelectAsanasVisible(false) }} style={{ width: 70, height: 70, right: 30, bottom: 30 }} className="bg-[#E63946] absolute rounded-full justify-center items-center">
                            <Image style={{ width: 30, height: 30 }} source={require("../assets/icons/arrowRight.png")} />
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal
                transparent={true}
                visible={saveWorkoutModal}
                onRequestClose={() => { setsaveWorkoutModal(false) }}
                statusBarTranslucent={true}
            >
                <View style={{ paddingHorizontal: 25 }} className="flex-1 justify-center items-center bg-[#00000035]">
                    <View style={{ width: "100%", minHeight: "30%", maxHeight: "40%", gap: 20, paddingHorizontal: 10, paddingVertical: 40 }} className="bg-white rounded-xl justify-center items-center">
                        <Pressable onPress={() => { setsaveWorkoutModal(false) }} style={{ position: 'absolute', top: 20, right: 20 }}>
                            <Image source={require("../assets/icons/close.png")} />
                        </Pressable>
                        <TextInput onChangeText={(value) => { setworkoutName(value); }} style={{ paddingHorizontal: 24, fontFamily: "PoppinsRegular", minWidth: "90%", height: 60, fontSize: 16, marginTop: 40 }} placeholderTextColor={"#92979E"} className="text-[#383838] pt-[4px] border-[2px] border-[#E5E6EB] rounded-full focus:border-[#383838]" placeholder='Name of workout' />
                        <TextInput keyboardType='number-pad' onChangeText={(value) => { setrestTime(value); }} style={{ paddingHorizontal: 24, fontFamily: "PoppinsRegular", minWidth: "90%", height: 60, fontSize: 16 }} placeholderTextColor={"#92979E"} className="text-[#383838] pt-[4px] border-[2px] border-[#E5E6EB] rounded-full focus:border-[#383838]" placeholder='Rest time in seconds' />
                        {
                            saveWorkout ?
                                <Pressable onPress={() => { SaveWorkoutOnline() }} style={{ paddingVertical: 16, minWidth: "90%" }} className="flex cursor-pointer justify-center items-center bg-[#E63946] rounded-full">
                                    <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14 }} className="text-[#fff] pt-[4px]">Save Workout</Text>
                                </Pressable>
                                :
                                <Pressable style={{ paddingVertical: 16, minWidth: "90%" }} className="flex cursor-pointer justify-center items-center bg-[#E5E6EB] rounded-full">
                                    <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14 }} className="text-gray-400 pt-[4px]">Save Workout</Text>
                                </Pressable>
                        }
                    </View>
                </View>
            </Modal>
            <StatusBar style='dark' />
        </SafeAreaView >
    )
}

export default CreateWorkout