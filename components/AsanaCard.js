import { View, Text } from 'react-native'
import React from 'react'

const AsanaCard = ({ title }) => {
    return (
        <View style={{ width: 150, height: 150, paddingHorizontal: 20, paddingVertical: 20, gap: -2 }} className="bg-[#000] flex-col justify-end items-start rounded-[10px]">
            {
                title.length > 13 ?
                    <Text className="color-white" style={{ fontFamily: "PoppinsBold", fontSize: 18, textAlign: "left" }}>{title.slice(0, 13)} ...</Text>
                    :
                    <Text className="color-white" style={{ fontFamily: "PoppinsBold", fontSize: 18, textAlign: "left" }}>{title}</Text>
            }
        </View>
    )
}

export default AsanaCard