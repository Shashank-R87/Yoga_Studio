import { View, Text, Image, TouchableOpacity, Modal } from 'react-native'
import React from 'react'

const AsanaCardLarge = ({ title, img, id }) => {

    const getId = async () => {
        await fetch(`https://pqxc11fj.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_id+%3D%3D+%22${id}%22%5D%0A`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.result);
            })
    }

    return (
            <TouchableOpacity activeOpacity = { 0.8} onPress = {()=> { getId() }} style = {{ width: "100%", height: 150 }} className = "bg-[#000] flex-col justify-end items-start rounded-[10px]" >
            <Image className="rounded-[10px]" style={{ width: 362, height: 150, position: 'absolute', top: 0, right: 0, overflow: 'hidden' }} resizeMode='center' source={{ uri: img }} />
            <View style={{ width: "100%", height: 150, paddingHorizontal: 20, paddingVertical: 20}} className="bg-[#00000047] flex-col justify-end items-start rounded-[10px]">
            {
                title.length > 24 ?
                <Text className="color-white" style={{ fontFamily: "PoppinsMedium", fontSize: 18, textAlign: "left" }}>{title.slice(0, 24)} ...</Text>
                :
                <Text className="color-white" style={{ fontFamily: "PoppinsMedium", fontSize: 18, textAlign: "left" }}>{title}</Text>
            }
            </View>
            </TouchableOpacity >
    )
}

export default AsanaCardLarge