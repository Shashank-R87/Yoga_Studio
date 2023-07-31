<h1 align="center" style=>Yoga Studio</h1>
<h4 align="center">A simple yoga android app which is made using the React Native framework (actually Expo).</h4>

<hr/>
<h3 align="left">How to run this project ?</h3>

1. Make sure that nodejs, npm, yarn, and git is installed
2. Open the terminal in the path you want, and run this command `git clone https://github.com/Shashank-R87/Yoga_Studio.git` ( you can also direclty download and extract the code)
3. Next `cd Yoga_Studio` and then `npm install` ( this should start installing all the required packages 
4. Run `npm run start` to start the app server
5. You can install an android app called **Expo Go** from Google Play Store and scan the QR Code to run the app on your Android phone
6. Or you can click `a` when the server is running to open the app in the Android Virtual Device ( *works only if Android Studio and an AVD is created* )
<hr/>

<h3 align="left">How to create the APK ?</h3>

1. Install EAS using `npm install -g eas-cli`
2. Configure the project by `eas build:configure` and select Android
3. Open the eas.json file and change the preview to
    ```"preview" : { "android" : { "buildType": "apk"}}```
4. After this login in to your eas account using `eas login`
5. After logging in use the command `eas build -p android --profile preview` to create the APK in the EAS Cloud Server
<hr/>

<h3 align="left">Prerequisites</h3>

1. Install NodeJs (npm will also be installed with it)
2. Install Git
3. `npm i -g expo-cli` to install expo cli globally
4. `npm i -g create-expo-app` to install create-expo-app globally ( used to initiate the project `npx create-expo-app <project name>` )
5. `npm i -g eas-cli` to install eas cli globally ( used to make prebuilds, development builds and to build APKs )
