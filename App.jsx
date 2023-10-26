import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from './src/screens/Home/Home';
import Chat from './src/screens/Chat/Chat';
import FindDevices from './src/screens/FindDevices/FindDevices';
// import NearbyChat from './src/screens/NearbyChat';
import GetLocalData from './src/screens/LocalData/GetLocalData';
import ViewLocalData from './src/screens/LocalData/ViewLocalData';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

function WifiP2p() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Wifi P2P" component={FindDevices} options={{headerShown: false}}/>
      {/* <Stack.Screen name="NearbyChat" component={NearbyChat}/> */}
    </Stack.Navigator>
  );
}

function GetDataLocal() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GetLocalData"
        component={GetLocalData}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ViewLocalData" component={ViewLocalData} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Chat Wifi P2P">
        <Drawer.Screen name="Home Page" component={HomeScreen} />
        <Drawer.Screen name="Chat Wifi P2P" component={WifiP2p} />
        <Drawer.Screen name="Get Local Data" component={GetDataLocal} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
