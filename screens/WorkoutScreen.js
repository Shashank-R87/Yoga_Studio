import { View, Text, Pressable, Image, TouchableOpacity, Modal, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DraggableFlatList from 'react-native-draggable-flatlist'

const WorkoutScreen = () => {

  const [data, setData] = useState(
    [{ "_id": "82bf97b3-d1fd-49dd-8bfe-dab260c964cc", "en_name": "Extended Side Angle Pose" }, { "_id": "84790a1e-e821-465d-8596-28699ce181f7", "en_name": "Chair Pose" }, { "_id": "9132bdb8-6a84-43df-87d6-6a0d9f6fb877", "en_name": "Extended Triangle Pose" }, { "_id": "b07a691b-4986-41bc-8fba-d6f33d4cf684", "en_name": "Eagle Pose" }, { "_id": "d26b292c-dd59-4194-93f3-096420aa8295", "en_name": "Big Toe Pose" }, { "_id": "d5605c5d-32fe-4eb0-8cad-e7a801ea8371", "en_name": "Dolphin Pose" }, { "_id": "df6209af-cfc6-484c-8216-6f81b7403853", "en_name": "Extended Hand-to-Big-Toe Pose" }]
  )

  useEffect(() => {
    data.map(({ en_name }) => {
      console.log(en_name)
    })
    console.log("\n\n")
  }, [data])

  const renderItem = ({ drag, item, isActive }) => {
    return (
      <View style={{ marginBottom: 20, paddingLeft: 20, width: "100%", height: 200 }} className="bg-white flex-row justify-between items-center">
        <Text style={{ fontFamily: "PoppinsRegular", paddingTop: 3, fontSize: 14 }}>{item.en_name}</Text>
        <TouchableOpacity onPressIn={drag} disabled={isActive} style={{ paddingLeft: 20, padding: 10 }} className="bg-slate-400">
          <Image style={{ width: 32, height: 32 }} source={require("../assets/icons/dragdrop.png")} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ padding: 25, gap: 20 }} className="flex-1 justify-center items-center">
      <View style={{ width: "100%", height: "100%" }} className="">
        <DraggableFlatList
          showsVerticalScrollIndicator={false}
          data={data}
          onDragEnd={({ data }) => { setData(data) }}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      </View>

    </SafeAreaView>
  )
}

export default WorkoutScreen