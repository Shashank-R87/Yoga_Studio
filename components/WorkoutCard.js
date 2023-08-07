import { View, Text } from 'react-native'
import React from 'react'
import { Svg, Path, Circle, G } from 'react-native-svg';

const WorkoutCard = ({ title, time, pcount }) => {
    return (
        <View style={{ width: 300, height: 200, paddingHorizontal: 20, paddingVertical: 20, gap: 0 }} className="bg-[#0C1821] flex-col justify-end items-start rounded-[10px]">
            <View style={{right: 20, top: 20}} className="absolute">
                <Svg fill="white" height="24px" width="24px" version="1.1" id="Layer_1"
                    viewBox="0 0 512.001 512.001">
                    <G>
                        <G>
                            <Circle cx="235.584" cy="60.926" r="60.926" />
                        </G>
                    </G>
                    <G>
                        <G>
                            <Path d="M392.708,442.023c-38.151-10.685-26.823-7.512-57.987-16.239c15.677-13.059,14.657-37.317-1.826-49.07l-84.163-60.013
			l-9.373-111.497l22.788,65.428l-0.35-77.16c-0.126-27.805-22.769-50.244-50.574-50.118c-41.787,0.189-75.51,34.218-75.321,76.006
			c0.012,2.725,0.904,199.467,0.918,202.395l0.244-0.001c0.879,7.042,3.837,13.642,8.426,18.948h-16.585
			c-19.688,0-35.649,15.961-35.649,35.649c0,19.689,15.962,35.649,35.649,35.649h254.191c17.814,0,32.892-13.15,35.317-30.796
			C420.837,463.555,409.862,446.826,392.708,442.023z M180.742,371.407c-11.692-8.337-16.948-22.366-14.73-35.635l14.762-87.351
			l7.38,87.781c0.763,9.075,5.478,17.356,12.893,22.643l68.138,48.586C269.185,407.431,190.733,378.53,180.742,371.407z"/>
                        </G>
                    </G>
                </Svg>
            </View>
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