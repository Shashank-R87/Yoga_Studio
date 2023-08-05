import { View, Text } from 'react-native'
import React from 'react'
import { Svg, Path } from 'react-native-svg';

const AsanaCard = ({ title }) => {
    return (
        <View style={{ width: 150, height: 150, paddingHorizontal: 20, paddingVertical: 20, gap: -2 }} className="bg-[#A8DADC] flex-col justify-end items-start rounded-[10px]">
            <View style={{right: 20, top: 20}} className="absolute">
                <Svg fill="white" width="18px" height="18px" viewBox="0 0 484.651 484.65">
                    <Path d="M243.458,153.771c0.085,0,0.171-0.006,0.257-0.006c0.087,0,0.172,0.006,0.258,0.006
				c42.464,0,76.884-34.422,76.884-76.887c0-42.46-34.42-76.884-76.884-76.884c-0.086,0-0.171,0.006-0.258,0.006
				c-0.086,0-0.171-0.006-0.257-0.006c-42.465,0-76.884,34.424-76.884,76.884C166.572,119.349,200.991,153.771,243.458,153.771z"/>
                    <Path d="M436.565,311.038l-86.702-63.042l-27.417-66.953c-5.218-12.74-17.645-20.336-30.638-20.05l-0.004-0.03h-49.479h-49.477
				l-0.004,0.03c-12.994-0.286-25.419,7.31-30.638,20.05l-27.418,66.953l-86.702,63.042c-14.443,10.502-17.64,30.724-7.136,45.169
				c6.327,8.698,16.185,13.32,26.179,13.32c6.594,0,13.248-2.012,18.988-6.189l93.744-68.154l-2.389,24.675l-88.637,89.839
				c-12.297,12.795-15.765,31.698-8.809,48.027c6.955,16.327,22.987,26.926,40.735,26.926h42.368
				c-10.918-9.882-17.88-24.627-17.88-41.093c0-29.688,22.571-53.839,50.315-53.839c0,0,32.453,0,48.258,0
				c15.807,0,28.35,12.922,28.35,12.922h-76.608c-21.085,0-38.24,18.354-38.24,40.917c0,22.562,17.155,40.916,38.24,40.916h74.192
				c0.832-0.06,1.68-0.063,2.5-0.161h89.683c17.748,0,33.779-10.6,40.735-26.929c6.955-16.326,3.488-35.228-8.808-48.025
				l-86.706-89.951h-0.024l-2.345-24.224l93.743,68.154c5.738,4.178,12.395,6.189,18.986,6.189c9.995,0,19.853-4.622,26.18-13.32
				C454.205,341.762,451.009,321.54,436.565,311.038z"/>
                </Svg>
            </View>
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