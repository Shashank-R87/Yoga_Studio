import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from "expo-font";
import * as NavigationBar from 'expo-navigation-bar';

import MainScreen from './screens/MainScreen';
import LoginSignupScreen from './screens/LoginSignupScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import AboutYou from './screens/AboutYou';
import HomeScreen from './screens/HomeScreen';
import MainHomeScreen from './screens/MainHomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  NavigationBar.setBackgroundColorAsync("white");
  NavigationBar.setVisibilityAsync("hidden");
  NavigationBar.setBehaviorAsync("overlay-swipe");

  const [loaded] = useFonts({
    PoppinsSemiBold: require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    PoppinsBlack: require("./assets/fonts/Poppins/Poppins-Black.ttf"),
    PoppinsMediumItalic: require("./assets/fonts/Poppins/Poppins-MediumItalic.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins/Poppins-Light.ttf"),
    PoppinsLightItalic: require("./assets/fonts/Poppins/Poppins-LightItalic.ttf"),
    Monoton: require("./assets/fonts/Monoton/Monoton-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Main" component={MainScreen} />
        <Stack.Screen options={{ headerShown: false }} name="MainHome" component={MainHomeScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'fade_from_bottom' }} name="LoginSignup" component={LoginSignupScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'fade_from_bottom' }} name="AboutYou" component={AboutYou} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignupScreen} />
        <Stack.Screen options={{ headerShown: false }} name="LogIn" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

