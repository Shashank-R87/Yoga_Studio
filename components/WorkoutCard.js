import { View, Text } from 'react-native'
import React from 'react'

const WorkoutCard = ({ title, time, pcount }) => {
    return (
        <View style={{ width: 300, height: 200, paddingHorizontal: 20, paddingVertical: 20, gap: 0 }} className="bg-[#000] flex-col justify-end items-start rounded-[20px]">
            {
                title.length > 18 ?
                    <Text className="color-white" style={{ fontFamily: "PoppinsBold", fontSize: 18 }}>{title.slice(0, 18)} ...</Text>
                    :
                    <Text className="color-white" style={{ fontFamily: "PoppinsBold", fontSize: 18 }}>{title}</Text>
            }
            {
                pcount.length > 10 ?
                    <Text className="color-white" style={{ fontFamily: "PoppinsLight", fontSize: 14 }}>{pcount} ...</Text>
                    :
                    <Text className="color-white" style={{ fontFamily: "PoppinsLight", fontSize: 14 }}>{pcount} Yoga Asanas</Text>
            }
            {
                time.length > 10 ?
                    <Text className="color-white" style={{ fontFamily: "PoppinsLight", fontSize: 14 }}>{time} ...</Text>
                    :
                    <Text className="color-white" style={{ fontFamily: "PoppinsLight", fontSize: 14 }}>{time} mins</Text>
            }
        </View>
    )
}

export default WorkoutCard