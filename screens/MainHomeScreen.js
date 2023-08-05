import React from 'react'
import * as NavigationBar from 'expo-navigation-bar';
// import * as Svg from 'react-native-svg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import WorkoutScreen from './WorkoutScreen'
import { Svg, Path, Circle, Ellipse, G } from 'react-native-svg';
import ContentScreen from './ContentScreen';

const Tab = createBottomTabNavigator();

const MainHomeScreen = () => {

    NavigationBar.setBackgroundColorAsync("white");
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");

    return (
        <Tab.Navigator screenOptions={
            {
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#FF8D8D",
                tabBarStyle: {
                    position: "absolute",
                    margin: 20,
                    marginBottom: 10,
                    height: 60,
                    backgroundColor: "#E63946",
                    borderRadius: 20,
                    shadowColor: "#E63946",
                },
            }
        }
            initialRouteName='HomeScreen'
            backBehavior='none'>
            <Tab.Screen
                name="HomeScreen"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z" fill={color} />
                        </Svg>
                    ),
                }}
                component={HomeScreen} />
            <Tab.Screen
                name="ContentScreen"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Svg fill={color} width={size} height={size} viewBox="0 0 484.651 484.65">
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
                    )
                }}
                component={ContentScreen} />
            <Tab.Screen
                name="WorkoutScreen"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Svg fill={color} height={size} width={size} version="1.1" id="Layer_1"
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
                    )
                }}
                component={WorkoutScreen} />
            <Tab.Screen
                name="ProfileScreen"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Svg width={size} height={size} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Circle cx="12" cy="6" r="4" fill={color} />
                            <Ellipse cx="12" cy="17" rx="7" ry="4" fill={color} />
                        </Svg>
                    )
                }}
                component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export default MainHomeScreen