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
                setloggedIn(true);
                setuserEmail(response.email);
                setuserUID(response.uid);
                setuserdisplayName(response.displayName.split(" ")[0]);
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
                Alert.alert("Failed", "Sign out failed", ["Ok"]);
            })
    }

    useEffect(() => {
        getUser();
        // console.log("Current Screen Name: ", route.name);
    }, [])

    return (
        <SafeAreaView style={{ paddingHorizontal: 25, paddingVertical: 25, gap: 30, paddingBottom: 75, borderRadius: 20 }} className="flex-1 justify-start items-start">
            <View style={{ gap: -5 }} className="flex items-start justify-start">
                <Text style={{ fontFamily: "PoppinsLightItalic", fontSize: 20 }}>Hello</Text>
                <Text style={{ fontFamily: "PoppinsBold", fontSize: 28 }}>{userdisplayName}!</Text>
            </View>
            {/* Frame 43 */}
            <ScrollView className="rounded-[10px]" showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 30, justifyContent: "flex-start", alignItems: 'flex-start' }}>
                {/* Frame 46 */}
                <View style={{ gap: 10, height: 190 }} className="flex-col justify-start items-start">
                    <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>Few of the Yoga Asanas</Text>
                    <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, alignItems: 'center' }} horizontal className="rounded-[10px]">
                        <AsanaCard title={"Big Toe Pose"} type={"Backward Bend"} />
                        <AsanaCard title={"Chair Pose"} type={"Beginners'"} />
                        <AsanaCard title={"Dolhpin Pose"} type={"Core"} />
                        <AsanaCard title={"Eagle Pose"} type={"Balancing"} />
                        <AsanaCard title={"Extended Hand-to-big-Toe Pose"} type={"Balancing"} />
                    </ScrollView>
                </View>
                <View style={{ gap: 10, height: 240 }} className="flex-col justify-start items-start">
                    <Text style={{ fontFamily: "PoppinsRegular", fontSize: 14 }}>Available Yoga Workouts</Text>
                    <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 15, alignItems: 'center' }} horizontal className="rounded-[10px]">
                        <WorkoutCard title="Surya Namaskar" time={6} pcount={12}/>
                        <WorkoutCard title="Beginners'" time={10} pcount={10}/>
                        <WorkoutCard title="Yoga for Back Pain" time={12} pcount={5}/>
                    </ScrollView>
                </View>
            </ScrollView>
            <StatusBar style='dark' />
        </SafeAreaView>
    )
}

export default HomeScreen