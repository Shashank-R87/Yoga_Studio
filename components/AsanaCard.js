import { View, Text } from 'react-native'
import React from 'react'

const AsanaCard = ({ title, type }) => {
    return (
        <View style={{ width: 150, height: 150, paddingHorizontal: 20, paddingVertical: 20, gap: -2 }} className="bg-[#000] flex-col justify-start items-start rounded-[10px]">
            {
                title.length > 13 ?
                    <Text className="color-white" style={{ fontFamily: "PoppinsBold", fontSize: 18 }}>{title.slice(0, 13)} ...</Text>
                    :
                    <Text className="color-white" style={{ fontFamily: "PoppinsBold", fontSize: 18 }}>{title}</Text>
            }
            {
                type.length > 10 ?
                    <Text className="color-white" style={{ fontFamily: "PoppinsLight", fontSize: 14 }}>{type} ...</Text>
                    :
                    <Text className="color-white" style={{ fontFamily: "PoppinsLight", fontSize: 14 }}>{type} Yoga Poses</Text>
            }
        </View>
    )
}

export default AsanaCard