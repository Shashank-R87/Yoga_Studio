import { View, Text, Modal } from 'react-native'
import React, { useState } from 'react'

const AlertFunction = ({isVisible ,code, message, buttons}) => {

    let count = 0;
    console.log("Alert Function Called");

    return (
        <Modal animationType='fade' statusBarTranslucent={true} transparent={true} visible={isVisible}>
            <View className="flex-1 items-center justify-center bg-[#0000001b]">
                <View style={{ maxWidth: "80%", minWidth: "80%", maxHeight: "30%", minHeight: "20%", padding: 20, gap: 5 }} className="bg-[#fff] rounded-lg items-center justify-center">
                    <Text style={{ fontFamily: "PoppinsMedium", fontSize: 18, textAlign: 'center' }}>{code}</Text>
                    <Text style={{ fontFamily: "PoppinsRegular", fontSize: 16, textAlign: 'center' }}>{message}</Text>
                    <View style={{ paddingHorizontal: 40, paddingTop: 10, display: 'flex', flexDirection: "row", alignItems: 'center', gap: 40, justifyContent: 'center', width: "100%" }}>
                        {
                            buttons.map((button) => {
                                count += 1;
                                return (
                                    <Text key={count} style={{ fontFamily: "PoppinsRegular", fontSize: 16 }} className="text-[#37afff]">{button}</Text>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default AlertFunction