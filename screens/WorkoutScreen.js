import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth, database } from '../firebase'
import { child, get, ref } from 'firebase/database'

const WorkoutScreen = () => {

  const firebase_auth = auth;
  const firebase_db = database;
  const firebase_db_ref = ref(firebase_db)

  const [wkNames, setwkNames] = useState([]);
  const [wkData, setwkData] = useState([]);
  const getUserWorkouts = async () => {
    await get(child(firebase_db_ref, `users/${firebase_auth.currentUser.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setwkNames(Object.keys(snapshot.val().workouts))
          setwkData(snapshot.val().workouts)
        }
      })
      .catch((e) => {
        Alert.alert(e.code, e.message, ["Ok"])
      })
  }

  useEffect(() => {
    getUserWorkouts();
  }, [])

  return (
    <SafeAreaView style={{ padding: 25, gap: 20 }} className="flex-1 justify-center items-center">
      <View style={{ width: "100%", height: "100%" }} className=" justify-center items-start">
        <Text style={{ fontFamily: "PoppinsBold", fontSize: 34 }}>Workouts!</Text>
        {
          wkNames.map((name) =>
            <View key={name}>
              <Text>{name}</Text>
              <Text>{console.log(wkData[name])}</Text>
            </View>
          )
        }
      </View>

    </SafeAreaView>
  )
}

export default WorkoutScreen